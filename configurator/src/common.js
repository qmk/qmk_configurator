import template from 'lodash/template';
const clearKeymapTemplate = template(
  'This will clear your keymap - are you sure you want to <%= action %>?'
);

export { clearKeymapTemplate };
