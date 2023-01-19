<template>
  <div class="chat-inner">
    <div
      class="chat-row prompt"
      style="margin-right: 10px;margin-left: -5px;"
      v-for="(sub_response, index) in responses"
      :key="index"
    >
      <div
        style="width:69%;"
        v-for="(value,key) in sub_response"
        :key="key"
      >
        <div
          @click="sub_leaf_node_call"
          style="cursor:pointer;"
          class="chat"
          v-if="key==='Text'"
        >{{value}}</div>
      </div>
    </div>
    <div
      class="plyr__video-embed"
      id="player"
      v-if="show && demourlbind"
      style="ma"
    >
      <iframe
        :src="demourl[0]"
        allowfullscreen
        allowtransparency
        allow="autoplay"
      ></iframe>
    </div>
    <div
      class="plyr__video-embed"
      id="player"
      v-if="show && demourlbind"
      style="margin-top:10px "
    >
      <iframe
        :src="demourl[1]"
        allowfullscreen
        allowtransparency
        allow="autoplay"
      ></iframe>
    </div>
    <div
      class="plyr__video-embed"
      id="player"
      v-if="show && reviewsurlbind"
      style="ma;margin-top:10px "
    >
      <iframe
        :src="reviewsurl"
        allowfullscreen
        allowtransparency
        allow="autoplay"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vido-viewer',
  props: {
    responses: Array,
    demourlbind: Boolean,
    demourl: Array,
    show: Boolean,
    reviewsurlbind: Boolean,
    reviewsurl: Array
  },
  methods: {
    sub_leaf_node_call () {
      this.$emit('sub_leaf_node_call', event.target.innerText)
    }
  }
}
</script>

<style>
</style>
