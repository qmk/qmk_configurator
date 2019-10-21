import potato from './potato';
import print from './print';
import tester from './tester';
export default {
  ms: {
    message: {
      ...potato,
      help: {
        label: 'Panggil Wizard'
      },
      print: { ...print },
      tester: { ...tester },
      keyboard: {
        label: 'papan kekunci'
      },
      layout: {
        label: 'susunan'
      },
      keymapName: {
        label: 'Nama Keymap',
        placeholder: 'Sesuaikan nama keymap'
      },
      loadDefault: {
        label: 'Memuat keymap asal',
        title: 'Memuatkan keymap asal dari QMK Firmware'
      },
      compile: {
        label: 'Kompil',
        title: 'Kompil Keymap'
      },
      downloadKeymap: {
        title: 'Muat turun keymap.c',
        label: 'keymap sahaja'
      },
      downloadSource: {
        title: 'Muat turun kod perisian tegar QMK',
        label: 'Sumber Penuh'
      },
      downloadJSON: {
        title: 'Eksport fail JSON QMK Keymap',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: 'Import fail JSON QMK Keymap'
      },
      importUrlJSON: {
        title: 'Import fail JSON QMK Keymap dari URL'
      },
      printKeymap: {
        title: 'Cetak Lapisan Keymap',
        label: 'Cetak Keymap'
      },
      testKeys: {
        title: 'Uji Input Papan kekunci',
        label: 'Test Keyboard'
      },
      downloadFirmware: {
        label: 'Perisian tegar',
        title: 'Muat turun fail perisian tegar untuk di flash'
      },
      flashFirmware: {
        label: 'Auto-Flash',
        title: 'Flash perisian tegar yang dikompil kepada MCU secara automatik'
      },
      flashFile: {
        label: 'Custom-Flash',
        title: 'Flash file pilihan penguna kepada MCU'
      },
      ColorwayTip: {
        title: 'Ctrl + Alt + N untuk pilih warna seterusnya'
      },
      layer: {
        label: 'Lapisan',
        confirm: 'Andan pasti ingin membuang lapisan?',
        title: 'Buang Lapisan'
      },
      keymap: {
        label: 'Keymap'
      },
      downloadToolbox: {
        label: 'Dapatkan peralatan QMK'
      },
      keycodes: {
        label: 'Kod kekunci'
      },
      keycodesRef: {
        label: 'Rujukan kod kekunci'
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
          label: 'Seting papan kekunci'
        },
        AppMediaMouse: {
          label: 'App, Media and Tetikus'
        }
      },
      settingsPanel: {
        title: 'Konfigur seting',
        fastInput: {
          label: 'Input cepat',
          title: 'ctrl + alt + f',
          help:
            'Masukkan kekunci melalui papan kekunci tanpa klik setiap posisi.'
        },
        displaySizes: {
          label: 'Tunjukkan saiz kekunci',
          title: 'ctrl + alt + u',
          help: 'Tunjukkan saiz kekunci dalam Unit Kekunci'
        },
        toggleTutorial: {
          label: 'Video Tutorial',
          title: 'Panduan video MechMerlin di Configurator',
          help: 'Panduan video MechMerlin'
        },
        darkmode: {
          label: 'Toggle Mod Gelap',
          title: 'Mod Gelap'
        },
        language: {
          title: 'Bahasa'
        },
        on: {
          label: 'Buka'
        },
        off: {
          label: 'Tutup'
        }
      },
      errors: {
        invalidQMKKeymap:
          'Maaf, itu tidak merupakan file QMK keymap yang benar.',
        kbfirmwareJSONUnsupported:
          'Maaf, QMK Configurator tidak menyokong mengimport fail jSON kbfirmware.',
        unknownJSON: 'Maaf, itu tidak merupakan file QMK keymap.',
        unsupportedBrowser:
          'Anda mengunakan pelayar yang tak disokong. Sila gunakan'
      },
      statsTemplate:
        '\n{layers} lapisan dan {count} kod kekunci yang diload. Definasikan {any} apa-apa kod kekunci\n',
      maintain:
        'Project ini dikendalikan oleh kolabrasi QMK dan penyumbang seperti anda!',
      hostedOn: 'Dihos di GitHub Pages',
      serverStatus: 'Status Pelayan',
      apiVersion: 'Versi API',
      jobsWaiting: 'kerja kosong'
    }
  }
};
