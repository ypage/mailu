<template>
  <div class="about-show">
    <a class="about-item">
       <div class="about-img">
        <img v-bind:src="abouts.url">
      </div> 
      <h5>{{abouts.title}}</h5>
    </a>
  </div>
  </div>
</template>

<style lang="scss">
.about-show {
  width: 100%;
  height: 305px;
  background-color: white;
  margin-bottom: 20px; // padding: 8px;//图片展示图片与边框之间的宽度
  text-align: center;


  a.about-item {
    width: 100%;
    height: 305px;
    display: block;
    z-index: 1;
  }

  h5 {
    color: black;
    padding: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .about-img {
    height: 85%;
    overflow: hidden;
    transition: all 0.25s ease-out;

    img {
      width: 100%;
      height: 100%;
      transition: all 0.25s ease-out;
      transform: scale(1.1);
      background-size: cover;
    }
  }
}

@media screen and (max-width: 420px) {
  .about-show {
    a.about-id:hover span {
      color: #02a388;
    }

    .about-item:hover img {
      width: 100%;
      height: 100%;
      opacity: 1;
    }
  }
}
</style>



<script>
import $ from 'jquery'

export default {
  props: ['abouts']
}
</script>
