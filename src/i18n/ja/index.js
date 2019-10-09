import potato from './potato';
import print from './print';
import tester from './tester';
export default {
  ja: {
    message: {
      ...potato,
      help: {
        label: 'ウィザード召喚'
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
        placeholder: 'カスタムキーマップ名'
      },
      loadDefault: {
        label: 'Load Default',
        title: 'QMK Firmware からデフォルトキーマップをロード'
      },
      compile: {
        label: 'Compile',
        title: 'キーマップのコンパイル'
      },
      downloadKeymap: {
        title: 'keymap.c のみダウンロード',
        label: 'keymap only'
      },
      downloadSource: {
        title: 'QMK Firmware コードのダウンロード',
        label: 'Full Source'
      },
      downloadJSON: {
        title: 'QMK Keymap JSON ファイルをエクスポート',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: 'QMK Keymap JSON ファイルをインポート'
      },
      importUrlJSON: {
        title: 'URL から QMK Keymap JSON をインポート'
      },
      printKeymap: {
        title: 'キーマップレイヤの印刷',
        label: 'Print Keymap'
      },
      testKeys: {
        title: 'キーボード入力テスト',
        label: 'Test Keyboard'
      },
      downloadFirmware: {
        label: 'Firmware',
        title: '書き込み用ファームウェアファイルのダウンロード'
      },
      flashFirmware: {
        label: 'Auto-Flash',
        title: 'コンパイルされたファームウェアを MCU に自動的に書き込む'
      },
      flashFile: {
        label: 'Custom-Flash',
        title: 'ユーザが選択したファイルを MCU に書き込む'
      },
      ColorwayTip: {
        title: 'Ctrl + Alt + N で次の配色に切り替え'
      },
      layer: {
        label: 'Layer',
        confirm: 'レイヤをクリアしますか？',
        title: 'レイヤのクリア'
      },
      keymap: {
        label: 'Keymap'
      },
      downloadToolbox: {
        label: 'QMK Toolbox を入手'
      },
      keycodes: {
        label: 'Keycodes'
      },
      keycodesRef: {
        label: 'キーコードの参照'
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
          help: '各位置をクリックせずキーボードでキーを入力する'
        },
        displaySizes: {
          label: 'Show Key Sizes',
          title: 'ctrl + alt + u',
          help: 'キーキャップサイズをキーユニットで表示'
        },
        toggleTutorial: {
          label: 'Video Tutorial',
          title: 'Configurator の MechMerlin のハウツービデオ',
          help: 'MechMerlin のビデオガイド'
        },
        darkmode: {
          label: 'ダークモードの切り替え',
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
        }
      },
      errors: {
        invalidQMKKeymap:
          'すみません、正しい QMK キーマップファイルではないようです。',
        kbfirmwareJSONUnsupported:
          'すみません、QMK Configurator は キーボードファームウェア JSON ファイルのインポートをサポートしていません。',
        unknownJSON: 'すみません、QMK キーマップファイルではないようです。',
        unsupportedBrowser:
          '未サポートのブラウザを使用しています。次のブラウザを使用してください'
      },
      statsTemplate:
        '\n {layers} レイヤと {count} キーコードをロードしました。任意の {any} キーコードを定義しました。\n',
      maintain:
        'このプロジェクトはあなたのような QMK 協力者と貢献者によって維持されています！',
      hostedOn: 'GitHub Pages で提供されています',
      serverStatus: 'サーバ状況',
      apiVersion: 'API Version',
      jobsWaiting: 'ジョブ待機中'
    }
  }
};
