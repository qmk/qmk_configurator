const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  type: 'object',
  required: ['keyboard', 'keymap', 'layout', 'layers'],
  properties: {
    keyboard: { type: 'string' },
    keymap: { type: 'string' },
    commit: { type: 'string' },
    layout: { type: 'string' },
    layers: { type: 'array' }
  },
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

// count of files processed
let count = 0;
// record an error happened. Keep going so we have a list of all bad files
let error = false;
async function main() {
  return new Promise(async (resolve, reject) => {
    for await (const p of walk(dirToScan)) {
      if (path.extname(p) != '.json') {
        // skip non-json files
        continue;
      }
      try {
        const jsonFile = fs.readFileSync(p, { utf8: true });
        const valid = validate(JSON.parse(jsonFile));
        count++;
        if (!valid) {
          console.warn(`${p} ${JSON.stringify(ajv.errors)}`);
          error = true;
        }
      } catch (err) {
        console.error(`Error ${p} ${err}`);
        error = true;
      }
    }
    console.info(`scanned ${count} files.`);
    return error ? reject() : resolve();
  });
}

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
})();
