import potato from './potato';
import print from './print';
import tester from './tester';
export default {
  de: {
    message: {
      ...potato,
      help: {
        label: 'Hilfe holen'
      },
      print: { ...print },
      tester: { ...tester },
      keyboard: {
        label: 'Tastatur'
      },
      layout: {
        label: 'Layout'
      },
      keymapName: {
        label: 'Name',
        placeholder: 'Eigener Name der Tastaturbelegung'
      },
      loadDefault: {
        label: 'Zurücksetzen',
        title: 'Standard-Tastaturbelegung der QMK Firmware laden'
      },
      compile: {
        label: 'Kompilieren',
        title: 'Tastaturbelegung kompilieren'
      },
      downloadKeymap: {
        title: 'Nur die keymap.c Datei herunterladen',
        label: 'Nur Tastenbelegung'
      },
      downloadSource: {
        title: 'QMK-Firmwarecode herunterladen',
        label: 'Full Source'
      },
      downloadJSON: {
        title: 'QMK Keymap als JSON Datei exportieren',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: 'QMK Keymap aus JSON Datei importieren'
      },
      importUrlJSON: {
        title: 'QMK Keymap aus JSON von URL importieren'
      },
      printKeymap: {
        title: 'Drucke die Tastaturbelegung der verschiedenen Ebenen',
        label: 'Drucken'
      },
      testKeys: {
        title: 'Tastendrücke testen',
        label: 'Tastatur testen'
      },
      downloadFirmware: {
        label: 'Firmware',
        title: 'Firmware-Datei zum Flashen herunterladen'
      },
      flashFirmware: {
        label: 'Auto-Flash',
        title: 'Kompilierte Firmware automatisch auf Mikrochip flashen'
      },
      flashFile: {
        label: 'Eigener Flash',
        title: 'Selbst gewählte Datei auf Mikrochip flashen'
      },
      ColorwayTip: {
        title: 'Strg + Alt + N zum Wechseln des Farbschemas'
      },
      layer: {
        label: 'Ebene',
        confirm: 'Soll die Ebene wirklich gelöscht werden?',
        title: 'Ebene löschen'
      },
      keymap: {
        label: 'Tastenbelegung'
      },
      downloadToolbox: {
        label: 'Hole dir QMK Toolbox'
      },
      keycodes: {
        label: 'Keycodes'
      },
      keycodesRef: {
        label: 'Keycode-Referenz'
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
        title: 'Einstellungen',
        fastInput: {
          label: 'Schnelle Eingabe',
          title: 'strg + alt + f',
          help:
            'Gib die Tasten über die Tastatur ein, ohne auf die einzelnen Positionen zu klicken'
        },
        displaySizes: {
          label: 'Zeige Tastengröße',
          title: 'strg + alt + u',
          help: 'Tastengrößen relativ zur Standardgröße anzeigen'
        },
        toggleTutorial: {
          label: 'Video-Tutorial',
          title: 'MechMerlin hat ein Video zu dieser Seite gemacht (Englisch)',
          help: "MechMerlin's Videohilfe"
        },
        darkmode: {
          label: 'Die Seite dunkler machen',
          title: 'Dunkler Modus'
        },
        language: {
          title: 'Sprache'
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
          'Es tut uns leid, dies scheint keine QMK-Keymap-Datei zu sein.',
        unsupportedBrowser:
          'Sie verwenden einen nicht unterstützten Browser. Bitte nutzen Sie'
      },
      statsTemplate:
        '\n{layers} Ebenen und {count} keycodes geladen. Es wurden {any} freie Keycodes Definiert\n',
      maintain:
        'Dieses Projekt wird von den QMK-Entwicklern und -Mitwirkenden bereitgestellt. Helfen Sie mit!',
      hostedOn: 'Mit GitHub Pages betrieben',
      serverStatus: 'Server-Status',
      apiVersion: 'API-Version',
      jobsWaiting: 'wartende Job(s)'
    }
  }
};
