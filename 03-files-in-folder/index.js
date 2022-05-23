const fs = require('fs');
const path = require('path');

fs.readdir(path.join('./secret-folder'),{withFileTypes:true},(err, files) => {
  if (err) {
    console.error(err);
    return;
  } 
  let arr=[];
  files.forEach(file => {
    if(file.isFile()) arr.push(file.name);
  });
  arr.forEach(el=>
  {fs.stat(`./secret-folder/${el}`, (err, stats) => {console.log(el.replace('.','-')+'-'+ ((stats.size)/1000)+'κα');});
  });
});         