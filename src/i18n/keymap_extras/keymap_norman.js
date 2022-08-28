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
   * │ ` │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 0 │ - │ = │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │ Q │ W │ D │ F │ K │ J │ U │ R │ L │ ; │ [ │ ] │  \  │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤
   * │      │ A │ S │ E │ T │ G │ Y │ N │ I │ O │ H │ ' │        │
   * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤
   * │        │ Z │ X │ C │ V │ B │ P │ M │ , │ . │ / │          │
   * ├────┬───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  KC_GRV: { name: '~\n`', title: 'NM_GRV' },
  KC_1: { name: '!\n1', title: 'NM_1' },
  KC_2: { name: '@\n2', title: 'NM_2' },
  KC_3: { name: '#\n3', title: 'NM_3' },
  KC_4: { name: '$\n4', title: 'NM_4' },
  KC_5: { name: '%\n5', title: 'NM_5' },
  KC_6: { name: '^\n6', title: 'NM_6' },
  KC_7: { name: '&\n7', title: 'NM_7' },
  KC_8: { name: '*\n8', title: 'NM_8' },
  KC_9: { name: '(\n9', title: 'NM_9' },
  KC_0: { name: ')\n0', title: 'NM_0' },
  KC_MINS: { name: '_\n-', title: 'NM_MINS' },
  KC_EQL: { name: '+\n=', title: 'NM_EQL' },
  // Row 2
  KC_Q: { name: 'Q', title: 'NM_Q' },
  KC_W: { name: 'W', title: 'NM_W' },
  KC_E: { name: 'D', title: 'NM_D' },
  KC_R: { name: 'F', title: 'NM_F' },
  KC_T: { name: 'K', title: 'NM_K' },
  KC_Y: { name: 'J', title: 'NM_J' },
  KC_U: { name: 'U', title: 'NM_U' },
  KC_I: { name: 'R', title: 'NM_R' },
  KC_O: { name: 'L', title: 'NM_L' },
  KC_P: { name: ':\n;', title: 'NM_SCLN' },
  KC_LBRC: { name: '{\n[', title: 'NM_LBRC' },
  KC_RBRC: { name: '}\n]', title: 'NM_RBRC' },
  KC_BSLS: { name: '|\n\\', title: 'NM_BSLS' },
  // Row 3
  KC_A: { name: 'A', title: 'NM_A' },
  KC_S: { name: 'S', title: 'NM_S' },
  KC_D: { name: 'E', title: 'NM_E' },
  KC_F: { name: 'T', title: 'NM_T' },
  KC_G: { name: 'G', title: 'NM_G' },
  KC_H: { name: 'Y', title: 'NM_Y' },
  KC_J: { name: 'N', title: 'NM_N' },
  KC_K: { name: 'I', title: 'NM_I' },
  KC_L: { name: 'O', title: 'NM_O' },
  KC_SCLN: { name: 'H', title: 'NM_H' },
  KC_QUOT: { name: '"\n\'', title: 'NM_QUOT' },
  // Row 4
  KC_Z: { name: 'Z', title: 'NM_Z' },
  KC_X: { name: 'X', title: 'NM_X' },
  KC_C: { name: 'C', title: 'NM_C' },
  KC_V: { name: 'V', title: 'NM_V' },
  KC_B: { name: 'B', title: 'NM_B' },
  KC_N: { name: 'P', title: 'NM_P' },
  KC_M: { name: 'M', title: 'NM_M' },
  KC_COMM: { name: '<\n,', title: 'NM_COMM' },
  KC_DOT: { name: '>\n.', title: 'NM_DOT' },
  KC_SLSH: { name: '?\n/', title: 'NM_SLSH' },

  /* Shifted symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │ ~ │ ! │ @ │ # │ $ │ % │ ^ │ & │ * │ ( │ ) │ _ │ + │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │   │   │   │   │   │   │   │   │   │ : │ { │ } │  |  │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤
   * │      │   │   │   │   │   │   │   │   │   │   │ " │        │
   * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤
   * │        │   │   │   │   │   │   │   │ < │ > │ ? │          │
   * ├────┬───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  'S(KC_GRV)': { name: '~', title: 'NM_TILD' },
  KC_TILD: { name: '~', title: 'NM_TILD' },
  'S(KC_1)': { name: '!', title: 'NM_EXLM' },
  KC_EXLM: { name: '!', title: 'NM_EXLM' },
  'S(KC_2)': { name: '@', title: 'NM_AT' },
  KC_AT: { name: '@', title: 'NM_AT' },
  'S(KC_3)': { name: '#', title: 'NM_HASH' },
  KC_HASH: { name: '#', title: 'NM_HASH' },
  'S(KC_4)': { name: '$', title: 'NM_DLR' },
  KC_DLR: { name: '$', title: 'NM_DLR' },
  'S(KC_5)': { name: '%', title: 'NM_PERC' },
  KC_PERC: { name: '%', title: 'NM_PERC' },
  'S(KC_6)': { name: '^', title: 'NM_CIRC' },
  KC_CIRC: { name: '^', title: 'NM_CIRC' },
  'S(KC_7)': { name: '&', title: 'NM_AMPR' },
  KC_AMPR: { name: '&', title: 'NM_AMPR' },
  'S(KC_8)': { name: '*', title: 'NM_ASTR' },
  KC_ASTR: { name: '*', title: 'NM_ASTR' },
  'S(KC_9)': { name: '(', title: 'NM_LPRN' },
  KC_LPRN: { name: '(', title: 'NM_LPRN' },
  'S(KC_0)': { name: ')', title: 'NM_RPRN' },
  KC_RPRN: { name: ')', title: 'NM_RPRN' },
  'S(KC_MINS)': { name: '_', title: 'NM_UNDS' },
  KC_UNDS: { name: '_', title: 'NM_UNDS' },
  'S(KC_EQL)': { name: '+', title: 'NM_PLUS' },
  KC_PLUS: { name: '+', title: 'NM_PLUS' },
  // Row 2
  'S(KC_P)': { name: ':', title: 'NM_COLN' },
  'S(KC_LBRC)': { name: '{', title: 'NM_LCBR' },
  KC_LCBR: { name: '{', title: 'NM_LCBR' },
  'S(KC_RBRC)': { name: '}', title: 'NM_RCBR' },
  KC_RCBR: { name: '}', title: 'NM_RCBR' },
  'S(KC_BSLS)': { name: '|', title: 'NM_PIPE' },
  KC_PIPE: { name: '|', title: 'NM_PIPE' },
  // Row 3
  'S(KC_QUOT)': { name: '"', title: 'NM_DQUO' },
  KC_DQUO: { name: '"', title: 'NM_DQUO' },
  // Row 4
  'S(KC_COMM)': { name: '<', title: 'NM_LABK' },
  KC_LT: { name: '<', title: 'NM_LABK' },
  'S(KC_DOT)': { name: '>', title: 'NM_RABK' },
  KC_GT: { name: '>', title: 'NM_RABK' },
  'S(KC_SLSH)': { name: '?', title: 'NM_QUES' },
  KC_QUES: { name: '?', title: 'NM_QUES' },

  /* Other keys */
  KC_NUHS: { name: '|\n\\', title: '' },
  'S(KC_NUHS)': { name: '|', title: '' },
  KC_NUBS: { name: '|\n\\', title: '' },
  'S(KC_NUBS)': { name: '|', title: '' },
  KC_COLN: { name: 'H', title: 'S(NM_H) (capital H)' },

  KC_LSPO: { name: 'LS / (', title: 'Left Shift when held, ( when tapped' },
  KC_RSPC: { name: 'RS / )', title: 'Right Shift when held, ) when tapped' },
  KC_LCPO: { name: 'LC / (', title: 'Left Control when held, ( when tapped' },
  KC_RCPC: { name: 'RC / )', title: 'Right Control when held, ) when tapped' },
  KC_LAPO: { name: 'LA / (', title: 'Left Alt when held, ( when tapped' },
  KC_RAPC: { name: 'RA / )', title: 'Right Alt when held, ) when tapped' },

  QK_GESC: {
    name: '`/~\nEsc',
    title: 'Esc normally, but ` when GUI is active or ~ when Shift is active'
  }
};
