import template from 'lodash/template';
import isUndefined from 'lodash/isUndefined';

export const backend_baseurl = import.meta.env.VITE_API_URL;
if (isUndefined(backend_baseurl)) {
  throw 'Backend URL has not been specified';
}
export const keyboards_baseurl = import.meta.env.VITE_KEYBOARDS_URL;
if (isUndefined(keyboards_baseurl)) {
  throw 'Keyboard Metadata URL has not been specified';
}
export const backend_keyboards_url = `${keyboards_baseurl}/v1/keyboards`;
export const backend_keyboard_list_url = `${keyboards_baseurl}/v1/keyboard_list.json`;
export const backend_compile_url = `${backend_baseurl}/v1/compile`;
export const backend_status_url = `${backend_baseurl}/v1`;
export const backend_readme_url_template = template(
  `${backend_keyboards_url}/<%= keyboard %>/readme.md`
);
export const backend_skeletons_url = `${backend_baseurl}/v1/skeletons`;
export const PREVIEW_LABEL = 'Preview info.json';
