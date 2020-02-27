export default {
    /*
     * Enter keycode
     */
    ...[
      'KC_BKSP',
    ].reduce((acc, code) => {
      acc[code] = true;
      return acc;
    }, {})
  };
  