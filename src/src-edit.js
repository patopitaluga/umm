const platform = require('platform');
const memes = require('../memes.json');
const helpers = require('./helpers');

const image = helpers.$_GET('i');
const currentMeme = memes.filter(function(eachOne) {
  return (eachOne.img === image);
})[0];

document.title = 'Editing ' + currentMeme.name + ' - Ultimate Meme Manager';

/**
 * Since 100vh in mobile doesn't include brower bars this hack is helpful. See https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 */
function realVisualHeight() {
  let vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  vh = vh * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}
realVisualHeight();
window.addEventListener('resize', function() {
  realVisualHeight();
});
window.addEventListener('orientationchange', function() {
  realVisualHeight();
});

window.platformOs = helpers.$_GET('emu') || platform.os.family.toLowerCase();
window.platformName = platform.name.toLowerCase();

let imgWidth = 0;
let imgHeight = 0;

import memeeditor from '../vue-components/vc-meme-editor/vc-meme-editor.vue';

new Vue({
  el: '#app',
  components: {
    memeeditor,
  },
  data: function() { // eslint-disable-line require-jsdoc
    return {
      vdCurrentMeme: currentMeme,
    };
  },
});
