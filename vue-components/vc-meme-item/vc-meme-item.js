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
      vdReadyToShare: false,
      vdSharing: false,
      vdBlob: {},
    };
  },
  mounted: function() {
    if (this.vpMeme.active)
      this.vdActive = true;
  },
  methods: {
    /**
     * Display download, share and edit options.
     */
    toggleActive: function() {
      this.$emit('memeactive', this, this.vpMeme);
      this.vdActive = !this.vdActive;

      this.$nextTick(function() {
        this.getBlob('memes/' + this.vpMeme.img);
      });
    },

    /**
     * Download the image file to the device.
     */
    triggerDownloadMeme: function() {
      // window.location.href = '/download/' + meme.img;

      var filePath = 'memes/' + this.vpMeme.img;
      var a = document.createElement('A');
      a.href = filePath;
      a.style.display = 'block';
      a.style.overflow = 'hidden';
      a.style.width = '0';
      a.style.height = '0';
      a.download = filePath.substr(filePath.lastIndexOf('/') + 1);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },

    /**
     * Share the meme to a mobile app straight from the meme thumbnail.
     */
    triggerShareMeme: function() {
      if (!navigator.share) return; // if the browser can't share do nothing.
      this.vdSharing = true; // to hide the button and show the used that something is happening inmidiately

      const vueInstanceData = this._data;
      this.$nextTick(function() {
        if (!navigator.share) { console.log(this.vdBlob); return; }

        navigator.share({
          title: '',
          text: '',
          // files: [new File(['content'], 'sample1.txt', { type: 'text/plain' })],
          files: [
            new File(
              [this.vdBlob], // the blob
              this.vpMeme.img, // {string} the file name.
              {
                type: 'image/jpeg',
                lastModified: Date.now(),
              }
            )
          ],
        })
          .then(function() {
            vueInstanceData.vdSharing = true;
          })
          .catch(function(err) {
            console.log(err)
          });
      });
    },

    /**
     *
     */
    getBlob: function(_imageUrl) {
      const vueInstanceData = this._data;
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', _imageUrl);
        xhr.responseType = 'blob';
        xhr.onerror = function() {
          console.log('Network error.');
        };
        xhr.onload = function() {
          if (xhr.status !== 200) return console.log('Loading error:' + xhr.statusText);

          vueInstanceData.vdBlob = xhr.response;
          vueInstanceData.vdReadyToShare = true;
        };
        xhr.send();
      }
      catch(err) { // if the browser can't share do nothing.
        console.log(err.message);
      };
    },
  },
};
