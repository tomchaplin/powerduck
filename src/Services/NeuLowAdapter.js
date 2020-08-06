class NeuLowAdapter {
  constructor(filename) {
    this.filename = filename;
  }

  read() {
    return new Promise((resolve, reject) => {
      Neutralino.filesystem.readFile(
        this.filename,
        (data) => {
          if (data.content === '') {
            resolve({});
          } else {
            resolve(JSON.parse(data.content));
          }
        },
        () => {
          console.log('db error');
          reject('db error');
        }
      );
    });
  }

  write(data) {
    return new Promise((resolve, reject) => {
      Neutralino.filesystem.writeFile(
        this.filename,
        JSON.stringify(data),
        resolve,
        () => {
          console.log('db error');
          reject('db error');
        }
      );
    });
  }
}
export default NeuLowAdapter;
