export default {
    /*
     * Enter keycode
     */
    ...[
      'KC_ENT',
    ].reduce((acc, code) => {
      acc[code] = true;
      return acc;
    }, {})
  };
