import template from 'lodash/template';

export const backend_baseurl = process.env.VUE_APP_API_URL;
if (!backend_baseurl) {
  throw 'Backend URL has not been specified';
}
export const backend_keyboards_url = `${backend_baseurl}/v1/keyboards`;
export const backend_compile_url = `${backend_baseurl}/v1/compile`;
export const backend_status_url = `${backend_baseurl}/v1`;
export const backend_readme_url_template = template(
  `${backend_keyboards_url}/<%= keyboard %>/readme`
);
export const backend_skeletons_url = `${backend_baseurl}/v1/skeletons`;
export const PREVIEW_LABEL = 'Preview info.json';
