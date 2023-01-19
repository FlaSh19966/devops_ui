import Recorder from '@/portal/components/recorder'
import axios from 'axios'
import api_calls from '@/portal/api_calls'
import { Socket } from 'phoenix-socket'

export default {
  data () {
    return {
      audioStream: null
    }
  },
  methods: {
    call_cloud_api () {
      document.querySelector('#microphone').classList.add('voice-on')
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)()
      var buffer_list, buffer_i32
      var recorder = new Recorder(audioContext, {
        // An array of 255 Numbers
        // You can use this to visualize the audio stream
        // If you use react, check out react-wave-stream
        onAnalysed: data => { }
      })

      var voice_channel,
        wav_parameters,
        recBuffers = [],
        recLength,
        meta_data
      var vm = this
      axios.get(api_calls.voice_channel_api()).then(response => {
        this.voice_socket = new Socket(process.env.VUE_APP_LIVE_CHAT_WEBSOCKET_ENDPOINT, {
          params: {
            company: this.$session.get('UserInformation').company_name,
            voice_channel_name: response.data.voice_channel_name,
            token: response.data.token,
            is_voice: true
          }
        })
        this.voice_socket.connect()

        voice_channel = this.voice_socket.channel(
          'voice_to_text:' + response.data.voice_channel_name
        )
        voice_channel.join()
      })

      let blob = null

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          this.audioStream = stream
          recorder.init(stream)
          startRecording()
        })
        .catch(err => console.log('Uh oh... unable to get stream...', err))

      function startRecording (stream) {
        recorder.start()
        setTimeout(() => {
          stopRecording()
        }, 4000)
      }

      function stopRecording () {
        recorder.stop().then(({ blob, buffer }) => {
          vm.audioStream.getTracks().forEach((track) => {
            track.stop()
          })
          // buffer_list = buffer[0];
          var reader = new FileReader()
          reader.readAsArrayBuffer(blob)
          reader.onloadend = () => {
            buffer_list = reader.result
            var temp = new Uint8Array(buffer_list)
            wav_parameters = wav_file_processing_read_parameters(temp)
            init_encoder(buffer_list)
          }
          // Recorder.download(blob, "my-file");
          // buffer is an AudioBuffer
        })
      }

      function init_encoder (data) {
        var arrayBuffer = new Uint8Array(data)

        var encData = []
        var result = encodeFlac(arrayBuffer, encData)
        // console.log("encoded data array: ", encData);

        if (result.error) {
          console.error('Conversion failed!!')
        }

        var metaData = result.metaData

        if (!result.error) {
          // using data-util.js utility function(s)
          var blob_download = exportFlacFile(encData, metaData)
          // var down_file = URL.createObjectURL(blob_download);
          // let file = document.createElement("a");
          // file.href = down_file;
          // file.download = "output.flac";
          // file.click()
          var reader = new FileReader()
          reader.readAsDataURL(blob_download)
          reader.onloadend = function () {
            var reader_string = reader.result.split('base64,')[1]
            voice_channel.push('voice_packets_sent', { stream: reader_string })
            voice_channel.on('voice_to_text_reply', data => {
              document
                .querySelector('#microphone')
                .classList.remove('voice-on')
              if (data.text.results != undefined) {
                vm.$emit('analytics_search_bar_voice_result', data.text.results[0].alternatives[0].transcript)
                vm.to_send = data.text.results[0].alternatives[0].transcript
              } else {
                toastr.error(
                  'We could not recognize your voice. Please try again or type in.'
                )
              }
            })
          }
        }
      }

      function encodeFlac (binData, recBuffers) {
        var ui8_data = new Uint8Array(binData)
        var sample_rate = 0,
          channels = 0,
          bps = 0,
          total_samples = 0,
          block_align,
          position = 0,
          recLength = 0,
          meta_data

        /**
         *  records/saves the output data of libflac-encode method
         */
        function write_callback_fn (buffer, bytes, samples, current_frame) {
          recBuffers.push(buffer)
          recLength += bytes
          // recLength += buffer.byteLength;
        }

        function metadata_callback_fn (data) {
          meta_data = data
        }

        // check: is file a compatible wav-file?
        if (wav_file_processing_check_wav_format(ui8_data) == false) {
          return { error: 'Wrong WAV file format', status: 0 }
        }

        // get WAV/PCM parameters from data / file
        var wav_parameters = wav_file_processing_read_parameters(ui8_data)
        var tot_samples = 0
        var compression_level = 5
        var flac_ok = 1
        var is_verify = true

        var flac_encoder = Flac.create_libflac_encoder(
          wav_parameters.sample_rate,
          wav_parameters.channels,
          wav_parameters.bps,
          compression_level,
          tot_samples,
          is_verify
        )
        if (flac_encoder != 0) {
          var init_status = Flac.init_encoder_stream(
            flac_encoder,
            write_callback_fn,
            metadata_callback_fn,
            0
          )
          flac_ok &= init_status == 0
        } else {
          var msg = 'Error initializing the decoder.'
          console.error(msg)
          return { error: msg, status: 1 }
        }

        // convert the PCM-Data to the appropriate format for the libflac library methods (32-bit array of samples)
        // creates a new array (32-bit) and stores the 16-bit data of the wav-file as 32-bit data
        var buffer_i32 = wav_file_processing_convert_16bitdata_to32bitdata(
          ui8_data.buffer
        )

        var flac_return = Flac.FLAC__stream_encoder_process_interleaved(
          flac_encoder,
          buffer_i32,
          buffer_i32.length / wav_parameters.channels
        )

        if (flac_return != true) {
          console.log(
            'Error: FLAC__stream_encoder_process_interleaved returned false. ' +
            flac_return
          )
        }

        flac_ok &= Flac.FLAC__stream_encoder_finish(flac_encoder)

        Flac.FLAC__stream_encoder_delete(flac_encoder)

        return { metaData: meta_data, status: flac_ok }
      }

      function wav_file_processing_check_wav_format (ui8_data) {
        // check: is file a compatible wav-file?
        if (
          ui8_data.length < 44 ||
          String.fromCharCode.apply(null, ui8_data.subarray(0, 4)) != 'RIFF' ||
          String.fromCharCode.apply(null, ui8_data.subarray(8, 16)) !=
          'WAVEfmt ' ||
          String.fromCharCode.apply(null, ui8_data.subarray(36, 40)) != 'data'
        ) {
          console.log('ERROR: wrong format for wav-file.')
          return false
        }
        return true
      }

      /**
       *  checks if the given ui8_data (ui8array) is of a flac-file
       */
      function flac_file_processing_check_flac_format (ui8_data) {
        // check: is file a compatible flac-file?
        if (
          ui8_data.length < 42 ||
          String.fromCharCode.apply(null, ui8_data.subarray(0, 4)) != 'fLaC'
        ) {
          console.log('ERROR: wrong format for flac-file.')
          return false
        }

        var view = new DataView(ui8_data.buffer)
        // check last 7 bits of 4th byte for meta-data BLOCK type: must be STREAMINFO (0)
        if ((view.getUint8(4) & 0x7f) != 0) {
          console.log('ERROR: wrong format for flac-file.')
          return false
        }

        return true
      }

      function wav_file_processing_read_parameters (ui8_data) {
        var sample_rate = 0,
          channels = 0,
          bps = 0,
          total_samples = 0,
          block_align

        // get WAV/PCM parameters from data / file
        sample_rate =
          (((((ui8_data[27] << 8) | ui8_data[26]) << 8) | ui8_data[25]) << 8) |
          ui8_data[24]
        channels = ui8_data[22]
        bps = ui8_data[34]
        block_align = ui8_data[32]
        total_samples =
          ((((((ui8_data[43] << 8) | ui8_data[42]) << 8) | ui8_data[41]) << 8) |
            ui8_data[40]) /
          block_align

        return {
          sample_rate: sample_rate,
          channels: channels,
          bps: bps,
          total_samples: total_samples,
          block_align: block_align
        }
      }

      /**
       *  converts the PCM data of the wav file (each sample stored as 16 bit value) into
       *  a format expected by the libflac-encoder method (each sample stored as 32 bit value in a 32-bit array)
       */
      function wav_file_processing_convert_16bitdata_to32bitdata (arraybuffer) {
        // convert the PCM-Data to the appropriate format for the libflac library methods (32-bit array of samples)
        // creates a new array (32-bit) and stores the 16-bit data of the wav-file as 32-bit data
        var ab_i16 = new DataView(arraybuffer, 44)
        var buf_length = ab_i16.byteLength
        var buf32_length = buf_length / 2
        var buffer_i32 = new Uint32Array(buf32_length)
        var view = new DataView(buffer_i32.buffer)
        var index = 0
        for (var j = 0; j < buf_length; j += 2) {
          view.setInt32(index, ab_i16.getInt16(j, true), true)
          index += 4
        }
        return buffer_i32
      }

      function exportFlacFile (recBuffers, metaData) {
        var recLength = getLength(recBuffers)
        if (metaData) {
          addFLACMetaData(recBuffers, metaData)
        }
        // convert buffers into one single buffer
        var samples = mergeBuffers(recBuffers, recLength)
        var the_blob = new Blob([samples])
        return the_blob
      }

      function getLength (recBuffers) {
        // get length
        var recLength = 0
        for (var i = recBuffers.length - 1; i >= 0; --i) {
          recLength += recBuffers[i].byteLength
        }
        return recLength
      }

      function addFLACMetaData (chunks, metadata) {
        var offset = 4
        var data = chunks[0] // 1st data chunk should contain FLAC identifier "fLaC"
        if (
          data.length < 4 ||
          String.fromCharCode.apply(null, data.subarray(0, 4)) != 'fLaC'
        ) {
          console.error(
            'Unknown data format: cannot add additional FLAC meta data to header'
          )
          return
        }

        // first chunk only contains the flac identifier string?
        if (data.length == 4) {
          data = chunks[1] // get 2nd data chunk which should contain STREAMINFO meta-data block (and probably more)
          offset = 0
        }

        var view = new DataView(data.buffer)

        // NOTE by default, the encoder writes a 2nd meta-data block (type VORBIS_COMMENT) with encoder/version info -> do not set "is last" to TRUE for first one
        //	// write "is last meta data block" & type STREAMINFO type (0) as little endian combined uint1 & uint7 -> uint8:
        //	var isLast = 1;//1 bit
        //	var streamInfoType = 0;//7 bit
        //	view.setUint8(0 + offset, isLast << 7 | streamInfoType, true);//8 bit

        // block-header: STREAMINFO type, block length -> already set

        // block-content: min_blocksize, min_blocksize -> already set

        // write min_framesize as little endian uint24:
        view.setUint8(8 + offset, metadata.min_framesize >> 16, true) // 24 bit
        view.setUint8(9 + offset, metadata.min_framesize >> 8, true) // 24 bit
        view.setUint8(10 + offset, metadata.min_framesize, true) // 24 bit

        // write max_framesize as little endian uint24:
        view.setUint8(11 + offset, metadata.max_framesize >> 16, true) // 24 bit
        view.setUint8(12 + offset, metadata.max_framesize >> 8, true) // 24 bit
        view.setUint8(13 + offset, metadata.max_framesize, true) // 24 bit

        // block-content: sampleRate, channels, bitsPerSample -> already set

        // write total_samples as little endian uint36:
        // TODO set last 4 bits to half of the value in index 17
        view.setUint8(18 + offset, metadata.total_samples >> 24, true) // 36 bit
        view.setUint8(19 + offset, metadata.total_samples >> 16, true) // 36 bit
        view.setUint8(20 + offset, metadata.total_samples >> 8, true) // 36 bit
        view.setUint8(21, metadata.total_samples, true) // 36 bit

        writeMd5(view, 22 + offset, metadata.md5sum) // 16 * 8 bit
      }

      function mergeBuffers (channelBuffer, recordingLength) {
        var result = new Uint8Array(recordingLength)
        var offset = 0
        var lng = channelBuffer.length
        for (var i = 0; i < lng; i++) {
          var buffer = channelBuffer[i]
          result.set(buffer, offset)
          offset += buffer.length
        }
        return result
      }

      function writeMd5 (view, offset, str) {
        var index
        for (var i = 0; i < str.length / 2; ++i) {
          index = i * 2
          view.setUint8(
            i + offset,
            parseInt(str.substring(index, index + 2), 16)
          )
        }
      }
    }
  }
}
