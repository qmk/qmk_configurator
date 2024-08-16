// SPDX-License-Identifier: GPL-3.0-or-later
/* global require, process */
const fs = require('fs');

// Taken from https://invisible-characters.com/
const invisibleChar2readableName = new Map([
  ['\u0009', 'Tab'],
  ['\u0020', 'Space'],
  ['\u00A0', 'No-break space'],
  ['\u00AD', 'Soft hyphen'],
  ['\u034F', 'Combining grapheme joiner'],
  ['\u061C', 'Arabic letter mark'],
  ['\u115F', 'Hangul choseong filler'],
  ['\u1160', 'Hangul jungseong filler'],
  ['\u17B4', 'Khmer vowel inherent aq'],
  ['\u17B5', 'Khmer vowel inherent aa'],
  ['\u180E', 'Mongolian vowel separator'],
  ['\u2000', 'En quad'],
  ['\u2001', 'Em quad'],
  ['\u2002', 'En space'],
  ['\u2003', 'Em space'],
  ['\u2004', 'Three-per-em space'],
  ['\u2005', 'Four-per-em space'],
  ['\u2006', 'Six-per-em space'],
  ['\u2007', 'Figure space'],
  ['\u2008', 'Punctuation space'],
  ['\u2009', 'Thin space'],
  ['\u200A', 'Hair space'],
  ['\u200B', 'Zero width space'],
  ['\u200C', 'Zero width non-joiner'],
  ['\u200D', 'Zero width joiner'],
  ['\u200E', 'Left-to-right mark'],
  ['\u200F', 'Right-to-left mark'],
  ['\u202F', 'Narrow no-break space'],
  ['\u205F', 'Medium mathematical space'],
  ['\u2060', 'Word joiner'],
  ['\u2061', 'Function application'],
  ['\u2062', 'Invisible times'],
  ['\u2063', 'Invisible separator'],
  ['\u2064', 'Invisible plus'],
  ['\u206A', 'Inhibit symmetric swapping'],
  ['\u206B', 'Activate symmetric swapping'],
  ['\u206C', 'Inhibit arabic form shaping'],
  ['\u206D', 'Activate arabic form shaping'],
  ['\u206E', 'National digit shapes'],
  ['\u206F', 'Nominal digit shapes'],
  ['\u3000', 'Ideographic space'],
  ['\u2800', 'Braille pattern blank'],
  ['\u3164', 'Hangul filler'],
  ['\uFEFF', 'Zero width no-break space'],
  ['\uFFA0', 'Halfwidth hangul filler'],
  ['\u1D159', 'Musical symbol null notehead'],
  ['\u1D173', 'Musical symbol begin beam'],
  ['\u1D174', 'Musical symbol end beam'],
  ['\u1D175', 'Musical symbol begin tie'],
  ['\u1D176', 'Musical symbol end tie'],
  ['\u1D177', 'Musical symbol begin slur'],
  ['\u1D178', 'Musical symbol end slur'],
  ['\u1D179', 'Musical symbol begin phrase'],
  ['\u1D17A', 'Musical symbol end phrase']
]);

const shiftedKc2shiftedAlias = new Map([
  ['S(KC_GRV)', 'KC_TILD'],
  ['S(KC_1)', 'KC_EXLM'],
  ['S(KC_2)', 'KC_AT'],
  ['S(KC_3)', 'KC_HASH'],
  ['S(KC_4)', 'KC_DLR'],
  ['S(KC_5)', 'KC_PERC'],
  ['S(KC_6)', 'KC_CIRC'],
  ['S(KC_7)', 'KC_AMPR'],
  ['S(KC_8)', 'KC_ASTR'],
  ['S(KC_9)', 'KC_LPRN'],
  ['S(KC_0)', 'KC_RPRN'],
  ['S(KC_MINS)', 'KC_UNDS'],
  ['S(KC_EQL)', 'KC_PLUS'],
  ['S(KC_LBRC)', 'KC_LCBR'],
  ['S(KC_RBRC)', 'KC_RCBR'],
  ['S(KC_COMM)', 'KC_LABK'],
  ['S(KC_DOT)', 'KC_RABK'],
  ['S(KC_SCLN)', 'KC_COLN'],
  ['S(KC_BSLS)', 'KC_PIPE'],
  ['S(KC_COMM)', 'KC_LT'],
  ['S(KC_DOT)', 'KC_GT'],
  ['S(KC_SLSH)', 'KC_QUES'],
  ['S(KC_QUOT)', 'KC_DQUO']
]);

