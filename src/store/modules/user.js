import { login, logout, getInfo } from '@/api/login';
import Cookies from 'js-cookie';

const user = {
  state: {
    token: Cookies.get('Admin-Token'),
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    roles: [],
    id: 0,
    user: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_ID: (state, id) => {
      state.id = id;
    },
    SET_USER: (state, user) => {
      state.user = user;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          console.log(response)
          Cookies.set('Admin-Token', response.user.roleName);
          Cookies.set('username', response.user.username);
          Cookies.set('name', response.user.name);
          Cookies.set('id', response.user.memberId);
          commit('SET_TOKEN', response.user.roleName);
          commit('SET_NAME', response.user.username);
          commit('SET_ID', response.user.memberId);
          commit('SET_USER', response.user);
          resolve();
        }).catch(error => {
          console.log("error")
          reject(error);
        });
      });
    },

    // 设置role
    SetRoles({ commit }) {
      commit('SET_ROLES', user.state.token);
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          commit('SET_ROLES', user.state.token);
          console.log("user-getInfo-res:", user.state.token)
          // commit('SET_NAME', data.username);
          // commit('SET_AVATAR', data.avatar);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          Cookies.remove('Admin-Token');
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('Admin-Token');
        resolve();
      });
    }
  }
};

export default user;
