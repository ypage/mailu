const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  id: state => state.user.id,
  user: state => state.user.user,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  routerItem: state => state.permission.routerItem
};
export default getters
