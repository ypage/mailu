<template>
  <section class="menu">

    <section id="logo">
      <!-- <a class="logo" router-link="{name: 'home', exact: true}"><img src="../../../assets/mailuyx.png" style="width:auto;height:100%;z-index:999;opacity: 1!important;"></a> -->
      <router-link :to="'/home'"><img src="../../../assets/mailuyx.png" style="width:auto;height:100%;z-index:999;opacity: 1!important;"></router-link>
      <i class="fa fa-bars fa-2x" aria-hidden="true" @click='drop'></i>
    </section>
    <div class="drop">
      <nav class="left">
        <ul>
          <li v-for="menu in menus">
             <router-link :to="{path: menu.link}" active-class="activeRouter">{{menu.name}}</router-link> 
             <!-- <a v-link="{path: menu.link}">{{menu.name}}</a>    -->
          </li>
        </ul>
      </nav>
      <nav class="right" v-if="this.login === true">
        <ul>
          <li>
            <router-link :to="'/login'" id="duer-forum">登陆</router-link>
          </li>
          <li>
            <router-link :to="'/login'" id="duer-forum">注册</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<style lang="scss" >
section.menu {
  width: 100%;
  height: 45px; //  background-image: url(../assets/love.jpg) ;
  //  background-size:auto 100%; 
  //  opacity: 0.3;
  //  background-color: #0c0d0d;
  //  color: #b4b9b9;
  color: #D4584F;
  transition: all 0.3s ease-out;
  overflow: hidden;

  .activeRouter{
    color: #84e900 !important;
  }

  nav.left {
    padding: 0;
    width: 50%;
    float: left;
    padding-left: 40px;
  }

  nav.right {
    padding: 0;
    width: 50%;
    float: right;

    ul {
      float: right;

      li {
        float: left;

        a {
          color: #D4584F;
          opacity: 0.9;
        }

        a:hover {
          color: #02a388;
        }
      }
    }
  }

  li {
    display: inline-block;
    font-size: 1rem;
    line-height: 45px;
    padding: 0 30px;
    white-space: nowrap;

    a {
      transition: all 0.3s ease-out; //  color: #b4b9b9;
      color: black;
    }

    a:hover {
      color: green;
      width: 80px;
      background-image: url('../../../assets/select.png');
      background-size: 100% 100%;
    }
  }

  #logo {
    height: 0;
    margin: 0 auto;
    position: absolute;
    text-align: center;
    width: 100%;

    a {
      display: block;
      width: 200px;
      height: 45px;
      margin: 0 auto;
      position: relative;
      font-size: 26px;
      color: white;
      padding-top: 5px;
      transition: all 0.5s;

      span {
        margin: auto;
        display: block;
        font-size: 15px;
        color: white;
        opacity: 0.9;
        transition: all 0.5s;
      }
    }
    a.logo:hover {
      opacity: 0.5;
    }

    a.logo:hover span {
      opacity: 0.4;
    }

    i.fa-bars {
      display: none;
    }
  }
}

@media screen and(max-width: 968px) {
  section.menu {
    width: 100%;
    height: auto;
    transition: all 0.3s ease-out;

    #logo {
      position: relative;
      display: block;
      width: 100%;
      height: 45px;

      a {
        width: auto;
        display: inline-block;
        ;
        text-align: center;
      }

      i.fa-bars {
        display: inline-block;
        float: right;
        padding-top: 5px;
        padding-right: 20px;
        margin-left: -20px;
        cursor: pointer;
      }
    }

    .drop {
      position: relative; //  background-color: #B7B7B7;
      background-image: url('../../../assets/dropback.jpg');
      background-size: 968px 440px;
      width: 100%;
      height: 0px;
      overflow: hidden;
      -webkit-overflow-scrolling: touch;
      transition: height 0.5s ease;
      -webkit-transform: transition3d/translateZ;

      nav.left,
      nav.right {
        width: 100%;
        position: relative;

        ul {
          width: 100%;
          padding-top: 10px;
          margin: 0;

          li {
            display: block;
            width: 80px;
            height: 30px;
            padding: 0 0 0 10px;
            line-height: 30px;

            a {
              display: inline-block;
              width: 80px;
              height: 30px;
              padding-left: 10px;
            }

            &:hover {
              width: 80px; //  background-color: rgba(0, 0, 0, 0.5);
              background-image: url('../../../assets/select.png');
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
}

@media screen and(max-width: 420px) {
  section.menu>#logo {
    a.logo:hover {
      opacity: 1;
    }

    a.logo:hover span {
      opacity: 0.9;
    }
  }
}
</style>


<script>
// import { getToken, removeToken } from '../token'
export default {
  data() {
    return {
      menus: [
        {
          name: '简介',
          link: 'about'
        },
        {
          name: '活动',
          link: 'activities'
        },
        {
          name: '交流',
          link: 'chat'
        },
        {
          name: '会员',
          link: 'member'
        }
      ],
      login: true,
      drops: false
    }
  },
  computed: {
    // login () {
    //   return !getToken()
    // }
  },
  methods: {
    // logOut () {
    //   removeToken()
    //   this.$router.go('/login')
    // },
    drop () {
      const drop = document.querySelector('.drop')
      if (this.drops) {
        this.drops = false
        drop.style.height = '1px'
      } else {
        this.drops = true
        drop.style.height = '210px'
      }
    }
  },
  ready() {
  }
}
</script>
