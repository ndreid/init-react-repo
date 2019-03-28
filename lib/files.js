const fs   = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  createDirectory: (directoryName, recursive = false) => (
    new Promise(resolve => {
      fs.mkdir(directoryName, { recursive }, (err) => {
        if (err) throw err
        resolve()
      })
    })
  ),

  createDirectorySync: (directoryName, recursive = false) => {
    try { fs.mkdirSync(directoryName, { recursive }) }
    catch (err) { throw err }
  },

  writeFile: (fileName, text) => {
    fs.writeFile(fileName, text, (err) => {
      if (err) throw err;
    });
  },
};