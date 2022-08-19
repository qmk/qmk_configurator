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

/* Dvorak for the French language
 * Version: 2
 *
 * The layout is designed by Francis Leboutte <dvorak-fr@algo.be>
 *
 * Source: https://algo.be/ergo/dvorak-fr.html
 */





export default {

/*
 * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
 * │ « │ » │ / │ - │ è │ \ │ ^ │ ( │ ` │ ) │ _ │ [ │ ] │       │
 * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
 * │     │ : │ ' │ é │ G │ . │ H │ V │ C │ M │ K │ Z │ ¨ │     │
 * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┐    │
 * │      │ O │ A │ U │ E │ B │ F │ S │ T │ N │ D │ W │ ~ │    │
 * ├────┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┴────┤
 * │    │ à │ ; │ Q │ , │ I │ Y │ X │ R │ L │ P │ J │          │
 * ├────┼───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
 * │    │    │    │                        │    │    │    │    │
 * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
 */
// Row 1
'KC_GRV': {"name":"*\n«","title":"DV_LDAQ"},
'KC_1': {"name":"1\n»","title":"DV_RDAQ"},
'KC_2': {"name":"2\n/","title":"DV_SLSH"},
'KC_3': {"name":"3\n-","title":"DV_MINS"},
'KC_4': {"name":"4\nè","title":"DV_EGRV"},
'KC_5': {"name":"5\n\\","title":"DV_BSLS"},
'KC_6': {"name":"6\n^","title":"DV_CIRC (dead)"},
'KC_7': {"name":"7\n(","title":"DV_LPRN"},
'KC_8': {"name":"8\n`","title":"DV_GRV (dead)"},
'KC_9': {"name":"9\n)","title":"DV_RPRN"},
'KC_0': {"name":"0\n_","title":"DV_UNDS"},
'KC_MINS': {"name":"+\n[","title":"DV_LBRC"},
'KC_EQL': {"name":"%\n]","title":"DV_RBRC"},
// Row 2
'KC_Q': {"name":"?\n:","title":"DV_COLN"},
'KC_W': {"name":"<\n'","title":"DV_QUOT"},
'KC_E': {"name":">\né","title":"DV_EACU"},
'KC_R': {"name":"G","title":"DV_G"},
'KC_T': {"name":"!\n.","title":"DV_DOT"},
'KC_Y': {"name":"H","title":"DV_H"},
'KC_U': {"name":"V","title":"DV_V"},
'KC_I': {"name":"C","title":"DV_C"},
'KC_O': {"name":"M","title":"DV_M"},
'KC_P': {"name":"K","title":"DV_K"},
'KC_LBRC': {"name":"Z","title":"DV_Z"},
'KC_RBRC': {"name":"=\n¨","title":"DV_DIAE (dead)"},
// Row 3
'KC_A': {"name":"O","title":"DV_O"},
'KC_S': {"name":"A","title":"DV_A"},
'KC_D': {"name":"U","title":"DV_U"},
'KC_F': {"name":"E","title":"DV_E"},
'KC_G': {"name":"B","title":"DV_B"},
'KC_H': {"name":"F","title":"DV_F"},
'KC_J': {"name":"S","title":"DV_S"},
'KC_K': {"name":"T","title":"DV_T"},
'KC_L': {"name":"N","title":"DV_N"},
'KC_SCLN': {"name":"D","title":"DV_D"},
'KC_QUOT': {"name":"W","title":"DV_W"},
'KC_NUHS': {"name":"#\n~","title":"DV_TILD (dead)"},
// Row 4
'KC_NUBS': {"name":"ç\nà","title":"DV_AGRV"},
'KC_Z': {"name":"|\n;","title":"DV_SCLN"},
'KC_X': {"name":"Q","title":"DV_Q"},
'KC_C': {"name":"@\n,","title":"DV_COMM"},
'KC_V': {"name":"I","title":"DV_I"},
'KC_B': {"name":"Y","title":"DV_Y"},
'KC_N': {"name":"X","title":"DV_X"},
'KC_M': {"name":"R","title":"DV_R"},
'KC_COMM': {"name":"L","title":"DV_L"},
'KC_DOT': {"name":"P","title":"DV_P"},
'KC_SLSH': {"name":"J","title":"DV_J"},

/* Shifted symbols
 * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐
 * │ * │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 0 │ 0 │ + │ % │       │
 * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤
 * │     │ ? │ < │ > │   │ ! │   │   │   │   │   │   │ = │     │
 * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┐    │
 * │      │   │   │   │   │   │   │   │   │   │   │   │ # │    │
 * ├────┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┴────┤
 * │    │ ç │ | │   │ @ │   │   │   │   │   │   │   │          │
 * ├────┼───┴┬──┴─┬─┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤
 * │    │    │    │                        │    │    │    │    │
 * └────┴────┴────┴────────────────────────┴────┴────┴────┴────┘
 */
// Row 1
'S(KC_GRV)': {"name":"*","title":"DV_ASTR"},
'KC_TILD': {"name":"*","title":"DV_ASTR"},
'S(KC_1)': {"name":"1","title":"DV_1"},
'KC_EXLM': {"name":"1","title":"DV_1"},
'S(KC_2)': {"name":"2","title":"DV_2"},
'KC_AT': {"name":"2","title":"DV_2"},
'S(KC_3)': {"name":"3","title":"DV_3"},
'KC_HASH': {"name":"3","title":"DV_3"},
'S(KC_4)': {"name":"4","title":"DV_4"},
'KC_DLR': {"name":"4","title":"DV_4"},
'S(KC_5)': {"name":"5","title":"DV_5"},
'KC_PERC': {"name":"5","title":"DV_5"},
'S(KC_6)': {"name":"6","title":"DV_6"},
'KC_CIRC': {"name":"6","title":"DV_6"},
'S(KC_7)': {"name":"7","title":"DV_7"},
'KC_AMPR': {"name":"7","title":"DV_7"},
'S(KC_8)': {"name":"8","title":"DV_8"},
'KC_ASTR': {"name":"8","title":"DV_8"},
'S(KC_9)': {"name":"9","title":"DV_9"},
'KC_LPRN': {"name":"9","title":"DV_9"},
'S(KC_0)': {"name":"0","title":"DV_0"},
'KC_RPRN': {"name":"0","title":"DV_0"},
'S(KC_MINS)': {"name":"+","title":"DV_PLUS"},
'KC_UNDS': {"name":"+","title":"DV_PLUS"},
'S(KC_EQL)': {"name":"%","title":"DV_PERC"},
'KC_PLUS': {"name":"%","title":"DV_PERC"},
// Row 2
'S(KC_Q)': {"name":"?","title":"DV_QUES"},
'S(KC_W)': {"name":"<","title":"DV_LABK"},
'S(KC_E)': {"name":">","title":"DV_RABK"},
'S(KC_T)': {"name":"!","title":"DV_EXLM"},
'S(KC_RBRC)': {"name":"=","title":"DV_EQL"},
'KC_RCBR': {"name":"=","title":"DV_EQL"},
// Row 3
'S(KC_NUHS)': {"name":"#","title":"DV_HASH"},
// Row 4
'S(KC_NUBS)': {"name":"ç","title":"DV_CCED"},
'S(KC_Z)': {"name":"|","title":"DV_PIPE"},
'S(KC_C)': {"name":"@","title":"DV_AT"},

/* Other keys */
'KC_BSLS': {"name":"#\n~","title":"(dead)"},
'S(KC_BSLS)': {"name":"#","title":""},
'KC_LCBR': {"name":"Z","title":"S(DV_Z) (capital Z)"},
'KC_LT': {"name":"L","title":"S(DV_L) (capital L)"},
'KC_GT': {"name":"P","title":"S(DV_P) (capital P)"},
'KC_COLN': {"name":"D","title":"S(DV_D) (capital D)"},
'KC_PIPE': {"name":"#","title":"DV_HASH"},
'KC_QUES': {"name":"J","title":"S(DV_J) (capital J)"},
'KC_DQUO': {"name":"W","title":"S(DV_W) (capital W)"},

'KC_LSPO': {"name":"LS / 9","title":"Left Shift when held, 9 when tapped"},
'KC_RSPC': {"name":"RS / 0","title":"Right Shift when held, 0 when tapped"},
'KC_LCPO': {"name":"LC / 9","title":"Left Control when held, 9 when tapped"},
'KC_RCPC': {"name":"RC / 0","title":"Right Control when held, 0 when tapped"},
'KC_LAPO': {"name":"LA / 9","title":"Left Alt when held, 9 when tapped"},
'KC_RAPC': {"name":"RA / 0","title":"Right Alt when held, 0 when tapped"},

'QK_GESC': {"name":"« / *\nEsc","title":"Esc normally, but « when GUI is active or * when Shift is active"},
}
