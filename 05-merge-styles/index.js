const fs = require('fs');
const path = require('path');

const bundle = fs.createWriteStream( path.resolve(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.resolve(__dirname, 'styles'), (err, files) => {
  if (!err) {
    files.forEach((file) => {
      let style = [];
      if (path.extname(file) == '.css') {
        const stream = fs.createReadStream(path.resolve(__dirname, 'styles', file));
        stream.on('data', (chunk) => bundle.write((style += chunk)));
      }
    });
  }
});