import potato from './potato';
import print from './print';
import tester from './tester';
export default {
  'pl-PL': {
    message: {
      ...potato,
      help: {
        label: 'Przywołaj czarodzieja'
      },
      print: { ...print },
      tester: { ...tester },
      keyboard: {
        label: 'Klawiatura'
      },
      layout: {
        label: 'Układ'
      },
      keymapName: {
        label: 'Nazwa mapy klawiszy',
        placeholder: 'Własna mapa klawiszy'
      },
      loadDefault: {
        label: 'Wczytaj domyślną',
        title: 'Wczytaj domyślną mapę klawiszy z QMK Firmware'
      },
      compile: {
        label: 'Kompiluj',
        title: 'Kompiluj mapę klawiszy'
      },
      downloadKeymap: {
        label: 'Mapa klawiszy',
        title: 'Pobierz tylko plik keymap.c'
      },
      downloadSource: {
        label: 'Cały kod źródłowy',
        title: 'Pobierz całość kodu QMK Firmware'
      },
      downloadJSON: {
        label: 'keymap.json',
        title: 'Pobierz mapę klawiszy w formacie JSON'
      },
      importJSON: {
        title: 'Wczytaj mapę klawiszy QMK w formacie JSON z pliku'
      },
      importUrlJSON: {
        title: 'Wczytaj mapę klawiszy QMK w formacie JSON z adresu URL'
      },
      printKeymap: {
        label: 'Drukuj mapę',
        title: 'Drukuj wszystkie warstwy mapy klawiszy'
      },
      testKeys: {
        label: 'Test klawiatury',
        title: 'Przetestuj działanie klawiatury'
      },
      downloadFirmware: {
        label: 'Firmware',
        title: 'Pobierz plik firmware aby wgrać go do klawiatury'
      },
      flashFirmware: {
        label: 'Auto-Wgrywanie',
        title: 'Automatyczne wgrywanie pliku firmware do klawiatury'
      },
      flashFile: {
        label: 'Wgrywanie ręczne',
        title: 'Wybierz plik z firmware do wgrania do klawiatury'
      },
      ColorwayTip: {
        title: 'Wciśnij Ctrl + Alt + N aby wybrać następny motyw kolorystyczny'
      },
      layer: {
        label: 'Warstwa',
        confirm: 'Na pewno chcesz wyczyścić aktualną warstwę?',
        title: 'Wyczyść warstwę'
      },
      keymap: {
        label: 'Mapa klawiszy'
      },
      downloadToolbox: {
        label: 'Pobierz QMK Toolbox'
      },
      keycodes: {
        label: 'Kody klawiszy'
      },
      keycodesRef: {
        label: 'Rozpiska kodów klawiszy'
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
          label: 'Ustawienia klawiatury'
        },
        AppMediaMouse: {
          label: 'Aplikacje, Mysz i Multimedia'
        }
      },
      settingsPanel: {
        title: 'Ustawienia konfiguratora',
        fastInput: {
          label: 'Szybkie wprowadzanie',
          title: 'Ctrl + Alt + F',
          help:
            'Autmatyczne podświetlanie kolejnego klawisza po zdefiniowaniu funkcji popredniego.'
        },
        displaySizes: {
          label: 'Pokaż rozmiary klawiszy',
          title: 'Ctrl + Alt + U',
          help:
            'Wyświetla rozmiary klawiszy używając jako skali szerokości klawisza alfanumerycznego.'
        },
        toggleTutorial: {
          label: 'Przewodnik wideo',
          title: 'MechMerlin tłumaczy obsługę Konfiguratora',
          help: 'Przewodnik wideo MechMerlina'
        },
        darkmode: {
          label: 'Włącz/wyłącz tryb nocny',
          title: 'Tryb nocny'
        },
        language: {
          title: 'Język'
        },
        on: {
          label: 'Wł'
        },
        off: {
          label: 'Wył'
        }
      },
      errors: {
        invalidQMKKeymap:
          'Wgrany plik nie jest poprawnie sformatowaną mapą klawiszy QMK.',
        kbfirmwareJSONUnsupported:
          'Niestety Konfigurator QMK nie obsługuje wgrywania plików kbfirmware w formacie JSON',
        unknownJSON: 'Wgrany plik nie jest mapą klawiszy QMK.',
        unsupportedBrowser:
          'Używasz przeglądarki, której nie wspieramy. Uruchom'
      },
      statsTemplate:
        '\nWgrano {layers} warstw i {count} kodów klawiszy. Zdefiniowano {any} kodów klawiszy Any\n',
      maintain:
        'Ten projekt jest prowadzony przez współpracowników QMK i współtwórców takich jak Ty!',
      hostedOn: 'Hostowane na GitHub Pages',
      serverStatus: 'Status serwera',
      apiVersion: 'Wersja API',
      jobsWaiting: 'zadań w kolejce'
    }
  }
};
