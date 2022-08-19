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
   * │ ` │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 0 │ [ │ ] │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │ ' │ , │ . │ P │ Y │ F │ G │ C │ R │ L │ / │ = │  \  │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤
   * │      │ A │ O │ E │ U │ I │ D │ H │ T │ N │ S │ - │        │
   * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤
   * │        │ ; │ Q │ J │ K │ X │ B │ M │ W │ V │ Z │          │
   * ├────┬───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  KC_GRV: { name: '~\n`', title: 'DV_GRV' },
  KC_1: { name: '!\n1', title: 'DV_1' },
  KC_2: { name: '@\n2', title: 'DV_2' },
  KC_3: { name: '#\n3', title: 'DV_3' },
  KC_4: { name: '$\n4', title: 'DV_4' },
  KC_5: { name: '%\n5', title: 'DV_5' },
  KC_6: { name: '^\n6', title: 'DV_6' },
  KC_7: { name: '&\n7', title: 'DV_7' },
  KC_8: { name: '*\n8', title: 'DV_8' },
  KC_9: { name: '(\n9', title: 'DV_9' },
  KC_0: { name: ')\n0', title: 'DV_0' },
  KC_MINS: { name: '{\n[', title: 'DV_LBRC' },
  KC_EQL: { name: '}\n]', title: 'DV_RBRC' },
  // Row 2
  KC_Q: { name: '"\n\'', title: 'DV_QUOT' },
  KC_W: { name: '<\n,', title: 'DV_COMM' },
  KC_E: { name: '>\n.', title: 'DV_DOT' },
  KC_R: { name: 'P', title: 'DV_P' },
  KC_T: { name: 'Y', title: 'DV_Y' },
  KC_Y: { name: 'F', title: 'DV_F' },
  KC_U: { name: 'G', title: 'DV_G' },
  KC_I: { name: 'C', title: 'DV_C' },
  KC_O: { name: 'R', title: 'DV_R' },
  KC_P: { name: 'L', title: 'DV_L' },
  KC_LBRC: { name: '?\n/', title: 'DV_SLSH' },
  KC_RBRC: { name: '+\n=', title: 'DV_EQL' },
  KC_BSLS: { name: '|\n\\', title: 'DV_BSLS' },
  // Row 3
  KC_A: { name: 'A', title: 'DV_A' },
  KC_S: { name: 'O', title: 'DV_O' },
  KC_D: { name: 'E', title: 'DV_E' },
  KC_F: { name: 'U', title: 'DV_U' },
  KC_G: { name: 'I', title: 'DV_I' },
  KC_H: { name: 'D', title: 'DV_D' },
  KC_J: { name: 'H', title: 'DV_H' },
  KC_K: { name: 'T', title: 'DV_T' },
  KC_L: { name: 'N', title: 'DV_N' },
  KC_SCLN: { name: 'S', title: 'DV_S' },
  KC_QUOT: { name: '_\n-', title: 'DV_MINS' },
  // Row 4
  KC_Z: { name: ':\n;', title: 'DV_SCLN' },
  KC_X: { name: 'Q', title: 'DV_Q' },
  KC_C: { name: 'J', title: 'DV_J' },
  KC_V: { name: 'K', title: 'DV_K' },
  KC_B: { name: 'X', title: 'DV_X' },
  KC_N: { name: 'B', title: 'DV_B' },
  KC_M: { name: 'M', title: 'DV_M' },
  KC_COMM: { name: 'W', title: 'DV_W' },
  KC_DOT: { name: 'V', title: 'DV_V' },
  KC_SLSH: { name: 'Z', title: 'DV_Z' },

  /* Shifted symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │ ~ │ ! │ @ │ # │ $ │ % │ ^ │ & │ * │ ( │ ) │ { │ } │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │ " │ < │ > │   │   │   │   │   │   │   │ ? │ + │  |  │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤
   * │      │   │   │   │   │   │   │   │   │   │   │ _ │        │
   * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤
   * │        │ : │   │   │   │   │   │   │   │   │   │          │
   * ├────┬───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  'S(KC_GRV)': { name: '~', title: 'DV_TILD' },
  KC_TILD: { name: '~', title: 'DV_TILD' },
  'S(KC_1)': { name: '!', title: 'DV_EXLM' },
  KC_EXLM: { name: '!', title: 'DV_EXLM' },
  'S(KC_2)': { name: '@', title: 'DV_AT' },
  KC_AT: { name: '@', title: 'DV_AT' },
  'S(KC_3)': { name: '#', title: 'DV_HASH' },
  KC_HASH: { name: '#', title: 'DV_HASH' },
  'S(KC_4)': { name: '$', title: 'DV_DLR' },
  KC_DLR: { name: '$', title: 'DV_DLR' },
  'S(KC_5)': { name: '%', title: 'DV_PERC' },
  KC_PERC: { name: '%', title: 'DV_PERC' },
  'S(KC_6)': { name: '^', title: 'DV_CIRC' },
  KC_CIRC: { name: '^', title: 'DV_CIRC' },
  'S(KC_7)': { name: '&', title: 'DV_AMPR' },
  KC_AMPR: { name: '&', title: 'DV_AMPR' },
  'S(KC_8)': { name: '*', title: 'DV_ASTR' },
  KC_ASTR: { name: '*', title: 'DV_ASTR' },
  'S(KC_9)': { name: '(', title: 'DV_LPRN' },
  KC_LPRN: { name: '(', title: 'DV_LPRN' },
  'S(KC_0)': { name: ')', title: 'DV_RPRN' },
  KC_RPRN: { name: ')', title: 'DV_RPRN' },
  'S(KC_MINS)': { name: '{', title: 'DV_LCBR' },
  KC_UNDS: { name: '{', title: 'DV_LCBR' },
  'S(KC_EQL)': { name: '}', title: 'DV_RCBR' },
  KC_PLUS: { name: '}', title: 'DV_RCBR' },
  // Row 2
  'S(KC_Q)': { name: '"', title: 'DV_DQUO' },
  'S(KC_W)': { name: '<', title: 'DV_LABK' },
  'S(KC_E)': { name: '>', title: 'DV_RABK' },
  'S(KC_LBRC)': { name: '?', title: 'DV_QUES' },
  KC_LCBR: { name: '?', title: 'DV_QUES' },
  'S(KC_RBRC)': { name: '+', title: 'DV_PLUS' },
  KC_RCBR: { name: '+', title: 'DV_PLUS' },
  'S(KC_BSLS)': { name: '|', title: 'DV_PIPE' },
  KC_PIPE: { name: '|', title: 'DV_PIPE' },
  // Row 3
  'S(KC_QUOT)': { name: '_', title: 'DV_UNDS' },
  KC_DQUO: { name: '_', title: 'DV_UNDS' },
  // Row 4
  'S(KC_Z)': { name: ':', title: 'DV_COLN' },

  /* Other keys */
  KC_NUHS: { name: '|\n\\', title: '' },
  'S(KC_NUHS)': { name: '|', title: '' },
  KC_NUBS: { name: '|\n\\', title: '' },
  'S(KC_NUBS)': { name: '|', title: '' },
  KC_LT: { name: 'W', title: 'S(DV_W) (capital W)' },
  KC_GT: { name: 'V', title: 'S(DV_V) (capital V)' },
  KC_COLN: { name: 'S', title: 'S(DV_S) (capital S)' },
  KC_QUES: { name: 'Z', title: 'S(DV_Z) (capital Z)' },

  KC_LSPO: { name: 'LS / (', title: 'Left Shift when held, ( when tapped' },
  KC_RSPC: { name: 'RS / )', title: 'Right Shift when held, ) when tapped' },
  KC_LCPO: { name: 'LC / (', title: 'Left Control when held, ( when tapped' },
  KC_RCPC: { name: 'RC / )', title: 'Right Control when held, ) when tapped' },
  KC_LAPO: { name: 'LA / (', title: 'Left Alt when held, ( when tapped' },
  KC_RAPC: { name: 'RA / )', title: 'Right Alt when held, ) when tapped' },

  QK_GESC: {
    name: '` / ~\nEsc',
    title: 'Esc normally, but ` when GUI is active or ~ when Shift is active'
  }
};
