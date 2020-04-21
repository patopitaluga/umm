var methods = require('./vc-search__methods.js');
import memelist from '../../vue-components/vc-meme-list/vc-meme-list.vue';

export default {
  components: {
    memelist,
  },
  props: {
    vpMemeList: {
      required: true,
      type: Array,
    },
  },
  data: function() { // eslint-disable-line require-jsdoc
    return {
      vdInputSuggestionTerm: '',
      vdMatchingMemes: [],
    };
  },
  mounted: function() { // eslint-disable-line require-jsdoc
    this.$refs.searchinput.value = '';
  },
  methods: methods
};
