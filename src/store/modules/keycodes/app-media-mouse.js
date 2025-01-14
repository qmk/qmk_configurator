export default [
  { label: 'AppMediaMouse', width: 'label', group: true },

  { label: 'Application', width: 'label' },

  { name: 'Power', code: 'KC_PWR', title: 'System Power Down' },
  { name: 'Sleep', code: 'KC_SLEP', title: 'System Sleep' },
  { name: 'Wake', code: 'KC_WAKE', title: 'System Wake' },
  { width: 1250 },
  { name: 'Exec', code: 'KC_EXEC', title: 'Execute' },
  { name: 'Help', code: 'KC_HELP', title: 'Help' },
  {
    name: 'Menu (Legacy)',
    code: 'KC_MENU',
    title: 'Menu (Legacy)',
    width: 1250
  },
  { name: 'Select', code: 'KC_SLCT', title: 'Select' },
  { name: 'Stop', code: 'KC_STOP', title: 'Stop' },
  { name: 'Again', code: 'KC_AGIN', title: 'Again' },
  { name: 'Undo', code: 'KC_UNDO', title: 'Undo' },
  { name: 'Cut', code: 'KC_CUT', title: 'Cut' },
  { name: 'Copy', code: 'KC_COPY', title: 'Copy' },
  { name: 'Paste', code: 'KC_PSTE', title: 'Paste' },
  { name: 'Find', code: 'KC_FIND', title: 'Find' },
  { width: 0 },
  {
    name: 'Calc',
    code: 'KC_CALC',
    title: 'Launch Calculator (Windows)'
  },
  {
    name: 'Mail',
    code: 'KC_MAIL',
    title: 'Launch Mail (Windows)'
  },
  {
    name: 'Media Player',
    code: 'KC_MSEL',
    title: 'Launch Media Player (Windows)'
  },
  {
    name: 'My PC',
    code: 'KC_MYCM',
    title: 'Launch My Computer (Windows)'
  },
  { width: 250 },
  {
    name: 'Browser Search',
    code: 'KC_WSCH',
    title: 'Browser Search (Windows)',
    width: 1500
  },
  {
    name: 'Browser Home',
    code: 'KC_WHOM',
    title: 'Browser Home (Windows)',
    width: 1500
  },
  {
    name: 'Browser Back',
    code: 'KC_WBAK',
    title: 'Browser Back (Windows)',
    width: 1500
  },
  {
    name: 'Browser Forward',
    code: 'KC_WFWD',
    title: 'Browser Forward (Windows)',
    width: 1500
  },
  {
    name: 'Browser Stop',
    code: 'KC_WSTP',
    title: 'Browser Stop (Windows)',
    width: 1500
  },
  {
    name: 'Browser Refresh',
    code: 'KC_WREF',
    title: 'Browser Refresh (Windows)',
    width: 1500
  },
  {
    name: 'Browser Favorites',
    code: 'KC_WFAV',
    title: 'Browser Favorites (Windows)',
    width: 1500
  },
  {
    name: 'Brightness Up',
    code: 'KC_BRIU',
    title: 'Increase the brightness of screen (Laptop)',
    width: 1500
  },
  {
    name: 'Brightness Down',
    code: 'KC_BRID',
    title: 'Decrease the brightness of screen (Laptop)',
    width: 1500
  },

  { label: 'Multimedia Keys', width: 'label' },

  { name: 'Prev', code: 'KC_MPRV', title: 'Previous Track' },
  { name: 'Next', code: 'KC_MNXT', title: 'Next Track' },
  { name: 'Mute', code: 'KC_MUTE', title: 'Mute Audio' },
  { name: 'Vol ⏷', code: 'KC_VOLD', title: 'Volume Down' },
  { name: 'Vol ⏶', code: 'KC_VOLU', title: 'Volume Up' },
  { name: 'Media Stop', code: 'KC_MSTP', title: 'Media Stop' },
  { name: 'Play', code: 'KC_MPLY', title: 'Play/Pause' },
  { width: 250 },
  {
    name: 'Rewind',
    code: 'KC_MRWD',
    title: 'Previous Track / Rewind (macOS)'
  },
  {
    name: 'FFwd',
    code: 'KC_MFFD',
    title: 'Next Track / Fast Forward (macOS)'
  },
  { width: 250 },
  { name: 'Eject', code: 'KC_EJCT', title: 'Eject (macOS)' },

  { label: 'Mouse Keys', width: 'label' },

  { name: 'Mouse ⏶', code: 'MS_UP', title: 'Mouse Cursor Up' },
  { name: 'Mouse ⏷', code: 'MS_DOWN', title: 'Mouse Cursor Down' },
  { name: 'Mouse ⏴', code: 'MS_LEFT', title: 'Mouse Cursor Left' },
  { name: 'Mouse ⏵', code: 'MS_RGHT', title: 'Mouse Cursor Right' },
  { width: 250 },
  { name: 'Mouse 1', code: 'MS_BTN1', title: 'Mouse Button 1' },
  { name: 'Mouse 2', code: 'MS_BTN2', title: 'Mouse Button 2' },
  { name: 'Mouse 3', code: 'MS_BTN3', title: 'Mouse Button 3' },
  { name: 'Mouse 4', code: 'MS_BTN4', title: 'Mouse Button 4' },
  { name: 'Mouse 5', code: 'MS_BTN5', title: 'Mouse Button 5' },
  { name: 'Mouse 6', code: 'MS_BTN6', title: 'Mouse Button 6' },
  { name: 'Mouse 7', code: 'MS_BTN7', title: 'Mouse Button 7' },
  { name: 'Mouse 8', code: 'MS_BTN8', title: 'Mouse Button 8' },
  { width: 0 },
  { name: 'Mouse Whl ⏶', code: 'MS_WHLU', title: 'Mouse Wheel Up' },
  { name: 'Mouse Whl ⏷', code: 'MS_WHLD', title: 'Mouse Wheel Down' },
  { name: 'Mouse Whl ⏴', code: 'MS_WHLL', title: 'Mouse Wheel Left' },
  { name: 'Mouse Whl ⏵', code: 'MS_WHLR', title: 'Mouse Wheel Right' },
  { width: 250 },
  {
    name: 'Mouse Accel 0',
    code: 'MS_ACL0',
    title: 'Set mouse acceleration to 0'
  },
  {
    name: 'Mouse Accel 1',
    code: 'MS_ACL1',
    title: 'Set mouse acceleration to 1'
  },
  {
    name: 'Mouse Accel 2',
    code: 'MS_ACL2',
    title: 'Set mouse acceleration to 2'
  },

  { label: 'Extra Fn Keys', width: 'label' },

  { name: 'F13', code: 'KC_F13' },
  { name: 'F14', code: 'KC_F14' },
  { name: 'F15', code: 'KC_F15' },
  { name: 'F16', code: 'KC_F16' },
  { width: 250 },
  { name: 'F17', code: 'KC_F17' },
  { name: 'F18', code: 'KC_F18' },
  { name: 'F19', code: 'KC_F19' },
  { name: 'F20', code: 'KC_F20' },
  { width: 250 },
  { name: 'F21', code: 'KC_F21' },
  { name: 'F22', code: 'KC_F22' },
  { name: 'F23', code: 'KC_F23' },
  { name: 'F24', code: 'KC_F24' },

  { label: 'Mechanically Locking Keys', width: 'label' },

  {
    name: 'Lock. Caps Lock',
    code: 'KC_LCAP',
    title: 'Locking Caps Lock',
    width: 1750
  },
  {
    name: 'Lock. Num Lock',
    code: 'KC_LNUM',
    title: 'Locking Num Lock',
    width: 1750
  },
  {
    name: 'Lock. Scroll Lock',
    code: 'KC_LSCR',
    title: 'Locking Scroll Lock',
    width: 1750
  }
];
