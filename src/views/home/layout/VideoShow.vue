<template>
  <div class="d-video">
    <video
      v-on:mouseover="start($event)"
      v-on:mouseout="stop($event)"
      height="180"
      v-bind:src="video.url"
      v-bind:poster="video.img">
    </video>
    <i class="fa  fa-file-video-o fa-2x"></i>
  </div>
</template>

<style lang="scss">
  .d-video {
    width: 100%;
    height: 180px;
    cursor: pointer;

    i {
      position: absolute;;
      top: 5px;
      left: 20px;
      color: white;
      z-index: 999;
    }
  }
</style>

<script>
  export default {
    props: ['video'],
    methods: {
      start (e) {
        // this.$el.childNodes[1].play()
        // this.$el.childNodes[1].setAttribute('controls', 'controls')
        e.target.play();
        e.target.controls = true;
      },
      stop (e) {
        e.target.pause();
        e.target.controls = false;
        // this.$el.childNodes[1].pause()
        // this.$el.childNodes[1].removeAttribute('controls')
      }
    }
  }

</script>
