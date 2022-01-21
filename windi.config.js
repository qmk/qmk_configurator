const { toRGBA } = require("windicss/utils");

module.exports = {
  theme: {
    darkMode: 'class',
    extend: {
      gridTemplateColumns: {
      },
      gridTemplateRows: {
      },
      colors: {
        'white-panel': '#CCD9F7',
        'white-app': '#ECF2FF',
        'white-700': '#B1C1E9',
        'upload-active': '#0075ff',
        'upload-focus': 'rgba(0,117,255,0.2)',
        'upload-disabled': 'rgba(6,7,10,1)'
      }
    }
  }
};
