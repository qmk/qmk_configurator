import potato from './potato';
import print from './print';
import tester from './tester';
export default {
  zh: {
    message: {
      ...potato,
      help: {
        label: '召喚巫師'
      },
      print: { ...print },
      tester: { ...tester },
      keyboard: {
        label: '鍵盤'
      },
      layout: {
        label: '设计'
      },
      keymapName: {
        label: '按鍵圖名字',
        placeholder: '定制按鍵圖名字'
      },
      loadDefault: {
        label: '加載默認',
        title: '從 QMK Firmware 加載默認按鍵圖'
      },
      compile: {
        label: '編譯',
        title: '編譯按鍵圖'
      },
      downloadKeymap: {
        title: '只下载 keymap.c',
        label: '按鍵圖'
      },
      downloadSource: {
        title: '下载 QMK 固件代碼',
        label: '完整的源代碼'
      },
      downloadJSON: {
        title: '輸出 QMK Keymap JSON 文件',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: '輸入 QMK 按鍵圖 JSON 文件'
      },
      importUrlJSON: {
        title: '從 URL 輸入 QMK 按鍵圖 JSON '
      },
      printKeymap: {
        title: '印按鍵圖 Layers',
        label: '印按鍵圖'
      },
      testKeys: {
        title: '試鍵盤輸入',
        label: '試鍵盤'
      },
      downloadFirmware: {
        label: '固件',
        title: '下载固件文件 for flashing'
      },
      flashFirmware: {
        label: 'Auto-Flash',
        title: 'Automatically Flash compiled Firmware to MCU'
      },
      flashFile: {
        label: 'Custom-Flash',
        title: 'Flash User Selected 文件 to MCU'
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
        label: '按鍵圖'
      },
      downloadToolbox: {
        label: 'Get QMK Toolbox'
      },
      keycodes: {
        label: '鍵碼'
      },
      keycodesRef: {
        label: '鍵碼指南'
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
          label: '鍵盤設定'
        },
        AppMediaMouse: {
          label: 'App, Media and Mouse'
        }
      },
      settingsPanel: {
        title: 'Configurator 設定',
        fastInput: {
          label: '快速輸入',
          title: 'ctrl + alt + f',
          help: 'Input keys via keyboard without clicking each position.'
        },
        displaySizes: {
          label: 'Show Key Sizes',
          title: 'ctrl + alt + u',
          help: 'Show keycap sizes in Key Units'
        },
        toggleTutorial: {
          label: '影片教學',
          title: 'MechMerlin how-to video on Configurator',
          help: 'MechMerlin影片教學'
        },
        darkmode: {
          label: '撥動暗模式',
          title: '暗模式'
        },
        language: {
          title: '語言'
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
          "抱歉, 這不是一個有效 QMK 按鍵圖文件.",
        kbfirmwareJSONUnsupported:
          "抱歉, QMK Configurator 不支持輸入 kbfirmware JSON 文件.",
        unknownJSON: "抱歉,這不是一個 QMK 按鍵圖文件.",
        unsupportedBrowser: "您正在使用不受支持的瀏覽器.請用"
      },
      statsTemplate:
        '\nLoaded {layers} layers and {count} keycodes. Defined {any} Any key keycodes\n',
      maintain:
        'This project is maintained by QMK collaborators and contributors like you!',
      hostedOn: 'Hosted on GitHub Pages',
      serverStatus: 'Server Status',
      apiVersion: 'API Version',
      jobsWaiting: 'job(s) waiting'
    }
  }
};
