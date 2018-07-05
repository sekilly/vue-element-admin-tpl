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
  }/*,
  ['Form 表单', [
    {id: 'f1', name: 'c-button', label: 'Button 按钮', icon: 'fa fa-hand-o-up'},
    {id: 'f2', name: 'c-switch', label: 'Switch 开关', icon: 'fa fa-square-o'},
    {id: 'f3', name: 'c-checkbox', label: 'Checkbox 多选框', icon: 'fa fa-check-square'},
    // {id: 'f4', label: 'Radio 单选框', icon: 'fa fa-dot-circle-o'},
    {id: 'f5', name: 'c-input', label: 'Input 输入框', icon: 'fa fa-pencil'},
    {id: 'f6', name: 'c-keyboard', label: '虚拟键盘', icon: 'fa fa-keyboard-o'}
  ]],
  ['Notice', [
    {id: 'n1', name: 'c-alert', label: 'Alert 警告', icon: 'fa fa-info'},
    {id: 'n2', name: 'c-loading', label: 'Loading 加载', icon: 'fa fa-circle-o-notch'}
  ]],
  ['Other', [
    {id: 'c-dropdown', name: 'c-dropdown', label: 'Dropdown'},
    {id: 'c-navbar', name: 'c-navbar', label: 'Navbar'},
    {id: 'c-container', name: 'c-container', label: '栅格布局'}
  ]]*/
]
export default menus
