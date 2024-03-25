import belgian from './keymap_belgian';
import bepo from './keymap_bepo';
import brazilian_abnt2 from './keymap_brazilian_abnt2';
import canadian_multilingual from './keymap_canadian_multilingual';
import colemak from './keymap_colemak';
import croatian from './keymap_croatian';
import czech from './keymap_czech';
import danish from './keymap_danish';
import dvorak from './keymap_dvorak';
import dvorak_fr from './keymap_dvorak_fr';
import dvorak_programmer from './keymap_dvorak_programmer';
import estonian from './keymap_estonian';
import finnish from './keymap_finnish';
import french from './keymap_french';
import french_afnor from './keymap_french_afnor';
import french_mac_iso from './keymap_french_mac_iso';
import german from './keymap_german';
import greek from './keymap_greek';
import hebrew from './keymap_hebrew';
import hungarian from './keymap_hungarian';
import icelandic from './keymap_icelandic';
import irish from './keymap_irish';
import italian from './keymap_italian';
import italian_mac_ansi from './keymap_italian_mac_ansi';
import italian_mac_iso from './keymap_italian_mac_iso';
import japanese from './keymap_japanese';
import korean from './keymap_korean';
import latvian from './keymap_latvian';
import lithuanian_azerty from './keymap_lithuanian_azerty';
import lithuanian_qwerty from './keymap_lithuanian_qwerty';
import neo2 from './keymap_neo2';
import norman from './keymap_norman';
import norwegian from './keymap_norwegian';
import polish from './keymap_polish';
import portuguese from './keymap_portuguese';
import portuguese_mac_iso from './keymap_portuguese_mac_iso';
import romanian from './keymap_romanian';
import russian from './keymap_russian';
import serbian from './keymap_serbian';
import serbian_latin from './keymap_serbian_latin';
import slovak from './keymap_slovak';
import slovenian from './keymap_slovenian';
import spanish from './keymap_spanish';
import spanish_dvorak from './keymap_spanish_dvorak';
import spanish_latin_america from './keymap_spanish_latin_america';
import swedish from './keymap_swedish';
import swedish_mac_ansi from './keymap_swedish_mac_ansi';
import swedish_mac_iso from './keymap_swedish_mac_iso';
import swedish_pro_mac_ansi from './keymap_swedish_pro_mac_ansi';
import swedish_pro_mac_iso from './keymap_swedish_pro_mac_iso';
import swiss_de from './keymap_swiss_de';
import swiss_fr from './keymap_swiss_fr';
import turkish_f from './keymap_turkish_f';
import turkish_q from './keymap_turkish_q';
import uk from './keymap_uk';
import ukrainian from './keymap_ukrainian';
import us from './keymap_us';
import us_extended from './keymap_us_extended';
import us_international from './keymap_us_international';
import us_international_linux from './keymap_us_international_linux';
import workman from './keymap_workman';
import workman_zxcvm from './keymap_workman_zxcvm';

/* ==Template==
 * keymap_<lang>: {
 *
 *  prefix: (string) 2-letter code,
 *
 *  sendstring: (string) The name of the associated sendstring header file if it exists.
 *              This is important for the "host_language" field of keymap.json in case text macros are used.
 *
 *  isANSI: (boolean) True if the layout is ANSI, false if not.
 *
 *  locales: (array[string]) List of locales, as defined in RFC 5646, closely tied to this OS keyboard layout.
 *           This can be useful to guess the OS keyboard layout in use based on the user's preferred locale.
 *
 *  keycodeLUT: (Object<string, Object<string, string>) An object mapping US keycode aliases like "KC_A" or "KC_DLR" or even
 *              "QK_GESC" to a keycode object containing properties such as "name" (aka the key legends to display) and
 *              "title" (aka the extra information shown when hovering over the key).
 *  }
 */

