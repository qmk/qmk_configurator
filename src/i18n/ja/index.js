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
        title: 'QMK Firmwareからデフォルトキーマップをロード'
      },
      compile: {
        label: 'Compile',
        title: 'キーマップのコンパイル'
      },
      toggleTerminal: {
        label: '展開するにはクリックします',
        title: 'ターミナル表示の切り替え'
      },
      downloadKeymap: {
        title: 'keymap.c のみダウンロード',
        label: 'keymap only'
      },
      downloadSource: {
        title: 'QMK全ソースコードのダウンロード',
        label: 'Full Source'
      },
      downloadJSON: {
        title: 'QMK Keymap JSONファイルをエクスポート',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: 'QMK Keymap JSONファイルをインポート'
      },
      importUrlJSON: {
        title: 'URLからQMK Keymap JSONをインポート'
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
        title: 'コンパイルされたファームウェアをMCUに自動的に書き込む'
      },
      flashFile: {
        label: 'Custom-Flash',
        title: 'ユーザが選択したファイルをMCUに書き込む'
      },
      ColorwayTip: {
        title: 'Ctrl + Alt + Nで次の配色に切り替え'
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
        label: 'QMK Toolboxを入手'
      },
      keycodes: {
        label: 'Keycodes'
      },
      keycodesRef: {
        label: 'キーコードの説明はこちら'
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
        title: 'Configuratorの設定',
        fastInput: {
          label: '高速入力',
          title: 'ctrl + alt + f',
          help: '各位置をクリックせずキーボードでキーを入力する'
        },
        displaySizes: {
          label: 'キーサイズの表示',
          title: 'ctrl + alt + u',
          help: 'キーキャップサイズをキーユニットで表示'
        },
        toggleTutorial: {
          label: 'ビデオチュートリアル',
          help: `MechMerlinのQMK Configuratorビデオチュートリアル`
        },
        darkmode: {
          label: 'ダークモード',
          help: `QMK Configuratorのダークテーマを使用する`
        },
        language: {
          title: '言語',
          help: 'ユーザインタフェースの言語を変更する'
        },
        on: {
          label: 'On'
        },
        off: {
          label: 'Off'
        },
        snowflakes: {
          label: '雪の切り替え',
          title: '雪'
        }
      },
      errors: {
        invalidQMKKeymap:
          'すみません、正しいQMKキーマップファイルではないようです。',
        kbfirmwareJSONUnsupported:
          'すみません、QMK Configuratorはkbfirmware JSONファイルのインポートをサポートしていません。',
        unknownJSON: 'すみません、QMKキーマップファイルではないようです。',
        unsupportedBrowser:
          '未サポートのブラウザを使用しています。次のブラウザを使用してください'
      },
      statsTemplate:
        '\n {layers} レイヤと {count} キーコードをロードしました。任意の {any} キーコードを定義しました。\n',
      maintain:
        'このプロジェクトはあなたのようなQMK協力者と貢献者によって維持されています！',
      hostedOn: 'GitHub Pagesで提供されています',
      serverIs: 'サービス',
      apiVersionPrefix: 'API',
      settings: '設定',
      favoriteColor: 'お気に入りの配色',
      favoriteKeyboard: 'お気に入りのキーボード',
      searchKeycodes: '検索',
      jobsWaiting: 'ジョブ待機中',
      jobsAhead: 'ジョブ',
      queueEmpty: '待機なし',
      ready: '準備完了'
    }
  }
};
