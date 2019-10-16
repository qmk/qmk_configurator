import potato from './potato';
import print from './print';
import tester from './tester';
export default {
  'pt-BR': {
    message: {
      ...potato,
      help: {
        label: 'Invocar mago'
      },
      print: { ...print },
      tester: { ...tester },
      keyboard: {
        label: 'teclado'
      },
      layout: {
        label: 'layout'
      },
      keymapName: {
        label: 'Nome da keymap',
        placeholder: 'nome da keymap customizada'
      },
      loadDefault: {
        label: 'Carregar padrão',
        title: 'Carregar keymap padrão do QMK Firmware'
      },
      compile: {
        label: 'Compilar',
        title: 'Compilar Keymap'
      },
      downloadKeymap: {
        title: 'Baixar somente keymap.c',
        label: 'somente keymap'
      },
      downloadSource: {
        title: 'Download QMK Firmware code',
        label: 'Full Source'
      },
      downloadJSON: {
        title: 'Exportar JSON do keymap QMK',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: 'Importar JSON do keymap QMK'
      },
      importUrlJSON: {
        title: 'Importar JSON da URL QMK Keymap JSON'
      },
      printKeymap: {
        title: 'Printar camadas de Keymap',
        label: 'Printar Keymap'
      },
      testKeys: {
        title: 'Testar entrada do teclado',
        label: 'Testar teclado'
      },
      downloadFirmware: {
        label: 'Firmware',
        title: 'Baixar arquivo firmware para flashing'
      },
      flashFirmware: {
        label: 'Auto-Flash',
        title: 'Enviar firmware para MCU automaticamente'
      },
      flashFile: {
        label: 'Flash-Customizado',
        title: 'Enviar arquivo selecionado pelo usuário para o MCU'
      },
      ColorwayTip: {
        title: 'Ctrl + Alt + N para próximo esquema de cores'
      },
      layer: {
        label: 'Camadas',
        confirm: 'Limpar as camadas”',
        title: 'Limpar camadas'
      },
      keymap: {
        label: 'Keymap'
      },
      downloadToolbox: {
        label: 'Requerir QMK Toolbox'
      },
      keycodes: {
        label: 'Keycodes'
      },
      keycodesRef: {
        label: 'Referencias de Keycodes'
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
          label: 'Configurações de teclado'
        },
        AppMediaMouse: {
          label: 'App, Midia e Mouse'
        }
      },
      settingsPanel: {
        title: 'Configurações',
        fastInput: {
          label: 'Entrada rápida',
          title: 'ctrl + alt + f',
          help:
            'Entrada de comandos a partir do teclado sem clicar em outra posição.'
        },
        displaySizes: {
          label: 'Mostrar tamanho de teclas',
          title: 'ctrl + alt + u',
          help: 'Mostrar tamanhos de teclas em unidades-chave'
        },
        toggleTutorial: {
          label: 'Tutorial em Video',
          title: 'MechMerlin how-to video on Configurator',
          help: 'MechMerlin video guide'
        },
        darkmode: {
          label: 'Toggle Darkmode',
          title: 'Modo noturno'
        },
        language: {
          title: 'Linguagem'
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
          'Desculpe, este não parece ser um arquivo de mapa de chaves do QMK válido. ',
        kbfirmwareJSONUnsupported:
          'Desculpe, o QMK Configurator não suporta a importação de arquivos JSON do kbfimware.',
        unknownJSON:
          'Desculpe, este não parece ser um arquivo de mapa de teclas do QMK.',
        unsupportedBrowser:
          'Você está usando um navegador não suportado. Por favor, use'
      },
      statsTemplate:
        '\nCarregou {layers} camadas e {count} códigos-chave. Definido {any} Qualquer código-chave\n',
      maintain: 'Este projeto é mantido por colaboradores do QMK como você!',
      hostedOn: 'Hospedado no GitHub',
      serverStatus: 'Status do servidor',
      apiVersion: 'Versão da API',
      jobsWaiting: 'Processos em execuçãoS'
    }
  }
};
