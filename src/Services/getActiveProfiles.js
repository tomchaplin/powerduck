import defaultConfig from './defaultConfig';

export default () => {
  return new Promise((resolve, reject) => {
    Neutralino.os.getEnvar('HOME', (data) => {
      const filename = `${data.value}/.config/powerduck/activeProfiles.json`;
      Neutralino.filesystem.readFile(
        filename,
        (data) => {
          if (data.content === '') {
            resolve({});
          } else {
            resolve(JSON.parse(data.content));
          }
        },
        () => reject('filesystem error')
      );
    });
  });
};
