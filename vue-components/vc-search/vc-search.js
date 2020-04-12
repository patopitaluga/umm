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
  data: function() {
    return {
      vdInputSuggestionTerm: '',
      vdMatchingMemes: [],
    };
  },
  mounted: function() {
    this.$refs.searchinput.value = '';
  },
  methods: methods
};
