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
   * │ + │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 0 │ / │ - │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │ F │ G │ Ğ │ I │ O │ D │ R │ N │ H │ P │ Q │ W │     │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┐    │
   * │      │ U │ İ │ E │ A │ Ü │ T │ K │ M │ L │ Y │ Ş │ X │    │
   * ├────┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┴────┤
   * │    │ < │ J │ Ö │ V │ C │ Ç │ Z │ S │ B │ . │ , │          │
   * ├────┼───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  KC_GRV: { name: '*\n+', title: 'TR_PLUS' },
  KC_1: { name: '!\n1', title: 'TR_1' },
  KC_2: { name: '"\n2', title: 'TR_2' },
  KC_3: { name: '^\n3', title: 'TR_3' },
  KC_4: { name: '$\n4', title: 'TR_4' },
  KC_5: { name: '%\n5', title: 'TR_5' },
  KC_6: { name: '&\n6', title: 'TR_6' },
  KC_7: { name: "'\n7", title: 'TR_7' },
  KC_8: { name: '(\n8', title: 'TR_8' },
  KC_9: { name: ')\n9', title: 'TR_9' },
  KC_0: { name: '=\n0', title: 'TR_0' },
  KC_MINS: { name: '?\n/', title: 'TR_SLSH' },
  KC_EQL: { name: '_\n-', title: 'TR_MINS' },
  // Row 2
  KC_Q: { name: 'F', title: 'TR_F' },
  KC_W: { name: 'G', title: 'TR_G' },
  KC_E: { name: 'Ğ', title: 'TR_GBRV' },
  KC_R: { name: 'I', title: 'TR_I' },
  KC_T: { name: 'O', title: 'TR_O' },
  KC_Y: { name: 'D', title: 'TR_D' },
  KC_U: { name: 'R', title: 'TR_R' },
  KC_I: { name: 'N', title: 'TR_N' },
  KC_O: { name: 'H', title: 'TR_H' },
  KC_P: { name: 'P', title: 'TR_P' },
  KC_LBRC: { name: 'Q', title: 'TR_Q' },
  KC_RBRC: { name: 'W', title: 'TR_W' },
  // Row 3
  KC_A: { name: 'U', title: 'TR_U' },
  KC_S: { name: 'İ', title: 'TR_IDOT' },
  KC_D: { name: 'E', title: 'TR_E' },
  KC_F: { name: 'A', title: 'TR_A' },
  KC_G: { name: 'Ü', title: 'TR_UDIA' },
  KC_H: { name: 'T', title: 'TR_T' },
  KC_J: { name: 'K', title: 'TR_K' },
  KC_K: { name: 'M', title: 'TR_M' },
  KC_L: { name: 'L', title: 'TR_L' },
  KC_SCLN: { name: 'Y', title: 'TR_Y' },
  KC_QUOT: { name: 'Ş', title: 'TR_SCED' },
  KC_NUHS: { name: 'X', title: 'TR_X' },
  // Row 4
  KC_NUBS: { name: '>\n<', title: 'TR_LABK' },
  KC_Z: { name: 'J', title: 'TR_J' },
  KC_X: { name: 'Ö', title: 'TR_ODIA' },
  KC_C: { name: 'V', title: 'TR_V' },
  KC_V: { name: 'C', title: 'TR_C' },
  KC_B: { name: 'Ç', title: 'TR_CCED' },
  KC_N: { name: 'Z', title: 'TR_Z' },
  KC_M: { name: 'S', title: 'TR_S' },
  KC_COMM: { name: 'B', title: 'TR_B' },
  KC_DOT: { name: ':\n.', title: 'TR_DOT' },
  KC_SLSH: { name: ';\n,', title: 'TR_COMM' },

  /* Shifted symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │ * │ ! │ " │ ^ │ $ │ % │ & │ ' │ ( │ ) │ = │ ? │ _ │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │   │   │   │   │   │   │   │   │   │   │   │   │     │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┐    │
   * │      │   │   │   │   │   │   │   │   │   │   │   │   │    │
   * ├────┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┴────┤
   * │    │ > │   │   │   │   │   │   │   │   │ : │ ; │          │
   * ├────┼───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  'S(KC_GRV)': { name: '*', title: 'TR_ASTR' },
  KC_TILD: { name: '*', title: 'TR_ASTR' },
  'S(KC_1)': { name: '!', title: 'TR_EXLM' },
  KC_EXLM: { name: '!', title: 'TR_EXLM' },
  'S(KC_2)': { name: '"', title: 'TR_DQUO' },
  KC_AT: { name: '"', title: 'TR_DQUO' },
  'S(KC_3)': { name: '^', title: 'TR_CIRC (dead)' },
  KC_HASH: { name: '^', title: 'TR_CIRC (dead)' },
  'S(KC_4)': { name: '$', title: 'TR_DLR' },
  KC_DLR: { name: '$', title: 'TR_DLR' },
  'S(KC_5)': { name: '%', title: 'TR_PERC' },
  KC_PERC: { name: '%', title: 'TR_PERC' },
  'S(KC_6)': { name: '&', title: 'TR_AMPR' },
  KC_CIRC: { name: '&', title: 'TR_AMPR' },
  'S(KC_7)': { name: "'", title: 'TR_QUOT' },
  KC_AMPR: { name: "'", title: 'TR_QUOT' },
  'S(KC_8)': { name: '(', title: 'TR_LPRN' },
  KC_ASTR: { name: '(', title: 'TR_LPRN' },
  'S(KC_9)': { name: ')', title: 'TR_RPRN' },
  KC_LPRN: { name: ')', title: 'TR_RPRN' },
  'S(KC_0)': { name: '=', title: 'TR_EQL' },
  KC_RPRN: { name: '=', title: 'TR_EQL' },
  'S(KC_MINS)': { name: '?', title: 'TR_QUES' },
  KC_UNDS: { name: '?', title: 'TR_QUES' },
  'S(KC_EQL)': { name: '_', title: 'TR_UNDS' },
  KC_PLUS: { name: '_', title: 'TR_UNDS' },
  // Row 4
  'S(KC_NUBS)': { name: '>', title: 'TR_RABK' },
  'S(KC_DOT)': { name: ':', title: 'TR_COLN' },
  KC_GT: { name: ':', title: 'TR_COLN' },
  'S(KC_SLSH)': { name: ';', title: 'TR_SCLN' },
  KC_QUES: { name: ';', title: 'TR_SCLN' },

  /* AltGr symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │ ¬ │ ¹ │ ² │ # │ ¼ │ ½ │ ¾ │ { │ [ │ ] │ } │ \ │ | │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │ @ │   │   │ ¶ │   │ ¥ │   │   │ Ø │ £ │ ¨ │ ~ │     │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┐    │
   * │      │ Æ │ ß │ € │   │   │ ₺ │   │   │   │ ´ │   │ ` │    │
   * ├────┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┴────┤
   * │    │   │ « │ » │ ¢ │   │   │   │ µ │ × │ ÷ │ - │          │
   * ├────┼───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  'ALGR(KC_GRV)': { name: '¬', title: 'TR_NOT' },
  'ALGR(KC_1)': { name: '¹', title: 'TR_SUP1' },
  'ALGR(KC_2)': { name: '²', title: 'TR_SUP2' },
  'ALGR(KC_3)': { name: '#', title: 'TR_HASH' },
  'ALGR(KC_4)': { name: '¼', title: 'TR_QRTR' },
  'ALGR(KC_5)': { name: '½', title: 'TR_HALF' },
  'ALGR(KC_6)': { name: '¾', title: 'TR_TQTR' },
  'ALGR(KC_7)': { name: '{', title: 'TR_LCBR' },
  'ALGR(KC_8)': { name: '[', title: 'TR_LBRC' },
  'ALGR(KC_9)': { name: ']', title: 'TR_RBRC' },
  'ALGR(KC_0)': { name: '}', title: 'TR_RCBR' },
  'ALGR(KC_MINS)': { name: '\\', title: 'TR_BSLS' },
  'ALGR(KC_EQL)': { name: '|', title: 'TR_PIPE' },
  // Row 2
  'ALGR(KC_Q)': { name: '@', title: 'TR_AT' },
  'ALGR(KC_R)': { name: '¶', title: 'TR_PILC' },
  'ALGR(KC_Y)': { name: '¥', title: 'TR_YEN' },
  'ALGR(KC_O)': { name: 'Ø', title: 'TR_OSTR' },
  'ALGR(KC_P)': { name: '£', title: 'TR_PND' },
  'ALGR(KC_LBRC)': { name: '¨', title: 'TR_DIAE (dead)' },
  'ALGR(KC_RBRC)': { name: '~', title: 'TR_TILD (dead)' },
  // Row 3
  'ALGR(KC_A)': { name: 'Æ', title: 'TR_AE' },
  'ALGR(KC_S)': { name: 'ß', title: 'TR_SS' },
  'ALGR(KC_D)': { name: '€', title: 'TR_EURO' },
  'ALGR(KC_H)': { name: '₺', title: 'TR_LIRA' },
  'ALGR(KC_SCLN)': { name: '´', title: 'TR_ACUT (dead)' },
  'ALGR(KC_NUHS)': { name: '`', title: 'TR_GRV (dead)' },
  // Row 4
  'ALGR(KC_Z)': { name: '«', title: 'TR_LDAQ' },
  'ALGR(KC_X)': { name: '»', title: 'TR_RDAQ' },
  'ALGR(KC_C)': { name: '¢', title: 'TR_CENT' },
  'ALGR(KC_M)': { name: 'µ', title: 'TR_MICR' },
  'ALGR(KC_COMM)': { name: '×', title: 'TR_MUL' },
  'ALGR(KC_DOT)': { name: '÷', title: 'TR_DIV' },
  'ALGR(KC_SLSH)': { name: 'Soft hyphen', title: 'TR_SHYP (soft hyphen)' },

  /* Shift+AltGr symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │   │   │   │ ³ │ ¤ │   │   │   │   │   │   │ ¿ │   │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │   │   │   │ ® │   │   │   │   │   │   │   │   │     │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┐    │
   * │      │   │ § │   │ ª │   │   │   │   │   │   │   │   │    │
   * ├────┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┴────┤
   * │    │ ¦ │   │   │ © │   │   │   │ º │   │   │   │          │
   * ├────┼───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  'S(ALGR(KC_3))': { name: '³', title: 'TR_SUP3' },
  'S(ALGR(KC_4))': { name: '¤', title: 'TR_CURR' },
  'S(ALGR(KC_MINS))': { name: '¿', title: 'TR_IQUE' },
  // Row 2
  'S(ALGR(KC_R))': { name: '®', title: 'TR_REGD' },
  // Row 3
  'S(ALGR(KC_S))': { name: '§', title: 'TR_SECT' },
  'S(ALGR(KC_F))': { name: 'ª', title: 'TR_FORD' },
  // Row 4
  'S(ALGR(KC_NUBS))': { name: '¦', title: 'TR_BRKP' },
  'S(ALGR(KC_C))': { name: '©', title: 'TR_COPY' },
  'S(ALGR(KC_M))': { name: 'º', title: 'TR_MORD' },

  /* Other keys */
  KC_BSLS: { name: 'X', title: '' },
  'S(KC_BSLS)': { name: 'X', title: '' },
  KC_LCBR: { name: 'Q', title: 'S(TR_Q) (capital Q)' },
  KC_RCBR: { name: 'W', title: 'S(TR_W) (capital W)' },
  KC_LT: { name: 'B', title: 'S(TR_B) (capital B)' },
  KC_COLN: { name: 'Y', title: 'S(TR_Y) (capital Y)' },
  KC_PIPE: { name: 'X', title: 'TR_X (capital X)' },
  KC_DQUO: { name: 'Ş', title: 'S(TR_SCED) (capital Ş)' },

  KC_LSPO: { name: 'LS / )', title: 'Left Shift when held, ) when tapped' },
  KC_RSPC: { name: 'RS / =', title: 'Right Shift when held, = when tapped' },
  KC_LCPO: { name: 'LC / )', title: 'Left Control when held, ) when tapped' },
  KC_RCPC: { name: 'RC / =', title: 'Right Control when held, = when tapped' },
  KC_LAPO: { name: 'LA / )', title: 'Left Alt when held, ) when tapped' },
  KC_RAPC: { name: 'RA / =', title: 'Right Alt when held, = when tapped' },

  QK_GESC: {
    name: '+ / *\nEsc',
    title: 'Esc normally, but + when GUI is active or * when Shift is active'
  }
};
