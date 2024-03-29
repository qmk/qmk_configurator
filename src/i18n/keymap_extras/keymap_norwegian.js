/* Copyright 2022 - Generated by convert_keymap_extras_header.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

export default {
  /*
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │ | │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 0 │ + │ \ │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │ Å │ ¨ │     │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┐    │
   * │      │ A │ S │ D │ F │ G │ H │ J │ K │ L │ Ø │ Æ │ ' │    │
   * ├────┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┴────┤
   * │    │ < │ Z │ X │ C │ V │ B │ N │ M │ , │ . │ - │          │
   * ├────┼───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  KC_GRV: { name: '§\n|', title: 'NO_PIPE' },
  KC_1: { name: '!\n1', title: 'NO_1' },
  KC_2: { name: '"\n2', title: 'NO_2' },
  KC_3: { name: '#\n3', title: 'NO_3' },
  KC_4: { name: '¤\n4', title: 'NO_4' },
  KC_5: { name: '%\n5', title: 'NO_5' },
  KC_6: { name: '&\n6', title: 'NO_6' },
  KC_7: { name: '/\n7', title: 'NO_7' },
  KC_8: { name: '(\n8', title: 'NO_8' },
  KC_9: { name: ')\n9', title: 'NO_9' },
  KC_0: { name: '=\n0', title: 'NO_0' },
  KC_MINS: { name: '?\n+', title: 'NO_PLUS' },
  KC_EQL: { name: '`\n\\', title: 'NO_BSLS' },
  // Row 2
  KC_Q: { name: 'Q', title: 'NO_Q' },
  KC_W: { name: 'W', title: 'NO_W' },
  KC_E: { name: 'E', title: 'NO_E' },
  KC_R: { name: 'R', title: 'NO_R' },
  KC_T: { name: 'T', title: 'NO_T' },
  KC_Y: { name: 'Y', title: 'NO_Y' },
  KC_U: { name: 'U', title: 'NO_U' },
  KC_I: { name: 'I', title: 'NO_I' },
  KC_O: { name: 'O', title: 'NO_O' },
  KC_P: { name: 'P', title: 'NO_P' },
  KC_LBRC: { name: 'Å', title: 'NO_ARNG' },
  KC_RBRC: { name: '^\n¨', title: 'NO_DIAE (dead)' },
  // Row 3
  KC_A: { name: 'A', title: 'NO_A' },
  KC_S: { name: 'S', title: 'NO_S' },
  KC_D: { name: 'D', title: 'NO_D' },
  KC_F: { name: 'F', title: 'NO_F' },
  KC_G: { name: 'G', title: 'NO_G' },
  KC_H: { name: 'H', title: 'NO_H' },
  KC_J: { name: 'J', title: 'NO_J' },
  KC_K: { name: 'K', title: 'NO_K' },
  KC_L: { name: 'L', title: 'NO_L' },
  KC_SCLN: { name: 'Ø', title: 'NO_OSTR' },
  KC_QUOT: { name: 'Æ', title: 'NO_AE' },
  KC_NUHS: { name: "*\n'", title: 'NO_QUOT' },
  // Row 4
  KC_NUBS: { name: '>\n<', title: 'NO_LABK' },
  KC_Z: { name: 'Z', title: 'NO_Z' },
  KC_X: { name: 'X', title: 'NO_X' },
  KC_C: { name: 'C', title: 'NO_C' },
  KC_V: { name: 'V', title: 'NO_V' },
  KC_B: { name: 'B', title: 'NO_B' },
  KC_N: { name: 'N', title: 'NO_N' },
  KC_M: { name: 'M', title: 'NO_M' },
  KC_COMM: { name: ';\n,', title: 'NO_COMM' },
  KC_DOT: { name: ':\n.', title: 'NO_DOT' },
  KC_SLSH: { name: '_\n-', title: 'NO_MINS' },

  /* Shifted symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │ § │ ! │ " │ # │ ¤ │ % │ & │ / │ ( │ ) │ = │ ? │ ` │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │   │   │   │   │   │   │   │   │   │   │   │ ^ │     │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┐    │
   * │      │   │   │   │   │   │   │   │   │   │   │   │ * │    │
   * ├────┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┴────┤
   * │    │ > │   │   │   │   │   │   │   │ ; │ : │ _ │          │
   * ├────┼───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  'S(KC_GRV)': { name: '§', title: 'NO_SECT' },
  KC_TILD: { name: '§', title: 'NO_SECT' },
  'S(KC_1)': { name: '!', title: 'NO_EXLM' },
  KC_EXLM: { name: '!', title: 'NO_EXLM' },
  'S(KC_2)': { name: '"', title: 'NO_DQUO' },
  KC_AT: { name: '"', title: 'NO_DQUO' },
  'S(KC_3)': { name: '#', title: 'NO_HASH' },
  KC_HASH: { name: '#', title: 'NO_HASH' },
  'S(KC_4)': { name: '¤', title: 'NO_CURR' },
  KC_DLR: { name: '¤', title: 'NO_CURR' },
  'S(KC_5)': { name: '%', title: 'NO_PERC' },
  KC_PERC: { name: '%', title: 'NO_PERC' },
  'S(KC_6)': { name: '&', title: 'NO_AMPR' },
  KC_CIRC: { name: '&', title: 'NO_AMPR' },
  'S(KC_7)': { name: '/', title: 'NO_SLSH' },
  KC_AMPR: { name: '/', title: 'NO_SLSH' },
  'S(KC_8)': { name: '(', title: 'NO_LPRN' },
  KC_ASTR: { name: '(', title: 'NO_LPRN' },
  'S(KC_9)': { name: ')', title: 'NO_RPRN' },
  KC_LPRN: { name: ')', title: 'NO_RPRN' },
  'S(KC_0)': { name: '=', title: 'NO_EQL' },
  KC_RPRN: { name: '=', title: 'NO_EQL' },
  'S(KC_MINS)': { name: '?', title: 'NO_QUES' },
  KC_UNDS: { name: '?', title: 'NO_QUES' },
  'S(KC_EQL)': { name: '`', title: 'NO_GRV (dead)' },
  KC_PLUS: { name: '`', title: 'NO_GRV (dead)' },
  // Row 2
  'S(KC_RBRC)': { name: '^', title: 'NO_CIRC (dead)' },
  KC_RCBR: { name: '^', title: 'NO_CIRC (dead)' },
  // Row 3
  'S(KC_NUHS)': { name: '*', title: 'NO_ASTR' },
  // Row 4
  'S(KC_NUBS)': { name: '>', title: 'NO_RABK' },
  'S(KC_COMM)': { name: ';', title: 'NO_SCLN' },
  KC_LT: { name: ';', title: 'NO_SCLN' },
  'S(KC_DOT)': { name: ':', title: 'NO_COLN' },
  KC_GT: { name: ':', title: 'NO_COLN' },
  'S(KC_SLSH)': { name: '_', title: 'NO_UNDS' },
  KC_QUES: { name: '_', title: 'NO_UNDS' },

  /* AltGr symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │   │   │ @ │ £ │ $ │ € │   │ { │ [ │ ] │ } │   │ ´ │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │   │   │   │   │   │   │   │   │   │   │   │ ~ │     │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┐    │
   * │      │   │   │   │   │   │   │   │   │   │   │   │   │    │
   * ├────┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┴────┤
   * │    │   │   │   │   │   │   │   │ µ │   │   │   │          │
   * ├────┼───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  'ALGR(KC_2)': { name: '@', title: 'NO_AT' },
  'ALGR(KC_3)': { name: '£', title: 'NO_PND' },
  'ALGR(KC_4)': { name: '$', title: 'NO_DLR' },
  'ALGR(KC_5)': { name: '€', title: 'NO_EURO' },
  'ALGR(KC_7)': { name: '{', title: 'NO_LCBR' },
  'ALGR(KC_8)': { name: '[', title: 'NO_LBRC' },
  'ALGR(KC_9)': { name: ']', title: 'NO_RBRC' },
  'ALGR(KC_0)': { name: '}', title: 'NO_RCBR' },
  'ALGR(KC_EQL)': { name: '´', title: 'NO_ACUT (dead)' },
  // Row 2
  'ALGR(KC_RBRC)': { name: '~', title: 'NO_TILD (dead)' },
  // Row 4
  'ALGR(KC_M)': { name: 'µ', title: 'NO_MICR' },

  /* Other keys */
  KC_BSLS: { name: "*\n'", title: '' },
  'S(KC_BSLS)': { name: '*', title: '' },
  KC_LCBR: { name: 'Å', title: 'S(NO_ARNG) (capital Å)' },
  KC_COLN: { name: 'Ø', title: 'S(NO_OSTR) (capital Ø)' },
  KC_PIPE: { name: '*', title: 'NO_ASTR' },
  KC_DQUO: { name: 'Æ', title: 'S(NO_AE) (capital Æ)' },

  SC_LSPO: { name: 'LS / )', title: 'Left Shift when held, ) when tapped' },
  SC_RSPC: { name: 'RS / =', title: 'Right Shift when held, = when tapped' },
  SC_LCPO: { name: 'LC / )', title: 'Left Control when held, ) when tapped' },
  SC_RCPC: { name: 'RC / =', title: 'Right Control when held, = when tapped' },
  SC_LAPO: { name: 'LA / )', title: 'Left Alt when held, ) when tapped' },
  SC_RAPC: { name: 'RA / =', title: 'Right Alt when held, = when tapped' },

  QK_GESC: {
    name: '|/§\nEsc',
    title: 'Esc normally, but | when GUI is active or § when Shift is active'
  }
};
