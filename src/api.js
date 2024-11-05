import store from './store';
import { useStatusStore } from './store/status';

import { backend_compile_url } from './store/modules/constants';

let compile_status = undefined;
let baking = 'Baking';

function statusError(message) {
  const statusStore = useStatusStore();
  statusStore.append(message);
  statusStore.scrollToEnd();
}

function compileLayout(keyboard, keymap, layout) {
  disableCompileButton();
  let template = store.state.keymap.templates.keymap;
  const layers = store.getters['keymap/exportLayers']({ compiler: true });
  let request = JSON.stringify({
    ...template,
    keyboard,
    keymap,
    layout,
    layers
  });
  console.log(request);
  const statusStore = useStatusStore();
  if (statusStore.empty) {
    statusStore.append('\n');
  }
  statusStore.append(`* Sending ${keyboard}:${keymap} with ${layout}`);
  fetch(backend_compile_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: request
  })
    .then(async (resp) => {
      if (resp.ok) {
        store.commit('app/setShowSpinner', true);
        const data = await resp.json();
        if (data.enqueued) {
          statusStore.append(`\n* Received job_id: ${data.job_id}`);
          statusStore.scrollToEnd();
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
  const statusStore = useStatusStore();
  fetch(url)
    .then(async (resp) => {
      console.log(`response in ${performance.now() - start}ms`, resp);
      let msg;
      const data = await resp.json();
      if (!resp.ok) {
        console.log('Unexpected status', data.status);
        enableCompileButton();
      } else {
        const pollInterval = Math.floor(2500 + Math.random() * 1000);
        console.log(`Next Poll in ${pollInterval}ms`);
        switch (data.status) {
          case 'finished':
            store.commit('app/setSpinnerMsg', 'Done!');
            statusStore.append(
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
            statusStore.append(msg);
            setTimeout(check_status, pollInterval);
            break;
          case 'running':
            store.commit('app/setSpinnerMsg', baking);
            msg = compile_status === 'running' ? ' .' : '\n* Running';
            statusStore.append(msg);
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
      statusStore.scrollToEnd();
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
