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
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬─────┐
   * │ < │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 0 │ ' │ ì │     │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬───┤
   * │     │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │ è │ + │ ù │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴───┤
   * │      │ A │ S │ D │ F │ G │ H │ J │ K │ L │ ò │ à │      │
   * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴──────┤
   * │        │ Z │ X │ C │ V │ B │ N │ M │ , │ . │ - │        │
   * ├─────┬──┴─┬─┴───┼───┴───┴───┴───┴───┴───┼───┴─┬─┴──┬─────┤
   * │     │    │     │                       │     │    │     │
   * └─────┴────┴─────┴───────────────────────┴─────┴────┴─────┘
   */
  // Row 1
  KC_GRV: { name: '>\n<', title: 'IT_LABK' },
  KC_1: { name: '!\n1', title: 'IT_1' },
  KC_2: { name: '"\n2', title: 'IT_2' },
  KC_3: { name: '£\n3', title: 'IT_3' },
  KC_4: { name: '$\n4', title: 'IT_4' },
  KC_5: { name: '%\n5', title: 'IT_5' },
  KC_6: { name: '&\n6', title: 'IT_6' },
  KC_7: { name: '/\n7', title: 'IT_7' },
  KC_8: { name: '(\n8', title: 'IT_8' },
  KC_9: { name: ')\n9', title: 'IT_9' },
  KC_0: { name: '=\n0', title: 'IT_0' },
  KC_MINS: { name: "?\n'", title: 'IT_QUOT' },
  KC_EQL: { name: '^\nì', title: 'IT_IGRV' },
  // Row 2
  KC_Q: { name: 'Q', title: 'IT_Q' },
  KC_W: { name: 'W', title: 'IT_W' },
  KC_E: { name: 'E', title: 'IT_E' },
  KC_R: { name: 'R', title: 'IT_R' },
  KC_T: { name: 'T', title: 'IT_T' },
  KC_Y: { name: 'Y', title: 'IT_Y' },
  KC_U: { name: 'U', title: 'IT_U' },
  KC_I: { name: 'I', title: 'IT_I' },
  KC_O: { name: 'O', title: 'IT_O' },
  KC_P: { name: 'P', title: 'IT_P' },
  KC_LBRC: { name: 'é\nè', title: 'IT_EGRV' },
  KC_RBRC: { name: '*\n+', title: 'IT_PLUS' },
  KC_BSLS: { name: '§\nù', title: 'IT_UGRV' },
  // Row 3
  KC_A: { name: 'A', title: 'IT_A' },
  KC_S: { name: 'S', title: 'IT_S' },
  KC_D: { name: 'D', title: 'IT_D' },
  KC_F: { name: 'F', title: 'IT_F' },
  KC_G: { name: 'G', title: 'IT_G' },
  KC_H: { name: 'H', title: 'IT_H' },
  KC_J: { name: 'J', title: 'IT_J' },
  KC_K: { name: 'K', title: 'IT_K' },
  KC_L: { name: 'L', title: 'IT_L' },
  KC_SCLN: { name: 'ç\nò', title: 'IT_OGRV' },
  KC_QUOT: { name: '°\nà', title: 'IT_AGRV' },
  // Row 4
  KC_NUBS: { name: '|\n\\', title: 'IT_BSLS' },
  KC_Z: { name: 'Z', title: 'IT_Z' },
  KC_X: { name: 'X', title: 'IT_X' },
  KC_C: { name: 'C', title: 'IT_C' },
  KC_V: { name: 'V', title: 'IT_V' },
  KC_B: { name: 'B', title: 'IT_B' },
  KC_N: { name: 'N', title: 'IT_N' },
  KC_M: { name: 'M', title: 'IT_M' },
  KC_COMM: { name: ';\n,', title: 'IT_COMM' },
  KC_DOT: { name: ':\n.', title: 'IT_DOT' },
  KC_SLSH: { name: '_\n-', title: 'IT_MINS' },

  /* Shifted symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬─────┐
   * │ > │ ! │ " │ £ │ $ │ % │ & │ / │ ( │ ) │ = │ ? │ ^ │     │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬───┤
   * │     │   │   │   │   │   │   │   │   │   │   │ é │ * │ § │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴───┤
   * │      │   │   │   │   │   │   │   │   │   │ ç │ ° │      │
   * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴──────┤
   * │        │   │   │   │   │   │   │   │ ; │ : │ _ │        │
   * ├─────┬──┴─┬─┴───┼───┴───┴───┴───┴───┴───┼───┴─┬─┴──┬─────┤
   * │     │    │     │                       │     │    │     │
   * └─────┴────┴─────┴───────────────────────┴─────┴────┴─────┘
   */
  // Row 1
  'S(KC_GRV)': { name: '>', title: 'IT_RABK' },
  KC_TILD: { name: '>', title: 'IT_RABK' },
  'S(KC_1)': { name: '!', title: 'IT_EXLM' },
  KC_EXLM: { name: '!', title: 'IT_EXLM' },
  'S(KC_2)': { name: '"', title: 'IT_DQUO' },
  KC_AT: { name: '"', title: 'IT_DQUO' },
  'S(KC_3)': { name: '£', title: 'IT_PND' },
  KC_HASH: { name: '£', title: 'IT_PND' },
  'S(KC_4)': { name: '$', title: 'IT_DLR' },
  KC_DLR: { name: '$', title: 'IT_DLR' },
  'S(KC_5)': { name: '%', title: 'IT_PERC' },
  KC_PERC: { name: '%', title: 'IT_PERC' },
  'S(KC_6)': { name: '&', title: 'IT_AMPR' },
  KC_CIRC: { name: '&', title: 'IT_AMPR' },
  'S(KC_7)': { name: '/', title: 'IT_SLSH' },
  KC_AMPR: { name: '/', title: 'IT_SLSH' },
  'S(KC_8)': { name: '(', title: 'IT_LPRN' },
  KC_ASTR: { name: '(', title: 'IT_LPRN' },
  'S(KC_9)': { name: ')', title: 'IT_RPRN' },
  KC_LPRN: { name: ')', title: 'IT_RPRN' },
  'S(KC_0)': { name: '=', title: 'IT_EQL' },
  KC_RPRN: { name: '=', title: 'IT_EQL' },
  'S(KC_MINS)': { name: '?', title: 'IT_QUES' },
  KC_UNDS: { name: '?', title: 'IT_QUES' },
  'S(KC_EQL)': { name: '^', title: 'IT_CIRC' },
  KC_PLUS: { name: '^', title: 'IT_CIRC' },
  // Row 2
  'S(KC_LBRC)': { name: 'é', title: 'IT_EACU' },
  KC_LCBR: { name: 'é', title: 'IT_EACU' },
  'S(KC_RBRC)': { name: '*', title: 'IT_ASTR' },
  KC_RCBR: { name: '*', title: 'IT_ASTR' },
  'S(KC_BSLS)': { name: '§', title: 'IT_SECT' },
  KC_PIPE: { name: '§', title: 'IT_SECT' },
  // Row 3
  'S(KC_SCLN)': { name: 'ç', title: 'IT_LCCE' },
  KC_COLN: { name: 'ç', title: 'IT_LCCE' },
  'S(KC_QUOT)': { name: '°', title: 'IT_DEG' },
  KC_DQUO: { name: '°', title: 'IT_DEG' },
  // Row 4
  'S(KC_NUBS)': { name: '|', title: 'IT_PIPE' },
  'S(KC_COMM)': { name: ';', title: 'IT_SCLN' },
  KC_LT: { name: ';', title: 'IT_SCLN' },
  'S(KC_DOT)': { name: ':', title: 'IT_COLN' },
  KC_GT: { name: ':', title: 'IT_COLN' },
  'S(KC_SLSH)': { name: '_', title: 'IT_UNDS' },
  KC_QUES: { name: '_', title: 'IT_UNDS' },

  /* Alted symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬─────┐
   * │ ≤ │ « │ “ │ ‘ │ ¥ │ ~ │ ‹ │ ÷ │ ´ │ ` │ ≠ │ ¡ │ ˆ │     │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬───┤
   * │     │ „ │ Ω │ € │ ® │ ™ │ Æ │ ¨ │ Œ │ Ø │ π │ [ │ ] │ ¶ │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴───┤
   * │      │ Å │ ß │ ∂ │ ƒ │ ∞ │ ∆ │ ª │ º │ ¬ │ @ │ # │      │
   * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴──────┤
   * │        │ ∑ │ † │ © │ √ │ ∫ │ ˜ │ µ │ … │ • │ – │        │
   * ├─────┬──┴─┬─┴───┼───┴───┴───┴───┴───┴───┼───┴─┬─┴──┬─────┤
   * │     │    │     │                       │     │    │     │
   * └─────┴────┴─────┴───────────────────────┴─────┴────┴─────┘
   */
  // Row 1
  'A(KC_GRV)': { name: '≤', title: 'IT_LTEQ' },
  'A(KC_1)': { name: '«', title: 'IT_LDAQ' },
  'A(KC_2)': { name: '“', title: 'IT_LDQU' },
  'A(KC_3)': { name: '‘', title: 'IT_LSQU' },
  'A(KC_4)': { name: '¥', title: 'IT_YEN' },
  'A(KC_5)': { name: '~', title: 'IT_TILD' },
  'A(KC_6)': { name: '‹', title: 'IT_LSAQ' },
  'A(KC_7)': { name: '÷', title: 'IT_DIV' },
  'A(KC_8)': { name: '´', title: 'IT_ACUT (dead)' },
  'A(KC_9)': { name: '`', title: 'IT_DGRV (dead)' },
  'A(KC_0)': { name: '≠', title: 'IT_NEQL' },
  'A(KC_MINS)': { name: '¡', title: 'IT_IEXL' },
  'A(KC_EQL)': { name: 'ˆ', title: 'IT_DCIR (dead)' },
  // Row 2
  'A(KC_Q)': { name: '„', title: 'IT_DLQU' },
  'A(KC_W)': { name: 'Ω', title: 'IT_OMEG' },
  'A(KC_E)': { name: '€', title: 'IT_EURO' },
  'A(KC_R)': { name: '®', title: 'IT_REGD' },
  'A(KC_T)': { name: '™', title: 'IT_TM' },
  'A(KC_Y)': { name: 'Æ', title: 'IT_AE' },
  'A(KC_U)': { name: '¨', title: 'IT_DIAE (dead)' },
  'A(KC_I)': { name: 'Œ', title: 'IT_OE' },
  'A(KC_O)': { name: 'Ø', title: 'IT_OSTR' },
  'A(KC_P)': { name: 'π', title: 'IT_PI' },
  'A(KC_LBRC)': { name: '[', title: 'IT_LBRC' },
  'A(KC_RBRC)': { name: ']', title: 'IT_RBRC' },
  // Row 3
  'A(KC_A)': { name: 'Å', title: 'IT_ARNG' },
  'A(KC_S)': { name: 'ß', title: 'IT_SS' },
  'A(KC_D)': { name: '∂', title: 'IT_PDIF' },
  'A(KC_F)': { name: 'ƒ', title: 'IT_FHK' },
  'A(KC_G)': { name: '∞', title: 'IT_INFN' },
  'A(KC_H)': { name: '∆', title: 'IT_INCR' },
  'A(KC_J)': { name: 'ª', title: 'IT_FORD' },
  'A(KC_K)': { name: 'º', title: 'IT_MORD' },
  'A(KC_L)': { name: '¬', title: 'IT_NOT' },
  'A(KC_SCLN)': { name: '@', title: 'IT_AT' },
  'A(KC_QUOT)': { name: '#', title: 'IT_HASH' },
  'A(KC_BSLS)': { name: '¶', title: 'IT_PILC' },
  // Row 4
  'A(KC_NUBS)': { name: '`', title: 'IT_GRV' },
  'A(KC_Z)': { name: '∑', title: 'IT_NARS' },
  'A(KC_X)': { name: '†', title: 'IT_DAGG' },
  'A(KC_C)': { name: '©', title: 'IT_COPY' },
  'A(KC_V)': { name: '√', title: 'IT_SQRT' },
  'A(KC_B)': { name: '∫', title: 'IT_INTG' },
  'A(KC_N)': { name: '˜', title: 'IT_STIL (dead)' },
  'A(KC_M)': { name: 'µ', title: 'IT_MICR' },
  'A(KC_COMM)': { name: '…', title: 'IT_ELLP' },
  'A(KC_DOT)': { name: '•', title: 'IT_BULT' },
  'A(KC_SLSH)': { name: '–', title: 'IT_NDSH' },

  /* Shift+Alted symbols
   * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬─────┐
   * │ ≥ │ » │ ” │ ’ │ ¢ │ ‰ │ › │ ⁄ │  │   │ ≈ │ ¿ │ ± │     │
   * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬───┤
   * │     │ ‚ │ À │ È │ Ì │ Ò │   │ Ù │   │   │ ∏ │ { │ } │ ◊ │
   * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴───┤
   * │      │   │ ¯ │ ˘ │ ˙ │ ˚ │ ¸ │ ˝ │ ˛ │ ˇ │ Ç │ ∞ │      │
   * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴──────┤
   * │        │   │ ‡ │ Á │ É │ Í │ Ó │ Ú │   │ · │ — │        │
   * ├─────┬──┴─┬─┴───┼───┴───┴───┴───┴───┴───┼───┴─┬─┴──┬─────┤
   * │     │    │     │                       │     │    │     │
   * └─────┴────┴─────┴───────────────────────┴─────┴────┴─────┘
   */
  // Row 1
  'S(A(KC_GRV))': { name: '≥', title: 'IT_GTEQ' },
  'S(A(KC_1))': { name: '»', title: 'IT_RDAQ' },
  'S(A(KC_2))': { name: '”', title: 'IT_RDQU' },
  'S(A(KC_3))': { name: '’', title: 'IT_RSQU' },
  'S(A(KC_4))': { name: '¢', title: 'IT_CENT' },
  'S(A(KC_5))': { name: '‰', title: 'IT_PERM' },
  'S(A(KC_6))': { name: '›', title: 'IT_RSAQ' },
  'S(A(KC_7))': { name: '⁄', title: 'IT_FRSL' },
  'S(A(KC_8))': { name: '', title: 'IT_APPL (Apple logo)' },
  'S(A(KC_0))': { name: '≈', title: 'IT_AEQL' },
  'S(A(KC_MINS))': { name: '¿', title: 'IT_IQUE' },
  'S(A(KC_EQL))': { name: '±', title: 'IT_PLMN' },
  // Row 2
  'S(A(KC_Q))': { name: '‚', title: 'IT_SLQU' },
  'S(A(KC_W))': { name: 'À', title: 'IT_CAGR' },
  'S(A(KC_E))': { name: 'È', title: 'IT_CEGR' },
  'S(A(KC_R))': { name: 'Ì', title: 'IT_CIGR' },
  'S(A(KC_T))': { name: 'Ò', title: 'IT_COGR' },
  'S(A(KC_U))': { name: 'Ù', title: 'IT_CUGR' },
  'S(A(KC_P))': { name: '∏', title: 'IT_NARP' },
  'S(A(KC_LBRC))': { name: '{', title: 'IT_LCBR' },
  'S(A(KC_RBRC))': { name: '}', title: 'IT_RCBR' },
  'S(A(KC_BSLS))': { name: '◊', title: 'IT_LOZN' },
  // Row 3
  'S(A(KC_S))': { name: '¯', title: 'IT_MACR' },
  'S(A(KC_D))': { name: '˘', title: 'IT_BREV' },
  'S(A(KC_F))': { name: '˙', title: 'IT_DOTA' },
  'S(A(KC_G))': { name: '˚', title: 'IT_RGNA' },
  'S(A(KC_H))': { name: '¸', title: 'IT_CEDL' },
  'S(A(KC_J))': { name: '˝', title: 'IT_DACU' },
  'S(A(KC_K))': { name: '˛', title: 'IT_OGON' },
  'S(A(KC_L))': { name: 'ˇ', title: 'IT_CARN' },
  'S(A(KC_SCLN))': { name: 'Ç', title: 'IT_CCCE' },
  // Row 4
  'S(A(KC_X))': { name: '‡', title: 'IT_DDAG' },
  'S(A(KC_C))': { name: 'Á', title: 'IT_CAAC' },
  'S(A(KC_V))': { name: 'É', title: 'IT_CEAC' },
  'S(A(KC_B))': { name: 'Í', title: 'IT_CIAC' },
  'S(A(KC_N))': { name: 'Ó', title: 'IT_COAC' },
  'S(A(KC_M))': { name: 'Ú', title: 'IT_CUAC' },
  'S(A(KC_DOT))': { name: '·', title: 'IT_MDDT' },
  'S(A(KC_SLSH))': { name: '—', title: 'IT_MDSH' },

  /* Other keys */
  KC_NUHS: { name: '§\nù', title: '' },
  'S(KC_NUHS)': { name: '§', title: '' },

  KC_LSPO: { name: 'LS / )', title: 'Left Shift when held, ) when tapped' },
  KC_RSPC: { name: 'RS / =', title: 'Right Shift when held, = when tapped' },
  KC_LCPO: { name: 'LC / )', title: 'Left Control when held, ) when tapped' },
  KC_RCPC: { name: 'RC / =', title: 'Right Control when held, = when tapped' },
  KC_LAPO: { name: 'LA / )', title: 'Left Alt when held, ) when tapped' },
  KC_RAPC: { name: 'RA / =', title: 'Right Alt when held, = when tapped' },

  QK_GESC: {
    name: '< / >\nEsc',
    title: 'Esc normally, but < when GUI is active or > when Shift is active'
  }
};