export default {
  keymap_belgian: {
    prefix: 'BE',
    sendstring: 'belgian',
    isANSI: false,
    locales: ['nl-BE', 'fr-BE'],
    keycodeLUT: belgian
  },
  keymap_bepo: {
    prefix: 'BP',
    sendstring: 'bepo',
    isANSI: false,
    locales: ['fr', 'fr-FR', 'fr-BE', 'fr-CH', 'fr-LU', 'fr-CA', 'fr-MC'],
    keycodeLUT: bepo
  },
  keymap_brazilian_abnt2: {
    prefix: 'BR',
    sendstring: 'brazilian_abnt2',
    isANSI: false,
    locales: ['pt-BR'],
    keycodeLUT: brazilian_abnt2
  },
  keymap_canadian_multilingual: {
    prefix: 'CA',
    sendstring: 'canadian_multilingual',
    isANSI: false,
    locales: ['fr-CA'],
    keycodeLUT: canadian_multilingual
  },
  keymap_colemak: {
    prefix: 'CM',
    sendstring: 'colemak',
    isANSI: true,
    locales: [
      'en',
      'en-AU',
      'en-BZ',
      'en-CA',
      'en-CB',
      'en-GB',
      'en-IE',
      'en-JM',
      'en-NZ',
      'en-PH',
      'en-TT',
      'en-US',
      'en-ZA',
      'en-ZW'
    ],
    keycodeLUT: colemak
  },
  keymap_croatian: {
    prefix: 'HR',
    sendstring: 'croatian',
    isANSI: false,
    locales: ['hr', 'hr-HR'],
    keycodeLUT: croatian
  },
  keymap_czech: {
    prefix: 'CZ',
    sendstring: 'czech',
    locales: ['cs', 'cs-CZ'],
    isANSI: false,
    keycodeLUT: czech
  },
  keymap_danish: {
    prefix: 'DK',
    sendstring: 'danish',
    locales: ['da', 'da-DK'],
    isANSI: false,
    keycodeLUT: danish
  },
  keymap_dvorak_fr: {
    prefix: 'DV',
    sendstring: 'dvorak_fr',
    isANSI: false,
    locales: ['fr', 'fr-FR', 'fr-BE', 'fr-CH', 'fr-LU', 'fr-CA', 'fr-MC'],
    keycodeLUT: dvorak_fr
  },
  keymap_dvorak: {
    prefix: 'DV',
    sendstring: 'dvorak',
    isANSI: true,
    locales: [
      'en',
      'en-AU',
      'en-BZ',
      'en-CA',
      'en-CB',
      'en-GB',
      'en-IE',
      'en-JM',
      'en-NZ',
      'en-PH',
      'en-TT',
      'en-US',
      'en-ZA',
      'en-ZW'
    ],
    keycodeLUT: dvorak
  },
  keymap_dvorak_programmer: {
    prefix: 'DP',
    sendstring: 'dvorak_programmer',
    isANSI: true,
    locales: [
      'en',
      'en-AU',
      'en-BZ',
      'en-CA',
      'en-CB',
      'en-GB',
      'en-IE',
      'en-JM',
      'en-NZ',
      'en-PH',
      'en-TT',
      'en-US',
      'en-ZA',
      'en-ZW'
    ],
    keycodeLUT: dvorak_programmer
  },
  keymap_estonian: {
    prefix: 'EE',
    sendstring: 'estonian',
    isANSI: false,
    locales: ['et', 'et-EE'],
    keycodeLUT: estonian
  },
  keymap_finnish: {
    prefix: 'FI',
    sendstring: 'finnish',
    isANSI: false,
    locales: ['fi', 'fi-FI', 'se-FI', 'sv-FI'],
    keycodeLUT: finnish
  },
  keymap_french_afnor: {
    prefix: 'FR',
    sendstring: 'french_afnor',
    isANSI: false,
    locales: ['fr', 'fr-FR'],
    keycodeLUT: french_afnor
  },
  keymap_french: {
    prefix: 'FR',
    sendstring: 'french',
    isANSI: false,
    locales: ['fr', 'fr-FR'],
    keycodeLUT: french
  },
  keymap_french_mac_iso: {
    prefix: 'FR',
    sendstring: 'french_mac_iso',
    isANSI: false,
    locales: ['fr', 'fr-FR'],
    keycodeLUT: french_mac_iso
  },
  keymap_german: {
    prefix: 'DE',
    sendstring: 'german',
    isANSI: false,
    locales: ['de-GE', 'de-AU', 'de'],
    keycodeLUT: german
  },
  keymap_greek: {
    prefix: 'GR',
    sendstring: '', // Non-Latin script
    isANSI: false,
    locales: ['el', 'el-GR'],
    keycodeLUT: greek
  },
  keymap_hebrew: {
    prefix: 'IL',
    sendstring: '', // Non-Latin script
    isANSI: false,
    locales: ['he', 'he-IL'],
    keycodeLUT: hebrew
  },
  keymap_hungarian: {
    prefix: 'HU',
    sendstring: 'hungarian',
    isANSI: false,
    locales: ['hu', 'hu-HU'],
    keycodeLUT: hungarian
  },
  keymap_icelandic: {
    prefix: 'IS',
    sendstring: 'icelandic',
    isANSI: false,
    locales: ['is', 'is-IS'],
    keycodeLUT: icelandic
  },
  keymap_irish: {
    prefix: 'IE',
    // There is no dedicated sendstring_irish.h header file.
    // The only meaningful difference that the Irish keyboard layout has over the UK layout
    // is the presence of a dead acute accent key on AltGr+'. Since that's a non-ASCII character,
    // the UK sendstring lookup table will work just fine with the Irish keyboard layout
    sendstring: 'uk',
    isANSI: true,
    locales: ['en-IE'],
    keycodeLUT: irish
  },
  keymap_italian: {
    prefix: 'IT',
    sendstring: 'italian',
    isANSI: false,
    locales: ['it', 'it-IT'],
    keycodeLUT: italian
  },
  keymap_italian_mac_ansi: {
    prefix: 'IT',
    sendstring: 'italian_mac_ansi',
    isANSI: true,
    locales: ['it', 'it-IT', 'it-CH'],
    keycodeLUT: italian_mac_ansi
  },
  keymap_italian_mac_iso: {
    prefix: 'IT',
    sendstring: 'italian_mac_iso',
    isANSI: false,
    locales: ['it', 'it-IT', 'it-CH'],
    keycodeLUT: italian_mac_iso
  },
  keymap_japanese: {
    prefix: 'JP',
    sendstring: 'japanese',
    isANSI: false,
    locales: ['ja', 'ja-JP'],
    keycodeLUT: japanese
  },
  keymap_korean: {
    prefix: 'KR',
    sendstring: '', // Non-Latin script
    isANSI: true,
    locales: ['ko', 'ko-KR'],
    keycodeLUT: korean
  },
  keymap_latvian: {
    prefix: 'LV',
    sendstring: 'latvian',
    isANSI: false,
    locales: ['lv', 'lv-LV'],
    keycodeLUT: latvian
  },
  keymap_lithuanian_azerty: {
    prefix: 'LT',
    sendstring: 'lithuanian_azerty',
    isANSI: false,
    locales: ['lt', 'lt-LT'],
    keycodeLUT: lithuanian_azerty
  },
  keymap_lithuanian_qwerty: {
    prefix: 'LT',
    sendstring: 'lithuanian_qwerty',
    isANSI: true,
    locales: ['lt', 'lt-LT'],
    keycodeLUT: lithuanian_qwerty
  },
  keymap_neo2: {
    prefix: 'NE',
    sendstring: '', // Missing sendstring header in qmk_firmware
    isANSI: false,
    locales: ['de-GE', 'de-AU', 'de'],
    keycodeLUT: neo2
  },
  keymap_norman: {
    prefix: 'NO',
    sendstring: 'norman',
    isANSI: true,
    locales: [
      'en',
      'en-AU',
      'en-BZ',
      'en-CA',
      'en-CB',
      'en-GB',
      'en-IE',
      'en-JM',
      'en-NZ',
      'en-PH',
      'en-TT',
      'en-US',
      'en-ZA',
      'en-ZW'
    ],
    keycodeLUT: norman
  },
  keymap_norwegian: {
    prefix: 'NO',
    sendstring: 'norwegian',
    isANSI: false,
    locales: ['nb-NO', 'nn-NO', 'se-NO'],
    keycodeLUT: norwegian
  },
  keymap_polish: {
    prefix: 'PL',
    // The Polish keyboard layout is just like US QWERTY with the addition of Polish accented
    // letters on the AltGr layer. These letters are not ASCII so the default US sendstring will
    // work just fine.
    sendstring: '', // Default US sendstring
    isANSI: true,
    locales: ['pl', 'pl-PL'],
    keycodeLUT: polish
  },
  keymap_portuguese: {
    prefix: 'PT',
    sendstring: 'portuguese',
    isANSI: false,
    locales: ['pt', 'pt-PT'],
    keycodeLUT: portuguese
  },
  keymap_portuguese_mac_iso: {
    prefix: 'PT',
    sendstring: 'portuguese_mac_iso',
    isANSI: false,
    locales: ['pt', 'pt-PT'],
    keycodeLUT: portuguese_mac_iso
  },
  keymap_romanian: {
    prefix: 'RO',
    sendstring: 'romanian',
    isANSI: false,
    locales: ['ro', 'ro-RO'],
    keycodeLUT: romanian
  },
  keymap_russian: {
    prefix: 'RU',
    sendstring: '', // Non-Latin script
    isANSI: true,
    locales: ['ru-RU', 'ru'],
    keycodeLUT: russian
  },
  keymap_serbian: {
    prefix: 'RS',
    sendstring: '', // Non-Latin script
    isANSI: false,
    locales: ['sr-Cyrl', 'sr-Cyrl-SP', 'sr-Cyrl-BA'],
    keycodeLUT: serbian
  },
  keymap_serbian_latin: {
    prefix: 'RS',
    sendstring: 'serbian_latin',
    isANSI: false,
    locales: ['sr', 'sr-SP', 'sr-BA'],
    keycodeLUT: serbian_latin
  },
  keymap_slovak: {
    prefix: 'SK',
    sendstring: 'slovak',
    isANSI: false,
    locales: ['sk', 'sk-SK'],
    keycodeLUT: slovak
  },
  keymap_slovenian: {
    prefix: 'SI',
    sendstring: 'slovenian',
    isANSI: false,
    locales: ['sl', 'sl-SI'],
    keycodeLUT: slovenian
  },
  keymap_spanish_dvorak: {
    prefix: 'DV',
    sendstring: 'spanish_dvorak',
    isANSI: false,
    locales: [
      'en',
      'en-AU',
      'en-BZ',
      'en-CA',
      'en-CB',
      'en-GB',
      'en-IE',
      'en-JM',
      'en-NZ',
      'en-PH',
      'en-TT',
      'en-US',
      'en-ZA',
      'en-ZW'
    ],
    keycodeLUT: spanish_dvorak
  },
  keymap_spanish: {
    prefix: 'ES',
    sendstring: 'spanish',
    isANSI: false,
    locales: ['ca-ES', 'es', 'es-ES', 'eu-ES', 'gl-ES'],
    keycodeLUT: spanish
  },
  keymap_spanish_latin_america: {
    prefix: 'ES',
    sendstring: 'spanish_latin_america',
    isANSI: false,
    locales: [
      'es-CO',
      'es-AR',
      'es-BO',
      'es-CL',
      'es-CR',
      'es-DO',
      'es-EC',
      'es-GT',
      'es-HN',
      'es-MX',
      'es-NI',
      'es-PA',
      'es-PE',
      'es-PR',
      'es-PY',
      'es-SV',
      'es-UY',
      'es-VE'
    ],
    keycodeLUT: spanish_latin_america
  },
  keymap_swedish: {
    prefix: 'SE',
    sendstring: 'swedish',
    isANSI: false,
    locales: ['sv', 'sv-SE'],
    keycodeLUT: swedish
  },
  keymap_swedish_mac_ansi: {
    prefix: 'SE',
    sendstring: 'swedish',
    isANSI: true,
    locales: ['sv', 'sv-SE'],
    keycodeLUT: swedish_mac_ansi
  },
  keymap_swedish_mac_iso: {
    prefix: 'SE',
    sendstring: 'swedish',
    isANSI: false,
    locales: ['sv', 'sv-SE'],
    keycodeLUT: swedish_mac_iso
  },
  keymap_swedish_pro_mac_ansi: {
    prefix: 'SE',
    sendstring: 'swedish',
    isANSI: true,
    locales: ['sv', 'sv-SE'],
    keycodeLUT: swedish_pro_mac_ansi
  },
  keymap_swedish_pro_mac_iso: {
    prefix: 'SE',
    sendstring: 'swedish',
    isANSI: false,
    locales: ['sv', 'sv-SE'],
    keycodeLUT: swedish_pro_mac_iso
  },
  keymap_swiss_de: {
    prefix: 'CH',
    sendstring: 'swiss_de',
    isANSI: false,
    locales: ['de-CH', 'de'],
    keycodeLUT: swiss_de
  },
  keymap_swiss_fr: {
    prefix: 'CH',
    sendstring: 'swiss_fr',
    isANSI: false,
    locales: ['fr-CH', 'fr'],
    keycodeLUT: swiss_fr
  },
  keymap_turkish_f: {
    prefix: 'TR',
    sendstring: 'turkish_f',
    isANSI: false,
    locales: ['tr', 'tr-TR'],
    keycodeLUT: turkish_f
  },
  keymap_turkish_q: {
    prefix: 'TR',
    sendstring: 'turkish_q',
    isANSI: false,
    locales: ['tr', 'tr-TR'],
    keycodeLUT: turkish_q
  },
  keymap_uk: {
    prefix: 'UK',
    sendstring: 'uk',
    isANSI: false,
    locales: ['en-GB', 'en'],
    keycodeLUT: uk
  },
  keymap_ukrainian: {
    prefix: 'UA',
    sendstring: '', // Non-Latin script
    isANSI: true,
    locales: ['uk', 'uk-UA'],
    keycodeLUT: ukrainian
  },
  keymap_us: {
    prefix: 'KC',
    sendstring: '',
    isANSI: true,
    locales: ['en-US', 'en'],
    keycodeLUT: us
  },
  keymap_us_extended: {
    prefix: 'US',
    sendstring: '', // Default US sendstring
    isANSI: true,
    locales: ['en', 'en-US'],
    keycodeLUT: us_extended
  },
  keymap_us_international: {
    prefix: 'US',
    sendstring: '', // Default US sendstring
    isANSI: true,
    locales: ['en', 'en-US'],
    keycodeLUT: us_international
  },
  keymap_us_international_linux: {
    prefix: 'US',
    sendstring: '', // Default US sendstring
    isANSI: true,
    locales: ['en', 'en-US'],
    keycodeLUT: us_international_linux
  },
  keymap_workman: {
    prefix: 'WK',
    sendstring: 'workman',
    isANSI: true,
    locales: [
      'en',
      'en-AU',
      'en-BZ',
      'en-CA',
      'en-CB',
      'en-GB',
      'en-IE',
      'en-JM',
      'en-NZ',
      'en-PH',
      'en-TT',
      'en-US',
      'en-ZA',
      'en-ZW'
    ],
    keycodeLUT: workman
  },
  keymap_workman_zxcvm: {
    prefix: 'WK',
    sendstring: 'workman_zxcvm',
    isANSI: true,
    locales: [
      'en',
      'en-AU',
      'en-BZ',
      'en-CA',
      'en-CB',
      'en-GB',
      'en-IE',
      'en-JM',
      'en-NZ',
      'en-PH',
      'en-TT',
      'en-US',
      'en-ZA',
      'en-ZW'
    ],
    keycodeLUT: workman_zxcvm
  }
};
