const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.redirect('/umm/');
  });

  app.get('/umm/edit', (req, res) => {
    // alternative: as url param
    // if (typeof req.params.meme === 'undefined') return;
    // if (typeof req.params.meme === '') return;
    // if (!fs.existsSync('./public/memes/' + req.params.meme)) return;

    if (typeof req.query.i === 'undefined') return;
    if (typeof req.query.i === '') return;
    if (!fs.existsSync('./public/memes/' + req.query.i)) return;

    let fileStr = fs.readFileSync(path.resolve(__dirname, 'public/edit.html'), 'utf8');
    // let tplImagePath = '/memes/' + req.params.meme;
    res.send(eval('`' + fileStr + '`'));
  });
}
