'use strict';

const fs = require('fs');
const Path = require('path');

const typings = {
  find(path) {
    if (path === undefined || typeof path !== 'string' ||
        path.length <= 0) {
      throw new Error('The path needs to be a string!');
    }

    return new Promise((resolve, reject) => {
      fs.readdir(path, (error, files) => {
        if (error) {
          reject(error);
        }
        const promises = files.map((name) => {
          const filePath = `${path}/${name}`;
          const stat = fs.statSync(filePath);
          if (stat.isFile()) {
            if (/\.d\.ts$/.test(filePath)) {
              return filePath;
            }
          } else if (stat.isDirectory()) {
            return typings.find(filePath);
          }
        });

        Promise.all(promises).then((files) => {
          files = files.reduce((a, b) => a.concat(b), []).filter((a) => a !== undefined);
          resolve(files);
        });
      });
    });
  },
  move(files, savePath) {
    if (files === undefined ||
        Object.prototype.toString.call(files) !== '[object Array]') {
      throw new Error('Files needs to be an array!');
    }

    files.forEach((file) => this._move(file, savePath));
  },
  _move(file, savePath) {
    if (file === undefined || typeof file !== 'string' ||
        file.length <= 0) {
      throw new Error('File needs to be a string!');
    }

    if (savePath === undefined || typeof savePath !== 'string' ||
        savePath.length <= 0) {
      throw new Error('savePath needs to be a string!');
    }

    if (!this.folderExists(savePath)) {
      this.createDirectories(savePath);
    }

    const fileName = Path.basename(file);
    const source = fs.createReadStream(Path.normalize(file));
    const destination = fs.createWriteStream(Path.normalize(`${savePath}/${fileName}`));

    source.pipe(destination);
  },
  folderExists(path) {
    if (path === undefined || typeof path !== 'string') {
      throw new Error('Path needs to be a string!');
    }

    let exists = false;
    try {
      fs.statSync(path);
      exists = true;
    } catch (e) {
      exists = false;
    }
    return exists;
  },
  createDirectories(path) {
    if (path === undefined || typeof path !== 'string' ||
        path.length <= 0) {
      throw new Error('Path needs to be a string!');
    }

    let directories = path.split(Path.sep);
    let root = '';

    while (directories.length > 0) {
      let directory = directories.shift();

      if (directory === '') {
        root = Path.sep;
      }

      let fullPath = Path.normalize(root + directory);

      if (!this.folderExists(fullPath)) {
        fs.mkdirSync(fullPath);
      }

      root += directory + Path.sep;
    }
  }
}

module.exports = typings;
