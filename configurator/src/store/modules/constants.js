import template from 'lodash/template';
const backend_baseurl = 'https://api.qmk.fm';
const backend_keyboards_url = `${backend_baseurl}/v1/keyboards`;
const backend_compile_url = `${backend_baseurl}/v1/compile`;
const backend_status_url = `${backend_baseurl}/v1`;
const backend_readme_url_template = template(
  `${backend_keyboards_url}/<%= keyboard %>/readme`
);
const PREVIEW_LABEL = 'Preview info.json';

export default {
  backend_baseurl,
  backend_keyboards_url,
  backend_compile_url,
  backend_status_url,
  backend_readme_url_template,
  PREVIEW_LABEL
};
