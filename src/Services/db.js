import NeuLowAdapter from './NeuLowAdapter';
import defaultConfig from './defaultConfig';
const low = require('lowdb');

export default new Promise((resolve, reject) => {
  Neutralino.os.getEnvar('HOME', (data) => {
    const filename = `${data.value}/.config/powerduck/powerduck.json`;
    const adapter = new NeuLowAdapter(filename);
    low(adapter).then((db) => {
      db.defaults(defaultConfig).write();
      resolve(db);
    })
  });
});
