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
   * │ $ │ & │ [ │ { │ } │ ( │ = │ * │ ) │ + │ ] │ ! │ # │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │ ; │ , │ . │ P │ Y │ F │ G │ C │ R │ L │ / │ @ │  \  │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤
   * │      │ A │ O │ E │ U │ I │ D │ H │ T │ N │ S │ - │        │
   * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤
   * │        │ ' │ Q │ J │ K │ X │ B │ M │ W │ V │ Z │          │
   * ├────┬───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  KC_GRV: { name: '~\n$', title: 'DP_DLR' },
  KC_1: { name: '%\n&', title: 'DP_AMPR' },
  KC_2: { name: '7\n[', title: 'DP_LBRC' },
  KC_3: { name: '5\n{', title: 'DP_LCBR' },
  KC_4: { name: '3\n}', title: 'DP_RCBR' },
  KC_5: { name: '1\n(', title: 'DP_LPRN' },
  KC_6: { name: '9\n=', title: 'DP_EQL' },
  KC_7: { name: '0\n*', title: 'DP_ASTR' },
  KC_8: { name: '2\n)', title: 'DP_RPRN' },
  KC_9: { name: '4\n+', title: 'DP_PLUS' },
  KC_0: { name: '6\n]', title: 'DP_RBRC' },
  KC_MINS: { name: '8\n!', title: 'DP_EXLM' },
  KC_EQL: { name: '`\n#', title: 'DP_HASH' },
  // Row 2
  KC_Q: { name: ':\n;', title: 'DP_SCLN' },
  KC_W: { name: '<\n,', title: 'DP_COMM' },
  KC_E: { name: '>\n.', title: 'DP_DOT' },
  KC_R: { name: 'P', title: 'DP_P' },
  KC_T: { name: 'Y', title: 'DP_Y' },
  KC_Y: { name: 'F', title: 'DP_F' },
  KC_U: { name: 'G', title: 'DP_G' },
  KC_I: { name: 'C', title: 'DP_C' },
  KC_O: { name: 'R', title: 'DP_R' },
  KC_P: { name: 'L', title: 'DP_L' },
  KC_LBRC: { name: '?\n/', title: 'DP_SLSH' },
  KC_RBRC: { name: '^\n@', title: 'DP_AT' },
  KC_BSLS: { name: '|\n\\', title: 'DP_BSLS' },
  // Row 3
  KC_A: { name: 'A', title: 'DP_A' },
  KC_S: { name: 'O', title: 'DP_O' },
  KC_D: { name: 'E', title: 'DP_E' },
  KC_F: { name: 'U', title: 'DP_U' },
  KC_G: { name: 'I', title: 'DP_I' },
  KC_H: { name: 'D', title: 'DP_D' },
  KC_J: { name: 'H', title: 'DP_H' },
  KC_K: { name: 'T', title: 'DP_T' },
  KC_L: { name: 'N', title: 'DP_N' },
  KC_SCLN: { name: 'S', title: 'DP_S' },
  KC_QUOT: { name: '_\n-', title: 'DP_MINS' },
  // Row 4
  KC_Z: { name: '"\n\'', title: 'DP_QUOT' },
  KC_X: { name: 'Q', title: 'DP_Q' },
  KC_C: { name: 'J', title: 'DP_J' },
  KC_V: { name: 'K', title: 'DP_K' },
  KC_B: { name: 'X', title: 'DP_X' },
  KC_N: { name: 'B', title: 'DP_B' },
  KC_M: { name: 'M', title: 'DP_M' },
  KC_COMM: { name: 'W', title: 'DP_W' },
  KC_DOT: { name: 'V', title: 'DP_V' },
  KC_SLSH: { name: 'Z', title: 'DP_Z' },

  /* Shifted symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │ ~ │ % │ 7 │ 5 │ 3 │ 1 │ 9 │ 0 │ 2 │ 4 │ 6 │ 8 │ ` │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │ : │ < │ > │   │   │   │   │   │   │   │ ? │ ^ │  |  │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤
   * │      │   │   │   │   │   │   │   │   │   │   │ _ │        │
   * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤
   * │        │ " │   │   │   │   │   │   │   │   │   │          │
   * ├────┬───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  'S(KC_GRV)': { name: '~', title: 'DP_TILD' },
  KC_TILD: { name: '~', title: 'DP_TILD' },
  'S(KC_1)': { name: '%', title: 'DP_PERC' },
  KC_EXLM: { name: '%', title: 'DP_PERC' },
  'S(KC_2)': { name: '7', title: 'DP_7' },
  KC_AT: { name: '7', title: 'DP_7' },
  'S(KC_3)': { name: '5', title: 'DP_5' },
  KC_HASH: { name: '5', title: 'DP_5' },
  'S(KC_4)': { name: '3', title: 'DP_3' },
  KC_DLR: { name: '3', title: 'DP_3' },
  'S(KC_5)': { name: '1', title: 'DP_1' },
  KC_PERC: { name: '1', title: 'DP_1' },
  'S(KC_6)': { name: '9', title: 'DP_9' },
  KC_CIRC: { name: '9', title: 'DP_9' },
  'S(KC_7)': { name: '0', title: 'DP_0' },
  KC_AMPR: { name: '0', title: 'DP_0' },
  'S(KC_8)': { name: '2', title: 'DP_2' },
  KC_ASTR: { name: '2', title: 'DP_2' },
  'S(KC_9)': { name: '4', title: 'DP_4' },
  KC_LPRN: { name: '4', title: 'DP_4' },
  'S(KC_0)': { name: '6', title: 'DP_6' },
  KC_RPRN: { name: '6', title: 'DP_6' },
  'S(KC_MINS)': { name: '8', title: 'DP_8' },
  KC_UNDS: { name: '8', title: 'DP_8' },
  'S(KC_EQL)': { name: '`', title: 'DP_GRV' },
  KC_PLUS: { name: '`', title: 'DP_GRV' },
  // Row 2
  'S(KC_Q)': { name: ':', title: 'DP_COLN' },
  'S(KC_W)': { name: '<', title: 'DP_LABK' },
  'S(KC_E)': { name: '>', title: 'DP_RABK' },
  'S(KC_LBRC)': { name: '?', title: 'DP_QUES' },
  KC_LCBR: { name: '?', title: 'DP_QUES' },
  'S(KC_RBRC)': { name: '^', title: 'DP_CIRC' },
  KC_RCBR: { name: '^', title: 'DP_CIRC' },
  'S(KC_BSLS)': { name: '|', title: 'DP_PIPE' },
  KC_PIPE: { name: '|', title: 'DP_PIPE' },
  // Row 3
  'S(KC_QUOT)': { name: '_', title: 'DP_UNDS' },
  KC_DQUO: { name: '_', title: 'DP_UNDS' },
  // Row 4
  'S(KC_Z)': { name: '"', title: 'DP_DQUO' },

  /* Other keys */
  KC_NUHS: { name: '|\n\\', title: '' },
  'S(KC_NUHS)': { name: '|', title: '' },
  KC_NUBS: { name: '|\n\\', title: '' },
  'S(KC_NUBS)': { name: '|', title: '' },
  KC_LT: { name: 'W', title: 'S(DP_W) (capital W)' },
  KC_GT: { name: 'V', title: 'S(DP_V) (capital V)' },
  KC_COLN: { name: 'S', title: 'S(DP_S) (capital S)' },
  KC_QUES: { name: 'Z', title: 'S(DP_Z) (capital Z)' },

  KC_LSPO: { name: 'LS / 4', title: 'Left Shift when held, 4 when tapped' },
  KC_RSPC: { name: 'RS / 6', title: 'Right Shift when held, 6 when tapped' },
  KC_LCPO: { name: 'LC / 4', title: 'Left Control when held, 4 when tapped' },
  KC_RCPC: { name: 'RC / 6', title: 'Right Control when held, 6 when tapped' },
  KC_LAPO: { name: 'LA / 4', title: 'Left Alt when held, 4 when tapped' },
  KC_RAPC: { name: 'RA / 6', title: 'Right Alt when held, 6 when tapped' },

  QK_GESC: {
    name: '$ / ~\nEsc',
    title: 'Esc normally, but $ when GUI is active or ~ when Shift is active'
  }
};
