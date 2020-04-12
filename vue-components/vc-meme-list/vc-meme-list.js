export default {
  props: {
    vpMemeList: {
      required: true,
      type: Array,
    },
  },
  methods: {
    /**
     * Triggered when user clicks on suggested option.
     *
     * @param {string} img -
     */
    mtdEditSelected: function(img) {
      window.location.href = '/edit/' + img;
    },
  },
};
