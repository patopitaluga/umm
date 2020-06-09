var memes = require('./memes.json');
const fs = require('fs');
const prompts = require('prompts');

/**
 * Slugify a string.
 *
 * @param {string} str -
 * @return {string}
 */
const slugify = (str) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  let from = 'áéíóúöüñ';
  let to   = 'aeiououn';
  for (let i = 0, l = from.length ; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

fs.readdir('./', (_err, _files) => {
  let newMemeFound = false;
  _files.forEach(async (_eachFile) => {
    if (newMemeFound) return;
    if (fs.lstatSync(_eachFile).isDirectory()) return;

    let extension = _eachFile.slice(-4);
    if (extension === 'jpeg') extension = '.jpg';
    extension = extension.toLowerCase();
    if (
      extension === '.jpg' ||
      extension === '.gif' ||
      extension === '.png'
    ) {
      newMemeFound = true;
      let possibleMemeName = _eachFile.substr(0, _eachFile.lastIndexOf('.'));
      if (possibleMemeName === possibleMemeName.toUpperCase()) possibleMemeName = possibleMemeName.toLowerCase();
      possibleMemeName = possibleMemeName.substr(0, 1).toUpperCase() + possibleMemeName.slice(1).replace(/-/g, ' ');

      console.log('Found ' + _eachFile);
      console.log('');

      const prompt1 = await prompts({
        type: 'text',
        name: 'value',
        message: 'Is "' + possibleMemeName + '" the name of the meme? Y/n',
        initial: 'Y',
      });
      isTheName = prompt1.value;
      if (!isTheName) process.exit();

      if (isTheName.toLowerCase() === 'yes') isTheName = 'y';
      if (isTheName.toLowerCase() === 'no') isTheName = 'n';
      if (isTheName.toLowerCase() !== 'y' && isTheName.toLowerCase() !== 'n' && isTheName !== '') {
        console.log(isTheName + ' wrong answer.');
        process.exit(0);
      }
      if (isTheName.toLowerCase() === 'n') {
        const prompt2 = await prompts({
          type: 'text',
          name: 'value',
          message: 'What\'s the name of this meme?',
        });
        possibleMemeName = prompt2.value;
      } else {
        const prompt3 = await prompts({
          type: 'text',
          name: 'value',
          message: 'Is "' + possibleMemeName + '" correctly written without misspellings? Y/n',
          initial: 'n',
        });
        let isItCorrectlyWritten = prompt3.value;
        if (isItCorrectlyWritten.toLowerCase() === 'yes') isItCorrectlyWritten = 'y';
        if (isItCorrectlyWritten.toLowerCase() === 'no') isItCorrectlyWritten = 'n';
        if (isItCorrectlyWritten.toLowerCase() !== 'y' && isItCorrectlyWritten.toLowerCase() !== 'n' && isItCorrectlyWritten !== '') {
          console.log(isItCorrectlyWritten + ' wrong answer.');
          process.exit(0);
        }
        if (isItCorrectlyWritten.toLowerCase() === 'n') {
          const prompt4 = await prompts({
            type: 'text',
            name: 'value',
            message: 'Write "' + possibleMemeName + '" without misspellings please',
            initial: possibleMemeName,
          });
          possibleMemeName = prompt4.value;
        }
      }
      const prompt5 = await prompts({
        type: 'text',
        name: 'value',
        message: 'In what year was this meme created? (optional)',
      });
      const promptYear = prompt5.value;

      if (promptYear !== '' && isNaN(promptYear)) {
        console.log(promptYear + ' wrong answer.');
        process.exit(0);
      }
      const prompt6 = await prompts({
        type: 'text',
        name: 'value',
        message: 'What category do you think this meme belongs to? E.g. The Simpsons, rage comics, cats, advice animals (optional)',
      });
      const promptCategory = prompt6.value;

      let isEditable = false;
      if (extension !== '.gif') {
        const prompt6 = await prompts({
          type: 'text',
          name: 'value',
          message: 'Should the text in the meme be editable? Y/n',
          initial: 'Y'
        });
        if (prompt6.value === '' || prompt6.value.toLowerCase() === 'y' || prompt6.value.toLowerCase() === 'yes')
          isEditable = true;
      }

      let finalFilename = slugify(possibleMemeName) + extension;
      let newMeme = {
        name: possibleMemeName,
        img: finalFilename,
        editable: isEditable,
        category: promptCategory,
      };
      if (promptYear && promptYear !== '') newMeme.year = Number(promptYear);

      let memesWithNewOne = [
        ...memes,
        newMeme
      ];
      fs.writeFileSync('memes.json', JSON.stringify(memesWithNewOne, null, 2));

      fs.copyFileSync(_eachFile, 'public/memes/' + finalFilename);
      fs.unlinkSync(_eachFile);

      console.log('');
      console.log('"' + possibleMemeName + '" was added successfully. You can make the pull request now.');

      return;
    }
  });

  if (!newMemeFound) {
    console.log('No new memes to be added. To add a new meme copy the image to this folder and run "npm run addmeme" again.');
  }
});
