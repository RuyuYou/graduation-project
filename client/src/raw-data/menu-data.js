export default [
  {
    id: 1,
    parent: 0,
    level: 1,
    text: '后台管理系统',
    uri: '/train-admin-web',
    icon: 'home'
  }, {
    id: 2,
    parent: 1,
    level: 2,
    text: '管理首页',
    uri: '/index',
    icon: 'home'
  }, {
    id: 3,
    parent: 1,
    level: 2,
    text: '车次管理',
    uri: '/train',
    icon: 'book'
  }, {
    id: 4,
    parent: 1,
    level: 2,
    text: '票务管理',
    uri: '/ticker',
    icon: 'tachometer'
  }, {
    id: 5,
    parent: 1,
    level: 2,
    text: '个人中心',
    uri: '/userCenter',
    icon: 'user-circle'
  },
  {
    id: 6,
    parent: 1,
    level: 2,
    text: '权限管理',
    uri: '/roleManagement',
    icon: 'cog'
  }
];
