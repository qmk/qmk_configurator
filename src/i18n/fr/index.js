import potato from './potato';
export default {
  fr: {
    message: {
      ...potato,
      keyboard: {
        label: 'clavier'
      },
      layout: {
        label: 'version'
      },
      keymapName: {
        label: 'Nom de la disposition',
        placeholder: 'Disposition Personnalisée'
      },
      loadDefault: {
        label: 'Disposition par défaut',
        title: 'Charge la disposition des touches par défaut de QMK'
      },
      compile: {
        label: 'Compiler',
        title: 'Compile la disposition des touches actuelle'
      },
      downloadKeymap: {
        title:
          'Télécharge seulement le fichier de disposition des touches keymap.c',
        label: 'disposition seulement'
      },
      downloadSource: {
        title: 'Télécharge le code source de qmk.fm',
        label: 'Code Source'
      },
      downloadJSON: {
        title:
          'Exporte le fichier .JSON de la disposition des touches actuelle',
        label: 'Disposition.JSON'
      },
      importJSON: {
        title: 'Importer un fichier .JSON de disposition des touches'
      },
      printKeymap: {
        title: 'Imprime les strates de la disposition',
        label: 'Imprimer la disposition'
      },
      downloadFirmware: {
        label: 'Firmware',
        title: 'Télécharge le fichier du firmware à flash'
      },
      ColorwayTip: {
        title: 'Ctrl + Alt + N pour changer de coloris'
      },
      layer: {
        label: 'Strate'
      },
      keymap: {
        label: 'Disposition'
      },
      downloadToolbox: {
        label: 'Obternir QMK Toolbox'
      },
      keycodes: {
        label: 'Codes des touches'
      },
      keycodesRef: {
        label: 'Référence'
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
          label: 'Paramètres du clavier'
        },
        AppMediaMouse: {
          label: 'Apps, Médias et Souris'
        }
      },
      settingsPanel: {
        title: 'Paramètres du Configurateur',
        fastInput: {
          label: 'Entrée Rapide',
          title: 'ctrl + alt + f',
          help:
            "Permet d'entrer les touches via votre clavier sans cliquer sur chaque positions."
        },
        displaySizes: {
          label: 'Taille des touches',
          title: 'ctrl + alt + u',
          help: 'Montre la taille des touches (une touche classique = 1 u)'
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
          'Désolé, cela ne semble pas être un fichier de disposition QMK valide.',
        kbfirmwareJSONUnsupported:
          "Désolé, le Configurateur QMK ne supporte pas l'importation des fichiers JSON de kbfirmware.",
        unknownJSON:
          'Désolé, cela ne semble pas être un fichier de disposition QMK.'
      },
      statsTemplate:
        '\n{layers} strates et {count} touches chargées. {any} emplacements vides definis\n'
    }
  }
};
