const menus = [
  {id: '0', name: '控制面板', path: '/', icon: 'fa fa-dashboard'},
  {
    id: 'system',
    icon: 'fa fa-gears',
    name: '系统设置',
    children: [
      {
        id: 'organization',
        name: '组织管理',
        icon: 'fa el-icon-menu',
        children: [
          {id: 'user', href: 'user', name: '用户管理', icon: 'fa fa-user-o'},
          {id: 'group', href: 'group', name: '组织管理', icon: 'fa el-icon-menu'},
          {id: 'role', href: 'role', name: '角色管理', icon: 'fa fa-user-circle-o'}/*,
          {id: 'job', href: 'job', name: '岗位管理', icon: 'fa fa-trophy'}*/
        ]
      },
      {
        id: 'setting',
        name: '系统设置',
        icon: 'fa el-icon-setting',
        children: [
          {id: 'menu', href: 'menu', name: '菜单管理', icon: 'fa fa-bars'}/*,
          {id: 'dictionary', href: 'dictionary', name: '数据字典', icon: 'fa fa-book'}*/
        ]
      }
    ]
  },
  {
    id: 'develop',
    icon: 'fa fa-code',
    name: '开发工具',
    children: [
      {id: 'genList', href: 'genList', name: '代码生成', icon: 'fa fa-code'}
    ]
  }
]
export default menus
