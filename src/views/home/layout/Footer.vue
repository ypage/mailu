<template>
  <footer>
    <ul>
      <li>
        Copyright © 2014 - 2018 云飘世界 All Rights Reserved &nbsp;
        <a href="https://baidu.com" target="_blank">mailuyixie</a>
        <a href="http://smallhuhu.cn" target="_blank">如云漂泊</a>
        <a @click="$router.go('/resume')" target="_blank">about</a>
      </li>
    </ul>
  </footer>
</template>

<style lang="scss">
  footer {
    text-align: center;
    padding-top: 10px;
    height: 40px;
    background: #B2B2B2;

    ul {
      float: left;
      width: 100%;

      li {
        float: left;
        width: 100%;
        color: white;
        text-align: center;
        a {
          display: inline-block;
          padding-right: 10px;
          color: white;
          opacity: 0.8;
          font-size: 14px;
          color: black;
        }
      }
    }
  }
</style>
