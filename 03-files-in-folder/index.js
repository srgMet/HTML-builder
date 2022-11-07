const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, './secret-folder')

fs.readdir(dir,{withFileTypes:true},(err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  let arr=[];
  files.forEach(file => {
    if(file.isFile()) arr.push(file.name);
  });
  arr.forEach(el=> {
    fs.stat(path.join(dir, `${el}`), (err, stats) => {console.log(el.replace('.','-')+'-'+ ((stats.size)/1000)+'kb');});
  });
});