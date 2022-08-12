import us from './keymap_us';
import uk from './keymap_uk';
import german from './keymap_german';
import russian from './keymap_russian';

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
  keymap_us: {
    prefix: 'KC',
    // Special scenario where sendstring is an empty string not because there is no associated
    // sendstring header file but because this is the default.
    sendstring: '',
    isANSI: true,
    locales: ['en-US', 'en'],
    keycodeLUT: us
  },
  keymap_uk: {
    prefix: 'UK',
    sendstring: 'uk',
    isANSI: false,
    locales: ['en-UK', 'en-GB', 'en'],
    keycodeLUT: uk
  },
  keymap_german: {
    // Note: qmk_firmware also contains a separate `keymap_german_mac_iso.h` header file,
    // but its only difference with the `keymap_german.h` header is the AltGr/Option layer.
    // The QMK Configurator doesn't show the AltGr legends anyways so there is no point in
    // including the Mac ISO version.
    prefix: 'DE',
    sendstring: 'german',
    isANSI: false,
    locales: ['de-GE', 'de-AU', 'de'],
    keycodeLUT: german
  },
  keymap_russian: {
    prefix: 'RU',
    sendstring: '',
    isANSI: true,
    locales: ['ru-RU', 'ru'],
    keycodeLUT: russian
  }
};
