const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.redirect('/umm/');
  });

  app.get('/umm/edit', (req, res) => {
    if (typeof req.query.i === 'undefined') return;
    if (typeof req.query.i === '') return;
    if (!fs.existsSync('./public/memes/' + req.query.i)) return;

    let fileStr = fs.readFileSync(path.resolve(__dirname, 'public/edit.html'), 'utf8');
    res.send(eval('`' + fileStr + '`'));
  });
}
