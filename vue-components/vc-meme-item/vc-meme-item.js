export default {
  props: {
    vpMeme: {
      required: true,
      type: Object,
    },
  },
  data: function() { // eslint-disable-line require-jsdoc
    return {
      vdPlatformOs: window.platformOs,
      vdPlatformName: window.platformName,
      vdActive: false,
      vdSharing: false,
    };
  },
  mounted: function() {
    if (this.vpMeme.active)
      this.vdActive = true;
  },
  methods: {
    /**
     * Triggered when user clicks on suggested option.
     *
     * @param {string} img -
     */
    mtdEditSelected: function(img) {
      window.location.href = 'edit?i=' + img;
    },

    /**
     *
     */
    toggleActive: function() {
      this.$emit('memeactive', this, this.vpMeme);
      this.vdActive = !this.vdActive;
    },

    /**
     *
     */
    triggerDownloadMeme: function(meme) {
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
    triggerShareMeme: function() {
      if (!navigator.share) return;
      this.vdSharing = true;

      const meme = this.vpMeme;
      const vueInstanceData = this._data;
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'memes/' + meme.img);
        xhr.responseType = 'blob';
        xhr.onerror = function() {
          console.log('Network error.');
        };
        xhr.onload = function() {
          if (xhr.status === 200) {
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
                vueInstanceData.vdSharing = true;
              })
              .catch(function(err) {
                console.log(err)
              });
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
};
