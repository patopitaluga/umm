export default {
  props: {
    vpMemeList: {
      required: true,
      type: Array,
    },
    vpCols: {
      default: 2,
      type: Number,
    },
  },
  data: function() { // eslint-disable-line require-jsdoc
    return {
      vdPlatformOs: window.platformOs,
    };
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
  },
};
