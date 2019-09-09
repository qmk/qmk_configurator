import potato from './potato';
import print from './print';
import tester from './tester';
export default {
  fr: {
    message: {
      ...potato,
      help: {
        label: 'Invoque le Sorcier'
      },
      print: { ...print },
      tester: { ...tester },
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
        title: 'Importe un fichier .JSON de disposition des touches'
      },
      importUrlJSON: {
        title: "Importe une disposition QMK .JSON d'une URL"
      },
      printKeymap: {
        title: 'Imprime les calques de la disposition',
        label: 'Imprimer la disposition'
      },
      testKeys: {
        title: 'Teste le clavier',
        label: 'Testeur de clavier'
      },
      downloadFirmware: {
        label: 'Firmware',
        title: 'Télécharge le fichier du firmware à flash'
      },
      flashFirmware: {
        label: 'Flash Automatique',
        title: 'Flash automatiquement le firmware compilé'
      },
      flashFile: {
        label: 'Flash Manuel',
        title: 'Flash le fichier selectionné'
      },
      ColorwayTip: {
        title: 'Ctrl + Alt + N pour changer de coloris'
      },
      layer: {
        label: 'Calque',
        confirm: 'Etes-vous sur de vouloir effacer ce calque?',
        title: 'Efface le calque'
      },
      keymap: {
        label: 'Disposition'
      },
      downloadToolbox: {
        label: 'Obtenir QMK Toolbox'
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
        toggleTutorial: {
          label: 'Guide Vidéo',
          title: 'Guide vidéo de MechMerlin sur le configurateur (en Anglais)',
          help: 'Guide vidéo de MechMerlin (en Anglais)'
        },
        darkmode: {
          label: 'Mode Sombre',
          title: 'Active/Désactive le mode sombre'
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
          'Désolé, cela ne semble pas être un fichier de disposition QMK.',
        unsupportedBrowser:
          "Vous utilisez un navigateur non-supporté. Utilisez s'il vous plait"
      },
      statsTemplate:
        '\n{layers} calques et {count} touches chargées. {any} emplacements vides definis\n',
      maintain:
        'Ce projet est maintenu par les collaborateurs QMK et des contributeurs comme vous!',
      hostedOn: 'Hébergé sur GitHub Pages',
      serverStatus: 'Statut du serveur',
      apiVersion: `Version de l'API`,
      jobsWaiting: 'tâche(s) en attente'
    }
  }
};
