import potato from './potato';
export default {
  en: {
    message: {
      ...potato,
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
      printKeymap: {
        title: 'Print Keymap Layers',
        label: 'Print Keymap'
      },
      downloadFirmware: {
        label: 'Firmware',
        title: 'Download firmware file for flashing'
      },
      ColorwayTip: {
        title: 'Ctrl + Alt + N to cycle next colorway'
      },
      layer: {
        label: 'Layer'
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
        on: {
          label: 'On'
        },
        off: {
          label: 'Off'
        }
      },
      errors: {
        invalidQMKKeymap:
          "Sorry, that doesn't appear to be a valid QMK keymap file.",
        kbfirmwareJSONUnsupported:
          "Sorry, QMK Configurator doesn't support importing kbfirmware JSON files.",
        unknownJSON: "Sorry, this doesn't appear to be a QMK keymap file."
      },
      statsTemplate:
        '\nLoaded {layers} layers and {count} keycodes. Defined {any} Any key keycodes\n'
    }
  }
};
