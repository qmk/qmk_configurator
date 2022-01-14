const { genTsObj } = require('./csv-json');
const parse = require('csv-parse/lib/sync');

function VitePluginCSV() {
  return {
    name: 'vite-plugin-csv',
    transform(source, id) {
      if (!id.includes('.csv')) return;
      try {
        const records = parse(source, {
          columns: true,
          skip_empty_lines: true
        });
        const output = genTsObj(records);
        return `export default ${JSON.stringify(output)}`;
      } catch (error) {
        this.error(error);
        return '';
      }
    }
  };
}

export default VitePluginCSV;