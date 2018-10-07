import fetch from '@/utils/fetch';

// export function login(username, password) {
//   return fetch({
//     url: 'login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   });
// }

export function login(username, password) {
  return fetch({
    url: '/static/data.json',
    method: 'get',
    data: {
      username,
      password
    }
  });
}

export function getInfo(token) {
  return fetch({
    url: '/user/getUserInfo',
    method: 'get'
  });
}

export function logout() {
  return fetch({
    url: '/static/logout.json',
    method: 'get'
  });
}



