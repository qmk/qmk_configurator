### Translate simplify chinese into traditional chinese

---

### How it works:

It reads from [zh-CN.csv](src/i18n/zh-CN.csv) as source [zh-HK.csv](src/i18n/zh-HK.csv) and [zh-TW.csv](src/i18n/zh-TW.csv) as target , then convert each Translation row into Traditional Chinese, and write back to `src/i18n/zh-HK.csv` and `src/i18n/zh-TW.csv`

Basically when there is a missing translate row found in `zh-TW.csv` or `zh-HK.csv`, it will fill that missing filed with translated words from `zh-CN`

The convert steps should be `npm run i18n:sync` -> `npm run i18n:convertcn`.


### Hand translate first:

It won't modify the row If there is already a translate, which allows to modify manually, but also stop from if there any original translate update

---

### The Deps:

script: this translate script -> package: simplify-traditional -> dictionary: [Repo](https://github.com/fengkx/simplecc-wasm)


---
