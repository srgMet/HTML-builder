const { createReadStream, createWriteStream, readdir } = require('fs');
const fs = require('fs/promises');
const path = require('path');

async function delDir() {
  await fs.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true }, (err) => {
    if (err) throw new Error(err);
  });
}

async function makeDir() {
  await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw new Error(err);
  });
}

async function makeStyle() {
  const bundle = createWriteStream(path.resolve(__dirname, 'project-dist', 'style.css'));

  readdir(path.resolve(__dirname, 'styles'), (err, files) => {
    if (!err) {
      files.forEach((file) => {
        let style = [];
        if (path.extname(file) == '.css') {
          const stream = createReadStream(path.resolve(__dirname, 'styles', file));
          stream.on('data', (chunk) => bundle.write((style += chunk)));
        }
      });
    }
  });
}

async function copyAsset(oldLink, newLink) {

    await fs.rm(path.join(newLink), { force: true, recursive: true });
    await fs.mkdir(path.join(newLink), { recursive: true })
    await fs.readdir(oldLink, { encoding: 'utf-8', withFileTypes: true }).
      then(files =>
        files.forEach(el => {
          if (el.isFile()) {
            fs.copyFile(path.join(oldLink, el.name), path.join(newLink, el.name));
          } else {
            fs.mkdir(path.join(newLink, el.name), { recursive: true });
            copyAsset(path.join(oldLink, el.name), path.join(newLink, el.name));
          }
        })
      ).catch(err => console.error(err));
}

async function makeHtml(){
  let template = await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  const components = await fs.readdir(path.join(__dirname, 'components'));
  for (const component of components) {
    if ( path.extname(component) == '.html') {
        const componentName = component.slice(0, -5);
        const componentBody = await fs.readFile(path.join(__dirname, 'components', component), 'utf-8');
        template = template.replace(`{{${componentName}}}`, componentBody);
    }
}

await fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template);
}


async function build() {
  await delDir()
  await makeDir();
  await makeStyle();
  await copyAsset(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
  await makeHtml()
};

build();