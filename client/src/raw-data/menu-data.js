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
  },
  {
    id: 4,
    parent: 1,
    level: 2,
    text: '途经站管理',
    uri: '/station',
    icon: 'cog'
  },
  {
    id: 4,
    parent: 1,
    level: 2,
    text: '位置管理',
    uri: '/position',
    icon: 'tachometer'
  }, {
    id: 5,
    parent: 1,
    level: 2,
    text: '生成报表',
    uri: '/reports',
    icon: 'share'
  },
  {
    id: 6,
    parent: 1,
    level: 2,
    text: '员工管理',
    uri: '/usersManagement',
    icon: 'users'
  }
];