const intlAliasPattern = '\\w+';
const macroExpansionPattern = '[\\w\\(\\)]+';
const commentPattern = '.*$';
const kcAliasDefRegExp = new RegExp(
  `# *define +(${intlAliasPattern}) +(${macroExpansionPattern}) *// *(${commentPattern})`
);

function extractBasicKc(kc) {
  if (!kc.includes('(')) {
    // Not a modded keycode string.
    return kc;
  }
  return kc.slice(kc.lastIndexOf('(') + 1, kc.indexOf(')')).trim();
}

function translateToUS(kc, intl2us) {
  const basicKc = extractBasicKc(kc);
  const basicUSKc = intl2us.get(basicKc) || basicKc;
  if (!basicUSKc.includes('KC_')) {
    console.error('State of intl2us:');
    console.error(intl2us);
    if (!intl2us.has(basicKc)) {
      throw new Error(`US translation of "${basicKc}" not found in intl2us!`);
    } else {
      throw new Error(
        `${basicKc} gets translated as ${basicUSKc}, in intl2us, but this is not actually a valid US keycode!`
      );
    }
  }
  return kc.replace(basicKc, basicUSKc);
}

function computeIntl2US(lines) {
  let intl2us = new Map();
  for (const aliasDefinition of lines.filter((line) =>
    kcAliasDefRegExp.test(line)
  )) {
    const [/*fullMatch, */ intlAlias, macroExpansion] =
      kcAliasDefRegExp.exec(aliasDefinition);
    const usAlias = translateToUS(macroExpansion, intl2us);
    intl2us.set(intlAlias, usAlias);
  }
  return intl2us;
}

function parseComment(comment) {
  // String.prototype.trim is not acceptable because it trims ALL whitespace characters;
  // it doesn't limit itself to U+20 SPACE.
  const trimSpaces = (str) => /^ *(.*?) *$/.exec(str)[1];
  const clarificationIndex =
    comment.indexOf('(') === -1 ? comment.length : comment.indexOf('(');
  let [keysym, clarification] = [
    comment.slice(0, clarificationIndex),
    comment.slice(clarificationIndex)
  ].map(trimSpaces);
  if (keysym.length === 0 && clarification.length > 0) {
    // There can't be a clarification without a keysym.
    // Notably, this is what catches the case where the comment is just ")".
    // Meaning that the keysym of this keycode is the opening parenthesis.
    [keysym, clarification] = [clarification, keysym];
  }
  return [keysym, clarification];
}

function computeKcInfo(lines, intl2us) {
  let kcInfo = new Map();
  for (const aliasDefinition of lines.filter((line) =>
    kcAliasDefRegExp.test(line)
  )) {
    const [fullMatch, intlAlias, macroExpansion, comment] =
      kcAliasDefRegExp.exec(aliasDefinition);
    const [keysym, clarification] = parseComment(comment);
    let readableKeysym = keysym;
    // This obscure-looking regular expression is used to detect unicode characters
    // pertaining to the [Marking, non-spacing](https://www.fileformat.info/info/unicode/category/Mn/list.htm) general category.
    // This category includes characters such as COMBINING HORN which can, surprisingly enough, combine with the (double) quote
    // character used to start a string in the generated output, and thus ruin the entire syntax.
    //
    // For an example of a keymap_extras header containing those characters, check out keymap_bepo.h
    const markingNonSpacingRegExp = /(\p{gc=Mn})/gu;
    if (markingNonSpacingRegExp.test(keysym)) {
      const dottedCircle = '\u25cc';
      readableKeysym = keysym.replaceAll(
        markingNonSpacingRegExp,
        dottedCircle + '$1'
      );
    } else if (keysym.length === 1 && invisibleChar2readableName.has(keysym)) {
      readableKeysym = invisibleChar2readableName.get(keysym);
    }
    if (keysym.length > 3) {
      console.error(
        `Warning: parsing the line below associated a keysym of length greater than 3 (${keysym}) to ${intlAlias} aka ${macroExpansion}. This may cause the key legend text to overflow.`
      );
      console.error(fullMatch);
    }
    // aka the hover tip
    const title = (intlAlias + ' ' + clarification).trimEnd();
    const usMacroExpansion = translateToUS(macroExpansion, intl2us);
    kcInfo.set(usMacroExpansion, {
      intlAlias,
      clarification,
      title,
      keysym: readableKeysym,
      name: readableKeysym
    });
    const shiftedKcRegExp = /^(?:S|LSFT)\(\w+\)$/;
    if (shiftedKcRegExp.test(macroExpansion)) {
      if (shiftedKc2shiftedAlias.has(usMacroExpansion)) {
        kcInfo.set(
          shiftedKc2shiftedAlias.get(usMacroExpansion),
          kcInfo.get(usMacroExpansion)
        );
      }
      const basicKc = extractBasicKc(macroExpansion);
      const basicUSKc = translateToUS(basicKc, intl2us);
      if (kcInfo.has(basicUSKc)) {
        const basicKcInfo = kcInfo.get(basicUSKc);
        basicKcInfo.name = readableKeysym + '\n' + basicKcInfo.name;
      } else if (!basicKc.startsWith('KC_')) {
        console.error('State of kcInfo:');
        console.error(kcInfo);
        throw new Error(
          'Encountered the definition of a shifted keycode before having read the definition of the corresponding basic keycode first, when reading the following line.\n' +
            fullMatch
        );
      }
    }
  }
  return kcInfo;
}

