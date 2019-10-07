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
        label: 'layout'
      },
      keymapName: {
        label: 'Имя клавиатуры',
        placeholder: 'имя пользовательской клавиатуры'
      },
      loadDefault: {
        label: 'Загрузка по умолчанию',
        title: 'Загрузка клавиатуры из прошивки QMK'
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
        title: 'Скачать код прошивки QMK',
        label: 'Полный источник'
      },
      downloadJSON: {
        title: 'Экспортировать файл JSON раскладки QMK',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: 'Импортировать файл JSON раскладки QMK'
      },
      importUrlJSON: {
        title: 'Импортировать JSON раскладки QMK из URL'
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
        title: 'Скачать прошивочный файл для прошивки'
      },
      flashFirmware: {
        label: 'Авто-прошивка',
        title: 'Автоматически прошить скомпилированную прошивку на MCU'
      },
      flashFile: {
        label: 'Пользовательская прошивка',
        title: 'Прошить выбранный пользовательский файл на MCU'
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
        label: 'Получить QMK инструментарий'
      },
      keycodes: {
        label: 'Коды клавиш'
      },
      keycodesRef: {
        label: 'Ссылка на коды клавиш'
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
          label: 'Fast Input',
          title: 'ctrl + alt + f',
          help: 'Ввод клавиш через клавиатуру без нажатия на каждую позицию.'
        },
        displaySizes: {
          label: 'Показать размеры клавиш',
          title: 'ctrl + alt + u',
          help: 'Показать размеры клавиш в Key Units'
        },
        toggleTutorial: {
          label: 'Видеоурок',
          title: 'MechMerlin видео с инструкциями о конфигураторе',
          help: 'MechMerlin видеогид'
        },
        darkmode: {
          label: 'Переключить в темный режим',
          title: 'Темный режим'
        },
        language: {
          title: 'Язык'
        },
        on: {
          label: 'Включить'
        },
        off: {
          label: 'Выключить'
        }
      },
      errors: {
        invalidQMKKeymap:
          "Извините, это неверный файл раскладки QMK.",
        kbfirmwareJSONUnsupported:
          "Извините, QMK конфигуратор не поддерживает импорт JSON файлов раскладки прошивки.",
        unknownJSON: "Извините, это не похоже на файл раскладки QMK.",
        unsupportedBrowser: "Вы используете не поддерживаемый браузер. Пожалуйста, используйте"
      },
      statsTemplate:
        '\nLoaded {layers} слои и {count} коды клавиш. Определен {any} любой код кодов клавиш\n',
      maintain:
        '"Данный проект поддерживается коллабораторами QMK и такими же соавторами, как ты!"',
      hostedOn: 'Размещено на GitHub',
      serverStatus: 'Статус сервера',
      apiVersion: 'Версия API',
      jobsWaiting: 'задание(я) ожидает(ют)'
    }
  }
};
