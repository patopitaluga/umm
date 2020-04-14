const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

//
const exec2 = (commandString) => {
  return new Promise((resolve, reject) => {
    exec(commandString, (err, stdout, stderr) => {
      if (err) { reject(reject); return; }

      console.log(stdout + stderr);
      resolve(stdout + stderr);
    });
  });
};

const copyFileSync = (source, target) => {
  var targetFile = target;

  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory())
      targetFile = path.join(target, path.basename(source));
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
};

const copyFolderRecursiveSync = (source, target) => {
  var files = [];

  var targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach((file) => {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory())
        copyFolderRecursiveSync(curSource, targetFolder);
      else
        copyFileSync(curSource, targetFolder);
    });
  }
};

rimraf('static-build', async () => {
  if (!fs.existsSync('static-build'))
    fs.mkdirSync('static-build');

  await exec2('npm run build')
    .catch((_err) => console.log(_err));

  await exec2('git clone -b gh-pages --single-branch https://github.com/patopitaluga/umm.git static-build')
    .catch((_err) => console.log(_err));

  files = fs.readdirSync('public');
  files.forEach(function(file) {
    if (!fs.lstatSync(path.join('public', file)).isDirectory())
      copyFileSync(path.join('public', file), 'static-build');
  });

  copyFolderRecursiveSync('public/dist', 'static-build');
  copyFolderRecursiveSync('public/icons', 'static-build');
  copyFolderRecursiveSync('public/memes', 'static-build');

  await exec2('cd static-build')
    .catch((_err) => console.log(_err));
  await exec2('git add .')
    .catch((_err) => console.log(_err));
  await exec2('git commit -am "Update"')
    .catch((_err) => console.log(_err));
  await exec2('git push origin gh-pages')
    .catch((_err) => console.log(_err));
  await exec2('cd ..')
    .catch((_err) => console.log(_err));

  rimraf('static-build', async () => {
    console.log('gh-pages updated. See https://patopitaluga.github.io/umm/ ')

    await exec2('open https://patopitaluga.github.io/umm/')
      .catch((_err) => console.log(_err));
  });
});
