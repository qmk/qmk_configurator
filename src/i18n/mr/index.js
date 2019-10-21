import potato from './potato';
import print from './print';
import tester from './tester';
export default {
  mr: {
    message: {
      ...potato,
      help: {
        label: 'जादूगाराला बोलवा'
      },
      print: { ...print },
      tester: { ...tester },
      keyboard: {
        label: 'कीबोर्ड'
      },
      layout: {
        label: 'मांडणी'
      },
      keymapName: {
        label: 'कीमॅप नाव',
        placeholder: 'सानुकूल कीमॅप नाव'
      },
      loadDefault: {
        label: 'डीफॉल्ट लोड करा',
        title: 'QMK फर्मवेअर वरून मुळ कीमॅप लोड करा'
      },
      compile: {
        label: 'संकलित',
        title: 'कीमॅप संकलित करा'
      },
      downloadKeymap: {
        title: 'केवळ keymap.c डाउनलोड करा',
        label: 'फक्त कीमॅप'
      },
      downloadSource: {
        title: 'क्यूएमके फर्मवेअर कोड डाउनलोड करा',
        label: 'पूर्ण स्रोत'
      },
      downloadJSON: {
        title: 'QMK कीमॅप JSON फाईल निर्यात करा',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: 'QMK कीमॅप JSON फाइल आयात करा'
      },
      importUrlJSON: {
        title: 'URL वरून QMK कीमॅप JSON आयात करा'
      },
      printKeymap: {
        title: 'कीमॅप थर (लेयर) मुद्रित करा',
        label: 'कीमॅप मुद्रित करा'
      },
      testKeys: {
        title: 'कीबोर्ड इनपुट तपासा',
        label: 'कीबोर्ड तपासा'
      },
      downloadFirmware: {
        label: 'फर्मवेअर',
        title: 'फ्लॅशिंगसाठी फर्मवेअर फाइल डाउनलोड करा'
      },
      flashFirmware: {
        label: 'ऑटो-फ्लॅश',
        title: 'स्वयंचलितपणे फ्लॅशने MCU ला फर्मवेअर कंपाईल केले'
      },
      flashFile: {
        label: 'सानुकूल-फ्लॅश',
        title: 'फ्लॅश यूजरने MCU साठी फाईल सिलेक्ट केली'
      },
      ColorwayTip: {
        title: 'पुढील colorway बदलण्यासाठी Ctrl + Alt + N'
      },
      layer: {
        label: 'थर (लेयर)',
        confirm: 'आपली खात्री आहे की आपण थर (लेयर) साफ करू इच्छिता?',
        title: 'थर साफ करा'
      },
      keymap: {
        label: 'कीमॅप'
      },
      downloadToolbox: {
        label: 'QMK टूलबॉक्स मिळवा'
      },
      keycodes: {
        label: 'कीकोड्स'
      },
      keycodesRef: {
        label: 'कीकोडचा संदर्भ'
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
          label: 'कीबोर्ड सेटिंग्ज'
        },
        AppMediaMouse: {
          label: 'अ‍ॅप, मीडिया आणि माउस'
        }
      },
      settingsPanel: {
        title: 'कॉन्फिगररेटर सेटिंग्ज',
        fastInput: {
          label: 'जलद इनपुट',
          title: 'Ctrl + Alt + F',
          help: 'प्रत्येक स्थानावर क्लिक न करता कीबोर्डद्वारे इनपुट की.'
        },
        displaySizes: {
          label: 'की आकार दर्शवा',
          title: 'Ctrl + Alt + U',
          help: 'की एकाकांमध्ये कीकॅप आकार दर्शवा'
        },
        toggleTutorial: {
          label: 'व्हिडिओ ट्यूटोरियल',
          title: 'MechMerlin चा कॉन्फिगररेटरवरील मार्गदर्शक व्हिडिओ',
          help: 'MechMerlin मार्गदर्शक व्हिडिओ'
        },
        darkmode: {
          label: 'डार्कमोड टॉगल करा',
          title: 'डार्कमोड'
        },
        language: {
          title: 'भाषा'
        },
        on: {
          label: 'चालू'
        },
        off: {
          label: 'बंद'
        }
      },
      errors: {
        invalidQMKKeymap:
          'क्षमस्व, ती एक वैध QMK कीमॅप फाइल असल्याचे दिसत नाही.',
        kbfirmwareJSONUnsupported:
          'क्षमस्व, QMK कॉन्फिगररेटर kbfirmware JSON फायली आयात करण्यास समर्थन देत नाही.',
        unknownJSON: 'क्षमस्व, ही एक QMK कीमॅप फाइल असल्याचे दिसत नाही.',
        unsupportedBrowser:
          'आपण एक समर्थित नसलेला ब्राउझर वापरत आहात. कृपया वापरा'
      },
      statsTemplate:
        '\n{layers} स्तर आणि {count} कीकोड लोड केले. {any} कोणतीही की कीकोड परिभाषित केली.\n',
      maintain:
        'हा प्रकल्प QMK सहयोगी आणि आपल्यासारख्या योगदानकर्त्यांनी पहिलं जात आहे!',
      hostedOn: 'GitHub पृष्ठे वर होस्ट केलेले',
      serverStatus: 'सर्व्हर स्थिती',
      apiVersion: 'API आवृत्ती',
      jobsWaiting: 'जॉब्(स) प्रतीक्षा करीत आहेत'
    }
  }
};
