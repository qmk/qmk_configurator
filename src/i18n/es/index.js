import potato from './potato';
import print from './print';
import tester from './tester';
export default {
  en: {
    message: {
      ...potato,
      help: {
        label: 'Abrir tutorial'
      },
      print: { ...print },
      tester: { ...tester },
      keyboard: {
        label: 'teclado'
      },
      layout: {
        label: 'plano'
      },
      keymapName: {
        label: 'Nombre de keymap',
        placeholder: 'nombre de keymap personalizado'
      },
      loadDefault: {
        label: 'Cargar valor por defecto',
        title: 'Cargar valor por defecto para plano de Firmware QMK'
      },
      compile: {
        label: 'Compilar',
        title: 'Compilar el keymap'
      },
      downloadKeymap: {
        title: 'Descargar solamente keymap.c',
        label: 'solo keymap'
      },
      downloadSource: {
        title: 'Dsecargar código de Firmware QMK',
        label: 'Código completo'
      },
      downloadJSON: {
        title: 'Exportar archivo JSON de Keymap QMK',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: 'Importar archivo JSON de Keymap QMK'
      },
      importUrlJSON: {
        title: 'Import archivo JSON de Keymap QMK de URL'
      },
      printKeymap: {
        title: 'Imprimir capas de keymap',
        label: 'Imprimir keymap'
      },
      testKeys: {
        title: 'Probar entrada del teclado',
        label: 'Probar teclado'
      },
      downloadFirmware: {
        label: 'Firmware',
        title: 'Descargar archivo de firmware para instalar'
      },
      flashFirmware: {
        label: 'Auto-Instalar',
        title: 'Automaticamente instalar Firmware compilado al MCU'
      },
      flashFile: {
        label: 'Instalar personalizado',
        title: 'Instalar archivo elegido al MCU'
      },
      ColorwayTip: {
        title: 'Ctrl + Alt + N para cambiar al próximo color'
      },
      layer: {
        label: 'Capa',
        confirm: '¿Estás seguro de que quieres borrar la capa?',
        title: 'Borrar capa'
      },
      keymap: {
        label: 'Keymap'
      },
      downloadToolbox: {
        label: 'Descargar QMK Toolbox'
      },
      keycodes: {
        label: 'Códigos de teclas'
      },
      keycodesRef: {
        label: 'Referencia de códigos de tecla'
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
          label: 'Configuración de teclado'
        },
        AppMediaMouse: {
          label: 'App, Media y Mouse'
        }
      },
      settingsPanel: {
        title: 'Configuración de Configurator',
        fastInput: {
          label: 'Entrada rápida',
          title: 'ctrl + alt + f',
          help:
            'Ingresar teclas por media del teclado sin hacer clic en cada posición.'
        },
        displaySizes: {
          label: 'Mostrar tamaño de teclas',
          title: 'ctrl + alt + u',
          help: 'Mostrar tamaños de keycaps en Unidades de Tecla'
        },
        toggleTutorial: {
          label: 'Video Tutorial',
          title: 'MechMerlin video how-to para Configurator',
          help: 'MechMerlin video guía'
        },
        darkmode: {
          label: 'Cambiar Modo oscuro',
          title: 'Modo oscuro'
        },
        language: {
          title: 'Idioma'
        },
        on: {
          label: 'Sí'
        },
        off: {
          label: 'No'
        }
      },
      errors: {
        invalidQMKKeymap:
          'Lo siento, pero parece que este no es un archivo válido de keymap QMK.',
        kbfirmwareJSONUnsupported:
          'Lo siento, el Configurator QMK no permite importar archivos JSON de kbfirmware.',
        unknownJSON: 'Lo siento, este no parece ser un archivo keymap QMK.',
        unsupportedBrowser:
          'Estás usando un navegador incompatible. Por favor usa'
      },
      statsTemplate:
        '\nCargó {layers} capas y {count} códigos de tecla. Definió {any} Any tecla códigos de tecla\n',
      maintain: 'Este proyecto se mantiene por colaboradores QMK como tú!',
      hostedOn: 'Alojado en GitHub Pages',
      serverStatus: 'Servidor',
      apiVersion: 'Versión de API',
      jobsWaiting: 'trabajo(s) esperando'
    }
  }
};
