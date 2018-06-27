const menus = [
  {id: '0', label: '控制面板', path: '/', icon: 'fa fa-dashboard'},
  {
    id: 'system',
    icon: 'fa fa-gears',
    label: '系统设置',
    submenu: [
      {
        id: 'organization',
        label: '组织管理',
        icon: 'fa el-icon-menu',
        submenu: [
          {id: 'user', name: 'user', label: '用户管理', icon: 'fa fa-user-o'},
          {id: 'group', name: 'group', label: '组织管理', icon: 'fa el-icon-menu'},
          {id: 'role', name: 'role', label: '角色管理', icon: 'fa fa-user-circle-o'},
          {id: 'job', name: 'job', label: '岗位管理', icon: 'fa fa-trophy'}
        ]
      },
      {
        id: 'setting',
        label: '系统设置',
        icon: 'fa el-icon-setting',
        submenu: [
          {id: 'menu', name: 'menu', label: '菜单管理', icon: 'fa fa-bars'},
          {id: 'dictionary', name: 'dictionary', label: '数据字典', icon: 'fa fa-book'}
        ]
      }
    ]
  },
  {
    id: 'develop',
    icon: 'fa fa-code',
    label: '开发工具',
    submenu: [
      {id: 'genList', name: 'genList', label: '代码生成', icon: 'fa fa-code'}
    ]
  }
]
export default menus
