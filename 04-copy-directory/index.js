const fs = require('fs/promises');
const path = require('path');
const { stdout } = require('process');

async function copyDir() {
  await fs.rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true }, (err) => {
    if (err) throw err;
  });

  await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true}, (err) => {
    if (err) throw err;
  });

  await fs.readdir(path.join(__dirname, 'files'), { encoding: 'utf-8', withFileTypes: true }).
    then( files =>
      files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name));
      })).
    catch(err => stdout.write(`${err.message}`));
};

copyDir();
