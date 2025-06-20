export default [
  { label: 'KeyboardSettings', group: true },

  { label: 'Modifier Swapping', width: 'label' },

  {
    name: 'Toggle Ctl⇄GUI',
    code: 'CG_TOGG',
    title: 'Toggle swapping both Control and GUI keys',
    width: 1500
  },
  {
    name: 'Swap Ctl⇄GUI',
    code: 'CG_SWAP',
    title: 'Swap both Ctrl and GUI keys',
    width: 1500
  },
  {
    name: 'Unswap Ctl⇄GUI',
    code: 'CG_NORM',
    title: 'Unswap both Ctrl and GUI keys',
    width: 1500
  },

  { width: 250 },

  {
    name: 'Swap LCtl⇄LGUI',
    code: 'CG_LSWP',
    title: 'Swap Left Control and Left GUI',
    width: 1500
  },
  {
    name: 'Unswap LCtl⇄LGUI',
    code: 'CG_LNRM',
    title: 'Unswap Left Control and Left GUI',
    width: 1500
  },

  { width: 250 },

  {
    name: 'Swap RCtl⇄RGUI',
    code: 'CG_RSWP',
    title: 'Swap Right Control and Right GUI',
    width: 1500
  },
  {
    name: 'Unswap RCtl⇄RGUI',
    code: 'CG_RNRM',
    title: 'Unswap Right Control and Right GUI',
    width: 1500
  },

  { width: 0 },

  {
    name: 'Toggle Alt⇄GUI',
    code: 'AG_TOGG',
    title: 'Toggle swapping both Alt and GUI keys',
    width: 1500
  },
  {
    name: 'Swap Alt⇄GUI',
    code: 'AG_SWAP',
    title: 'Swap both Alt and GUI keys',
    width: 1500
  },
  {
    name: 'Unswap Alt⇄GUI',
    code: 'AG_NORM',
    title: 'Unswap both Alt and GUI keys',
    width: 1500
  },

  { width: 250 },

  {
    name: 'Swap LAlt⇄LGUI',
    code: 'AG_LSWP',
    title: 'Swap Left Alt and Left GUI',
    width: 1500
  },
  {
    name: 'Unswap LAlt⇄LGUI',
    code: 'AG_LNRM',
    title: 'Unswap Left Alt and Left GUI',
    width: 1500
  },

  { width: 250 },

  {
    name: 'Swap RAlt⇄RGUI',
    code: 'AG_RSWP',
    title: 'Swap Right Alt and Right GUI',
    width: 1500
  },
  {
    name: 'Unswap RAlt⇄RGUI',
    code: 'AG_RNRM',
    title: 'Unswap Right Alt and Right GUI',
    width: 1500
  },

  { label: 'Other Key Swapping', width: 'label' },

  {
    name: 'Toggle \\⇄Bspc',
    code: 'BS_TOGG',
    title: 'Toggle swapping Backslash and Backspace',
    width: 1500
  },
  {
    name: 'Swap \\⇄Bspc',
    code: 'BS_SWAP',
    title: 'Swap Backslash and Backspace',
    width: 1500
  },
  {
    name: 'Unswap \\⇄Bspc',
    code: 'BS_NORM',
    title: 'Unswap Backslash and Backspace',
    width: 1500
  },

  { width: 0 },

  { width: 1500 },
  {
    name: 'Swap `⇄Esc',
    code: 'GE_SWAP',
    title: 'Swap ` (grave) and Escape',
    width: 1500
  },
  {
    name: 'Unswap `⇄Esc',
    code: 'GE_NORM',
    title: 'Unswap ` (grave) and Escape',
    width: 1500
  },

  { label: 'Caps Lock Behavior', width: 'label' },

  {
    name: 'Toggle LCtl⇄Caps',
    code: 'CL_TOGG',
    title: 'Toggle swapping Left Control and Caps Lock',
    width: 1500
  },
  {
    name: 'Swap LCtl⇄Caps',
    code: 'CL_SWAP',
    title: 'Swap Left Control and Caps Lock',
    width: 1500
  },
  {
    name: 'Unswap LCtl⇄Caps',
    code: 'CL_NORM',
    title: 'Unswap Left Control and Caps Lock',
    width: 1500
  },

  { width: 250 },

  {
    name: 'Caps=LCtl',
    code: 'CL_CTRL',
    title: 'Treat Caps Lock as Left Control',
    width: 1500
  },

  { width: 0 },

  {
    name: 'Toggle Esc⇄Caps',
    code: 'EC_TOGG',
    title: 'Toggle swapping Escape and Caps Lock',
    width: 1500
  },
  {
    name: 'Swap Esc⇄Caps',
    code: 'EC_SWAP',
    title: 'Swap Escape and Caps Lock',
    width: 1500
  },
  {
    name: 'Unswap Esc⇄Caps',
    code: 'EC_NORM',
    title: 'Unswap Escape and Caps Lock',
    width: 1500
  },

  { width: 250 },

  {
    name: 'Caps≠LCtl',
    code: 'CL_CAPS',
    title: 'Stop treating Caps Lock as Left Control',
    width: 1500
  },

  { label: 'GUI Key Behavior (Windows/Command/Super)', width: 'label' },

  { name: 'Toggle GUI', code: 'GU_TOGG', title: 'Toggle the GUI keys' },
  { name: 'GUI On', code: 'GU_ON', title: 'Enable the GUI keys' },
  {
    name: 'GUI Off',
    code: 'GU_OFF',
    title: 'Disable the GUI keys (useful when gaming)'
  },

  { label: 'N-Key Rollover', width: 'label' },

  {
    name: 'Toggle NKRO',
    code: 'NK_TOGG',
    title: 'Turn NKRO on or off'
  },
  {
    name: 'NKRO On',
    code: 'NK_ON',
    title: 'Turn NKRO on'
  },
  {
    name: 'NKRO Off',
    code: 'NK_OFF',
    title: 'Turn NKRO off'
  }
];
