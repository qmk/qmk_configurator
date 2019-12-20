import potato from './potato';
import print from './print';
import tester from './tester';
export default {
  en: {
    message: {
      ...potato,
      help: {
        label: 'Summon Wizard'
      },
      print: { ...print },
      tester: { ...tester },
      keyboard: {
        label: 'keyboard'
      },
      layout: {
        label: 'layout'
      },
      keymapName: {
        label: 'Keymap Name',
        placeholder: 'custom keymap name'
      },
      loadDefault: {
        label: 'Load Default',
        title: 'Load default keymap from QMK Firmware'
      },
      compile: {
        label: 'Compile',
        title: 'Compile Keymap'
      },
      toggleTerminal: {
        label: 'Click to Expand',
        title: 'Toggle the Terminal display'
      },
      downloadKeymap: {
        title: 'Download keymap.c only',
        label: 'keymap only'
      },
      downloadSource: {
        title: 'Download QMK Firmware code',
        label: 'Full Source'
      },
      downloadJSON: {
        title: 'Export QMK Keymap JSON file',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: 'Import QMK Keymap JSON file'
      },
      importUrlJSON: {
        title: 'Import QMK Keymap JSON from URL'
      },
      printKeymap: {
        title: 'Print Keymap Layers',
        label: 'Print Keymap'
      },
      testKeys: {
        title: 'Test Keyboard Input',
        label: 'Test Keyboard'
      },
      downloadFirmware: {
        label: 'Firmware',
        title: 'Download firmware file for flashing'
      },
      flashFirmware: {
        label: 'Auto-Flash',
        title: 'Automatically Flash compiled Firmware to MCU'
      },
      flashFile: {
        label: 'Custom-Flash',
        title: 'Flash User Selected file to MCU'
      },
      ColorwayTip: {
        title: 'Ctrl + Alt + N to cycle next colorway'
      },
      layer: {
        label: 'Layer',
        confirm: 'Are you sure you want to clear layer?',
        title: 'Clear Layer'
      },
      keymap: {
        label: 'Keymap'
      },
      downloadToolbox: {
        label: 'Get QMK Toolbox'
      },
      keycodes: {
        label: 'Keycodes'
      },
      keycodesRef: {
        label: 'Keycodes reference'
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
          label: 'Keyboard Settings'
        },
        AppMediaMouse: {
          label: 'App, Media and Mouse'
        }
      },
      settingsPanel: {
        title: 'Configurator Settings',
        fastInput: {
          label: 'Fast Input',
          title: 'ctrl + alt + f',
          help: 'Input keys via keyboard without clicking each position.'
        },
        displaySizes: {
          label: 'Show Key Sizes',
          title: 'ctrl + alt + u',
          help: 'Show keycap sizes in Key Units'
        },
        toggleTutorial: {
          label: 'Video Tutorial',
          title: 'MechMerlin how-to video on Configurator',
          help: 'MechMerlin video guide'
        },
        darkmode: {
          label: 'Toggle Darkmode',
          title: 'Dark mode'
        },
        language: {
          title: 'Language'
        },
        on: {
          label: 'On'
        },
        off: {
          label: 'Off'
        },
        snowflakes: {
          label: 'Toggle Snowflakes',
          title: 'Snowflakes'
        }
      },
      errors: {
        invalidQMKKeymap:
          "Sorry, that doesn't appear to be a valid QMK keymap file.",
        kbfirmwareJSONUnsupported:
          "Sorry, QMK Configurator doesn't support importing kbfirmware JSON files.",
        unknownJSON: "Sorry, this doesn't appear to be a QMK keymap file.",
        unsupportedBrowser: "You're using a non supported browser. Please use"
      },
      statsTemplate:
        '\nLoaded {layers} layers and {count} keycodes. Defined {any} Any key keycodes\n',
      maintain:
        'This project is maintained by QMK collaborators and contributors like you!',
      hostedOn: 'Hosted on GitHub Pages',
      serverIs: 'Service',
      apiVersionPrefix: 'API',
      settings: 'Settings',
      favoriteColor: 'Favorite Colorway',
      favoriteKeyboard: 'Favorite Keyboard',
      searchKeycodes: 'search',
      jobsWaiting: 'job(s) waiting',
      jobsAhead: 'Ahead',
      queueEmpty: 'No Wait',
      ready: 'Ready'
    }
  }
};