function stringify(usAlias, kcInfoObject) {
  // Important to surround the usAlias with quotes because it may contain parentheses.
  const stringified = `'${usAlias}': ${JSON.stringify(kcInfoObject, [
    'name',
    'title'
  ])},`;
  if (stringified.includes('undefined')) {
    throw new Error(
      `Failed to stringify the kcInfoObject associated to ${usAlias}:\n${stringified}`
    );
  }
  return stringified;
}

function convertLine(line, kcInfo, intl2us) {
  if (line.includes('clang-format off')) {
    return 'export default {';
  }

  const copyrightRegExp = /(^.*)Copyright .*$/;
  if (copyrightRegExp.test(line)) {
    let [/*fullMatch,*/ beforeCopyrightWord] = copyrightRegExp.exec(line);
    return (
      beforeCopyrightWord +
      'Copyright ' +
      new Date().getFullYear() +
      ' - Generated by convert_keymap_extras_header.js'
    );
  }

  const nonDefineDirectiveRegExp = /^#\s*(?!define)/;
  if (nonDefineDirectiveRegExp.test(line)) {
    return '';
  }

  if (kcAliasDefRegExp.test(line)) {
    let [fullMatch, /*intlAlias, */ macroExpansion /*, comment*/] =
      kcAliasDefRegExp.exec(line);
    const usMacroExpansion = translateToUS(macroExpansion, intl2us);
    let kcInfoLine = stringify(usMacroExpansion, kcInfo.get(usMacroExpansion));
    if (shiftedKc2shiftedAlias.has(usMacroExpansion)) {
      const shiftedAlias = shiftedKc2shiftedAlias.get(usMacroExpansion);
      kcInfoLine +=
        '\n' + stringify(shiftedAlias, kcInfo.get(usMacroExpansion));
    }
    if (kcInfoLine.includes('undefined')) {
      throw new Error(
        'Parsing error occured for the following line:\n' + fullMatch
      );
    }
    return kcInfoLine;
  }

  return line;
}

function generateMissingANSISOkeys(kcInfo) {
  const fallbackKc = kcInfo.has('KC_BSLS') ? 'KC_BSLS' : 'KC_NUHS';
  const missingKcs = ['KC_BSLS', 'KC_NUHS', 'KC_NUBS'].filter(
    (kc) => !kcInfo.has(kc)
  );
  let missingKcInfoLines = [];
  for (const missingKc of missingKcs) {
    const baseKcInfo = kcInfo.get(fallbackKc);
    const shiftedKcInfo = kcInfo.get(`S(${fallbackKc})`) || baseKcInfo;
    if (baseKcInfo === undefined || shiftedKcInfo === undefined) {
      throw new Error(
        'The input file is missing a mapping to both KC_BSLS and KC_NUHS. At least one of them must be mapped to a locale alias!'
      );
    }
    // Copy the KC_NUHS kc info object but replace the associated intl alias with KC_BSLS/KC_PIPE.
    // Since it is pointless to repeat the US kc alias in the title, we only keep the clarification.
    const missingKcInfo = {
      ...baseKcInfo,
      title: baseKcInfo.clarification
    };
    const missingShiftedKcInfo = {
      ...shiftedKcInfo,
      title: shiftedKcInfo.clarification
    };
    kcInfo.set(missingKc, missingKcInfo);
    kcInfo.set(`S(${missingKc})`, missingShiftedKcInfo);
    missingKcInfoLines.push(stringify(missingKc, missingKcInfo));
    missingKcInfoLines.push(stringify(`S(${missingKc})`, missingShiftedKcInfo));
  }
  return missingKcInfoLines.join('\n');
}

