import search from '../vue-components/vc-search/vc-search.vue';
import memelist from '../vue-components/vc-meme-list/vc-meme-list.vue';
var platform = require('platform');

var memes = require('../memes.js');

/**
 * To read GET variables php style (kinda). Remember that this is a function, so it's not used $_GET[] but $_GET().
 *
 * @param {string} parameterName - The GET variable you're considering. E.g. if the url is sending ?q=1 you'll use $_GET('q').
 * @return {string|null} The value in that variable or null.
 */
var $_GET = function(parameterName) {
  /* global location*/
  var result = null;
  location.search
    .substr(1)
    .split('&')
    .forEach(function(foundGetVar) {
      var tmp = foundGetVar.split('=');
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
let randomMemes = shuffle(memes);
randomMemes = randomMemes.slice(0, 8);

window.platformOs = $_GET('emu') || platform.os.family.toLowerCase();
window.platformName = platform.name.toLowerCase();

new Vue({
  el: '#app',
  components: {
    memelist,
    search,
  },
  data: function() { // eslint-disable-line require-jsdoc
    return {
      vdFrequent: [],
      vdMemeList: memes,
      vdRandomMemes: randomMemes,
    };
  },
  mounted: function() {
    var arFrequent = [];
    var strFrequent = window.localStorage.getItem('memesd3_frequent');
    if (strFrequent === null) strFrequent = '[]';
    try {
      arFrequent = JSON.parse(strFrequent);
    } catch (err) {
      arFrequent = [];
    }
    this.vdFrequent = arFrequent;
  },
  methods: {
    /**
     *
     */
    triggerDownloadMeme: function(meme) {
      var arFrequent = [];
      var strFrequent = window.localStorage.getItem('memesd3_frequent');
      if (strFrequent === null) strFrequent = '[]';
      try {
        arFrequent = JSON.parse(strFrequent);
      } catch (err) {
        arFrequent = [];
      }
      var alreadyFrequent = false;
      arFrequent.forEach(function(eachFreq) {
        if (eachFreq.name === meme.name) alreadyFrequent = true;
      });
      if (!alreadyFrequent) {
        if (arFrequent.length > 5) arFrequent = arFrequent.slice(1, 4);
        arFrequent.push({
          'name': meme.name,
          'img': meme.img,
          'editable': meme.editable,
        });
        window.localStorage.setItem('memesd3_frequent', JSON.stringify(arFrequent));
      }
      this.vdFrequent = arFrequent;
      // window.location.href = '/download/' + meme.img;

      var file_path = 'memes/' + meme.img;
      var a = document.createElement('A');
      a.href = file_path;
      a.style.display = 'block';
      a.style.overflow = 'hidden';
      a.style.width = '0';
      a.style.height = '0';
      a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },

    /**
     *
     */
    triggerShareMeme: function(meme) {

      try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'memes/' + meme.img);
        xhr.responseType = 'blob';
        xhr.onerror = function() {

          document.getElementById('answer-example-share-button').onclick = function() {
            if (navigator.share) {
              navigator.share({
                title: '',
                text: '',
                // files: [new File(['content'], 'sample1.txt', { type: 'text/plain' })],
                files: [
                  new File([
                    xhr.response // the blob
                  ], meme.img, {type: 'image/jpeg', lastModified: Date.now()})
                ],
              })
                .then(function() {
                  document.getElementById('output').innerHTML = 'Share was successful.';
                })
                .catch(function(err) {
                  console.log(err)
                  document.getElementById('output').innerHTML = 'a' + JSON.stringify(err);
                });

            } else {
              document.getElementById('output').innerHTML = 'Your system doesn\'t support sharing files';
            }
          }


          console.log('Network error.');
        };
        xhr.onload = function() {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            console.log('Loading error:' + xhr.statusText);
          }
        };
        xhr.send();
      }
      catch(err) {
        console.log(err.message);
      };

    },
  },
});
