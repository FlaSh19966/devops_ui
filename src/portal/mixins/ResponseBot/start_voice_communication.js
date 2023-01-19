export default {
  methods: {
    voice_communication () {
      if (/Chromium/i.test(navigator.userAgent)) {
        this.call_cloud_api();
      } else if (window.SpeechRecognition != undefined) {
        this.recognition = new window.SpeechRecognition();
        document.querySelector("#microphone").classList.add("voice-on");
        this.recognition.onresult = e => {
          const speechToText = e.results[0][0].transcript;
        };
        this.recognition.onend = function () {
          document.querySelector("#microphone").classList.remove("voice-on");
          //Again – give the user feedback that you are not listening anymore. If you wish to achieve continuous recognition – you can write a script to start the recognizer again here.
        };
        var vm = this;
        this.recognition.onresult = function (event) {
          if (typeof event.results === "undefined") {
            //Something is wrong…
            this.recognition.stop();
            return;
          }
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              //Final results
              vm.$emit('analytics_search_bar_voice_result', event.results[i][0].transcript )
              vm.to_send = event.results[i][0].transcript;
              console.log("final results: " + event.results[i][0].transcript); //Of course – here is the place to do useful things with the results.
            } else {
              //i.e. interim...
              console.log("interim results: " + event.results[i][0].transcript); //You can use these results to give the user near real time experience.
            }
          } //end for loop
        };
        this.recognition.start();
      } else {
        this.call_cloud_api();
      }
    },
  },
}
