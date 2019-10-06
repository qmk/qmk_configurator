import potato from './potato';
export default {
  de: {
    message: {
      ...potato,
      keyboard: {
        label: 'Tastatur'
      },
      layout: {
        label: 'Layout'
      },
      keymapName: {
        label: 'Tastaturbelegung',
        placeholder: 'Eigener Name der Tastaturbelegung'
      },
      loadDefault: {
        label: 'Lade Standard',
        title: 'Lade Standard Tastaturbelegung von der QMK Firmware'
      },
      compile: {
        label: 'Kompiliere',
        title: 'Kompiliere Tastaturbelegung, um deine Tastatur zu programmieren'
      },
      downloadKeymap: {
        title: 'Downloade nur die keymap.c Datei',
        label: 'Nur Tastenbelgung'
      },
      downloadSource: {
        title: 'Downloade den gesamten QMK Firmware Source-Code',
        label: 'Full Source'
      },
      downloadJSON: {
        title: 'Exportiere QMK Keymap JSON Datei',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: 'Importiere QMK Keymap JSON Datei'
      },
      printKeymap: {
        title: 'Drucke die Tastaturbelegung der verschiedenen Ebenen',
        label: 'Drucke Tastaturbelegung'
      },
      downloadFirmware: {
        label: 'Firmware',
        title: 'Downloade die Firmware, um deine Tastatur zu programmieren'
      },
      ColorwayTip: {
        title: 'Strg + Alt + N, um zum nächsten colorway zu kommen'
      },
      layer: {
        label: 'Ebene'
      },
      keymap: {
        label: 'Tastaturbelegung'
      },
      downloadToolbox: {
        label: 'Hole dir die QMK Toolbox'
      },
      keycodes: {
        label: 'Keycodes'
      },
      keycodesRef: {
        label: 'Keycodes Referenz'
      },
      keycodesTab: {
        ANSI: {
          label: 'ANSI'
        },
        'ISO/JIS': {
          label: 'ISO/JIS'
        },
        Quantum: {
          label: 'Quantum'
        },
        KeyboardSettings: {
          label: 'Tastatureinstellungen'
        },
        AppMediaMouse: {
          label: 'App, Media und Maus'
        }
      },
      settingsPanel: {
        title: 'Konfigurierungseinstellungen',
        fastInput: {
          label: 'Schnelle Eingabe',
          title: 'STRG + ALT + F',
          help:
            'Gib die Tasten über der Tastatur ein, ohne auf die einzelnen Positionen zu klicken'
        },
        displaySizes: {
          label: 'Zeige Tastengröße',
          title: 'STRG + ALT + U',
          help: 'Tastengrößen anzeigen'
        },
        on: {
          label: 'An'
        },
        off: {
          label: 'Aus'
        }
      },
      errors: {
        invalidQMKKeymap:
          'Leider scheint dies keine gültige QMK-Keymap-Datei zu sein.',
        kbfirmwareJSONUnsupported:
          'Entschuldigung, QMK Configurator unterstützt das Importieren von kbfirmware JSON-Dateien nicht.',
        unknownJSON:
          'Es tut uns leid, dies scheint keine QMK-Keymap-Datei zu sein.'
      },
      statsTemplate:
        '\n{layers} Ebenen und {count} keycodes. Es wurden {any} Freie Keycodes Definiert\n'
    }
  }
};
