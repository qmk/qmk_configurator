const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    keyboard: { type: 'string' },
    keymap: { type: 'string' },
    commit: { type: 'string' },
    layout: { type: 'string' },
    layers: { type: 'array' }
  },
  required: ['keyboard', 'keymap', 'commit', 'layout', 'layers'],
  additionalProperties: true
};

async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

const validate = ajv.compile(schema); // compile schema to avoid busy work

const [, , dirToScan] = process.argv;
let count = 0;
let error = false;
async function main() {
  for await (const p of walk(dirToScan)) {
    if (path.extname(p) != '.json') {
      continue;
    }
    try {
      const jsonFile = fs.readFileSync(p, { utf8: true });
      const valid = validate(JSON.parse(jsonFile));
      count++;
      if (!valid) {
        console.log(`${p} ${JSON.stringify(ajv.errors)}`);
        error = true;
      }
    } catch (err) {
      console.log(`Error ${p} ${err}`);
      error = true;
    }
  }
  console.log(`scanned ${count} files.`);
  return error ? 1 : 0;
}
main();
