'use strict';

const fs = require('fs');
const Path = require('path');

const typings = {
  find(path, callback) {
    if (path === undefined || typeof path !== 'string' ||
        path.length <= 0) {
      throw new Error('The path needs to be a string!');
    }

    if (callback === undefined || typeof callback !== 'function') {
      throw new Error('Callback needs to be a function!');
    }

    fs.readdirSync(path).map((name) => {
      const filePath = `${path}/${name}`;
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        if (/\.d\.ts$/.test(filePath)) {
          callback(filePath);
        }
      } else if (stat.isDirectory()) {
        typings.find(filePath, callback);
      }
    });
  },
  move(files) {
    if (files === undefined ||
        Object.prototype.toString.call(files) !== '[object Array]') {
      throw new Error('Files needs to be an array!');
    }

    files.forEach((file) => this._move(file));
  },
  _move(file, savePath) {
    if (file === undefined || typeof file !== 'string') {
      throw new Error('File needs to be a string!');
    }

    if (savePath === undefined || typeof savePath !== 'string') {
      throw new Error('savePath needs to be a string!');
    }

    if (!this.folderExists(savePath)) {
      fs.mkdirSync(savePath);
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
  }
}

module.exports = typings;
