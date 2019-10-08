import potato from './potato';
import print from './print';
import tester from './tester';
export default {
  en: {
    message: {
      ...potato,
      help: {
        label: 'Tawagin ang Wizard'
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
        label: 'Pangalan Keymap',
        placeholder: 'kustom na pangalan ng keymap'
      },
      loadDefault: {
        label: 'I-load ang Default',
        title: 'I-load ang default keymap galing sa QMK Firmware'
      },
      compile: {
        label: 'I-compile',
        title: 'I-compile ang Keymap'
      },
      downloadKeymap: {
        title: 'I-download ang keymap.c lang',
        label: 'keymap only'
      },
      downloadSource: {
        title: 'I-download ang QMK Firmware code',
        label: 'Buong Source'
      },
      downloadJSON: {
        title: 'I-export ang QMK Keymap JSON file',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: 'I-import ang QMK Keymap JSON file'
      },
      importUrlJSON: {
        title: 'I-import ang QMK Keymap JSON galing sa URL'
      },
      printKeymap: {
        title: 'I-print ang mga Keymap Layers',
        label: 'I-print ang Keymap'
      },
      testKeys: {
        title: 'I-test ang Keyboard Input',
        label: 'I-test ang Keyboard'
      },
      downloadFirmware: {
        label: 'Firmware',
        title: 'I-download ang firmware file para sa flashing'
      },
      flashFirmware: {
        label: 'Auto-Flash',
        title: 'Awtomatik na pag-flash ng compiled Firmware sa MCU'
      },
      flashFile: {
        label: 'Custom-Flash',
        title: 'I-flash ang User Selected file sa MCU'
      },
      ColorwayTip: {
        title: 'Ctrl + Alt + N para susunod na cycle ng colorway'
      },
      layer: {
        label: 'Layer',
        confirm: 'Alisin ba ang buong layer?',
        title: 'Clear Layer'
      },
      keymap: {
        label: 'Keymap'
      },
      downloadToolbox: {
        label: 'Kunin ang QMK Toolbox'
      },
      keycodes: {
        label: 'Keycodes'
      },
      keycodesRef: {
        label: 'Referens ng mga Keycodes'
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
          label: 'Settings para sa Keyboard'
        },
        AppMediaMouse: {
          label: 'App, Media and Mouse'
        }
      },
      settingsPanel: {
        title: 'Settings para sa Configurator',
        fastInput: {
          label: 'Mabilisang Input',
          title: 'ctrl + alt + f',
          help: 'I-input ang mga keys gamit ang keyboard nang hindi nagki-click ng kada posisyon.'
        },
        displaySizes: {
          label: 'Ipakita ang mga Sizes ng Key',
          title: 'ctrl + alt + u',
          help: 'Ipakita ang mga keycap sizes sa Key Units'
        },
        toggleTutorial: {
          label: 'Bidyo para sa pag-gabay',
          title: 'MechMerlin how-to video on Configurator',
          help: 'Gabay para MechMerlin video'
        },
        darkmode: {
          label: 'I-toggle ang Darkmode',
          title: 'Dark mode'
        },
        language: {
          title: 'Lenggwahe'
        },
        on: {
          label: 'Bukas'
        },
        off: {
          label: 'Sarado'
        }
      },
      errors: {
        invalidQMKKeymap:
          "Paumanhin, hindi valid ang QMK keymap file.",
        kbfirmwareJSONUnsupported:
          "Paumanhin, ang QMK Configurator ay hindi sinusuportahan ang pag-iimport ng kbfirmware JSON files.",
        unknownJSON: "Paumanhin, ito ay hindi isang QMK keymap file.",
        unsupportedBrowser: "Gumagamit ka ng hindi sinusuportahang browser. Paki-gamitin ang"
      },
      statsTemplate:
        '\nNi-load ang mga {layers} layers at mga {count} keycodes. Defined {any} Any key keycodes\n',
      maintain:
        'Ang proyektong ito ay pinapanatili ng QMK collaborators at mga contributors kagaya mo!',
      hostedOn: 'Hosted on GitHub Pages',
      serverStatus: 'Server Status',
      apiVersion: 'API Version',
      jobsWaiting: 'job(s) waiting'
    }
  }
};
