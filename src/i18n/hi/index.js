import potato from './potato';
import print from './print';
import tester from './tester';
export default {
  en: {
    message: {
      ...potato,
      help: {
        label: 'जादूगर को बुलाओ'
      },
      print: { ...print },
      tester: { ...tester },
      keyboard: {
        label: 'कीबोर्ड'
      },
      layout: {
        label: 'नक्शा'
      },
      keymapName: {
        label: 'कीमैप का नाम',
        placeholder: 'कीमैप का अनुकूल नाम'
      },
      loadDefault: {
        label: 'डिफ़ॉल्ट लोड करें',
        title: 'QMK फर्मवेयर से डिफ़ॉल्ट कीमैप लोड करें'
      },
      compile: {
        label: 'संकलित करें',
        title: 'कीमैप संकलित करें'
      },
      downloadKeymap: {
        title: 'केवल कीमैप.c डाउनलोड करें',
        label: 'केवल कीमैप'
      },
      downloadSource: {
        title: 'QMK Firmware code डाउनलोड करें',
        label: 'पूर्ण स्रोत'
      },
      downloadJSON: {
        title: 'QMK कीमैप JSON फ़ाइल निर्यात करें',
        label: 'Keymap.JSON'
      },
      importJSON: {
        title: 'QMK कीमैप JSON फ़ाइल आयात करें'
      },
      importUrlJSON: {
        title: 'URL से QMK कीमैप JSON आयात करें'
      },
      printKeymap: {
        title: 'कीमैप परतोंको प्रिन्ट करें',
        label: 'कीमैप प्रिंट करें'
      },
      testKeys: {
        title: 'कीबोर्ड इनपुट का परीक्षण करें',
        label: 'कीबोर्ड का परीक्षण करें'
      },
      downloadFirmware: {
        label: 'फर्मवेयर',
        title: 'फ्लैशिंग के लिए फर्मवेयर फ़ाइल डाउनलोड करें'
      },
      flashFirmware: {
        label: 'ऑटो-फ्लैश',
        title: 'स्वचालित रूप से संकलित फर्मवेयर MCU में फ्लैश करें'
      },
      flashFile: {
        label: 'कस्टम-फ्लैश',
        title: 'फ़्लैश उपयोगकर्ता ने MCU के लिए फ़ाइल का चयन किया'
      },
      ColorwayTip: {
        title: 'अगले रंगमार्ग को आवर्तीत करने के लिए Ctrl + Alt + N'
      },
      layer: {
        label: 'परत',
        confirm: 'क्या आप वाकई परत को साफ़ करना चाहते हैं?',
        title: 'परत साफ़ करें'
      },
      keymap: {
        label: 'कीमैप'
      },
      downloadToolbox: {
        label: 'QMK टूलबॉक्स प्राप्त करें'
      },
      keycodes: {
        label: 'की-कोड'
      },
      keycodesRef: {
        label: 'की-कोड संदर्भ'
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
          label: 'कीबोर्ड सेटिंग्स'
        },
        AppMediaMouse: {
          label: 'ऐप, मीडिया और माउस'
        }
      },
      settingsPanel: {
        title: 'विन्यासकर्ता सेटिंग्स',
        fastInput: {
          label: 'फास्ट इनपुट',
          title: 'ctrl + alt + f',
          help: 'प्रत्येक स्थिति पर क्लिक किए बिना कीबोर्ड के माध्यम से इनपुट कुंजी।'
        },
        displaySizes: {
          label: 'मुख्य आकार दिखाएँ',
          title: 'Ctrl + Alt + U',
          help: 'की-कैप आकार मुख्य इकाइयों में दिखाएं'
        },
        toggleTutorial: {
          label: 'वीडियो ट्यूटोरियल',
          title: 'कौन्फ़िगरेटर पर MechMerlin का कैसे-करें वीडियो',
          help: 'MechMerlin वीडियो गाइड'
        },
        darkmode: {
          label: 'डार्कमोड टॉगल करें',
          title: 'डार्क मोड'
        },
        language: {
          title: 'भाषा'
        },
        on: {
          label: 'शुरू'
        },
        off: {
          label: 'बंद'
        }
      },
      errors: {
        invalidQMKKeymap:
          "क्षमा करें, यह एक मान्य QMK कीमैप फ़ाइल प्रतीत नहीं होती है।",
        kbfirmwareJSONUnsupported:
          "क्षमा करें, QMK विन्यासकर्ता kbfirmware JSON फ़ाइलों को आयात करने का समर्थन नहीं करता है।",
        unknownJSON: "क्षमा करें, यह QMK कीमैप फ़ाइल प्रतीत नहीं होती है।",
        unsupportedBrowser: "आप एक गैर-समर्थित ब्राउज़र का उपयोग कर रहे हैं। इस्तेमाल करें"
      },
      statsTemplate:
        '\n{layers} परतें और {count} कीकोड्स लोड की। {any} किसी भी कीकोड परिभाषित की\n',
      maintain:
        'इस परियोजना को QMK सहयोगियों और आप जैसे योगदानकर्ताओं द्वारा बनाए रखा गया है!',
      hostedOn: 'GitHub पेज पर होस्ट किया गया',
      serverStatus: 'सर्वर की स्थिति',
      apiVersion: 'API संस्करण',
      jobsWaiting: 'job(s) प्रतीक्षा कर रहा है'
    }
  }
};
