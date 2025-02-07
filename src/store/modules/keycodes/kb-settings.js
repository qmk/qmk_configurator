export default [
  { label: 'KeyboardSettings', group: true },

  { label: 'Keyboard settings (persistent)', width: 'label' },

  {
    name: 'Swap LCtl⇄Caps',
    code: 'CL_SWAP',
    title: 'Swap Left Control and Caps Lock',
    width: 1500
  },
  {
    name: 'Caps=LCtl',
    code: 'CL_CTRL',
    title: 'Treat Caps Lock as Left Control',
    width: 1500
  },
  {
    name: 'Swap LCtl⇄LGUI',
    code: 'CG_LSWP',
    title: 'Swap Left Control and GUI',
    width: 1500
  },
  {
    name: 'Swap RCtl⇄RGUI',
    code: 'CG_RSWP',
    title: 'Swap Right Control and GUI',
    width: 1500
  },
  {
    name: 'Swap LAlt⇄LGUI',
    code: 'AG_LSWP',
    title: 'Swap Left Alt and Left GUI',
    width: 1500
  },
  {
    name: 'Swap RAlt⇄RGUI',
    code: 'AG_RSWP',
    title: 'Swap Right Alt and Right GUI',
    width: 1500
  },
  {
    name: 'Disable GUI',
    code: 'GU_OFF',
    title: 'Disable the GUI keys (useful when gaming)',
    width: 1500
  },
  {
    name: 'Swap `⇄Esc',
    code: 'GE_SWAP',
    title: 'Swap ` and Escape',
    width: 1500
  },
  {
    name: 'Swap \\⇄Bspc',
    code: 'BS_SWAP',
    title: 'Swap Backslash and Backspace',
    width: 1500
  },
  {
    name: 'NKRO On',
    code: 'NK_ON',
    title: 'Force N-Key Rollover (NKRO) on',
    width: 1500
  },
  {
    name: 'Swap Alt⇄GUI',
    code: 'AG_SWAP',
    title: 'Swap Alt and GUI on both sides (for macOS)',
    width: 1500
  },
  {
    name: 'Swap Ctl⇄GUI',
    code: 'CG_SWAP',
    title: 'Swap Ctrl and GUI on both sides (for macOS)',
    width: 1500
  },
  {
    width: 0
  },
  {
    name: 'Unswap LCtl⇄Caps',
    code: 'CL_NORM',
    title: 'Unswap Left Control and Caps Lock',
    width: 1500
  },
  {
    name: 'Caps≠LCtl',
    code: 'CL_CAPS',
    title: 'Stop treating Caps Lock as Left Control',
    width: 1500
  },
  {
    name: 'Unswap LCtl⇄LGUI',
    code: 'CG_LNRM',
    title: 'Unswap Left Control and GUI',
    width: 1500
  },
  {
    name: 'Unswap RCtl⇄RGUI',
    code: 'CG_RNRM',
    title: 'Unswap Right Control and GUI',
    width: 1500
  },
  {
    name: 'Unswap LAlt⇄LGUI',
    code: 'AG_LNRM',
    title: 'Unswap Left Alt and Left GUI',
    width: 1500
  },
  {
    name: 'Unswap RAlt⇄RGUI',
    code: 'AG_RNRM',
    title: 'Unswap Right Alt and Right GUI',
    width: 1500
  },
  {
    name: 'Enable GUI',
    code: 'GU_ON',
    title: 'Enable the GUI keys',
    width: 1500
  },
  {
    name: 'Unswap `⇄Esc',
    code: 'GE_NORM',
    title: 'Unswap ` and Escape',
    width: 1500
  },
  {
    name: 'Unswap \\⇄Bspc',
    code: 'BS_NORM',
    title: 'Unswap Backslash and Backspace',
    width: 1500
  },
  {
    name: 'NKRO Off',
    code: 'NK_OFF',
    title: 'Force N-Key Rollover (NKRO) off',
    width: 1500
  },
  {
    name: 'Unswap Alt⇄GUI',
    code: 'AG_NORM',
    title: 'Unswap Alt and GUI on both sides (for macOS)',
    width: 1500
  },
  {
    name: 'Unswap Ctl⇄GUI',
    code: 'CG_NORM',
    title: 'Unswap Ctrl and GUI on both sides',
    width: 1500
  },
  {
    name: 'Toggle NKRO',
    code: 'NK_TOGG',
    title: 'Turn NKRO on or off',
    width: 1500
  },

  {
    label: 'Backlight settings',
    width: 'label'
  },

  {
    name: 'BL Toggle',
    code: 'BL_TOGG',
    title: 'Turn the backlight on or off'
  },
  {
    name: 'BL Cycle',
    code: 'BL_STEP',
    title: 'Cycle through backlight levels'
  },
  {
    name: 'BL Breath',
    code: 'BL_BRTG',
    title: 'Toggle backlight breathing'
  },
  {
    name: 'BL On',
    code: 'BL_ON',
    title: 'Set the backlight to max brightness'
  },
  {
    name: 'BL ⏶',
    code: 'BL_UP',
    title: 'Increase the backlight level'
  },
  { width: 0 },
  { width: 3000 },
  {
    name: 'BL Off',
    code: 'BL_OFF',
    title: 'Turn the backlight off'
  },
  {
    name: 'BL ⏷',
    code: 'BL_DOWN',
    title: 'Decrease the backlight level'
  },

  { label: 'RGB Lighting settings', width: 'label' },

  {
    name: 'RGB Toggle',
    code: 'RGB_TOG',
    title: 'Toggle RGB lighting on or off'
  },
  { name: 'RGB Mode ⏵', code: 'RGB_MOD', title: 'Next RGB mode' },
  { name: 'Hue ⏶', code: 'RGB_HUI', title: 'Increase hue' },
  { name: 'Sat ⏶', code: 'RGB_SAI', title: 'Increase saturation' },
  { name: 'Bright ⏶', code: 'RGB_VAI', title: 'Increase value' },
  { name: 'Speed ⏶', code: 'RGB_SPI', title: 'Increase RGB effect speed' },
  { name: 'RGB Mode P', code: 'RGB_M_P', title: 'RGB Mode: Plain' },
  { name: 'RGB Mode B', code: 'RGB_M_B', title: 'RGB Mode: Breathe' },
  { name: 'RGB Mode R', code: 'RGB_M_R', title: 'RGB Mode: Rainbow' },
  { name: 'RGB Mode SW', code: 'RGB_M_SW', title: 'RGB Mode: Swirl' },
  { name: 'RGB Mode SN', code: 'RGB_M_SN', title: 'RGB Mode: Snake' },
  { name: 'RGB Mode K', code: 'RGB_M_K', title: 'RGB Mode: Knight Rider' },
  { name: 'RGB Mode X', code: 'RGB_M_X', title: 'RGB Mode: Christmas' },
  { name: 'RGB Mode G', code: 'RGB_M_G', title: 'RGB Mode: Gradient' },
  { name: 'RGB Mode T', code: 'RGB_M_T', title: 'RGB Mode: Test' },
  { width: 0 },
  { width: 1000 },
  { name: 'RGB Mode ⏴', code: 'RGB_RMOD', title: 'Previous RGB mode' },
  { name: 'Hue ⏷', code: 'RGB_HUD', title: 'Decrease hue' },
  { name: 'Sat ⏷', code: 'RGB_SAD', title: 'Decrease saturation' },
  { name: 'Bright ⏷', code: 'RGB_VAD', title: 'Decrease value' },
  { name: 'Speed ⏷', code: 'RGB_SPD', title: 'Decrease RGB effect speed' }
];
