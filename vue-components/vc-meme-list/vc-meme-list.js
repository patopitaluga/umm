import memeitem from '../vc-meme-item/vc-meme-item.vue';

export default {
  components: {
    memeitem,
  },
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
      vdLastActive: {},
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

    /**
     *
     */
    deactivateOthers: function(element, meme) {
      this.$emit('addtofrequent', meme)
      this.vdLastActive.vdActive = false;
      this.vdLastActive = element;
    },
  },
};
