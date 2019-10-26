import potato from './potato';
import print from './print';
import tester from './tester';
export default {
  en: {
    message: {
      ...potato,
      help: {
        label: 'Tutorial aperto'
      },
      print: { ...print },
      tester: { ...tester },
      keyboard: {
        label: 'tastiera'
      },
      layout: {
        label: 'layout'
      },
      keymapName: {
        label: 'Nome keymap',
        placeholder: 'nome keymap personalizzato'
      },
      loadDefault: {
        label: 'Carica Originale',
        title: 'Carica il valore predefinito per il layout del Firmware QMK'
      },
      compile: {
        label: 'Compilare',
        title: 'Compila il keymap'
      },
      downloadKeymap: {
        title: 'Scarica solo keymap.c',
        label: 'solo keymap'
      },
      downloadSource: {
        title: 'Scarica codice Firmware QMK',
        label: 'Codice completo'
      },
      downloadJSON: {
        title: 'Esporta file JSON di Keymap QMK',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: 'Importa file JSON di Keymap QMK'
      },
      importUrlJSON: {
        title: 'Importa file JSON di Keymap QMK da URL'
      },
      printKeymap: {
        title: 'Stampa livelli keymap',
        label: 'Stampa keymap'
      },
      testKeys: {
        title: 'Prova ingresso tastiera',
        label: 'Prova tastiera'
      },
      downloadFirmware: {
        label: 'Firmware',
        title: 'Scarica file firmware da installare'
      },
      flashFirmware: {
        label: 'Auto-Installare',
        title: 'Installa automaticamente il Firmware compilato in MCU'
      },
      flashFile: {
        label: 'Installazione personalizzata',
        title: 'Installa il file selezionato in MCU'
      },
      ColorwayTip: {
        title: 'Ctrl + Alt + N per cambiare il colore successivo'
      },
      layer: {
        label: 'Cappotto',
        confirm: 'Sei sicuro di voler cancellare il cappotto?',
        title: 'Elimina cappotto'
      },
      keymap: {
        label: 'Keymap'
      },
      downloadToolbox: {
        label: 'Scarica QMK Toolbox'
      },
      keycodes: {
        label: 'Codici chiave'
      },
      keycodesRef: {
        label: 'Riferimento al codice chiave'
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
          label: 'Configurazione tastiera'
        },
        AppMediaMouse: {
          label: 'App, Media e Mouse'
        }
      },
      settingsPanel: {
        title: 'Configuratore Impostazioni',
        fastInput: {
          label: 'Ingresso rapido',
          title: 'ctrl + alt + f',
          help: 'Inserire i tasti tramite la tastiera senza fare clic su ciascuna posizione.'
        },
        displaySizes: {
          label: 'Mostra dimensione chiave',
          title: 'ctrl + alt + u',
          help: 'Mostra le dimensioni delle chiavi in Unità Chiave'
        },
        toggleTutorial: {
          label: 'Video Tutorial',
          title: 'MechMerlin video how-to per il configuratore',
          help: 'MechMerlin guida video'
        },
        darkmode: {
          label: 'Cambia Modalità scura',
          title: 'Modalità scura'
        },
        language: {
          title: 'Lingua'
        },
        on: {
          label: 'Se'
        },
        off: {
          label: 'Non'
        }
      },
      errors: {
        invalidQMKKeymap:
          "Mi dispiace, ma sembra che questo non sia un file valido keymap QMK.",
        kbfirmwareJSONUnsupported:
          "Mi dispiace, il Configuratore QMK non consente di importare i file JSON da kbfirmware.",
        unknownJSON: "Mi dispiace, questo non sembra essere un file keymap QMK.",
        unsupportedBrowser: "Stai usando un browser incompatibile. Utilizzare"
      },
      statsTemplate:
        '\nCarico {layers} cappottos e {count} codici chiave. Definito {any} Any chiave codice chiave\n',
      maintain: 'Questo progetto è gestito da collaboratori di QMK come lei!',
      hostedOn: 'Ospitato in GitHub Pages',
      serverStatus: 'Stato Server',
      apiVersion: 'Versione API',
      jobsWaiting: 'lavori in attesa'
    }
  }
};
