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
   * │ ¸ │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 0 │ ' │ + │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │ Q │ W │ E │ R │ T │ Z │ U │ I │ O │ P │ Š │ Đ │     │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┐    │
   * │      │ A │ S │ D │ F │ G │ H │ J │ K │ L │ Č │ Ć │ Ž │    │
   * ├────┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┴────┤
   * │    │ < │ Y │ X │ C │ V │ B │ N │ M │ , │ . │ - │          │
   * ├────┼───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  KC_GRV: { name: '¨\n¸', title: 'SI_CEDL (dead)' },
  KC_1: { name: '!\n1', title: 'SI_1' },
  KC_2: { name: '"\n2', title: 'SI_2' },
  KC_3: { name: '#\n3', title: 'SI_3' },
  KC_4: { name: '$\n4', title: 'SI_4' },
  KC_5: { name: '%\n5', title: 'SI_5' },
  KC_6: { name: '&\n6', title: 'SI_6' },
  KC_7: { name: '/\n7', title: 'SI_7' },
  KC_8: { name: '(\n8', title: 'SI_8' },
  KC_9: { name: ')\n9', title: 'SI_9' },
  KC_0: { name: '=\n0', title: 'SI_0' },
  KC_MINS: { name: "?\n'", title: 'SI_QUOT' },
  KC_EQL: { name: '*\n+', title: 'SI_PLUS' },
  // Row 2
  KC_Q: { name: 'Q', title: 'SI_Q' },
  KC_W: { name: 'W', title: 'SI_W' },
  KC_E: { name: 'E', title: 'SI_E' },
  KC_R: { name: 'R', title: 'SI_R' },
  KC_T: { name: 'T', title: 'SI_T' },
  KC_Y: { name: 'Z', title: 'SI_Z' },
  KC_U: { name: 'U', title: 'SI_U' },
  KC_I: { name: 'I', title: 'SI_I' },
  KC_O: { name: 'O', title: 'SI_O' },
  KC_P: { name: 'P', title: 'SI_P' },
  KC_LBRC: { name: 'Š', title: 'SI_SCAR' },
  KC_RBRC: { name: 'Đ', title: 'SI_DSTR' },
  // Row 3
  KC_A: { name: 'A', title: 'SI_A' },
  KC_S: { name: 'S', title: 'SI_S' },
  KC_D: { name: 'D', title: 'SI_D' },
  KC_F: { name: 'F', title: 'SI_F' },
  KC_G: { name: 'G', title: 'SI_G' },
  KC_H: { name: 'H', title: 'SI_H' },
  KC_J: { name: 'J', title: 'SI_J' },
  KC_K: { name: 'K', title: 'SI_K' },
  KC_L: { name: 'L', title: 'SI_L' },
  KC_SCLN: { name: 'Č', title: 'SI_CCAR' },
  KC_QUOT: { name: 'Ć', title: 'SI_CACU' },
  KC_NUHS: { name: 'Ž', title: 'SI_ZCAR' },
  // Row 4
  KC_NUBS: { name: '>\n<', title: 'SI_LABK' },
  KC_Z: { name: 'Y', title: 'SI_Y' },
  KC_X: { name: 'X', title: 'SI_X' },
  KC_C: { name: 'C', title: 'SI_C' },
  KC_V: { name: 'V', title: 'SI_V' },
  KC_B: { name: 'B', title: 'SI_B' },
  KC_N: { name: 'N', title: 'SI_N' },
  KC_M: { name: 'M', title: 'SI_M' },
  KC_COMM: { name: ';\n,', title: 'SI_COMM' },
  KC_DOT: { name: ':\n.', title: 'SI_DOT' },
  KC_SLSH: { name: '_\n-', title: 'SI_MINS' },

  /* Shifted symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │ ¨ │ ! │ " │ # │ $ │ % │ & │ / │ ( │ ) │ = │ ? │ * │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │   │   │   │   │   │   │   │   │   │   │   │   │     │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┐    │
   * │      │   │   │   │   │   │   │   │   │   │   │   │   │    │
   * ├────┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┴────┤
   * │    │ > │   │   │   │   │   │   │   │ ; │ : │ _ │          │
   * ├────┼───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  'S(KC_GRV)': { name: '¨', title: 'SI_DIAE (dead)' },
  KC_TILD: { name: '¨', title: 'SI_DIAE (dead)' },
  'S(KC_1)': { name: '!', title: 'SI_EXLM' },
  KC_EXLM: { name: '!', title: 'SI_EXLM' },
  'S(KC_2)': { name: '"', title: 'SI_DQUO' },
  KC_AT: { name: '"', title: 'SI_DQUO' },
  'S(KC_3)': { name: '#', title: 'SI_HASH' },
  KC_HASH: { name: '#', title: 'SI_HASH' },
  'S(KC_4)': { name: '$', title: 'SI_DLR' },
  KC_DLR: { name: '$', title: 'SI_DLR' },
  'S(KC_5)': { name: '%', title: 'SI_PERC' },
  KC_PERC: { name: '%', title: 'SI_PERC' },
  'S(KC_6)': { name: '&', title: 'SI_AMPR' },
  KC_CIRC: { name: '&', title: 'SI_AMPR' },
  'S(KC_7)': { name: '/', title: 'SI_SLSH' },
  KC_AMPR: { name: '/', title: 'SI_SLSH' },
  'S(KC_8)': { name: '(', title: 'SI_LPRN' },
  KC_ASTR: { name: '(', title: 'SI_LPRN' },
  'S(KC_9)': { name: ')', title: 'SI_RPRN' },
  KC_LPRN: { name: ')', title: 'SI_RPRN' },
  'S(KC_0)': { name: '=', title: 'SI_EQL' },
  KC_RPRN: { name: '=', title: 'SI_EQL' },
  'S(KC_MINS)': { name: '?', title: 'SI_QUES' },
  KC_UNDS: { name: '?', title: 'SI_QUES' },
  'S(KC_EQL)': { name: '*', title: 'SI_ASTR' },
  KC_PLUS: { name: '*', title: 'SI_ASTR' },
  // Row 4
  'S(KC_NUBS)': { name: '>', title: 'SI_RABK' },
  'S(KC_COMM)': { name: ';', title: 'SI_SCLN' },
  KC_LT: { name: ';', title: 'SI_SCLN' },
  'S(KC_DOT)': { name: ':', title: 'SI_COLN' },
  KC_GT: { name: ':', title: 'SI_COLN' },
  'S(KC_SLSH)': { name: '_', title: 'SI_UNDS' },
  KC_QUES: { name: '_', title: 'SI_UNDS' },

  /* AltGr symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │   │ ~ │ ˇ │ ^ │ ˘ │ ° │ ˛ │ ` │ ˙ │ ´ │ ˝ │   │   │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │ \ │ | │ € │   │   │   │   │   │   │   │ ÷ │ × │     │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┐    │
   * │      │   │   │   │ [ │ ] │   │   │ ł │ Ł │   │ ß │ ¤ │    │
   * ├────┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┴────┤
   * │    │   │   │   │   │ @ │ { │ } │ § │   │   │   │          │
   * ├────┼───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  'ALGR(KC_1)': { name: '~', title: 'SI_TILD' },
  'ALGR(KC_2)': { name: 'ˇ', title: 'SI_CARN (dead)' },
  'ALGR(KC_3)': { name: '^', title: 'SI_CIRC (dead)' },
  'ALGR(KC_4)': { name: '˘', title: 'SI_BREV (dead)' },
  'ALGR(KC_5)': { name: '°', title: 'SI_RNGA (dead)' },
  'ALGR(KC_6)': { name: '˛', title: 'SI_OGON (dead)' },
  'ALGR(KC_7)': { name: '`', title: 'SI_GRV' },
  'ALGR(KC_8)': { name: '˙', title: 'SI_DOTA (dead)' },
  'ALGR(KC_9)': { name: '´', title: 'SI_ACUT (dead)' },
  'ALGR(KC_0)': { name: '˝', title: 'SI_DACU (dead)' },
  // Row 2
  'ALGR(KC_Q)': { name: '\\', title: 'SI_BSLS' },
  'ALGR(KC_W)': { name: '|', title: 'SI_PIPE' },
  'ALGR(KC_E)': { name: '€', title: 'SI_EURO' },
  'ALGR(KC_LBRC)': { name: '÷', title: 'SI_DIV' },
  'ALGR(KC_RBRC)': { name: '×', title: 'SI_MUL' },
  // Row 3
  'ALGR(KC_F)': { name: '[', title: 'SI_LBRC' },
  'ALGR(KC_G)': { name: ']', title: 'SI_RBRC' },
  'ALGR(KC_K)': { name: 'ł', title: 'SI_LLST' },
  'ALGR(KC_L)': { name: 'Ł', title: 'SI_CLST' },
  'ALGR(KC_QUOT)': { name: 'ß', title: 'SI_SS' },
  'ALGR(KC_NUHS)': { name: '¤', title: 'SI_CURR' },
  // Row 4
  'ALGR(KC_V)': { name: '@', title: 'SI_AT' },
  'ALGR(KC_B)': { name: '{', title: 'SI_LCBR' },
  'ALGR(KC_N)': { name: '}', title: 'SI_RCBR' },
  'ALGR(KC_M)': { name: '§', title: 'SI_SECT' },

  /* Other keys */
  KC_BSLS: { name: 'Ž', title: '' },
  'S(KC_BSLS)': { name: 'Ž', title: '' },
  KC_LCBR: { name: 'Š', title: 'S(SI_SCAR) (capital Š)' },
  KC_RCBR: { name: 'Đ', title: 'S(SI_DSTR) (capital Đ)' },
  KC_COLN: { name: 'Č', title: 'S(SI_CCAR) (capital Č)' },
  KC_PIPE: { name: 'Ž', title: 'SI_ZCAR (capital Ž)' },
  KC_DQUO: { name: 'Ć', title: 'S(SI_CACU) (capital Ć)' },

  KC_LSPO: { name: 'LS / )', title: 'Left Shift when held, ) when tapped' },
  KC_RSPC: { name: 'RS / =', title: 'Right Shift when held, = when tapped' },
  KC_LCPO: { name: 'LC / )', title: 'Left Control when held, ) when tapped' },
  KC_RCPC: { name: 'RC / =', title: 'Right Control when held, = when tapped' },
  KC_LAPO: { name: 'LA / )', title: 'Left Alt when held, ) when tapped' },
  KC_RAPC: { name: 'RA / =', title: 'Right Alt when held, = when tapped' },

  QK_GESC: {
    name: '¸ / ¨\nEsc',
    title: 'Esc normally, but ¸ when GUI is active or ¨ when Shift is active'
  }
};
