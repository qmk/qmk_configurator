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
        placeholder: 'eigener Name der Tastaturbelegung'
      },
      loadDefault: {
        label: 'Lade Standart',
        title: 'Lade Standart Tastaturbelegung von der QMK Firmware'
      },
      compile: {
        label: 'kompiliere',
        title: 'kompiliere Tastaturbelegung um deine Tastaur zu Programieren'
      },
      downloadKeymap: {
        title: 'Downloade nur die keymap.c Datei',
        label: 'nur Tastenbelgung'
      },
      downloadSource: {
        title: 'Downloade den gesamten QMK Firmware Surce-code',
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
        title: 'Downloade die firmware datei um deine Tastatur zu Programieren'
      },
      ColorwayTip: {
        title: 'Strg + Alt + N um zum nächten colorway zu kommen'
      },
      layer: {
        label: 'Ebene'
      },
      keymap: {
        label: 'Tastaturbelegung'
      },
      downloadToolbox: {
        label: 'Hole dir QMK Toolbox'
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
        title: 'Configurator Settings',
        fastInput: {
          label: 'schnelle Eingabe',
          title: 'ctrl + alt + f',
          help: 'Gib die Tasten über die Tastatur ein, ohne auf die einzelnen Positionen zu klicken'
        },
        displaySizes: {
          label: 'zeige Tastengröße',
          title: 'ctrl + alt + u',
          help: 'Zeigen Sie die Tastengrößen an'
        },
        on: {
          label: 'On'
        },
        off: {
          label: 'Off'
        }
      },
      errors: {
        invalidQMKKeymap:
          "Leider scheint dies keine gültige QMK-Keymap-Datei zu sein.",
        kbfirmwareJSONUnsupported:
          "Entschuldigung, QMK Configurator unterstützt das Importieren von kbfirmware JSON-Dateien nicht.",
        unknownJSON: "Es tut uns leid, dies scheint keine QMK-Keymap-Datei zu sein."
      },
      statsTemplate:
        '\n{layers} Ebenen und {count} keycodes. Es wurden {any} Freie Keycodes Definiert\n'
    }
  }
};