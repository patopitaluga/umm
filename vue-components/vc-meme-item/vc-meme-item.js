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
     *
     *
     */
    toggleActive: function() {
      this.$emit('memeactive', this, this.vpMeme);
      this.vdActive = !this.vdActive;
    },
  },
};
