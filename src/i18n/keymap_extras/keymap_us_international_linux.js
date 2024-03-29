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
   * │     │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │ [ │ ] │  \  │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤
   * │      │ A │ S │ D │ F │ G │ H │ J │ K │ L │ ; │ ´ │        │
   * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤
   * │        │ Z │ X │ C │ V │ B │ N │ M │ , │ . │ / │          │
   * ├────┬───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  KC_GRV: { name: '~\n`', title: 'US_DGRV (dead)' },
  KC_1: { name: '!\n1', title: 'US_1' },
  KC_2: { name: '@\n2', title: 'US_2' },
  KC_3: { name: '#\n3', title: 'US_3' },
  KC_4: { name: '$\n4', title: 'US_4' },
  KC_5: { name: '%\n5', title: 'US_5' },
  KC_6: { name: '^\n6', title: 'US_6' },
  KC_7: { name: '&\n7', title: 'US_7' },
  KC_8: { name: '*\n8', title: 'US_8' },
  KC_9: { name: '(\n9', title: 'US_9' },
  KC_0: { name: ')\n0', title: 'US_0' },
  KC_MINS: { name: '_\n-', title: 'US_MINS' },
  KC_EQL: { name: '+\n=', title: 'US_EQL' },
  // Row 2
  KC_Q: { name: 'Q', title: 'US_Q' },
  KC_W: { name: 'W', title: 'US_W' },
  KC_E: { name: 'E', title: 'US_E' },
  KC_R: { name: 'R', title: 'US_R' },
  KC_T: { name: 'T', title: 'US_T' },
  KC_Y: { name: 'Y', title: 'US_Y' },
  KC_U: { name: 'U', title: 'US_U' },
  KC_I: { name: 'I', title: 'US_I' },
  KC_O: { name: 'O', title: 'US_O' },
  KC_P: { name: 'P', title: 'US_P' },
  KC_LBRC: { name: '{\n[', title: 'US_LBRC' },
  KC_RBRC: { name: '}\n]', title: 'US_RBRC' },
  KC_BSLS: { name: '|\n\\', title: 'US_BSLS' },
  // Row 3
  KC_A: { name: 'A', title: 'US_A' },
  KC_S: { name: 'S', title: 'US_S' },
  KC_D: { name: 'D', title: 'US_D' },
  KC_F: { name: 'F', title: 'US_F' },
  KC_G: { name: 'G', title: 'US_G' },
  KC_H: { name: 'H', title: 'US_H' },
  KC_J: { name: 'J', title: 'US_J' },
  KC_K: { name: 'K', title: 'US_K' },
  KC_L: { name: 'L', title: 'US_L' },
  KC_SCLN: { name: ':\n;', title: 'US_SCLN' },
  KC_QUOT: { name: '¨\n´', title: 'US_ACUT (dead)' },
  // Row 4
  KC_Z: { name: 'Z', title: 'US_Z' },
  KC_X: { name: 'X', title: 'US_X' },
  KC_C: { name: 'C', title: 'US_C' },
  KC_V: { name: 'V', title: 'US_V' },
  KC_B: { name: 'B', title: 'US_B' },
  KC_N: { name: 'N', title: 'US_N' },
  KC_M: { name: 'M', title: 'US_M' },
  KC_COMM: { name: '<\n,', title: 'US_COMM' },
  KC_DOT: { name: '>\n.', title: 'US_DOT' },
  KC_SLSH: { name: '?\n/', title: 'US_SLSH' },

  /* Shifted symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │ ~ │ ! │ @ │ # │ $ │ % │ ^ │ & │ * │ ( │ ) │ _ │ + │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │   │   │   │   │   │   │   │   │   │   │ { │ } │  |  │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤
   * │      │   │   │   │   │   │   │   │   │   │ : │ ¨ │        │
   * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤
   * │        │   │   │   │   │   │   │   │ < │ > │ ? │          │
   * ├────┬───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  'S(KC_GRV)': { name: '~', title: 'US_DTIL (dead)' },
  KC_TILD: { name: '~', title: 'US_DTIL (dead)' },
  'S(KC_1)': { name: '!', title: 'US_EXLM' },
  KC_EXLM: { name: '!', title: 'US_EXLM' },
  'S(KC_2)': { name: '@', title: 'US_AT' },
  KC_AT: { name: '@', title: 'US_AT' },
  'S(KC_3)': { name: '#', title: 'US_HASH' },
  KC_HASH: { name: '#', title: 'US_HASH' },
  'S(KC_4)': { name: '$', title: 'US_DLR' },
  KC_DLR: { name: '$', title: 'US_DLR' },
  'S(KC_5)': { name: '%', title: 'US_PERC' },
  KC_PERC: { name: '%', title: 'US_PERC' },
  'S(KC_6)': { name: '^', title: 'US_DCIR (dead)' },
  KC_CIRC: { name: '^', title: 'US_DCIR (dead)' },
  'S(KC_7)': { name: '&', title: 'US_AMPR' },
  KC_AMPR: { name: '&', title: 'US_AMPR' },
  'S(KC_8)': { name: '*', title: 'US_ASTR' },
  KC_ASTR: { name: '*', title: 'US_ASTR' },
  'S(KC_9)': { name: '(', title: 'US_LPRN' },
  KC_LPRN: { name: '(', title: 'US_LPRN' },
  'S(KC_0)': { name: ')', title: 'US_RPRN' },
  KC_RPRN: { name: ')', title: 'US_RPRN' },
  'S(KC_MINS)': { name: '_', title: 'US_UNDS' },
  KC_UNDS: { name: '_', title: 'US_UNDS' },
  'S(KC_EQL)': { name: '+', title: 'US_PLUS' },
  KC_PLUS: { name: '+', title: 'US_PLUS' },
  // Row 2
  'S(KC_LBRC)': { name: '{', title: 'US_LCBR' },
  KC_LCBR: { name: '{', title: 'US_LCBR' },
  'S(KC_RBRC)': { name: '}', title: 'US_RCBR' },
  KC_RCBR: { name: '}', title: 'US_RCBR' },
  'S(KC_BSLS)': { name: '|', title: 'US_PIPE' },
  KC_PIPE: { name: '|', title: 'US_PIPE' },
  // Row 3
  'S(KC_SCLN)': { name: ':', title: 'US_COLN' },
  KC_COLN: { name: ':', title: 'US_COLN' },
  'S(KC_QUOT)': { name: '¨', title: 'US_DIAE (dead)' },
  KC_DQUO: { name: '¨', title: 'US_DIAE (dead)' },
  // Row 4
  'S(KC_COMM)': { name: '<', title: 'US_LABK' },
  KC_LT: { name: '<', title: 'US_LABK' },
  'S(KC_DOT)': { name: '>', title: 'US_RABK' },
  KC_GT: { name: '>', title: 'US_RABK' },
  'S(KC_SLSH)': { name: '?', title: 'US_QUES' },
  KC_QUES: { name: '?', title: 'US_QUES' },

  /* AltGr symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │ ` │ ¡ │ ² │ ³ │ ¤ │ € │ ¼ │ ½ │ ¾ │ ‘ │ ’ │ ¥ │ × │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │ Ä │ Å │ É │ ® │ Þ │ Ü │ Ú │ Í │ Ó │ Ö │ « │ » │  ¬  │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤
   * │      │ Á │ ß │ Ð │   │   │   │   │ Œ │ Ø │ ¶ │ ' │        │
   * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤
   * │        │ Æ │   │ © │   │   │ Ñ │ µ │ Ç │ ˙ │ ¿ │          │
   * ├────┬───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */

  // Row 1
  'ALGR(KC_GRV)': { name: '`', title: 'US_GRV' },
  'ALGR(KC_1)': { name: '¡', title: 'US_IEXL' },
  'ALGR(KC_2)': { name: '²', title: 'US_SUP2' },
  'ALGR(KC_3)': { name: '³', title: 'US_SUP3' },
  'ALGR(KC_4)': { name: '¤', title: 'US_CURR' },
  'ALGR(KC_5)': { name: '€', title: 'US_EURO' },
  'ALGR(KC_6)': { name: '¼', title: 'US_QRTR' },
  'ALGR(KC_7)': { name: '½', title: 'US_HALF' },
  'ALGR(KC_8)': { name: '¾', title: 'US_TQTR' },
  'ALGR(KC_9)': { name: '‘', title: 'US_LSQU' },
  'ALGR(KC_0)': { name: '’', title: 'US_RSQU' },
  'ALGR(KC_MINS)': { name: '¥', title: 'US_YEN' },
  'ALGR(KC_EQL)': { name: '×', title: 'US_MUL' },
  // Row 2
  'ALGR(KC_Q)': { name: 'Ä', title: 'US_ADIA' },
  'ALGR(KC_W)': { name: 'Å', title: 'US_ARNG' },
  'ALGR(KC_E)': { name: 'É', title: 'US_EACU' },
  'ALGR(KC_R)': { name: '®', title: 'US_REGD' },
  'ALGR(KC_T)': { name: 'Þ', title: 'US_THRN' },
  'ALGR(KC_Y)': { name: 'Ü', title: 'US_UDIA' },
  'ALGR(KC_U)': { name: 'Ú', title: 'US_UACU' },
  'ALGR(KC_I)': { name: 'Í', title: 'US_IACU' },
  'ALGR(KC_O)': { name: 'Ó', title: 'US_OACU' },
  'ALGR(KC_P)': { name: 'Ö', title: 'US_ODIA' },
  'ALGR(KC_LBRC)': { name: '«', title: 'US_LDAQ' },
  'ALGR(KC_RBRC)': { name: '»', title: 'US_RDAQ' },
  'ALGR(KC_BSLS)': { name: '¬', title: 'US_NOT' },
  // Row 3
  'ALGR(KC_A)': { name: 'Á', title: 'US_AACU' },
  'ALGR(KC_S)': { name: 'ß', title: 'US_SS' },
  'ALGR(KC_D)': { name: 'Ð', title: 'US_ETH' },
  'ALGR(KC_K)': { name: 'Œ', title: 'US_OE' },
  'ALGR(KC_L)': { name: 'Ø', title: 'US_OSTR' },
  'ALGR(KC_SCLN)': { name: '¶', title: 'US_PILC' },
  'ALGR(KC_QUOT)': { name: "'", title: 'US_QUOT' },
  // Row 4
  'ALGR(KC_Z)': { name: 'Æ', title: 'US_AE' },
  'ALGR(KC_C)': { name: '©', title: 'US_COPY' },
  'ALGR(KC_N)': { name: 'Ñ', title: 'US_NTIL' },
  'ALGR(KC_M)': { name: 'µ', title: 'US_MICR' },
  'ALGR(KC_COMM)': { name: 'Ç', title: 'US_CCED' },
  'ALGR(KC_DOT)': { name: '˙', title: 'US_DOTA (dead)' },
  'ALGR(KC_SLSH)': { name: '¿', title: 'US_IQUE' },

  /* Shift+AltGr symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
   * │ ~ │ ¹ │ ˝ │ ¯ │ £ │ ¸ │ ^ │ ̛  │ ˛ │ ˘ │ ° │ ̣  │ ÷ │       │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
   * │     │   │   │   │   │   │   │   │   │   │   │ “ │ ” │  ¦  │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤
   * │      │   │ § │   │   │   │   │   │   │   │ ° │ " │        │
   * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤
   * │        │   │   │ ¢ │   │   │   │   │   │ ˇ │ ̉  │          │
   * ├────┬───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
   * │    │    │    │                        │    │    │    │    │
   * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
   */
  // Row 1
  'S(ALGR(KC_GRV))': { name: '~', title: 'US_TILD' },
  'S(ALGR(KC_1))': { name: '¹', title: 'US_SUP1' },
  'S(ALGR(KC_2))': { name: '˝', title: 'US_DACU (dead)' },
  'S(ALGR(KC_3))': { name: '¯', title: 'US_MACR (dead)' },
  'S(ALGR(KC_4))': { name: '£', title: 'US_PND' },
  'S(ALGR(KC_5))': { name: '¸', title: 'US_CEDL (dead)' },
  'S(ALGR(KC_6))': { name: '^', title: 'US_CIRC' },
  'S(ALGR(KC_7))': { name: '◌̛', title: 'US_HORN (dead)' },
  'S(ALGR(KC_8))': { name: '˛', title: 'US_OGON (dead)' },
  'S(ALGR(KC_9))': { name: '˘', title: 'US_BREV (dead)' },
  'S(ALGR(KC_0))': { name: '°', title: 'US_RNGA (dead)' },
  'S(ALGR(KC_MINS))': { name: '◌̣', title: 'US_DOTB (dead)' },
  'S(ALGR(KC_EQL))': { name: '÷', title: 'US_DIV' },
  // Row 2
  'S(ALGR(KC_LBRC))': { name: '“', title: 'US_LDQU' },
  'S(ALGR(KC_RBRC))': { name: '”', title: 'US_RDQU' },
  'S(ALGR(KC_BSLS))': { name: '¦', title: 'US_BRKP' },
  // Row 3
  'S(ALGR(KC_S))': { name: '§', title: 'US_SECT' },
  'S(ALGR(KC_SCLN))': { name: '°', title: 'US_DEG' },
  'S(ALGR(KC_QUOT))': { name: '"', title: 'US_DQUO' },
  // Row 4
  'S(ALGR(KC_C))': { name: '¢', title: 'US_CENT' },
  'S(ALGR(KC_DOT))': { name: 'ˇ', title: 'US_CARN (dead)' },
  'S(ALGR(KC_SLSH))': { name: '◌̉', title: 'US_HOKA (dead)' },

  /* Other keys */
  KC_NUHS: { name: '|\n\\', title: '' },
  'S(KC_NUHS)': { name: '|', title: '' },
  KC_NUBS: { name: '|\n\\', title: '' },
  'S(KC_NUBS)': { name: '|', title: '' },

  SC_LSPO: { name: 'LS / (', title: 'Left Shift when held, ( when tapped' },
  SC_RSPC: { name: 'RS / )', title: 'Right Shift when held, ) when tapped' },
  SC_LCPO: { name: 'LC / (', title: 'Left Control when held, ( when tapped' },
  SC_RCPC: { name: 'RC / )', title: 'Right Control when held, ) when tapped' },
  SC_LAPO: { name: 'LA / (', title: 'Left Alt when held, ( when tapped' },
  SC_RAPC: { name: 'RA / )', title: 'Right Alt when held, ) when tapped' },

  QK_GESC: {
    name: '`/~\nEsc',
    title: 'Esc normally, but ` when GUI is active or ~ when Shift is active'
  }
};
