export default [
  { label: 'Lighting', group: true },

  { label: 'Backlight (single color)', width: 'label' },

  {
    name: 'Toggle BL',
    code: 'BL_TOGG',
    title: 'Turn backlight on and off'
  },
  {
    name: 'BL On',
    code: 'BL_ON',
    title: 'Turn backlight on'
  },
  {
    name: 'BL Cycle',
    code: 'BL_STEP',
    title: 'Cycle through brightness levels'
  },
  {
    name: 'Bright ⏶',
    code: 'BL_UP',
    title: 'Increase backlight brightness'
  },

  { width: 0 },

  { width: 1000 },
  {
    name: 'BL Off',
    code: 'BL_OFF',
    title: 'Turn backlight off'
  },
  {
    name: 'BL Breath',
    code: 'BL_BRTG',
    title: 'Toggle backlight breathing'
  },
  {
    name: 'Bright ⏷',
    code: 'BL_DOWN',
    title: 'Decrease backlight brightness'
  },

  { label: 'LED Matrix (single color)', width: 'label' },

  {
    name: 'Toggle LM',
    code: 'LM_TOGG',
    title: 'Turn LED Matrix on and off'
  },
  { name: 'LM On', code: 'LM_ON', title: 'Turn LED Matrix on' },
  { name: 'Mode ⏵', code: 'LM_NEXT', title: 'Next LED Matrix animation' },
  { name: 'Bright ⏶', code: 'LM_VALU', title: 'Increase brightness' },
  { name: 'Speed ⏶', code: 'LM_SPDU', title: 'Increase animation speed' },

  { width: 0 },

  { width: 1000 },
  { name: 'LM Off', code: 'LM_OFF', title: 'Turn LED Matrix off' },
  { name: 'Mode ⏴', code: 'LM_PREV', title: 'Previous LED Matrix animation' },
  { name: 'Bright ⏷', code: 'LM_VALD', title: 'Decrease brightness' },
  { name: 'Speed ⏷', code: 'LM_SPDD', title: 'Decrease animation speed' },

  { label: 'RGB Underglow', width: 'label' },

  {
    name: 'Toggle UG',
    code: 'UG_TOGG',
    title: 'Turn RGB Underglow on and off'
  },
  { name: 'Mode ⏵', code: 'UG_NEXT', title: 'Next Underglow animation' },
  { name: 'Hue ⏶', code: 'UG_HUEU', title: 'Increase hue' },
  { name: 'Sat ⏶', code: 'UG_SATU', title: 'Increase saturation' },
  { name: 'Bright ⏶', code: 'UG_VALU', title: 'Increase value (brightness)' },
  { name: 'Speed ⏶', code: 'UG_SPDU', title: 'Increase animation speed' },

  { width: 0 },

  { width: 1000 },
  { name: 'Mode ⏴', code: 'UG_PREV', title: 'Previous Underglow animation' },
  { name: 'Hue ⏷', code: 'UG_HUED', title: 'Decrease hue' },
  { name: 'Sat ⏷', code: 'UG_SATD', title: 'Decrease saturation' },
  { name: 'Bright ⏷', code: 'UG_VALD', title: 'Decrease value (brightness)' },
  { name: 'Speed ⏷', code: 'UG_SPDD', title: 'Decrease animation speed' },

  { label: 'RGB Matrix', width: 'label' },

  {
    name: 'Toggle RM',
    code: 'RM_TOGG',
    title: 'Turn RGB Matrix on and off'
  },
  { name: 'RM On', code: 'RM_ON', title: 'Turn RGB Matrix on' },
  { name: 'Mode ⏵', code: 'RM_NEXT', title: 'Next RGB Matrix animation' },
  { name: 'Hue ⏶', code: 'RM_HUEU', title: 'Increase hue' },
  { name: 'Sat ⏶', code: 'RM_SATU', title: 'Increase saturation' },
  { name: 'Bright ⏶', code: 'RM_VALU', title: 'Increase value (brightness)' },
  { name: 'Speed ⏶', code: 'RM_SPDU', title: 'Increase animation speed' },

  { width: 0 },

  { width: 1000 },
  { name: 'RM Off', code: 'RM_OFF', title: 'Turn RGB Matrix off' },
  { name: 'Mode ⏴', code: 'RM_PREV', title: 'Previous RGB Matrix animation' },
  { name: 'Hue ⏷', code: 'RM_HUED', title: 'Decrease hue' },
  { name: 'Sat ⏷', code: 'RM_SATD', title: 'Decrease saturation' },
  { name: 'Bright ⏷', code: 'RM_VALD', title: 'Decrease value (brightness)' },
  { name: 'Speed ⏷', code: 'RM_SPDD', title: 'Decrease animation speed' }
];
