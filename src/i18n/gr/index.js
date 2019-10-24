import potato from './potato';
import print from './print';
import tester from './tester';
export default {
  el: {
    message: {
      ...potato,
      help: {
        label: 'Καλέστε τον Μάγο'
      },
      print: { ...print },
      tester: { ...tester },
      keyboard: {
        label: 'πληκτρολόγιο'
      },
      layout: {
        label: 'διάταξη'
      },
      keymapName: {
        label: 'Όνομα Διάταξης',
        placeholder: 'προσαρμοσμένο όνομα keymap'
      },
      loadDefault: {
        label: 'Φότωση Προεπιλεγμένων',
        title: 'Φόρτωση Προεπιλεγμένου Keymap από Λογισμικό QMK'
      },
      compile: {
        label: 'Compile',
        title: 'Compile Keymap'
      },
      downloadKeymap: {
        title: 'Λήψη μόνο keymap.c',
        label: 'Μόνο keymap'
      },
      downloadSource: {
        title: 'Λήψη QMK',
        label: 'Πλήρης Πηγή'
      },
      downloadJSON: {
        title: 'Εξαγωγή αρχείου QMK Keymap JSON',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: 'Εισαγωγή αρχείου QMK Keymap JSON'
      },
      importUrlJSON: {
        title: 'Εισαγωγή QMK Keymap JSON από URL'
      },
      printKeymap: {
        title: 'Εκτύπωση Επιπέδων Keymap',
        label: 'Εκτύπωση Keymap'
      },
      testKeys: {
        title: 'Έλεγχος Εισόδου Πληκτρολογίου',
        label: 'Έλεγχος Πληκτρολογίου'
      },
      downloadFirmware: {
        label: 'Λογισμικό',
        title: 'Λήψη αρχείου λογισμικού για flash'
      },
      flashFirmware: {
        label: 'Αυτόματο Flash',
        title: 'Αύτόματα κάντε Flash το compiled λογισμικό στο MCU'
      },
      flashFile: {
        label: 'Χειροκίνητο Flash',
        title: 'Κάντε Flash στο επιλεγμένο αρχείο στο MCU'
      },
      ColorwayTip: {
        title: 'Ctrl + Alt + N για να αλλάξετε χρώματα'
      },
      layer: {
        label: 'Επίπεδο',
        confirm: 'Είστε σίγουρος/η πως θέλετε να διαγράψετε αυτό το επίπεδο;',
        title: 'Καθαρισμός Επιπέδου'
      },
      keymap: {
        label: 'Keymap'
      },
      downloadToolbox: {
        label: 'Αποκτήστε το QMK Toolbox'
      },
      keycodes: {
        label: 'Keycodes'
      },
      keycodesRef: {
        label: 'Πηγή Keycodes'
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
          label: 'Ρυθμίσεις Πληκτρολογίου'
        },
        AppMediaMouse: {
          label: 'Εφαρμογές, Πολυμέσα, και λειτουργίες Ποντικιού'
        }
      },
      settingsPanel: {
        title: 'Ρυθμίσεις Configurator',
        fastInput: {
          label: 'Γρήγορη Είσοδος',
          title: 'ctrl + alt + f',
          help: 'Είσοδος πλήκτρων μέσω του πληκτρολογίου χωρίς να κάνετε κλικ τη κάθε θέση.'
        },
        displaySizes: {
          label: 'Δείξτε το Μέγεθος των Πλήκτρων',
          title: 'ctrl + alt + u',
          help: 'Δείχνει το μέγεθος των πλήκτρων σε μονάδες keycap.'
        },
        toggleTutorial: {
          label: 'Video Tutorial',
          title: 'Βοηθητικό Video από τον MechMerlin για το Configurator',
          help: 'Video Οδηγός του MechMerlin'
        },
        darkmode: {
          label: 'Αλλαγή σε σκοτεινή λειτουργία',
          title: 'Dark mode'
        },
        language: {
          title: 'Γλώσσα'
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
          "Συγνώμη, αυτό δεν φαίνεται να είναι ένα έγκυρο QMK keymap αρχείο.",
        kbfirmwareJSONUnsupported:
          "Συγνώμη, το QMK Configurator δεν υποστηρίζει την εισαγωγή kbfirmware JSON αρχείων.",
        unknownJSON: "Συγνώμη, δεν φαίνεται να είναι QMK keymap αρχείο.",
        unsupportedBrowser: "Χρησιμοποιείτε έναν μη-υποστηριζόμενο browser. Παρακαλώ χρησιμοποιήστε"
      },
      statsTemplate:
        '\nΦορτώθηκαν {layers} επίπεδα και {count} πλήκτρα. Προσδιορίστε {any} οποιεσδήποτε Any θέσεις πλήκτρων\n',
      maintain:
        'Αυτό το project συντηρείται από τους QMK συνεργάτες και ανθρώπους που συνεισφέρουν σαν κι εσένα!',
      hostedOn: 'Hosted on GitHub Pages',
      serverStatus: 'Κατάσταση Server',
      apiVersion: 'Έκδοση API',
      jobsWaiting: 'Εκκρεμείς εργασία/ες'
    }
  }
};
