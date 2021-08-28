import axios from 'axios';
import store from './store';

import { backend_compile_url } from './store/modules/constants';

let compile_status = undefined;
let baking = 'Baking';

function statusError(message) {
  store.commit('status/append', message);
  store.dispatch('status/scrollToEnd');
}

function compileLayout(_keyboard, _keymapName, _layout) {
  disableCompileButton();
  let template = store.state.keymap.templates.keymap;
  const layers = store.getters['keymap/exportLayers']({ compiler: true });
  let request = JSON.stringify(
    Object.assign(template, {
      keyboard: _keyboard,
      keymap: _keymapName,
      layout: _layout,
      layers: layers
    })
  );
  console.log(request);
  if (store.getters['status/empty']) {
    store.commit('status/append', '\n');
  }
  store.commit(
    'status/append',
    `* Sending ${_keyboard}:${_keymapName} with ${_layout}`
  );
  axios
    .post(backend_compile_url, request)
    .then((resp) => {
      const { status, data } = resp;
      if (status === 200) {
        store.commit('app/setShowSpinner', true);
        if (data.enqueued) {
          store.commit('status/append', `\n* Received job_id: ${data.job_id}`);
          store.dispatch('status/scrollToEnd');
          store.commit('app/setJobID', data.job_id);
          check_status();
        }
      } else {
        throw resp;
      }
    })
    .catch((err) => {
      window.alert('Unexpected error ', console.log(err));
    });
}

function enableCompileButton() {
  store.commit('app/enableCompile');
  setTimeout(() => {
    store.commit('app/setShowSpinner', false);
  }, 2000);
}

function disableCompileButton() {
  store.commit('app/disableCompile');
}

function enableOtherButtons() {
  store.commit('app/setEnableDownloads');
}

function disableOtherButtons() {
  store.commit('app/setDisableDownloads');
}

/**
 * check_status waits for a compilation to happen and reports progress
 *
 * It interacts with the app store to update the application.
 *
 */
function check_status() {
  const url = `${backend_compile_url}/${store.state.app.jobID}`;
  const start = performance.now();
  axios
    .get(url)
    .then((resp) => {
      console.log(`response in ${performance.now() - start}ms`, resp);
      let msg;
      let { status, data } = resp;
      if (status !== 200) {
        console.log('Unexpected status', data.status);
        enableCompileButton();
      } else {
        const pollInterval = Math.floor(2500 + Math.random() * 1000);
        console.log(`Next Poll in ${pollInterval}ms`);
        switch (data.status) {
          case 'finished':
            store.commit('app/setSpinnerMsg', 'Done!');
            store.commit(
              'status/append',
              `\n* Finished:\n${data.result.output.replace(/\[.*m/gi, '')}`
            );
            store.commit(
              'app/setFirmwareBinaryURL',
              data.result.firmware_binary_url
            );
            store.commit(
              'app/setFirmwareSourceURL',
              data.result.firmware_source_url
            );
            store.commit(
              'app/setKeymapSourceURL',
              data.result.firmware_keymap_url
            );
            store.commit('app/setFirmwareFile', data.result.firmware_filename);
            enableCompileButton();
            enableOtherButtons();
            break;
          case 'queued':
            store.commit('app/setSpinnerMsg', 'Waiting for Oven');
            msg = compile_status === 'queued' ? ' .' : '\n* Queueing';
            store.commit('status/append', msg);
            setTimeout(check_status, pollInterval);
            break;
          case 'running':
            store.commit('app/setSpinnerMsg', baking);
            msg = compile_status === 'running' ? ' .' : '\n* Running';
            store.commit('status/append', msg);
            setTimeout(check_status, pollInterval);
            break;
          case 'unknown':
            store.commit('app/setSpinnerMsg', 'Abort! Abort!');
            enableCompileButton();
            break;
          case 'failed':
            store.commit('app/setSpinnerMsg', 'Abort! Abort!');
            statusError('\n* Failed\n');
            if (data.result) {
              statusError(`* Error:\n${data.result.output}`);
            }
            enableCompileButton();
            break;
          default:
            store.commit('app/setSpinnerMsg', 'Abort! Abort!');
            console.log('Unexpected status', data.status);
            enableCompileButton();
        }
      }
      store.dispatch('status/scrollToEnd');
      compile_status = data.status;
    })
    .catch((err) => {
      window.alert('Unexpected error while compiling ', console.log(err));
    });
}

export {
  statusError,
  compileLayout,
  enableCompileButton,
  disableCompileButton,
  enableOtherButtons,
  disableOtherButtons
};
