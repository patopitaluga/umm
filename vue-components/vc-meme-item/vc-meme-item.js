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
  },
};