function generateMissingShiftedAliasKcInfo(kcInfo) {
  let ret = '';
  for (const [shiftedKc, shiftedAlias] of shiftedKc2shiftedAlias.entries()) {
    if (kcInfo.has(shiftedAlias)) {
      continue;
    }
    const shiftedAliasKcInfo = {
      ...(kcInfo.get(shiftedKc) || kcInfo.get(extractBasicKc(shiftedKc)))
    };
    // In virtue of `generateMissingANSISOkeys`, the intlAlias of the kc info object associated
    // to S(KC_BSLS)/KC_PIPE is already a shifted keycode to begin with, no need to surround it
    // with `S()`.
    if (shiftedAlias === 'KC_PIPE') {
      shiftedAliasKcInfo.title = shiftedAliasKcInfo.intlAlias;
    } else {
      shiftedAliasKcInfo.title = `S(${shiftedAliasKcInfo.intlAlias})`;
    }
    const letterRegExp = /^\p{L}$/u;
    if (letterRegExp.test(shiftedAliasKcInfo.keysym)) {
      shiftedAliasKcInfo.title += ` (capital ${shiftedAliasKcInfo.keysym})`;
    }
    ret += stringify(shiftedAlias, shiftedAliasKcInfo) + '\n';
  }
  return ret;
}

function generateSpaceCadetKcInfo(kc, kcInfo) {
  const spaceCadetKeycodeRegExp = /([LR])([GASC])P([OC])/;
  let [/*fullMatch, */ handedness, modifier, variant] =
    spaceCadetKeycodeRegExp.exec(kc);
  const table = new Map([
    ['L', 'Left'],
    ['R', 'Right'],
    ['G', 'GUI'],
    ['A', 'Alt'],
    ['C', 'Control'],
    ['S', 'Shift']
  ]);
  const tapKc = variant === 'C' ? 'S(KC_0)' : 'S(KC_9)';
  const keysym = (kcInfo.get(tapKc) || kcInfo.get(extractBasicKc(tapKc)))
    .keysym;
  const spaceCadetInfo = {
    name: `${handedness}${modifier} / ${keysym}`,
    title: `${table.get(handedness)} ${table.get(
      modifier
    )} when held, ${keysym} when tapped`
  };
  return stringify(kc, spaceCadetInfo);
}

if (process.argv.length <= 1 || process.argv.at(-1).endsWith('.js')) {
  throw new Error(
    'No input file given as argument! Make sure to specify the path to the keymap_extras header file you wish to convert when calling this script.'
  );
}

fs.readFile(process.argv.at(-1), 'utf8', function (err, data) {
  if (err) {
    console.error(err.stack);
  } else {
    const fileLines = data.replaceAll('(backslash)', '\\').split(/\r\n|\r|\n/);
    let intl2us = computeIntl2US(fileLines);
    const kcInfo = computeKcInfo(fileLines, intl2us);
    if (kcInfo.size === 0) {
      throw new Error(
        'No keycode mappings found! Make sure that the input file contains lines in the format of `#define <intl alias> <macro expansion> // <keysym> <optional comment in parentheses>`.'
      );
    }
    let convertedLines = fileLines.map((line) =>
      convertLine(line, kcInfo, intl2us)
    );
    console.log(convertedLines.join('\n'));
    console.log('/* Other keys */');
    console.log(generateMissingANSISOkeys(kcInfo));
    console.log(generateMissingShiftedAliasKcInfo(kcInfo));
    const spaceCadetKeycodes = [
      'SC_LSPO',
      'SC_RSPC',
      'SC_LCPO',
      'SC_RCPC',
      'SC_LAPO',
      'SC_RAPC'
    ];
    for (const spaceCadetKc of spaceCadetKeycodes) {
      console.log(generateSpaceCadetKcInfo(spaceCadetKc, kcInfo));
    }
    console.log('');
    const grvKeysym = kcInfo.get('KC_GRV').keysym;
    const tildeKeysym = kcInfo.has('S(KC_GRV)')
      ? kcInfo.get('S(KC_GRV)').keysym
      : grvKeysym;
    if (tildeKeysym !== grvKeysym) {
      console.log(
        stringify('QK_GESC', {
          name: `${grvKeysym}/${tildeKeysym}\nEsc`,
          title: `Esc normally, but ${grvKeysym} when GUI is active or ${tildeKeysym} when Shift is active`
        })
      );
    } else {
      console.log(
        stringify('QK_GESC', {
          name: `${grvKeysym}\nEsc`,
          title: `Esc normally, but ${grvKeysym} when Shift or GUI is active`
        })
      );
    }
    console.log('}');
  }
});
