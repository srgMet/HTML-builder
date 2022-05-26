
const process = require('process');
const fs = require('fs');
const path = require('path');

fs.access( path.join(__dirname ,'text.txt'), function (err) {
  if (err) {
    fs.writeFile(
      path.join(__dirname ,'text.txt'), '', (err) => {
        if (err) throw err;
        console.log('Файл был создан');
      }
    );
  }
});

process.stdout.write('Введите текст\n');

process.stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
  else{
    fs.appendFile( path.join(__dirname ,'text.txt'), data, err => {
      if (err) throw err;
    });
  }
});

process.on('SIGINT', () => {
   process.stdout.write('Заходите еще\n');
   process.exit();
});

process.on('exit', () => console.log('exo-xo'));
