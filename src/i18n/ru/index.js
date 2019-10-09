import potato from './potato';
import print from './print';
import tester from './tester';
export default {
  ru: {
    message: {
      ...potato,
      help: {
        label: 'Вызов волшебника'
      },
      print: { ...print },
      tester: { ...tester },
      keyboard: {
        label: 'клавиатура'
      },
      layout: {
        label: 'раскладка'
      },
      keymapName: {
        label: 'Название раскладки',
        placeholder: 'название пользовательской раскладки'
      },
      loadDefault: {
        label: 'Значения по умолчанию',
        title: 'Загрузить раскладку со значениями по умолчанию из QMK Прошивки'
      },
      compile: {
        label: 'Скомпилировать',
        title: 'Скомпилировать раскладку'
      },
      downloadKeymap: {
        title: 'Скачать только keymap.c',
        label: 'только раскладка'
      },
      downloadSource: {
        title: 'Скачать код QMK Прошивки',
        label: 'Все исходники'
      },
      downloadJSON: {
        title: 'Экспортировать раскладку QMK в JSON файл',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: 'Импортировать раскладку QMK из JSON файла'
      },
      importUrlJSON: {
        title: 'Импортировать раскладку QMK в виде JSON из URL'
      },
      printKeymap: {
        title: 'Распечатать слои раскладки',
        label: 'Распечатать раскладку'
      },
      testKeys: {
        title: 'Проверка ввода с клавиатуры',
        label: 'Проверка клавиатуры'
      },
      downloadFirmware: {
        label: 'Прошивка',
        title: 'Скачать прошивочный файл для процесса прошивки'
      },
      flashFirmware: {
        label: 'Авто-прошивка',
        title: 'Автоматически прошить микроконтроллер скомпилированной прошивкой'
      },
      flashFile: {
        label: 'Пользовательская прошивка',
        title: 'Прошить микроконтроллер выбранным пользовательским файлом'
      },
      ColorwayTip: {
        title: 'Ctrl + Alt + N, чтобы перейти к следующему цветовому варианту'
      },
      layer: {
        label: 'Слой',
        confirm: 'Вы уверены, что хотите очистить слой?',
        title: 'Очистить слой'
      },
      keymap: {
        label: 'Раскладка'
      },
      downloadToolbox: {
        label: 'Получить QMK Инструменты'
      },
      keycodes: {
        label: 'Коды клавиш'
      },
      keycodesRef: {
        label: 'Справочник по кодам клавиш'
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
          label: 'Настройки клавиатуры'
        },
        AppMediaMouse: {
          label: 'Приложение, медиа и мышь'
        }
      },
      settingsPanel: {
        title: 'Настройки конфигуратора',
        fastInput: {
          label: 'Быстрый ввод',
          title: 'ctrl + alt + f',
          help: 'Ввод клавиш через клавиатуру без необходимости нажимать на каждую позицию'
        },
        displaySizes: {
          label: 'Показывать размеры клавиш',
          title: 'ctrl + alt + u',
          help: 'Показывать размеры клавиш в Key Units'
        },
        toggleTutorial: {
          label: 'Видеоурок',
          title: 'Видео от MechMerlin с инструкциями к конфигуратору',
          help: 'Видеоурок от MechMerlin'
        },
        darkmode: {
          label: 'Темный режим',
          title: 'Темный режим'
        },
        language: {
          title: 'Язык'
        },
        on: {
          label: 'Вкл'
        },
        off: {
          label: 'Выкл'
        }
      },
      errors: {
        invalidQMKKeymap:
          "Извините, это неверный файл раскладки QMK.",
        kbfirmwareJSONUnsupported:
          "Извините, QMK конфигуратор не поддерживает импорт JSON файлов kbfirmware.",
        unknownJSON: "Извините, это не похоже на файл раскладки QMK.",
        unsupportedBrowser: "Вы используете не поддерживаемый браузер. Пожалуйста, используйте"
      },
      statsTemplate:
        '\nЗагружен(а/о) {layers} шт. слоев и {count} шт. кодов клавиш. Обнаружено {any} разных кодов кодов клавиш\n',
      maintain:
        'Данный проект поддерживается коллабораторами QMK и такими же участниками, как вы!',
      hostedOn: 'Размещено на GitHub Pages',
      serverStatus: 'Статус сервера',
      apiVersion: 'Версия API',
      jobsWaiting: 'шт. заданий ожидает'
    }
  }
};
