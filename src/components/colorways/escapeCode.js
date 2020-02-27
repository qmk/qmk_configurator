export default {
    /*
     * Enter keycode
     */
    ...[
      'KC_ESC',
    ].reduce((acc, code) => {
      acc[code] = true;
      return acc;
    }, {})
  };
  