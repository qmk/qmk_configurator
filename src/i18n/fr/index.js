import potato from './potato';
export default {
  fr: {
    message: {
      ...potato,
      keyboard: {
        label: 'clavier'
      },
      layout: {
        label: 'agencement'
      },
      keymapName: {
        label: 'Nom de la disposition',
        placeholder: 'disposition personnalisé'
      },
      loadDefault: {
        label: 'Charger la disposition par défaut',
        title: 'Charger la disposition par défaut de QMK'
      },
      compile: {
        label: 'Compiler',
        title: 'Compiler la disposition'
      },
      downloadKeymap: {
        title: 'Télécharger seulement keymap.c',
        label: 'disposition seulement'
      },
      downloadSource: {
        title: 'Télécharger le code source de QMK',
        label: 'Code Source'
      },
      downloadJSON: {
        title: 'Exporter le fichier JSON de la disposition actuelle',
        label: 'Disposition.JSON'
      },
      importJSON: {
        title: 'Importer un fichier de disposition JSON'
      },
      downloadFirmware: {
        label: 'Firmware',
        title: 'Télécharger le fichier du firmware à flash'
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
        label: 'Obternir la boite à outils de QMK'
      },
      keycodes: {
        label: 'Codes des touches'
      },
      keycodesRef: {
        label: 'Référence des codes pour les touches'
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
          label: 'Applications, Médias et Souris'
        }
      },
      settingsPanel: {
        title: 'Paramètres du Configurateur',
        fastInput: {
          label: 'Entrée Rapide',
          title: 'ctrl + alt + f',
          help: 'Permet d\'entrer les touches via votre clavier sans cliquer sur chaque positions.'
        },
        displaySizes: {
          label: 'Montrer la taille des touches',
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
          "Désolé, cela ne semble pas être un fichier de disposition QMK valide.",
        kbfirmwareJSONUnsupported:
          "Désolé, le Configurateur QMK ne supporte pas l\'importation des fichiers JSON de kbfirmware.",
        unknownJSON: "Désolé, cela ne semble pas être un fichier de disposition QMK."
      },
      statsTemplate:
        '\n{layers} strates et {count} touches chargées. {any} emplacements vides definis\n'
    }
  }
};
