import potato from './potato';
export default {
  fr: {
    message: {
      ...potato,
      keyboard: {
        label: 'clavier'
      },
      layout: {
        label: 'disposition des touches'
      },
      keymapName: {
        label: 'Nom de l\'arrangement des touches',
        placeholder: 'arrangement personnalisé'
      },
      loadDefault: {
        label: 'Charger l\'arrangement des touches par défaut',
        title: 'Charger l\'arrangement des touches par défaut du firmware QMK'
      },
      compile: {
        label: 'Compiler',
        title: 'Compiler l\'arrangement'
      },
      downloadKeymap: {
        title: 'Télécharger seulement keymap.c',
        label: 'arrangement seulement'
      },
      downloadSource: {
        title: 'Télécharger le code du Firmware QMK',
        label: 'Source complète'
      },
      downloadJSON: {
        title: 'Exporter le fichier JSON QMK d\'arrangement des touches',
        label: 'Arrangement.JSON'
      },
      importJSON: {
        title: 'Importer un fichier JSON QMK d\'arrangement des touches'
      },
      downloadFirmware: {
        label: 'Firmware',
        title: 'Télécharger le fichier du firmware à flash'
      },
      ColorwayTip: {
        title: 'Ctrl + Alt + N pour changer de coloris'
      },
      layer: {
        label: 'Couche'
      },
      keymap: {
        label: 'Arrangement des touches'
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
          help: 'Montre la taille des touches en unité u (une touche classique = 1 u)'
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
          "Désolé, cela ne semble pas être un fichier QMK d\'arrangement des touches valide.",
        kbfirmwareJSONUnsupported:
          "Désolé, le Configurateur QMK ne supporte pas l\'importation des fichiers JSON de kbfirmware.",
        unknownJSON: "Désolé, cela ne semble pas être un fichier QMK d\'arrangement des touches."
      },
      statsTemplate:
        '\n{layers} couches et {count} touches chargées. {any} emplacements vides definis\n'
    }
  }
};
