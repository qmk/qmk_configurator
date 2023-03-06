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
   * │ ; │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 0 │ - │ = │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │ / │ ' │ פ │ ם │ ן │ ו │ ט │ א │ ר │ ק │ ] │ [ │     │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┐    │
   * │      │ ף │ ך │ ל │ ח │ י │ ע │ כ │ ג │ ד │ ש │ , │ \ │    │
   * ├────┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┴────┤
   * │    │   │ ץ │ ת │ צ │ מ │ נ │ ה │ ב │ ס │ ז │ . │          │
   * ├────┼───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  KC_GRV: { name: '~\n;', title: 'IL_SCLN' },
  KC_1: { name: '!\n1', title: 'IL_1' },
  KC_2: { name: '@\n2', title: 'IL_2' },
  KC_3: { name: '#\n3', title: 'IL_3' },
  KC_4: { name: '$\n4', title: 'IL_4' },
  KC_5: { name: '%\n5', title: 'IL_5' },
  KC_6: { name: '^\n6', title: 'IL_6' },
  KC_7: { name: '&\n7', title: 'IL_7' },
  KC_8: { name: '*\n8', title: 'IL_8' },
  KC_9: { name: ')\n9', title: 'IL_9' },
  KC_0: { name: '(\n0', title: 'IL_0' },
  KC_MINS: { name: '_\n-', title: 'IL_MINS' },
  KC_EQL: { name: '+\n=', title: 'IL_EQL' },
  // Row 2
  KC_Q: { name: '/', title: 'IL_SLSH' },
  KC_W: { name: "'", title: 'IL_QUOT' },
  KC_E: { name: 'ק', title: 'IL_QOF' },
  KC_R: { name: 'ר', title: 'IL_RESH' },
  KC_T: { name: 'א', title: 'IL_ALEF' },
  KC_Y: { name: 'ט', title: 'IL_TET' },
  KC_U: { name: 'ו', title: 'IL_VAV' },
  KC_I: { name: 'ן', title: 'IL_FNUN' },
  KC_O: { name: 'ם', title: 'IL_FMEM' },
  KC_P: { name: 'פ', title: 'IL_PE' },
  KC_LBRC: { name: '}\n]', title: 'IL_RBRC' },
  KC_RBRC: { name: '{\n[', title: 'IL_LBRC' },
  // Row 3
  KC_A: { name: 'ש', title: 'IL_SHIN' },
  KC_S: { name: 'ד', title: 'IL_DALT' },
  KC_D: { name: 'ג', title: 'IL_GIML' },
  KC_F: { name: 'כ', title: 'IL_KAF' },
  KC_G: { name: 'ע', title: 'IL_AYIN' },
  KC_H: { name: 'י', title: 'IL_YOD' },
  KC_J: { name: 'ח', title: 'IL_HET' },
  KC_K: { name: 'ל', title: 'IL_LAMD' },
  KC_L: { name: 'ך', title: 'IL_FKAF' },
  KC_SCLN: { name: ':\nף', title: 'IL_FPE' },
  KC_QUOT: { name: '"\n,', title: 'IL_COMM' },
  KC_NUHS: { name: '|\n\\', title: 'IL_BSLS' },
  // Row 4
  KC_Z: { name: 'ז', title: 'IL_ZAYN' },
  KC_X: { name: 'ס', title: 'IL_SMKH' },
  KC_C: { name: 'ב', title: 'IL_BET' },
  KC_V: { name: 'ה', title: 'IL_HE' },
  KC_B: { name: 'נ', title: 'IL_NUN' },
  KC_N: { name: 'מ', title: 'IL_MEM' },
  KC_M: { name: 'צ', title: 'IL_TSDI' },
  KC_COMM: { name: '>\nת', title: 'IL_TAV' },
  KC_DOT: { name: '<\nץ', title: 'IL_FTSD' },
  KC_SLSH: { name: '?\n.', title: 'IL_DOT' },

  /* Shifted symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │ ~ │ ! │ @ │ # │ $ │ % │ ^ │ & │ * │ ) │ ( │ _ │ + │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │   │   │   │   │   │   │   │   │   │   │ } │ { │     │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┐    │
   * │      │   │   │   │   │   │   │   │   │   │ : │ " │ | │    │
   * ├────┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┴────┤
   * │    │   │   │   │   │   │   │   │   │ > │ < │ ? │          │
   * ├────┼───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  'S(KC_GRV)': { name: '~', title: 'IL_TILD' },
  KC_TILD: { name: '~', title: 'IL_TILD' },
  'S(KC_1)': { name: '!', title: 'IL_EXLM' },
  KC_EXLM: { name: '!', title: 'IL_EXLM' },
  'S(KC_2)': { name: '@', title: 'IL_AT' },
  KC_AT: { name: '@', title: 'IL_AT' },
  'S(KC_3)': { name: '#', title: 'IL_PND' },
  KC_HASH: { name: '#', title: 'IL_PND' },
  'S(KC_4)': { name: '$', title: 'IL_DLR' },
  KC_DLR: { name: '$', title: 'IL_DLR' },
  'S(KC_5)': { name: '%', title: 'IL_PERC' },
  KC_PERC: { name: '%', title: 'IL_PERC' },
  'S(KC_6)': { name: '^', title: 'IL_CIRC' },
  KC_CIRC: { name: '^', title: 'IL_CIRC' },
  'S(KC_7)': { name: '&', title: 'IL_AMPR' },
  KC_AMPR: { name: '&', title: 'IL_AMPR' },
  'S(KC_8)': { name: '*', title: 'IL_ASTR' },
  KC_ASTR: { name: '*', title: 'IL_ASTR' },
  'S(KC_9)': { name: ')', title: 'IL_RPRN' },
  KC_LPRN: { name: ')', title: 'IL_RPRN' },
  'S(KC_0)': { name: '(', title: 'IL_LPRN' },
  KC_RPRN: { name: '(', title: 'IL_LPRN' },
  'S(KC_MINS)': { name: '_', title: 'IL_UNDS' },
  KC_UNDS: { name: '_', title: 'IL_UNDS' },
  'S(KC_EQL)': { name: '+', title: 'IL_PLUS' },
  KC_PLUS: { name: '+', title: 'IL_PLUS' },
  // Row 2
  'S(KC_LBRC)': { name: '}', title: 'IL_RCBR' },
  KC_LCBR: { name: '}', title: 'IL_RCBR' },
  'S(KC_RBRC)': { name: '{', title: 'IL_LCBR' },
  KC_RCBR: { name: '{', title: 'IL_LCBR' },
  // Row 3
  'S(KC_SCLN)': { name: ':', title: 'IL_COLN' },
  KC_COLN: { name: ':', title: 'IL_COLN' },
  'S(KC_QUOT)': { name: '"', title: 'IL_DQUO' },
  KC_DQUO: { name: '"', title: 'IL_DQUO' },
  'S(KC_NUHS)': { name: '|', title: 'IL_PIPE' },
  // Row 4
  'S(KC_COMM)': { name: '>', title: 'IL_RABK' },
  KC_LT: { name: '>', title: 'IL_RABK' },
  'S(KC_DOT)': { name: '<', title: 'IL_LABK' },
  KC_GT: { name: '<', title: 'IL_LABK' },
  'S(KC_SLSH)': { name: '?', title: 'IL_QUES' },
  KC_QUES: { name: '?', title: 'IL_QUES' },

  /* AltGr symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │   │   │   │ € │ ₪ │ ° │   │   │ × │   │   │   │   │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │   │   │   │   │   │ װ │   │   │   │   │   │   │     │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┐    │
   * │      │   │   │   │   │ ײ │ ױ │   │   │   │   │   │   │    │
   * ├────┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┴────┤
   * │    │   │   │   │   │   │   │   │   │   │   │ ÷ │          │
   * ├────┼───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  'ALGR(KC_3)': { name: '€', title: 'IL_EURO' },
  'ALGR(KC_4)': { name: '₪', title: 'IL_SHKL' },
  'ALGR(KC_5)': { name: '°', title: 'IL_DEG' },
  'ALGR(KC_8)': { name: '×', title: 'IL_MUL' },
  // Row 2
  'ALGR(KC_Y)': { name: 'װ', title: 'IL_DVAV' },
  // Row 3
  'ALGR(KC_G)': { name: 'ױ', title: 'IL_VYOD' },
  'ALGR(KC_H)': { name: 'ײ', title: 'IL_DYOD' },
  // Row 4
  'ALGR(KC_SLSH)': { name: '÷', title: 'IL_DIV' },

  /* Other keys */
  KC_BSLS: { name: '|\n\\', title: '' },
  'S(KC_BSLS)': { name: '|', title: '' },
  KC_NUBS: { name: '|\n\\', title: '' },
  'S(KC_NUBS)': { name: '|', title: '' },
  KC_PIPE: { name: '|', title: 'IL_PIPE' },

  SC_LSPO: { name: 'LS / )', title: 'Left Shift when held, ) when tapped' },
  SC_RSPC: { name: 'RS / (', title: 'Right Shift when held, ( when tapped' },
  SC_LCPO: { name: 'LC / )', title: 'Left Control when held, ) when tapped' },
  SC_RCPC: { name: 'RC / (', title: 'Right Control when held, ( when tapped' },
  SC_LAPO: { name: 'LA / )', title: 'Left Alt when held, ) when tapped' },
  SC_RAPC: { name: 'RA / (', title: 'Right Alt when held, ( when tapped' },

  QK_GESC: {
    name: ';/~\nEsc',
    title: 'Esc normally, but ; when GUI is active or ~ when Shift is active'
  }
};
