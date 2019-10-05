# How to add translations

1. Copy the [en/](https://github.com/qmk/qmk_configurator/tree/master/src/i18n/en) folder
2. Rename it to the appropriate [language tag](https://www.w3.org/International/articles/language-tags/)
3. Edit each variable in the `.js` files to the appropriate word/phrase
4. Edit the main [index.js](https://github.com/qmk/qmk_configurator/blob/master/src/i18n/index.js) to include
   ```js
   import <tag> from './<tag>';
   ```
   and
   ```js
     ...<tag>,
   ```
   in the correct spots, with `<tag>` replaced with your language tag/folder name.
5. Edit the `setting-panel-language` select in [SettingsPanel.vue](https://github.com/qmk/qmk_configurator/blob/master/src/components/SettingsPanel.vue) to include
    ```html
    <option value="<tag>"><language></option>
    ```
    replacing `<tag>` with your language tag and `<language>` with the native name of your language.
6. Install `yarn` and run the Linter over your files to make sure they follow the project's style guidelines.
   ```
   yarn run lint
   ```
   Find more information [in the main README](/README.md#development).
7. Open a [Pull Request](https://github.com/qmk/qmk_configurator/pulls)!
