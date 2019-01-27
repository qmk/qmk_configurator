export default [
  { label: 'Keyboard Settings', group: true },

  { label: 'Keyboard settings (persistent)', width: 'label' },

  {
    name: 'Swap LCtl/Caps',
    code: 'MAGIC_SWAP_CONTROL_CAPSLOCK',
    title: 'Swap Left Control and Caps Lock',
    width: 1500
  },
  {
    name: 'Caps>LCtl',
    code: 'MAGIC_CAPSLOCK_TO_CONTROL',
    title: 'Treat Caps Lock as Left Control',
    width: 1500
  },
  {
    name: 'Swap LAlt/LGUI',
    code: 'MAGIC_SWAP_LALT_LGUI',
    title: 'Swap Left Alt and Left GUI',
    width: 1500
  },
  {
    name: 'Swap RAlt/RGUI',
    code: 'MAGIC_SWAP_RALT_RGUI',
    title: 'Swap Right Alt and Right GUI',
    width: 1500
  },
  {
    name: 'Disable GUI',
    code: 'MAGIC_NO_GUI',
    title: 'Disable the GUI keys (useful when gaming)',
    width: 1500
  },
  {
    name: 'Swap ` with Esc',
    code: 'MAGIC_SWAP_GRAVE_ESC',
    title: 'Swap ` and Escape',
    width: 1500
  },
  {
    name: 'Swap \\ with Bksp',
    code: 'MAGIC_SWAP_BACKSLASH_BACKSPACE',
    title: 'Swap Backslash and Backspace',
    width: 1500
  },
  {
    name: 'NKRO On',
    code: 'MAGIC_HOST_NKRO',
    title: 'Force N-Key Rollover (NKRO) on',
    width: 1500
  },
  {
    name: 'Swap Alt/GUI',
    code: 'MAGIC_SWAP_ALT_GUI',
    title: 'Swap Alt and GUI on both sides (for macOS)',
    width: 1500
  },
  {
    width: 0
  },
  {
    name: 'Rev LCtl/Caps',
    code: 'MAGIC_UNSWAP_CONTROL_CAPSLOCK',
    title: 'Unswap Left Control and Caps Lock',
    width: 1500
  },
  {
    name: 'Rev Caps>LCtl',
    code: 'MAGIC_UNCAPSLOCK_TO_CONTROL',
    title: 'Stop treating Caps Lock as Left Control',
    width: 1500
  },
  {
    name: 'Rev LAlt/LGUI',
    code: 'MAGIC_UNSWAP_LALT_LGUI',
    title: 'Unswap Left Alt and Left GUI',
    width: 1500
  },
  {
    name: 'Rev RAlt/RGUI',
    code: 'MAGIC_UNSWAP_RALT_RGUI',
    title: 'Unswap Right Alt and Right GUI',
    width: 1500
  },
  {
    name: 'Enable GUI',
    code: 'MAGIC_UNNO_GUI',
    title: 'Enable the GUI keys',
    width: 1500
  },
  {
    name: 'Rev ` with Esc',
    code: 'MAGIC_UNSWAP_GRAVE_ESC',
    title: 'Unswap ` and Escape',
    width: 1500
  },
  {
    name: 'Rev \\ with Bksp',
    code: 'MAGIC_UNSWAP_BACKSLASH_BACKSPACE',
    title: 'Unswap Backslash and Backspace',
    width: 1500
  },
  {
    name: 'NKRO Off',
    code: 'MAGIC_UNHOST_NKRO',
    title: 'Force N-Key Rollover (NKRO) off',
    width: 1500
  },
  {
    name: 'Rev Alt/GUI',
    code: 'MAGIC_UNSWAP_ALT_GUI',
    title: 'Unswap Alt and GUI on both sides (for macOS)',
    width: 1500
  },
  {
    name: 'Togg NKRO',
    code: 'MAGIC_TOGGLE_NKRO',
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
    title: 'BL_TOGG - Turn the backlight on or off'
  },
  {
    name: 'BL Cycle',
    code: 'BL_STEP',
    title: 'BL_STEP - Cycle through backlight levels'
  },
  {
    name: 'BL On',
    code: 'BL_ON',
    title: 'Set the backlight to max brightness'
  },
  {
    name: 'BL Off',
    code: 'BL_OFF',
    title: 'Turn the backlight off'
  },
  {
    name: 'BL +',
    code: 'BL_INC',
    title: 'BL_INC - Increase the backlight level'
  },
  {
    name: 'BL -',
    code: 'BL_DEC',
    title: 'BL_DEC - Decrease the backlight level'
  },
  {
    name: 'BL Breath',
    code: 'BL_BRTG',
    title: 'Toggle backlight breathing'
  },

  { label: 'RGB Lighting settings', width: 'label' },

  {
    name: 'RGB Toggle',
    code: 'RGB_TOG',
    title: 'RGB_TOG - Toggle RGB lighting on or off'
  },
  { name: 'RGB Mode +', code: 'RGB_MOD', title: 'RGB_MOD - Next mode' },
  { name: 'RGB Mode -', code: 'RGB_RMOD', title: 'RGB_RMOD - Previous mode' },
  { name: 'Hue +', code: 'RGB_HUI', title: 'RGB_HUI - Increase hue' },
  { name: 'Hue -', code: 'RGB_HUD', title: 'RGB_HUD - Decrease hue' },
  { name: 'Sat +', code: 'RGB_SAI', title: 'RGB_SAI - Increase saturation' },
  { name: 'Sat -', code: 'RGB_SAD', title: 'RGB_SAD - Decrease saturation' },
  {
    name: 'Bright +',
    code: 'RGB_VAI',
    title: 'RGB_VAI - Increase value (brightness)'
  },
  {
    name: 'Bright -',
    code: 'RGB_VAD',
    title: 'RGB_VAD - Decrease value (brightness)'
  },
  {
    name: 'Effect +',
    code: 'RGB_SPI',
    title: 'RGB_SPI - Increase effect speed'
  },
  {
    name: 'Effect -',
    code: 'RGB_SPD',
    title: 'RGB_SPD - Decrease effect speed'
  },
  { name: 'RGB Mode P', code: 'RGB_M_P', title: 'RGB_M_P - RGB Mode: Plain' },
  {
    name: 'RGB Mode B',
    code: 'RGB_M_B',
    title: 'RGB_M_B - RGB Mode: Breathe'
  },
  {
    name: 'RGB Mode R',
    code: 'RGB_M_R',
    title: 'RGB_M_R - RGB Mode: Rainbow'
  },
  {
    name: 'RGB Mode SW',
    code: 'RGB_M_SW',
    title: 'RGB_M_SW - RGB Mode: Swirl'
  },
  {
    name: 'RGB Mode SN',
    code: 'RGB_M_SN',
    title: 'RGB_M_SN - RGB Mode: Snake'
  },
  {
    name: 'RGB Mode K',
    code: 'RGB_M_K',
    title: 'RGB_M_K - RGB Mode: Knight Rider'
  },
  {
    name: 'RGB Mode X',
    code: 'RGB_M_X',
    title: 'RGB_M_X - RGB Mode: Christmas'
  },
  {
    name: 'RGB Mode G',
    code: 'RGB_M_G',
    title: 'RGB_M_G - RGB Mode: Gradient'
  }
];
