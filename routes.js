const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
  });

  app.get('/download/:filename', (req, res) => {
    if (!fs.existsSync('./public/memes/' + req.params.filename)) return;

    res.set('Content-Disposition', 'attachment;filename=' + req.params.filename);
    res.sendFile(path.resolve(__dirname, './public/memes/' + req.params.filename));
  });

  app.get('/edit/:meme', (req, res) => {
    if (typeof req.params.meme === 'undefined') return;
    if (typeof req.params.meme === '') return;
    if (!fs.existsSync('./public/memes/' + req.params.meme)) return;

    let fileStr = fs.readFileSync(path.resolve(__dirname, 'views/edit.html'), 'utf8');
    let tplImagePath = '/memes/' + req.params.meme;
    res.send(eval('`' + fileStr + '`'));
  });

  /**
   * 404 page middleware must be set AFTER all routes, static (public) middleware AND webpack virtual files because only if any of these urls are served it must show 404 page.
   */
  app.use((req, res) => {
    res.status(404).send('Content not found');
    // return res.status(404).render('page404.html', { });
  });
}
