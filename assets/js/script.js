$(document).ready(() => {
  const PREVIEW_LABEL = 'Preview info.json';
  const clearKeymapTemplate = _.template(
    'This will clear your keymap - are you sure you want to <%= action %>?'
  );
  var layout = '';
  const backend_baseurl = 'https://api.qmk.fm';
  const backend_keyboards_url = `${backend_baseurl}/v1/keyboards`;
  const backend_compile_url = `${backend_baseurl}/v1/compile`;
  const backend_status_url = `${backend_baseurl}/v1`;
  const backend_readme_url_template = _.template(
    `${backend_keyboards_url}/<%= keyboard %>/readme`
  );

  randomPotatoFact();
  setInterval(() => {
    randomPotatoFact();
  }, 60000);
  const defaults = {
    MAX_X: 775,
    KEY_WIDTH: 40,
    KEY_HEIGHT: 40,
    SWAP_KEY_WIDTH: 30,
    SWAP_KEY_HEIGHT: 30,
    KEY_X_SPACING: 45,
    KEY_Y_SPACING: 45,
    SCALE: 1
  };

  var config = {};

  var $layer = $('.layer');

  var $visualKeymap = $('#visual-keymap');

  var lookupKeycode = _.memoize(lookupKeycode); // cache lookups

  var keycodes = getKeycodes();

  $.each(keycodes, createKeyCodeUI);

  var $keycodes = $('.keycode'); // wait until they are created
  $keycodes.each(makeDraggable);

  // click to assign keys to keymap
  $visualKeymap.click(selectKeymapKey);
  $('#keycodes').click(assignKeycodeToSelectedKey);

  $layer.click(changeLayer);

  var offsetTop = $('.split-content').offset().top;
  var height = $('.split-content').height();

  $(document).on('scroll', scrollHandler);

  // explicitly export functions to global namespace

  var keypressListener = new window.keypress.Listener();
  keypressListener.register_many(generateKeypressCombos(keycodes));
  keypressListener.simple_combo('ctrl shift i', () => {
    if (!vueStore.getters['app/isPreview']) {
      vueStore.commit('app/enablePreview');
      disableCompileButton();
    }
  });

  var ignoreKeypressListener = _.partial(
    ignoreKeypressListener,
    keypressListener
  );

  var vueStatus = checkStatus();

  Vue.use(VueRouter);
  Vue.use(Vuex);

  var vueStore = newStore();
  var App = newApp(vueStore);
  var vueRouter = new VueRouter({
    routes: [
      { path: '/:keyboardP(.+)/:layoutP(.+)', component: App },
      { path: '/', component: App }
    ]
  });

  var vueInstance = new Vue({
    store: vueStore,
    router: vueRouter
  }).$mount('#controller-app');

  ignoreKeypressListener($('input[type=text]'));
  return {
    vueStatus,
    vueInstance
  };

  ////////////////////////////////////////
  //
  // Implementation goes here
  //
  ////////////////////////////////////////

  /**
   * newApp - creates a new root Vue app component
   * @param {object} store ref
   * @return {object} Vue component to run
   */
  function newApp(store) {
    let controllerTop = topControllerComponent(store);
    let statusPanel = statusPanelComponent(store);
    let controllerBottom = bottomControllerComponent(store);
    return Vue.component('controller', {
      store,
      template: `
  <div>
      <controllerTop></controllerTop>
      <statusPanel></statusPanel>
      <controllerBottom></controllerBottom>
  </div>`,
      components: { controllerTop, statusPanel, controllerBottom }
    });
  }

  /**
   *  getPreferredLayout
   *  @param {array} layouts supported by this keyboard
   *  @return {string} layout we think it should default to
   */
  function getPreferredLayout(layouts) {
    var keys = _.keys(layouts);
    if (_.includes(keys, 'LAYOUT')) {
      return 'LAYOUT';
    }
    if (_.includes(keys, 'LAYOUT_all')) {
      return 'LAYOUT_all';
    }
    if (_.includes(keys, 'KEYMAP')) {
      return 'KEYMAP';
    }
    // avoid keymaps ending with _kc unless we have no other choice
    var nextBest = keys.filter(key => !key.endsWith('_kc'));
    if (nextBest.length > 0) {
      return _.first(nextBest);
    }
    return _.first(keys);
  }

  /**
   * initAppStore - creates a new store for the app namespace
   * @return {object} initialized app store
   */
  function initAppStore() {
    return {
      namespaced: true,
      state: {
        keyboard: '',
        keyboards: [],
        _keyboards: [],
        layout: '',
        layouts: {},
        keymapName: '',
        compileDisabled: false,
        isPreview: false,
        jobID: '',
        enableDownloads: false,
        firmwareBinaryURL: [],
        firmwareSourceURL: [],
        filter: ''
      },
      getters: {
        keyboard: state => state.keyboard,
        keyboards: state => state.keyboards,
        layout: state => state.layout,
        layouts: state => state.layouts,
        filter: state => state.filter,
        /**
         * keymapName
         * @param {object} state of store
         * @return {string} parsed filtered keymap name
         */
        keymapName: state => {
          return state.keymapName.replace(/\s/g, '_').toLowerCase();
        },
        exportKeymapName: state => {
          let exportName = state.keymapName
            .replace(/[\s\/]/g, '_')
            .toLowerCase();
          if (exportName === '') {
            exportName = `${state.keyboard}_${state.layout}_mine`.toLowerCase();
          }
          return exportName;
        },
        compileDisabled: state => state.compileDisabled,
        isPreview: state => state.isPreview,
        jobID: state => state.jobID,
        enableDownloads: state => state.enableDownloads,
        firmwareBinaryURL: state => state.firmwareBinaryURL,
        firmwareSourceURL: state => state.firmwareSourceURL
      },
      actions: {
        /**
         *  changeKeyboard - change the keyboard state
         *  @param {object} internal store state
         *  @param {string} keyboard new keyboard we are switching to
         *  @return {object} promise that will be fulfilled once action is complete
         */
        changeKeyboard({ state, commit, dispatch }, keyboard) {
          let promise = new Promise(resolve => {
            commit('disablePreview');
            commit('enableCompile');
            commit('setKeyboard', keyboard);
            dispatch('loadLayouts').then(() => {
              commit('setLayout', getPreferredLayout(state.layouts));
              resolve();
            });
          });
          return promise;
        },
        /**
         * loadLayouts
         * @param {object} internal store state.
         * @param {object} preview object containing layout data.
         *                 We use this instead of loading layout from API.
         * @return {object} promise that is fulfilled once action is complete
         */
        loadLayouts({ commit, state }, preview) {
          if (!_.isUndefined(preview)) {
            let p = new Promise(resolve => {
              let fake = {
                keyboards: {}
              };
              fake.keyboards[state.keyboard] = preview;
              commit('processLayouts', fake);
              resolve(preview);
            });
            return p;
          }
          return axios
            .get(backend_keyboards_url + '/' + state.keyboard)
            .then(resp => {
              commit('processLayouts', resp);
              return resp;
            });
        }
      },
      mutations: {
        enableCompile(state) {
          state.compileDisabled = false;
        },
        disableCompile(state) {
          state.compileDisabled = true;
        },
        enablePreview(state) {
          state.isPreview = true;
          state.keyboards = state.keyboards.concat(PREVIEW_LABEL);
        },
        disablePreview(state) {
          state.isPreview = false;
          state.keyboards = state.keyboards.filter(k => k !== PREVIEW_LABEL);
          state.keymapName = '';
        },
        setKeyboard(state, _keyboard) {
          state.keyboard = _keyboard;
        },
        setKeyboards(state, _keyboards) {
          state.keyboards = _keyboards;
          state._keyboards = _keyboards; // make a 2nd copy
        },
        setLayout(state, _layout) {
          state.layout = _layout;
        },
        setKeymapName(state, _keymapName) {
          state.keymapName = _keymapName.replace(/[\s\/]/g, '_').toLowerCase();
        },
        setJobID(state, jobID) {
          state.jobID = jobID;
        },
        setEnableDownloads(state) {
          state.enableDownloads = true;
        },
        setDisableDownloads(state) {
          state.enableDownloads = false;
        },
        setFirmwareFile(state, filename) {
          state.firmwareFile = filename;
        },
        setFirmwareBinaryURL(state, url) {
          state.firmwareBinaryURL = url;
        },
        setFirmwareSourceURL(state, url) {
          state.firmwareSourceURL = url;
        },
        setFilter(state, filter) {
          state.filter = filter;
          let keyboards = state._keyboards.filter(k => {
            if (state.filter === '') {
              return true;
            }
            return k.startsWith(state.filter);
          });
          if (keyboards.length > 0) {
            // only use filter if it matches
            state.keyboards = keyboards;
          }
        },
        /**
         * processLayouts
         * @param {object} state of store
         * @param {object} resp from API call or a preview object
         *        in same format containing keyboard layouts
         * @return {object} layouts map or empty object
         */
        processLayouts(state, resp) {
          if (resp.status === 200 || state.isPreview) {
            let layouts = {};
            if (state.isPreview) {
              layouts = resp.keyboards[PREVIEW_LABEL].layouts;
            } else {
              layouts = resp.data.keyboards[state.keyboard].layouts;
            }
            if (_.size(layouts) === 0) {
              // API return empty layout object
              state.layouts = { to_be_defined: [] };
            } else if (layouts) {
              // parse the layouts into internal format
              state.layouts = _.reduce(
                layouts,
                function(acc, _layout, key) {
                  acc[key] = _layout.layout ? _layout.layout : _layout;
                  return acc;
                },
                {}
              );
            }
            return state.layouts;
          }
          return {};
        }
      }
    };
  }

  /**
   * initStatusStore
   * @return {object} a new instance of a status store
   */
  function initStatusStore() {
    return {
      namespaced: true,
      state: {
        message: '',
        scrollToLatest: false
      },
      getters: {
        message: state => state.message,
        empty: state => state.message === '',
        scrollToLatest: state => state.scrollToLatest
      },
      actions: {
        scrollToEnd({ commit }) {
          // signal scroll buffer to lastest message
          commit('startScroll');
        },
        viewReadme({ commit }, _keyboard) {
          return axios
            .get(backend_readme_url_template({ keyboard: _keyboard }))
            .then(result => {
              if (result.status === 200) {
                commit('append', _.escape(result.data));
              }
            });
        }
      },
      mutations: {
        clear(state) {
          state.message = '';
        },
        append(state, message) {
          state.message += message;
        },
        doneScroll(state) {
          state.scrollToLatest = false;
        },
        startScroll(state) {
          state.scrollToLatest = true;
        }
      }
    };
  }

  function initKeymapStore() {
    return {
      namespaced: true,
      state: {
        keymap: [],
        layer: 0,
        dirty: false
      },
      getters: {
        getKey: state => ({ _layer, index }) => state.keymap[_layer][index],
        layer: state => state.layer,
        getLayer: state => _layer => {
          return state.keymap[_layer].map(key => {
            return Object.assign({}, key);
          });
        },
        size: state => _layer => {
          return _.size(state.keymap[_layer]);
        },
        isDirty: state => state.dirty,
        exportLayers: state => ({ compiler }) => {
          return _.reduce(
            state.keymap,
            function(layers, _layer, k) {
              layers[k] = [];
              var aLayer = _.reduce(
                _layer,
                function(acc, key, i) {
                  var keycode = key.code;
                  if (keycode) {
                    if (keycode.indexOf('(kc)') !== -1) {
                      if (key.contents) {
                        keycode = keycode.replace('kc', key.contents.code);
                      } else {
                        keycode = keycode.replace('kc', 'KC_NO');
                      }
                    }
                    if (keycode.indexOf('(layer)') !== -1) {
                      keycode = keycode.replace('layer', key.layer);
                    }
                    if (keycode.indexOf('text') !== -1) {
                      // add a special ANY marker to keycodes that were defined using ANY
                      // This will be stripped back off on import.
                      keycode = compiler ? key.text : `ANY(${key.text})`;
                    }
                  } else {
                    console.log(`ERROR: unexpected keycode ${key}`, k, i, _layer);
                  }
                  acc.push(keycode);
                  return acc;
                },
                []
              );
              layers[k] = aLayer;
              return layers;
            },
            []
          );
        }
      },
      actions: {
        initKey: ({ state, commit }, { _layer, index }) => {
          if (state.keymap[_layer] === undefined) {
            commit('initLayer', _layer);
          }
          return state.keymap[_layer][index];
        },
        setKeycodeLayer({ state, commit }, { _layer, index, toLayer }) {
          state.keymap[_layer][index].layer = toLayer;
          if (toLayer !== _layer) {
            if (state.keymap[toLayer] === undefined) {
              commit('initLayer', toLayer);
            }
            let { name, code } = lookupKeycode('KC_TRNS');
            state.keymap[toLayer][index] = { name, code };
          }
        }
      },
      mutations: {
        setContents(state, { index, key }) {
          state.keymap[state.layer][index].contents = key;
        },
        assignKey(state, { _layer, index, name, code, type }) {
          state.keymap[_layer][index] = {
            name: name,
            code: code,
            type: type
          };
          var keycode = state.keymap[_layer][index];
          if (keycode.type === 'layer') {
            state.keymap[_layer][index].layer = 0;
          }
        },
        swapKeys(state, { _layer, srcIndex, dstIndex }) {
          var temp = state.keymap[_layer][srcIndex];
          state.keymap[_layer][srcIndex] = state.keymap[_layer][dstIndex];
          state.keymap[_layer][dstIndex] = temp;
          state.dirty = true;
        },
        setText({ state }, { _layer, index, text }) {
          state.keymap[_layer][index].text = text;
        },
        setKey(state, { _layer, index, key }) {
          state.keymap[_layer][index] = key;
        },
        setDirty(state) {
          state.dirty = true;
        },
        clearDirty({ state }) {
          state.dirty = false;
        },
        clear(state) {
          state.keymap = [];
          state.dirty = false;
        },
        changeLayer(state, newLayer) {
          state.layer = newLayer;
        },
        initLayer: (state, _layer) => {
          if (_layer > 0) {
            // layer 0 is always initialized. Use it as a reference
            let { name, code } = lookupKeycode('KC_NO');
            let KC_NO = { name, code };
            state.keymap[_layer] = _.reduce(
              state.keymap[0],
              (acc, key, index) => {
                acc[index] = KC_NO;
                return acc;
              },
              {}
            );
          } else {
            // TODO probably need to do something differently here
            state.keymap[_layer] = {};
          }
        }
      }
    };
  }

  /**
   * newStore
   * @return {object} initialized Vuex store instance
   */
  function newStore() {
    return new Vuex.Store({
      modules: {
        app: initAppStore(),
        status: initStatusStore(),
        keymap: initKeymapStore()
      },
      strict: true
    });
  }

  function bottomControllerComponent(store) {
    const encoding = 'data:text/plain;charset=utf-8,';
    return Vue.component('bottom-panel', {
      template: `
  <div id="controller-bottom" class="botctrl">
    <div class="botctrl-1-1">
      <button id="toolbox"
              title="Load firmware file in QMK Toolbox"
              v-bind:disabled="disableDownloads">Open in QMK Toolbox</button>
      <button id="source"
              @click="downloadSource"
              title="Download QMK Firmware code"
              v-bind:disabled="disableDownloads">Download Source</button>
      <button id="export" @click="exportJSON" title="Export QMK Keymap JSON file">Export Keymap</button>
      <button id="import"
              title="Import QMK Keymap JSON file"
              @click="importKeymap"
      >Import Keymap</button>
      <input id="fileImport"
             type="file"
             ref="fileImportElement"
             accept="application/json"
             @change="fileImportChanged"
      />
      <input id="infoPreview"
             type="file"
             accept="application/json"
             ref="infoPreviewElement"
             @change="infoPreviewChanged"
      />
    </div>
    <div class="botctrl-1-2">
      <button id="fwFile"
              @click="downloadFirmware"
              title="Download firmware file for flashing"
              v-bind:disabled="disableDownloads">Download Firmware</button>
    </div>

    <div v-if="downloadElementEnabled">
      <a ref="downloadElement" v-bind:href="urlEncodedData" v-bind:download="filename"></a>
    </div>
  </div>
      `,
      computed: {
        disableDownloads() {
          return !vueStore.getters['app/enableDownloads'];
        },
        isPreview() {
          return vueStore.getters['app/isPreview'];
        }
      },
      watch: {
        /**
         * isPreview.
         * When isPreview changes we click the infoPreview element.
         * @param {Bool} newValue isPreview has changed
         * @return {null} nothing
         */
        isPreview(newValue) {
          if (newValue) {
            this.$refs.infoPreviewElement.click();
          }
        }
      },
      methods: {
        exportJSON() {
          //Squashes the keymaps to the api payload format, might look into making this a function
          let layers = vueStore.getters['keymap/exportLayers']({
            compiler: false
          });

          //API payload format
          let data = {
            keyboard: vueStore.getters['app/keyboard'],
            keymap: vueStore.getters['app/exportKeymapName'],
            layout: vueStore.getters['app/layout'],
            layers: layers
          };

          this.download(
            `${vueStore.getters['app/exportKeymapName']}.json`,
            JSON.stringify(data)
          );
        },
        download(filename, data) {
          this.urlEncodedData = encoding + encodeURIComponent(data);
          this.filename = filename;
          this.downloadElementEnabled = true;
          Vue.nextTick(() => {
            this.$refs.downloadElement.click();
            this.downloadElementEnabled = false;
          });
        },
        downloadFirmware() {
          this.urlEncodedData = _.first(store.getters['app/firmwareBinaryURL']);
          this.filename = store.getters['app/firmwareFile'];
          this.downloadElementEnabled = true;
          Vue.nextTick(() => {
            this.$refs.downloadElement.click();
            this.downloadElementEnabled = false;
          });
        },
        downloadSource() {
          this.urlEncodedData = _.first(store.getters['app/firmwareSourceURL']);
          this.filename = 'source.zip';
          this.downloadElementEnabled = true;
          Vue.nextTick(() => {
            this.$refs.downloadElement.click();
            this.downloadElementEnabled = false;
          });
        },
        importKeymap() {
          if (vueStore.getters['keymap/isDirty']) {
            if (
              !confirm(
                clearKeymapTemplate({ action: 'change keyboard and layout' })
              )
            ) {
              return false;
            }
          }
          this.$refs.fileImportElement.click();
        },
        fileImportChanged() {
          var files = this.$refs.fileImportElement.files;
          this.reader = new FileReader();
          this.reader.onload = this.importJSONOnLoad;
          this.reader.readAsText(_.first(files));
          this.$refs.fileImportElement.value = ''; // clear value for chrome issue #83
        },
        importJSONOnLoad() {
          let jsonText = this.reader.result;

          let data;
          try {
            data = JSON.parse(jsonText);
          } catch (error) {
            console.log(error);
            alert("Sorry, that doesn't appear to be a valid QMK keymap file.");
            return;
          }

          if (data.version && data.keyboard && data.keyboard.settings) {
            alert(
              "Sorry, QMK Configurator doesn't support importing kbfirmware JSON files."
            );
            return;
          }

          if (
            _.isUndefined(data.keyboard) ||
            _.isUndefined(data.keymap) ||
            _.isUndefined(data.layout) ||
            _.isUndefined(data.layers)
          ) {
            alert("Sorry, this doesn't appear to be a QMK keymap file.");
            return;
          }

          reset_keymap();

          store.commit('app/setKeyboard', data.keyboard);
          store
            .dispatch('app/changeKeyboard', store.getters['app/keyboard'])
            .then(() => {
              store.commit('app/setLayout', data.layout);
              store.commit('app/setKeymapName', data.keymap);
              // todo validate these values
              vueRouter.replace({
                path: `/${data.keyboard}/${data.layout}`
              });

              store.commit('status/clear');
              load_converted_keymap(data.layers);

              let _layouts = store.getters['app/layouts'];
              render_layout(
                _layouts[data.layout].map(v => Object.assign({}, v))
              );
              store.commit('keymap/setDirty');
              disableOtherButtons();
              store.dispatch('status/viewReadme', data.keyboard);
            });
        },
        infoPreviewChanged() {
          var files = this.$refs.infoPreviewElement.files;
          this.reader = new FileReader();
          this.reader.onload = this.previewInfoOnLoad;
          this.reader.readAsText(_.first(files));
          this.$refs.infoPreviewElement.value = ''; // clear value for chrome issue #83
        },
        previewInfoOnLoad() {
          var jsonText = this.reader.result;
          var data;
          try {
            data = JSON.parse(jsonText);
          } catch (error) {
            console.log(error);
            alert("Sorry, that doesn't appear to be a valid QMK info file.");
            return;
          }

          reset_keymap();

          store.commit('app/setKeyboard', PREVIEW_LABEL);
          store.dispatch('app/loadLayouts', data).then(() => {
            layout = getPreferredLayout(store.getters['app/layouts']);
            store.commit('app/setLayout', layout);
            store.commit('app/setKeymapName', 'info.json preview');

            let _layouts = store.getters['app/layouts'];
            render_layout(_layouts[layout].map(v => Object.assign({}, v)));
          });
        }
      },
      data: () => {
        return {
          downloadElementEnabled: false,
          urlEncodedData: '',
          filename: '',
          reader: undefined
        };
      }
    });
  }

  /**
   * statusPanelComponent
   * @param {object} store handle
   * @return {object} vue component
   */
  function statusPanelComponent(store) {
    return Vue.component('status-panel', {
      template: `
  <div id="status">
      <textarea id="terminal" v-model="message" ref="terminal" readonly></textarea>
  </div>`,
      watch: {
        message(newV, oldV) {
          if (this.scrollToLatest && newV !== oldV) {
            this.scrollToEnd();
            store.commit('status/doneScroll');
          }
        }
      },
      methods: {
        scrollToEnd() {
          let terminal = this.$refs.terminal;
          this.$nextTick(() => {
            terminal.scrollTop = terminal.scrollHeight;
          });
        }
      },
      computed: {
        message: () => store.getters['status/message'],
        scrollToLatest: () => store.getters['status/scrollToLatest']
      },
      data: () => {
        return {};
      }
    });
  }

  /**
   * topControllerComponent - returns a valid Vue component to
   * control the upper section of the UI.
   * @param {object} store - vuex store instance
   * @return {object} - Vue Component
   */
  function topControllerComponent(store) {
    return Vue.component('controller-top', {
      template: `
  <div id="controller-top">
    <div class="topctrl">
      <span class="topctrl-1">
      <label style="display: inline-block; width: 75px;" >Keyboard:</label>
      <select id="keyboard" v-bind:style="width" v-model="keyboard">
        <option v-for='keeb in keyboards' :key="keeb" v-bind:value="keeb">
          {{keeb}}
        </option>
      </select>
      </span>
      <span class="topctrl-2">
        <label id="keymap-name-label">Keymap Name:</label>
        <input id="keymap-name" type="text" v-model="keymapName" placeholder="custom keymap name"/>
      </span>
      <span class="topctrl-3">
      <button id="load-default"
         title="Load default keymap from QMK Firmware"
         @click="loadDefault">Load Default</button>
      <button id="compile"
              title="Compile keymap"
              v-bind:disabled="compileDisabled"
              @click="compile">Compile</button>
      </span>
    </div>
    <label style="display: inline-block; width: 75px;">Layout:</label>
    <select id="layout" v-model="layout">
      <option v-for='(aLayout, layoutName) in layouts'
              :key="layoutName"
              v-bind:value="layoutName">
        {{layoutName}}
      </option>
    </select>
  </div>
      `,
      computed: {
        keyboards: () => store.getters['app/keyboards'],
        layouts: () => store.getters['app/layouts'],
        compileDisabled: () => store.getters['app/compileDisabled'],
        realKeymapName: () => store.getters['app/keymapName'],
        keyboard: {
          get() {
            return store.getters['app/keyboard'];
          },
          set(value) {
            if (store.getters['keymap/isDirty']) {
              if (
                !confirm(
                  clearKeymapTemplate({ action: 'change your keyboard' })
                )
              ) {
                var old = store.getters['app/keyboard'];
                store.commit('app/setKeyboard', ''); // force a refresh
                Vue.nextTick(store.commit('app/setKeyboard', old));
                return false;
              }
            }
            this.updateKeyboard(value);
          }
        },
        layout: {
          get() {
            return store.getters['app/layout'];
          },
          set(value) {
            if (store.getters['keymap/isDirty']) {
              if (
                !confirm(clearKeymapTemplate({ action: 'change your layout' }))
              ) {
                var old = store.getters['app/layout'];
                store.commit('app/setLayout', ''); // force a refresh
                Vue.nextTick(store.commit('app/setLayout', old));
                return false;
              }
            }
            this.updateLayout({ target: { value } });
          }
        }
      },
      watch: {
        /*
         * keymapname is local state so it can use v-model to be reactive.
         * The v-model attempts to mutate the getter 'app/keymapName'.
         * This would cause a mutation warning.
         *
         * The actual app state is in the store. To keep them in sync we
         * have an alias for the store version called realKeymapName.
         * When changes happen locally we update the store.
         * When changes happen to the store we update the local version.
         */
        keymapName: function(newKeymapName, oldKeymapName) {
          if (newKeymapName !== oldKeymapName) {
            this.updateKeymapName(newKeymapName);
          }
        },
        realKeymapName: function(newName, oldName) {
          if (newName !== oldName) {
            this.keymapName = newName;
          }
        },
        $route: function(to /*, from*/) {
          if (to.query) {
            let filter = to.query.filter;
            if (!_.isUndefined(filter)) {
              this.updateFilter(filter);
              this.updateKeyboard(_.first(this.keyboards));
            }
          }
        }
      },
      methods: {
        /**
         * loadDefault keymap. Attempts to load the keymap data from
         * a predefined known file path.
         * @return {object} promise when it has completed
         */
        loadDefault() {
          if (store.getters['keymap/isDirty']) {
            if (
              !confirm(clearKeymapTemplate({ action: 'load default keymap' }))
            ) {
              return false;
            }
          }
          // hard-coding planck as the only default right now
          var keyboardName = this.keyboard.replace('/', '_');
          axios
            .get(`keymaps/${keyboardName}_default.json`)
            .then(({ data, status }) => {
              if (status === 200) {
                console.log(data);
                reset_keymap();

                this.updateLayout(data.layout);
                this.updateKeymapName(data.keymap);
                load_converted_keymap(data.layers);
                render_layout(
                  this.layouts[this.layout].map(v => Object.assign({}, v))
                );
                store.commit('keymap/setDirty');
              }
            })
            .catch(error => {
              statusError(
                `\n* Sorry there is no default for the ${
                  this.keyboard
                } keyboard... yet!`
              );
              console.log('error loadDefault', error);
            });
        },
        fetchKeyboards() {
          axios.get(backend_keyboards_url).then(this.initializeKeyboards);
        },
        /**
         * initializeKeyboards - parse the keyboard list from the API response
         * @param {object} the API Response
         * @returns {undefined}
         */
        initializeKeyboards({ data, status }) {
          let _keyboard = '';
          if (status === 200) {
            let exclude = getExclusionList();
            store.commit(
              'app/setKeyboards',
              data.filter(keeb => {
                return _.isUndefined(exclude[keeb]);
              })
            );
            if (this.$route.query) {
              let filter = this.$route.query.filter;
              if (!_.isUndefined(filter)) {
                this.updateFilter(filter);
              }
            }
            _keyboard = _.first(this.keyboards);
            let { keyboardP } = this.$route.params;
            if (
              _.isString(keyboardP) &&
              keyboardP !== '' &&
              keyboardP !== PREVIEW_LABEL
            ) {
              _keyboard = keyboardP;
            }
            this.updateKeyboard(_keyboard);
          }
        },
        /**
         * updateKeyboard - triggers a keyboard update action on the store
         * @param {string} newKeyboard to switch to
         * @return {object} promise when it has been done or error
         */
        updateKeyboard(newKeyboard) {
          return store.dispatch('app/changeKeyboard', newKeyboard).then(() => {
            reset_keymap();
            this.$router.replace({
              path: `/${this.keyboard}/${this.layout}`
            });
            render_layout(
              this.layouts[this.layout].map(v => Object.assign({}, v))
            );
            store.commit('status/clear');
            store.dispatch('status/viewReadme', this.keyboard);
            disableOtherButtons();
          });
        },
        /**
         * updateLayout - switch the layout for this keyboard
         * @param {object\string} e event object or layout name
         * @return {undefined}
         */
        updateLayout(e) {
          let newLayout = e.target ? e.target.value : e;
          let render = e.target;
          store.commit('app/setLayout', newLayout);
          reset_keymap();
          this.$router.replace({ path: `/${this.keyboard}/${this.layout}` });
          render &&
            render_layout(
              this.layouts[this.layout].map(v => Object.assign({}, v))
            );
        },
        updateKeymapName(newKeymapName) {
          this.keymapName = newKeymapName;
          store.commit('app/setKeymapName', newKeymapName);
        },
        compile() {
          let keymapName = this.realKeymapName;
          let _keymapName = store.getters['app/exportKeymapName'];
          // TODO extract this name function to the store
          keymapName =
            keymapName === ''
              ? _keymapName.slice(this.keyboard.length + 1, _keymapName.length)
              : keymapName;
          compileLayout(this.keyboard, keymapName, this.layout);
        },
        updateFilter(filter) {
          store.commit('app/setFilter', filter);
        }
      },
      data: () => {
        return {
          keymapName: '',
          width: 0
        };
      },
      mounted() {
        this.fetchKeyboards();
      }
    });
  }

  /**
   * checkStatus - check status component to poll API for errors and status
   * @return {object} Vue app component
   */
  function checkStatus() {
    let statusBar = Vue.component('status-bar', {
      template: `
        <div class="backend-status">
          <div class="bes-title">Server Status:</div>
          <div :class="{ 'bes-status': true, 'bes-error': hasError }">{{status}}</div>
          <div class="bes-version">API Version: <span class="version-num">{{version}}</span></div>
          <div class="bes-jobs">{{jobs}}</div>
        </div>`,
      methods: {
        getPollInterval() {
          return 25000 + 5000 * Math.random();
        },
        fetchData() {
          axios
            .get(backend_status_url)
            .then(({ data }) => {
              var localTime = new Date(data.last_ping).toTimeString();
              var stat = data.status;
              stat = stat === 'running' ? 'UP' : stat;
              this.status = _.escape(`${stat} @ ${localTime}`);
              this.version = data.version;
              this.jobs = _.template('<%= queue_length %> job(s) running')(
                data
              );
              this.hasError = false;
            })
            .catch(json => {
              var localTime = new Date().toTimeString();
              this.status = `DOWN @ ${localTime}`;
              this.hasError = true;
              console.error('API status error', json);
            });
          setTimeout(this.fetchData, this.getPollInterval());
        }
      },
      data: () => {
        return {
          status: 'Checking',
          version: '0.1',
          jobs: '...',
          hasError: false
        };
      },
      mounted() {
        setTimeout(this.fetchData, 1000);
      }
    });

    return new Vue({
      el: '#status-app',
      template: '<div><statusBar></statusBar></div>',
      components: { statusBar }
    });
  }

  function ignoreKeypressListener(listener, $element) {
    $element
      .focus(() => listener.stop_listening())
      .blur(() => listener.listen());
  }

  // generate keypress combo list from the keycodes list
  function generateKeypressCombos(_keycodes) {
    return _keycodes
      .filter(({ keys }) => {
        // only keycodes with keys members
        return !_.isUndefined(keys);
      })
      .map(keycode => generateKeypressHandler(keycode));
  }

  // generate a keypress combo handler per keycode
  function generateKeypressHandler(keycode) {
    return {
      keys: keycode.keys,
      on_keydown: () => {
        var meta = lookupKeyPressCode(keycode.keys);
        if (meta === undefined) {
          return;
        }

        var $key = getSelectedKey();
        var _index = $key.data('index');
        if ($key === undefined || _index === undefined || !_.isNumber(_index)) {
          return; // not a key
        }

        if ($key.hasClass('key-contents')) {
          vueStore.commit('keymap/setContents', {
            _index,
            key: newKey(meta, keycode.data('code'))
          });
        } else {
          vueStore.commit('keymap/assignKey', {
            _layer: vueStore.getters['keymap/layer'],
            index: _index,
            name: meta.name,
            code: meta.code,
            type: meta.type
          });
        }
        $key.removeClass('keycode-select'); // clear selection once assigned
        render_key(vueStore.getters['keymap/layer'], _index);
        vueStore.commit('keymap/setDirty');
      }
    };
  }

  function resetConfig(overrides) {
    return _.extend(config, defaults, overrides);
  }

  function assignKeycodeToSelectedKey(evt) {
    let _keycode = $(evt.target).data('code');
    if (_keycode === undefined) {
      return;
    }

    let meta = lookupKeycode(_keycode);
    if (meta === undefined) {
      return;
    }

    let $key = getSelectedKey();
    let _index = $key.data('index');
    if ($key === undefined || _index === undefined || !_.isNumber(_index)) {
      return; // not a key
    }

    if ($key.hasClass('key-contents')) {
      vueStore.commit('keymap/setContents', {
        _index,
        key: newKey(meta, _keycode.data('code'))
      });
    } else {
      vueStore.commit('keymap/assignKey', {
        _layer: vueStore.getters['keymap/layer'],
        index: _index,
        name: meta.name,
        code: meta.code,
        type: meta.type
      });
    }
    $key.removeClass('keycode-select'); // clear selection once assigned
    render_key(vueStore.getters['keymap/layer'], _index);
    vueStore.commit('keymap/setDirty');
  }

  function getSelectedKey() {
    return $visualKeymap.find('.key.keycode-select');
  }

  function selectKeymapKey(evt) {
    var $target = $(evt.target);
    getSelectedKey().removeClass('keycode-select');
    if ($target.hasClass('key')) {
      $target.addClass('keycode-select');
    }
  }

  function scrollHandler() {
    if (offsetTop < $(document).scrollTop()) {
      $('.split-content').addClass('fixed');
      $('#keycodes-section').css('margin-top', height + 'px');
    } else {
      $('#keycodes-section').css('margin-top', '0px');
      $('.split-content').removeClass('fixed');
    }
  }

  function compileLayout(_keyboard, _keymapName, _layout) {
    disableCompileButton();
    var layers = vueStore.getters['keymap/exportLayers']({ compiler: true });
    var data = {
      keyboard: _keyboard,
      keymap: _keymapName,
      layout: _layout,
      layers: layers
    };
    console.log(JSON.stringify(data));
    if (vueStore.getters['status/empty']) {
      vueStore.commit('status/append', '\n');
    }
    vueStore.commit(
      'status/append',
      '* Sending ' + _keyboard + ':' + _keymapName + ' with ' + _layout
    );
    $.ajax({
      type: 'POST',
      url: backend_compile_url,
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      success: function(d) {
        if (d.enqueued) {
          vueStore.commit('status/append', '\n* Received job_id: ' + d.job_id);
          vueStore.commit('app/setJobID', d.job_id);
          check_status();
        }
      }
    });
  }

  function setLayerToNonEmpty(_layer) {
    $(`.layer.${_layer}`).addClass('non-empty');
  }

  function changeLayer(e) {
    $('.layer.active').removeClass('active');
    $(e.target).addClass('active');
    let layer = e.target.innerHTML;
    vueStore.commit('keymap/changeLayer', layer);
    setLayerToNonEmpty(layer);
    let _layouts = vueStore.getters['app/layouts'];
    let _layout = vueStore.getters['app/layout'];
    render_layout(_layouts[_layout].map(v => Object.assign({}, v)));
  }

  function makeDraggable(k, d) {
    $(d).draggable({
      zIndex: 100,
      revert: true,
      revertDuration: 100,
      distance: 5,
      drag: function() {
        var $d = $(d);
        if ($d.hasClass('key')) {
          // reduce size of dragged key to indicate src
          var w = $d.data('w');
          var h = $d.data('h');
          $d.css({
            width: `${config.SWAP_KEY_WIDTH * w}px`,
            height: `${config.SWAP_KEY_HEIGHT * h}px`
          });
        }
        $d.draggable('option', 'revertDuration', 100);
      },
      start: function(event, ui) {
        // center the key under the cursor - stackoverflow
        $(this).draggable('instance').offset.click = {
          left: Math.floor(ui.helper.width() / 2),
          top: Math.floor(ui.helper.height() / 2)
        };
      },
      stop: function() {
        var $d = $(d);
        $d.css({
          'z-index': ''
        });
        if ($d.hasClass('key')) {
          var w = $d.data('w');
          var h = $d.data('h');
          var dims = calcKeyKeymapDims(w, h);
          $d.css({
            width: `${dims.w}px`,
            height: `${dims.h}px`
          });
        }
      }
    });
  }

  function createKeyCodeUI(k, d) {
    if (d.code) {
      var help = d.title ? ` - ${d.title}` : '';
      var keycode = $('<div>', {
        class: 'keycode keycode-' + d.width + ' keycode-' + d.type,
        'data-code': d.code,
        'data-type': d.type,
        html: d.name,
        title: `${d.code}${help}`
      });
      $('#keycodes').append(keycode);
    } else {
      $('#keycodes').append(
        $('<div>', {
          class: 'space space-' + d.width,
          html: d.label
        })
      );
    }
  }

  function calcKeyKeymapDims(w, h) {
    return {
      w: w * config.KEY_X_SPACING - (config.KEY_X_SPACING - config.KEY_WIDTH),
      h: h * config.KEY_Y_SPACING - (config.KEY_Y_SPACING - config.KEY_HEIGHT)
    };
  }

  function calcKeyKeymapPos(x, y) {
    return {
      x: x * config.KEY_X_SPACING,
      y: y * config.KEY_Y_SPACING
    };
  }

  function render_layout(_layout) {
    $visualKeymap.find('*').remove();

    var max = { x: 0, y: 0 };

    $.each(_layout, function(k, d) {
      // pre-calc size
      if (!d.w) {
        d.w = 1;
      }
      if (!d.h) {
        d.h = 1;
      }
      var pos = calcKeyKeymapPos(d.x, d.y);
      var dims = calcKeyKeymapDims(d.w, d.h);
      max.x = Math.max(max.x, pos.x + dims.w);
      max.y = Math.max(max.y, pos.y + dims.h);
    });

    if (max.x > defaults.MAX_X) {
      config.SCALE = defaults.MAX_X / max.x;
      config.KEY_WIDTH *= config.SCALE;
      config.KEY_HEIGHT *= config.SCALE;
      config.SWAP_KEY_HEIGHT *= config.SCALE;
      config.SWAP_KEY_WIDTH *= config.SCALE;
      config.KEY_X_SPACING *= config.SCALE;
      config.KEY_Y_SPACING *= config.SCALE;
      max.x *= config.SCALE;
      max.y *= config.SCALE;
    }

    $.each(_layout, function(k, d) {
      if (!d.w) {
        d.w = 1;
      }
      if (!d.h) {
        d.h = 1;
      }
      var pos = calcKeyKeymapPos(d.x, d.y);
      var dims = calcKeyKeymapDims(d.w, d.h);
      var key = $('<div>', {
        class: 'key disabled',
        style: [
          'left: ',
          pos.x,
          'px; top: ',
          pos.y,
          'px; width: ',
          dims.w,
          'px; height: ',
          dims.h,
          'px'
        ].join(''),
        id: 'key-' + k,
        'data-index': k,
        'data-type': 'key',
        'data-w': d.w,
        'data-h': d.h
      });
      $(key).droppable(droppable_config(key, k));
      $visualKeymap.append(key);
      render_key(vueStore.getters['keymap/layer'], k);
    });
    $visualKeymap.css({
      width: max.x + 'px',
      height: max.y + 'px'
    });

    $('.key').each(makeDraggable);
  }

  function statusError(message) {
    vueStore.commit('status/append', message);
    vueStore.dispatch('status/scrollToEnd');
  }

  function enableCompileButton() {
    vueStore.commit('app/enableCompile');
  }

  function disableCompileButton() {
    vueStore.commit('app/disableCompile');
  }

  function enableOtherButtons() {
    vueStore.commit('app/setEnableDownloads');
  }

  function disableOtherButtons() {
    vueStore.commit('app/setDisableDownloads');
  }

  function check_status() {
    $.get(backend_compile_url + '/' + vueStore.getters['app/jobID'], function(
      data
    ) {
      console.log(data);
      let msg;
      switch (data.status) {
        case 'finished':
          vueStore.commit(
            'status/append',
            '\n* Finished:\n' + data.result.output.replace(/\[.*m/gi, '')
          );
          vueStore.commit(
            'app/setFirmwareBinaryURL',
            data.result.firmware_binary_url
          );
          vueStore.commit(
            'app/setFirmwareSourceURL',
            data.result.firmware_source_url
          );
          vueStore.commit('app/setFirmwareFile', data.result.firmware_filename);
          enableCompileButton();
          enableOtherButtons();
          break;
        case 'queued':
          msg = status === 'queued' ? ' .' : '\n* Queueing';
          vueStore.commit('status/append', msg);
          setTimeout(check_status, 500);
          break;
        case 'running':
          msg = status === 'running' ? ' .' : '\n* Running';
          vueStore.commit('status/append', msg);
          setTimeout(check_status, 500);
          break;
        case 'unknown':
          enableCompileButton();
          break;
        case 'failed':
          statusError('\n* Failed');
          if (data.result) {
            statusError('\n* Error:\n' + data.result.output);
          }
          enableCompileButton();
          break;
        default:
          console.log('Unexpected status', data.status);
          enableCompileButton();
      }
      vueStore.dispatch('status/scrollToEnd');
      status = data.status;
    });
  }

  function lookupKeyPressCode(searchTerm) {
    return lookupKeycode(searchTerm, true);
  }

  function lookupKeycode(searchTerm, isKeys) {
    var found = keycodes.find(({ code, keys }) => {
      return code === searchTerm || (isKeys && keys && keys === searchTerm);
    });
    return found;
  }

  function newAnyKey(keycode) {
    var anyKey = lookupKeycode('text');
    // make a copy otherwise it uses a reference
    return $.extend({}, anyKey, { text: keycode });
  }

  function newKey(metadata, keycode, obj) {
    var key = {
      name: metadata.name,
      code: keycode,
      type: metadata.type
    };

    if (obj !== undefined) {
      key = $.extend(key, obj);
    }

    return key;
  }

  function stripANY(keycode) {
    if (keycode.indexOf('ANY(') === 0) {
      // strip ANY from keycodes, this is only for human debugging
      keycode = keycode.slice(4, -1);
    }
    return keycode;
  }

  function parseKeycode(keycode, stats) {
    var metadata;

    keycode = stripANY(keycode);

    // Check if the keycode is a complex/combo keycode ie. contains ()
    if (keycode.includes('(')) {
      // Pull the keycode and or layer from within the brackets
      var key, outerKeycode;
      var splitcode = keycode.split('(');
      var maincode = splitcode[0];
      var internal = splitcode[1];
      internal = internal.split(')')[0];

      //Check whether it is a layer switching code or combo keycode
      if (internal.includes('KC')) {
        // combo keycode
        metadata = lookupKeycode(internal);
        if (metadata === undefined) {
          return newAnyKey(keycode);
        }
        var internalkeycode = newKey(metadata, internal);

        outerKeycode = maincode + '(kc)';
        metadata = lookupKeycode(outerKeycode);
        if (metadata === undefined) {
          return newAnyKey(keycode);
        }

        key = newKey(metadata, keycode, { contents: internalkeycode });
        return key;
      }

      // layer switching
      outerKeycode = maincode + '(layer)';
      metadata = lookupKeycode(outerKeycode);
      if (metadata === undefined) {
        return newAnyKey(keycode);
      }
      var key = newKey(metadata, keycode, { layer: internal });
      return key;
    }

    if (keycode.length < 4) {
      // unexpectedly short keycode
      vueStore.commit(
        'status/append',
        `Found an unexpected keycode \'${_.escape(keycode)}\' on layer ${
          stats.layers
        } in keymap. Setting to KC_TRNS\n`
      );
      return lookupKeycode('KC_TRNS');
    }

    // regular keycode
    metadata = lookupKeycode(keycode);
    if (metadata === undefined) {
      return newAnyKey(keycode);
    }
    return newKey(metadata, keycode);
  }

  //Function that takes in a keymap loops over it and fills populates the keymap variable
  function load_converted_keymap(converted_keymap) {
    //Loop over each layer from the keymap
    var stats = { count: 0, any: 0, layers: 0 };
    $.each(converted_keymap, function(_layer /*, keys*/) {
      //Add layer object for every layer that exists
      vueStore.commit('keymap/initLayer', _layer);
      //Loop over each keycode in the layer
      $.each(converted_keymap[_layer], function(index, keycode) {
        vueStore.commit('keymap/setKey', {
          _layer,
          index: index,
          key: parseKeycode(keycode, stats)
        });
        let key = vueStore.getters['keymap/getKey']({ _layer, index: index });
        stats.count += 1;

        if (key.name === 'Any') {
          stats.any += 1;
        }
      });
      if (vueStore.getters['keymap/size'](_layer) > 0) {
        setLayerToNonEmpty(_layer);
      }
      stats.layers += 1;
    });

    var msg = `\nLoaded ${stats.layers} layers and ${
      stats.count
    } keycodes. Defined ${stats.any} Any key keycodes\n`;
    vueStore.commit('status/append', msg);
  }

  function reset_keymap() {
    config = resetConfig();
    vueStore.commit('keymap/clear');
    vueStore.commit('keymap/changeLayer', 0);
    $('.layer').removeClass('non-empty active');
    $('.layer.0').addClass('active non-empty');
  }

  function droppable_config(t, key) {
    return {
      over: function(/* event, ui*/) {
        $(t).addClass('active-key');
        if ($(t).hasClass('key-contents')) {
          $(t)
            .parent()
            .removeClass('active-key');
        }
      },
      out: function(/* event, ui */) {
        $(t).removeClass('active-key');
        if ($(t).hasClass('key-contents')) {
          $(t)
            .parent()
            .addClass('active-key');
        }
      },
      drop: function(event, ui) {
        var $target;
        if ($(t).hasClass('active-key')) {
          $target = $(t);
        } else {
          // this is probably a container
          $target = $(t).find('.active-key');
          if ($target.length === 0) {
            // if we can't find a container
            return;
          }
          $target = $($target[0]);
        }
        var srcKeycode = ui.helper[0];
        $(srcKeycode).draggable('option', 'revertDuration', 0);
        $target.removeClass('active-key');
        setLayerToNonEmpty('active');
        if ($(srcKeycode).hasClass('keycode')) {
          $(t).attr('data-code', srcKeycode.dataset.code);
          // $(t).draggable({revert: true, revertDuration: 100});
          if ($target.hasClass('key-contents')) {
            if (srcKeycode.dataset.type !== 'container') {
              // we currently don't support nested containers
              vueStore.commit('keymap/setContents', {
                index: key,
                key: {
                  name: srcKeycode.innerHTML,
                  code: srcKeycode.dataset.code,
                  type: srcKeycode.dataset.type
                }
              });
            }
          } else {
            vueStore.commit('keymap/assignKey', {
              _layer: vueStore.getters['keymap/layer'],
              index: key,
              name: srcKeycode.innerHTML,
              code: srcKeycode.dataset.code,
              type: srcKeycode.dataset.type
            });
          }
        } else {
          // handle swapping keys in keymap
          var $src = $(srcKeycode);
          var $dst = $(t);
          var srcIndex = $src.data('index');
          var dstIndex = $dst.data('index');

          // get src and dest positions for animation
          var srcPrevPos = ui.draggable.data().uiDraggable.originalPosition;
          var srcPos = {
            left: `${srcPrevPos.left}px`,
            top: `${srcPrevPos.top}px`
          };
          var dstPos = $dst.css(['left', 'top']);

          // use promises to wait until animation finished
          var deferSrc = $.Deferred();
          var deferDst = $.Deferred();

          // animate swapping
          $src.animate(
            { left: dstPos.left, top: dstPos.top },
            150,
            'linear',
            () => {
              deferSrc.resolve();
            }
          );
          $dst.animate(
            { left: srcPos.left, top: srcPos.top },
            150,
            'linear',
            () => {
              deferDst.resolve();
            }
          );

          function animationsFinished() {
            // restore original element positions just swap their data
            $src.css({ left: srcPos.left, top: srcPos.top });
            $dst.css({ left: dstPos.left, top: dstPos.top });

            let layer = vueStore.getters['keymap/layer'];
            vueStore.commit('keymap/swapKeys', {
              _layer: layer,
              srcIndex,
              dstIndex
            });

            render_key(layer, srcIndex);
            render_key(layer, key);
          }

          // wait until both animations are complete
          $.when(deferSrc, deferDst).done(animationsFinished);
          return;
        }
        vueStore.commit('keymap/setDirty');
        render_key(vueStore.getters['keymap/layer'], key);
      }
    };
  }

  function render_key(_layer, k) {
    var $key = $('#key-' + k);
    var promise = vueStore.dispatch('keymap/initKey', { _layer, index: k });
    promise.then(keycode => {
      if (!keycode) {
        let { name, code } = lookupKeycode('KC_NO');
        vueStore.commit('keymap/assignKey', {
          _layer,
          index: k,
          name,
          code,
          type: ''
        });
        keycode = vueStore.getters['keymap/getKey']({ _layer, index: k });
      }
      $key.html(keycode.name);
      if (keycode.type === 'container') {
        $key.addClass('key-container');
        var $container = $('<div>', {
          class: 'key-contents'
        });
        if (keycode.contents) {
          $container.html(keycode.contents.name);
        }
        $container.droppable(droppable_config($container, k));
        $key.append($container);
      } else if (keycode.type === 'layer') {
        $key.addClass('key-layer');
        $key.append($('<br/>'));
        var layer_input1 = $('<input>', {
          class: 'key-layer-input',
          type: 'number',
          val: keycode.layer
        }).on('input', function() {
          var val = $(this).val();
          var toLayer = parseInt(val, 10);
          if (_.isNumber(toLayer)) {
            vueStore
              .dispatch('keymap/setKeycodeLayer', {
                _layer,
                index: k,
                toLayer
              })
              .then(() => {
                setLayerToNonEmpty(toLayer);
              });
          }
        });
        ignoreKeypressListener(layer_input1);
        $key.append(layer_input1);
      } else if (keycode.type === 'text') {
        $key.addClass('key-layer');
        var layer_input = $('<input>', {
          class: 'key-layer-input',
          val: keycode.text
        }).on('input', function(/*e*/) {
          vueStore.commit('keymap/setText', {
            _layer: vueStore.getters['keymap/layer'],
            index: k,
            text: $(this).val()
          });
        });
        ignoreKeypressListener(layer_input);
        $key.append(layer_input);
      } else {
        $key.removeClass('key-container');
        $key.removeClass('key-layer');
      }
      if (keycode.code !== 'KC_NO') {
        var remove_keycode = $('<div>', {
          class: 'remove',
          html: '&#739;',
          click: function(evt) {
            let layer = vueStore.getters['keymap/layer'];
            evt.preventDefault();
            evt.stopPropagation();
            vueStore.commit('keymap/assignKey', {
              _layer: layer,
              index: k,
              name: '',
              code: 'KC_NO',
              type: ''
            });
            render_key(layer, k);
          }
        });
        $key.append(remove_keycode);
      }
    });
  }

  function getKeycodes() {
    return [
      { name: 'Esc', code: 'KC_ESC', keys: 'esc' },
      { width: 1000 },
      { name: 'F1', code: 'KC_F1' },
      { name: 'F2', code: 'KC_F2' },
      { name: 'F3', code: 'KC_F3' },
      { name: 'F4', code: 'KC_F4' },
      { width: 500 },
      { name: 'F5', code: 'KC_F5' },
      { name: 'F6', code: 'KC_F6' },
      { name: 'F7', code: 'KC_F7' },
      { name: 'F8', code: 'KC_F8' },
      { width: 500 },
      { name: 'F9', code: 'KC_F9' },
      { name: 'F10', code: 'KC_F10' },
      { name: 'F11', code: 'KC_F11' },
      { name: 'F12', code: 'KC_F12' },
      { width: 250 },
      { name: 'Print Screen', code: 'KC_PSCR' },
      { name: 'Scroll Lock', code: 'KC_SLCK' },
      { name: 'Pause', code: 'KC_PAUS' },
      { width: 0 },

      { name: '~\n`', code: 'KC_GRV', keys: '`' },
      { name: '!\n1', code: 'KC_1', keys: '1' },
      { name: '@\n2', code: 'KC_2', keys: '2' },
      { name: '#\n3', code: 'KC_3', keys: '3' },
      { name: '$\n4', code: 'KC_4', keys: '4' },
      { name: '%\n5', code: 'KC_5', keys: '5' },
      { name: '^\n6', code: 'KC_6', keys: '6' },
      { name: '&\n7', code: 'KC_7', keys: '7' },
      { name: '*\n8', code: 'KC_8', keys: '8' },
      { name: '(\n9', code: 'KC_9', keys: '9' },
      { name: ')\n0', code: 'KC_0', keys: '0' },
      { name: '_\n-', code: 'KC_MINS', keys: '-' },
      { name: '+\n=', code: 'KC_EQL', keys: '=' },
      { name: 'Back Space', code: 'KC_BSPC', keys: 'backspace', width: 2000 },
      { width: 250 },
      { name: 'Insert', code: 'KC_INS', keys: 'insert' },
      { name: 'Home', code: 'KC_HOME', keys: 'home' },
      { name: 'Page Up', code: 'KC_PGUP', keys: 'pageup' },
      { width: 250 },
      { name: 'Num Lock', code: 'KC_NLCK', keys: 'num' },
      { name: '/', code: 'KC_PSLS', keys: 'num_divide' },
      { name: '*', code: 'KC_PAST', keys: 'num_multiply' },
      { name: '-', code: 'KC_PMNS', keys: 'num_subtract' },
      { width: 0 },

      { name: 'Tab', code: 'KC_TAB', keys: 'tab', width: 1500 },
      { name: 'q', code: 'KC_Q', keys: 'q' },
      { name: 'w', code: 'KC_W', keys: 'w' },
      { name: 'e', code: 'KC_E', keys: 'e' },
      { name: 'r', code: 'KC_R', keys: 'r' },
      { name: 't', code: 'KC_T', keys: 't' },
      { name: 'y', code: 'KC_Y', keys: 'y' },
      { name: 'u', code: 'KC_U', keys: 'u' },
      { name: 'i', code: 'KC_I', keys: 'i' },
      { name: 'o', code: 'KC_O', keys: 'o' },
      { name: 'p', code: 'KC_P', keys: 'p' },
      { name: '{\n[', code: 'KC_LBRC', keys: '[' },
      { name: '}\n]', code: 'KC_RBRC', keys: ']' },
      { name: '|\n\\', code: 'KC_BSLS', keys: '\\', width: 1500 },
      { width: 250 },
      { name: 'Del', code: 'KC_DEL', keys: 'delete' },
      { name: 'End', code: 'KC_END', keys: 'end' },
      { name: 'Page Down', code: 'KC_PGDN', keys: 'pagedown' },
      { width: 250 },
      { name: '7', code: 'KC_P7', keys: 'num_7' },
      { name: '8', code: 'KC_P8', keys: 'num_8' },
      { name: '9', code: 'KC_P9', keys: 'num_9' },
      { name: '+', code: 'KC_PPLS', keys: 'num_add' },
      { width: 0 },

      { name: 'Caps Lock', code: 'KC_CAPS', keys: 'caps_lock', width: 1750 },
      { name: 'a', code: 'KC_A', keys: 'a' },
      { name: 's', code: 'KC_S', keys: 's' },
      { name: 'd', code: 'KC_D', keys: 'd' },
      { name: 'f', code: 'KC_F', keys: 'f' },
      { name: 'g', code: 'KC_G', keys: 'g' },
      { name: 'h', code: 'KC_H', keys: 'h' },
      { name: 'j', code: 'KC_J', keys: 'j' },
      { name: 'k', code: 'KC_K', keys: 'k' },
      { name: 'l', code: 'KC_L', keys: 'l' },
      { name: ':\n;', code: 'KC_SCLN', keys: ';' },
      { name: '"\n\'', code: 'KC_QUOT', keys: "'" },
      { name: 'Enter', code: 'KC_ENT', keys: 'enter', width: 2250 },
      { width: 3500 },
      { name: '4', code: 'KC_P4', keys: 'num_4' },
      { name: '5', code: 'KC_P5', keys: 'num_5' },
      { name: '6', code: 'KC_P6', keys: 'num_6' },
      { name: ',', code: 'KC_PCMM' },
      { width: 0 },

      { name: 'Left Shift', code: 'KC_LSFT', keys: 'shift', width: 2250 },
      { name: 'z', code: 'KC_Z', keys: 'z' },
      { name: 'x', code: 'KC_X', keys: 'x' },
      { name: 'c', code: 'KC_C', keys: 'c' },
      { name: 'v', code: 'KC_V', keys: 'v' },
      { name: 'b', code: 'KC_B', keys: 'b' },
      { name: 'n', code: 'KC_N', keys: 'n' },
      { name: 'm', code: 'KC_M', keys: 'm' },
      { name: '<\n,', code: 'KC_COMM', keys: ',' },
      { name: '>\n.', code: 'KC_DOT', keys: '.' },
      { name: '?\n/', code: 'KC_SLSH', keys: '/' },
      { name: 'Right Shift', code: 'KC_RSFT', width: 2750 },
      { width: 1250 },
      { name: 'Up', code: 'KC_UP', keys: 'up' },
      { width: 1250 },
      { name: '1', code: 'KC_P1', keys: 'num_1' },
      { name: '2', code: 'KC_P2', keys: 'num_2' },
      { name: '3', code: 'KC_P3', keys: 'num_3' },
      { name: '=', code: 'KC_PEQL' },
      { width: 0 },

      { name: 'Left Ctrl', code: 'KC_LCTL', keys: 'ctrl', width: 1250 },
      { name: 'Left OS', code: 'KC_LGUI', keys: 'cmd', width: 1250 },
      { name: 'Left Alt', code: 'KC_LALT', keys: 'alt', width: 1250 },
      { name: 'Space', code: 'KC_SPC', keys: 'space', width: 6250 },
      { name: 'Right Alt', code: 'KC_RALT', width: 1250 },
      { name: 'Right OS', code: 'KC_RGUI', width: 1250 },
      { name: 'Menu', code: 'KC_APP', width: 1250 },
      { name: 'Right Ctrl', code: 'KC_RCTL', width: 1250 },
      { width: 250 },
      { name: 'Left', code: 'KC_LEFT', keys: 'left' },
      { name: 'Down', code: 'KC_DOWN', keys: 'down' },
      { name: 'Right', code: 'KC_RGHT', keys: 'right' },
      { width: 250 },
      { name: '0', code: 'KC_P0', width: 2000, keys: 'num_0' },
      { name: '.', code: 'KC_PDOT', keys: 'num_decimal' },
      { name: 'Enter', code: 'KC_PENT', keys: 'num_enter' },

      { label: 'International', width: 'label' },

      { name: 'NUHS', code: 'KC_NUHS', title: 'Non-US # and ~' },
      { name: 'NUBS', code: 'KC_NUBS', title: 'Non-US \\ and |' },

      { name: 'Ro', code: 'KC_RO', title: 'JIS \\ and |' },
      { name: '¥', code: 'KC_JYEN' },

      { name: '無変換', code: 'KC_MHEN', title: 'JIS Muhenkan' },
      { name: '漢字', code: 'KC_HANJ', title: '' },

      { name: '한영', code: 'KC_HAEN', title: '' },
      { name: '変換', code: 'KC_HENK', title: 'JIS Henkan' },
      { name: 'かな', code: 'KC_KANA', title: 'JIS Katakana/Hiragana' },

      { label: 'QMK specific', width: 'label' },

      { name: '', code: 'KC_NO', title: 'Nothing' },
      { name: '▽', code: 'KC_TRNS', title: 'Pass-through' },
      { name: 'Reset', code: 'RESET', title: 'Reset the keyboard' },
      { name: 'Debug', code: 'DEBUG', title: 'Toggle debug mode' },
      { width: 1000 },
      {
        name: 'Any',
        code: 'text',
        type: 'text',
        title: 'Manually enter any QMK keycode'
      },

      { label: 'Layer functions', width: 'label' },

      {
        name: 'MO',
        code: 'MO(layer)',
        type: 'layer',
        layer: 0,
        title: 'Momentary turn layer on'
      },
      {
        name: 'TG',
        code: 'TG(layer)',
        type: 'layer',
        layer: 0,
        title: 'Toggle layer on/off'
      },
      {
        name: 'TO',
        code: 'TO(layer)',
        type: 'layer',
        layer: 0,
        title: 'Turn on layer when pressed'
      },
      {
        name: 'TT',
        code: 'TT(layer)',
        type: 'layer',
        layer: 0,
        title:
          "Normally acts like MO unless it's tapped multple times which toggles layer on"
      },
      {
        name: 'DF',
        code: 'DF(layer)',
        type: 'layer',
        layer: 0,
        title: 'Sets the default layer'
      },
      {
        name: 'OSL',
        code: 'OSL(layer)',
        type: 'layer',
        layer: 0,
        title: 'Switch to layer for one keypress'
      },

      {
        label:
          'Mod key combinations (A = Alt, C = Control, G = Windows/Command, S = Shift)',
        width: 'label'
      },

      { name: 'LSft', code: 'LSFT(kc)', type: 'container' },
      { name: 'LCtl', code: 'LCTL(kc)', type: 'container' },
      { name: 'LAlt', code: 'LALT(kc)', type: 'container' },
      { name: 'LGui', code: 'LGUI(kc)', type: 'container' },
      { name: 'RSft', code: 'RSFT(kc)', type: 'container' },
      { name: 'RCtl', code: 'RCTL(kc)', type: 'container' },
      { name: 'RAlt', code: 'RALT(kc)', type: 'container' },
      { name: 'RGui', code: 'RGUI(kc)', type: 'container' },
      { width: 0 },
      {
        name: 'LSft_T',
        code: 'LSFT_T(kc)',
        type: 'container',
        title: 'Shift when held, kc when tapped'
      },
      {
        name: 'LCtl_T',
        code: 'LCTL_T(kc)',
        type: 'container',
        title: 'Control when held, kc when tapped'
      },
      {
        name: 'LAlt_T',
        code: 'LALT_T(kc)',
        type: 'container',
        title: 'Alt when held, kc when tapped'
      },
      {
        name: 'LGui_T',
        code: 'LGUI_T(kc)',
        type: 'container',
        title: 'Gui when held, kc when tapped'
      },
      {
        name: 'RSft_T',
        code: 'RSFT_T(kc)',
        type: 'container',
        title: 'Shift when held, kc when tapped'
      },
      {
        name: 'RCtl_T',
        code: 'RCTL_T(kc)',
        type: 'container',
        title: 'Control when held, kc when tapped'
      },
      {
        name: 'RAlt_T',
        code: 'RALT_T(kc)',
        type: 'container',
        title: 'Alt when held, kc when tapped'
      },
      {
        name: 'RGui_T',
        code: 'RGUI_T(kc)',
        type: 'container',
        title: 'Gui when held, kc when tapped'
      },
      {
        name: 'CS_T',
        code: 'C_S_T(kc)',
        type: 'container',
        title: 'Control + Shift when held, kc when tapped'
      },
      {
        name: 'All_T',
        code: 'ALL_T(kc)',
        type: 'container',
        title: 'LCTL + LSFT + LALT + LGUI when held, kc when tapped'
      },
      {
        name: 'Meh_T',
        code: 'MEH_T(kc)',
        type: 'container',
        title: 'LCTL + LSFT + LALT when held, kc when tapped'
      },
      {
        name: 'LCAG_T',
        code: 'LCAG_T(kc)',
        type: 'container',
        title: 'LCTL + LALT + LGUI when held, kc when tapped'
      },
      {
        name: 'RCAG_T',
        code: 'RCAG_T(kc)',
        type: 'container',
        title: 'RCTL + RALT + RGUI when held, kc when tapped'
      },
      {
        name: 'SGUI_T',
        code: 'SCMD_T(kc)',
        type: 'container',
        title: 'LGUI + LSFT when held, kc when tapped'
      },
      {
        name: 'LCA_T',
        code: 'LCA_T(kc)',
        type: 'container',
        title: 'LCTL + LALT when held, kc when tapped'
      },
      { width: 0 },
      {
        name: 'Hyper',
        code: 'HYPR(kc)',
        type: 'container',
        title: 'LCTL + LSFT + LALT + LGUI'
      },
      {
        name: 'Meh',
        code: 'MEH(kc)',
        type: 'container',
        title: 'LCTL + LSFT + LALT'
      },
      {
        name: 'LCAG',
        code: 'LCAG(kc)',
        type: 'container',
        title: 'LCTL + LALT + LGUI'
      },
      {
        name: 'ALTG',
        code: 'ALTG(kc)',
        type: 'container',
        title: 'RCTL + RALT'
      },
      {
        name: 'SGUI',
        code: 'SCMD(kc)',
        type: 'container',
        title: 'LGUI + LSFT'
      },
      { name: 'LCA', code: 'LCA(kc)', type: 'container', title: 'LCTL + LALT' },

      { label: 'Alphabet', width: 'label' },

      { name: 'a', code: 'KC_A' },
      { name: 'b', code: 'KC_B' },
      { name: 'c', code: 'KC_C' },
      { name: 'd', code: 'KC_D' },
      { name: 'e', code: 'KC_E' },
      { name: 'f', code: 'KC_F' },
      { name: 'g', code: 'KC_G' },
      { name: 'h', code: 'KC_H' },
      { name: 'i', code: 'KC_I' },
      { name: 'j', code: 'KC_J' },
      { name: 'k', code: 'KC_K' },
      { name: 'l', code: 'KC_L' },
      { name: 'm', code: 'KC_M' },
      { width: 0 },
      { name: 'n', code: 'KC_N' },
      { name: 'o', code: 'KC_O' },
      { name: 'p', code: 'KC_P' },
      { name: 'q', code: 'KC_Q' },
      { name: 'r', code: 'KC_R' },
      { name: 's', code: 'KC_S' },
      { name: 't', code: 'KC_T' },
      { name: 'u', code: 'KC_U' },
      { name: 'v', code: 'KC_V' },
      { name: 'w', code: 'KC_W' },
      { name: 'x', code: 'KC_X' },
      { name: 'y', code: 'KC_Y' },
      { name: 'z', code: 'KC_Z' },

      { label: 'Special action keys', width: 'label' },
      {
        name: 'Esc/~',
        code: 'KC_GESC',
        title: 'Esc normally, but ~ when shift/gui is pressed'
      },
      {
        name: 'LS/(',
        code: 'KC_LSPO',
        title: 'Left shift when held, ( when tapped'
      },
      {
        name: 'RS/)',
        code: 'KC_RSPC',
        title: 'Right shift when held, ) when tapped'
      },

      { label: 'Shifted symbols', width: 'label' },

      { name: '~', code: 'KC_TILD', keys: '`' },
      { name: '!', code: 'KC_EXLM', keys: '!' },
      { name: '@', code: 'KC_AT', keys: '@' },
      { name: '#', code: 'KC_HASH', keys: '#' },
      { name: '$', code: 'KC_DLR', keys: '$' },
      { name: '%', code: 'KC_PERC', keys: '%' },
      { name: '^', code: 'KC_CIRC', keys: '^' },
      { name: '&', code: 'KC_AMPR', keys: '&' },
      { name: '*', code: 'KC_ASTR', keys: '*' },
      { name: '(', code: 'KC_LPRN', keys: '(' },
      { name: ')', code: 'KC_RPRN', keys: ')' },
      { name: '_', code: 'KC_UNDS', keys: '_' },
      { name: '+', code: 'KC_PLUS', keys: '+' },
      { name: '{', code: 'KC_LCBR', keys: '{' },
      { name: '}', code: 'KC_RCBR', keys: '}' },
      { name: '<', code: 'KC_LT', keys: '<' },
      { name: '>', code: 'KC_GT', keys: '>' },
      { name: ':', code: 'KC_COLN', keys: ':' },
      { name: '|', code: 'KC_PIPE', keys: '|' },
      { name: '?', code: 'KC_QUES', keys: '?' },
      { name: '"', code: 'KC_DQUO', keys: '"' },

      { label: 'Application', width: 'label' },

      { name: 'Power', code: 'KC_PWR' },
      { name: 'Help', code: 'KC_HELP' },
      { name: 'Stop', code: 'KC_STOP' },
      { name: 'Again', code: 'KC_AGIN' },
      { name: 'Menu', code: 'KC_MENU' },
      { name: 'Undo', code: 'KC_UNDO' },
      { name: 'Select', code: 'KC_SLCT' },
      { name: 'Copy', code: 'KC_COPY' },
      { name: 'Exec', code: 'KC_EXEC' },
      { name: 'Paste', code: 'KC_PSTE' },
      { name: 'Find', code: 'KC_FIND' },
      { name: 'Cut', code: 'KC_CUT' },

      { label: 'Keyboard settings (persistent)', width: 'label' },

      { name: 'Swap C/Caps', code: 'MAGIC_SWAP_CONTROL_CAPSLOCK' },
      { name: 'Caps>C', code: 'MAGIC_CAPSLOCK_TO_CONTROL' },
      { name: 'Swap LA/LO', code: 'MAGIC_SWAP_LALT_LGUI' },
      { name: 'Swap RA/RO', code: 'MAGIC_SWAP_RALT_RGUI' },
      { name: 'No O', code: 'MAGIC_NO_GUI' },
      { name: 'Swap `/Esc', code: 'MAGIC_SWAP_GRAVE_ESC' },
      { name: 'Swap \\/BS', code: 'MAGIC_SWAP_BACKSLASH_BACKSPACE' },
      { name: 'NKRO', code: 'MAGIC_HOST_NKRO' },
      { name: 'Swap A/O', code: 'MAGIC_SWAP_ALT_GUI' },
      { name: 'Rev C/Caps', code: 'MAGIC_UNSWAP_CONTROL_CAPSLOCK' },
      { name: 'Rev Caps>C', code: 'MAGIC_UNCAPSLOCK_TO_CONTROL' },
      { name: 'Rev LA/LO', code: 'MAGIC_UNSWAP_LALT_LGUI' },
      { name: 'Rev RA/RO', code: 'MAGIC_UNSWAP_RALT_RGUI' },
      { name: 'Rev No O', code: 'MAGIC_UNNO_GUI' },
      { name: 'Rev `/Esc', code: 'MAGIC_UNSWAP_GRAVE_ESC' },
      { name: 'Rev \\/BS', code: 'MAGIC_UNSWAP_BACKSLASH_BACKSPACE' },
      { name: 'Rev NKRO', code: 'MAGIC_UNHOST_NKRO' },
      { name: 'Rev A/O', code: 'MAGIC_UNSWAP_ALT_GUI' },
      { name: 'Togg NKRO', code: 'MAGIC_TOGGLE_NKRO' },

      { label: 'Backlight settings', width: 'label' },

      { name: 'BL Toggle', code: 'BL_TOGG' },
      { name: 'BL +', code: 'BL_INC' },
      { name: 'BL -', code: 'BL_DEC' },
      { name: 'BL Cycle', code: 'BL_STEP' },

      { label: 'RGB Lighting settings', width: 'label' },

      { name: 'RGB Toggle', code: 'RGB_TOG' },
      { name: 'RGB Mode +', code: 'RGB_MOD' },
      { name: 'RGB Mode -', code: 'RGB_RMOD' },
      { name: 'Hue +', code: 'RGB_HUI' },
      { name: 'Hue -', code: 'RGB_HUD' },
      { name: 'Sat +', code: 'RGB_SAI' },
      { name: 'Sat -', code: 'RGB_SAD' },
      { name: 'Bright +', code: 'RGB_VAI' },
      { name: 'Bright -', code: 'RGB_VAD' },
      { name: 'Effect +', code: 'RGB_SPI' },
      { name: 'Effect -', code: 'RGB_SPD' },
      { name: 'RGB Mode P', code: 'RGB_M_P', title: 'Plain' },
      { name: 'RGB Mode B', code: 'RGB_M_B', title: 'Breathe' },
      { name: 'RGB Mode R', code: 'RGB_M_R', title: 'Rainbow' },
      { name: 'RGB Mode SW', code: 'RGB_M_SW', title: 'Swirl' },
      { name: 'RGB Mode SN', code: 'RGB_M_SN', title: 'Snake' },
      { name: 'RGB Mode K', code: 'RGB_M_K', title: 'Knight' },
      { name: 'RGB Mode X', code: 'RGB_M_X', title: 'Xmas' },
      { name: 'RGB Mode G', code: 'RGB_M_G', title: 'Gradient' },

      { label: 'Multimedia Keys', width: 'label' },

      { name: 'Previous', code: 'KC_MPRV', title: 'Media Previous' },
      { name: 'Next', code: 'KC_MNXT', title: 'Media Next' },
      { name: 'Mute', code: 'KC_MUTE', title: 'Mute Audio' },
      { name: 'Vol -', code: 'KC_VOLD', title: 'Volume Down' },
      { name: 'Vol +', code: 'KC_VOLU', title: 'Volume Up' },
      { name: 'Media Stop', code: 'KC_MSTP', title: 'Media Stop' },
      { name: 'Play', code: 'KC_MPLY', title: 'Play/Pause' }
    ];
  }

  function randomPotatoFact() {
    let potatoFact = [
      'A potato is about 80% water and 20% solid.',
      'Henry Spalding first planted potatoes in Idaho in 1837',
      '“French Fries” were introduced to America when Thomas Jefferson served them at a Whitehouse dinner.',
      'United States potato lovers consumed more than 4 million tons of French Fries in various shapes and sizes.',
      'Potatoes are a powerful aphrodisiac, says a physician in Ireland.',
      'The average American eats 140 pounds of potatoes per year. Germans eat more than 200 pounds per year.',
      'The largest potato grown was 18 pounds and 4 ounces according to the Guinness Book of World Records. It was grown in England in 1795.',
      'Potatoes are the world’s fourth food staple – after wheat, corn and rice.',
      'Potatoes are grown in more than 125 countries.',
      'Every year enough potatoes are grown worldwide to cover a four-lane motorway circling the world six times.',
      'China is the world’s largest potato producer.',
      'Potatoes were the first vegetable grown in space.',
      'Potatoes are totally gluten-free.',
      'One of the most basic Incan measurements of time was the time it took to cook a potato.',
      'If a potato is exposed to light while growing, it will turn green and become poisonous.',
      'It takes 10,000 pounds of potatoes to make 2,500 pounds of potato chips.',
      'Today there are more than 4000 different kinds of potatoes.',
      'Potatoes belong to a small family, the Nightshade or Solanaceous family.',
      'During the Alaskan Klondike gold rush, (1897-1898) potatoes were practically worth their weight in gold.',
      'Sir Walter Raleigh introduced potatoes to Ireland in 1589 on the 40,000 acres of land near Cork.',
      'Potatoes are available year-round as they are harvested somewhere every month of the year.',
      'Native to Africa and Asia, yams vary in size from the size of a small potato up to the record size of 130 pounds.'
    ];
    $('.random-potato').html(
      potatoFact[Math.floor(Math.random(Date.now()) * potatoFact.length)]
    );
  }

  function getExclusionList() {
    return [
      'atom47',
      'bigseries',
      'chibios_test',
      'christmas_tree',
      'converter/usb_usb',
      'crkbd',
      'deltasplit75',
      'duck/eagle_viper',
      'duck/octagon',
      'e6v2',
      'eco',
      'ergo42',
      'ergodash',
      'ergotravel',
      'fortitude60',
      'fourier',
      'hadron',
      'handwired/dactyl_manuform',
      'handwired/qc60',
      'handwired/xealous',
      'helix',
      'iris',
      'jc65',
      'kbd75',
      'kinesis',
      'launchpad',
      'lets_split',
      'lets_split_eh',
      'levinson',
      'lfkeyboards',
      'lily58',
      'mechmini',
      'meira',
      'minidox',
      'nyquist',
      'orthodox',
      'planck',
      'preonic',
      'ps2avrGB',
      'quefrency',
      'qwertyydox',
      'redox',
      'rorschach',
      's60_x',
      'vitamins_included',
      'viterbi',
      'zen'
    ].reduce((acc, k) => {
      acc[k] = true;
      return acc;
    }, {});
  }
});
