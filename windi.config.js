const { toRGBA } = require('windicss/utils');

module.exports = {
  theme: {
    borderRadius: {
      sm: '8px',
      lg: '16px',
      full: '9999px'
    },
    darkMode: 'class',
    extend: {
      gridTemplateColumns: {},
      gridTemplateRows: {},
      colors: {
        'white-panel': '#CCD9F7',
        'white-app': '#ECF2FF',
        'white-900': '#ECF2FF',
        'white-app': '#ECF2FF',
        'white-800': '#CCD9F6',
        'white-panel': '#CCD9F6',
        'white-700': '#B1C1E9',
        'grey-500': '#69718D',
        'grey-400': '#444A61',
        'grey-300': '#1F222D',
        'grey-200': '#14161E',
        'grey-100': '#06070A',
        black: '#000000',
        blue: '#0075FF',
        'light-blue': '#4098FF',
        'dark-blue': '#005CC9',
        red: '#FF004D',
        green: '#00FFB2',
        'glow-blue': 'rgba(0, 117, 255, 0.2)',
        'glow-dark-blue': 'rgba(0, 117, 255, 0.4)',
        'glow-red': 'rgba(255, 0, 77, 0.15)',
        'glow-green': 'rgba(0, 255, 178, 0.15)',

        'upload-active': '#0075ff',
        'upload-focus': 'rgba(0,117,255,0.2)',
        'upload-disabled': 'rgba(6,7,10,1)'
      }
    }
  }
};
