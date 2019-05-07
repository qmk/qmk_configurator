export default {
  /*
   * List of keycodes that should always be considered alphas
   */
  ... [
    'KC_P0'
  ].reduce((acc, code) => {
    acc[code] = true;
    return acc;
  }, {})
};
