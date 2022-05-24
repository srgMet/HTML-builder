const fs = require('fs');
const dir = ('files-copy');
const path = require('path');

async function copyDir(){
   fs.rm(path.join(__dirname, dir), { recursive: true, force: true, },err => {
    if(err) throw err;
      fs.mkdir(path.join(__dirname, dir),{ recursive: true, force: true } ,err => {
      if(err) throw err;
      fs.readdir(path.join(__dirname,'files'),(err , files)=>{
        if (err) throw err;
        else{
          console.log(files);
          files.forEach ( el=>{
            fs.copyFile(path.join(__dirname, 'files' ,el), path.join(__dirname, dir ,el),(err)=>{
              if (err) throw err;
              console.log('copy');
            });
          });
        }
      });

    });
  });
}

copyDir();