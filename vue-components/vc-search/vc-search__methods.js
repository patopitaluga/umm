/**
 *
 * @param {string} str - The string to be slugified.
 * @return {string}
 */
const slugify = function(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  let from = 'áéíóúöüñ';
  let to   = 'aeiououn';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

String.prototype.showMatching = function(strReplace, strWith) {
  var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  var reg = new RegExp(esc, 'ig');

  var strWithMatch = this;
  while ((match = reg.exec(this)) != null) {
    strWithMatch = [
      strWithMatch.slice(0, match.index), '<span>', strWithMatch.slice(match.index)
    ].join('');
    strWithMatch = [
      strWithMatch.slice(0, match.index + strWith.length), '</span>', strWithMatch.slice(match.index + strWith.length)
    ].join('');
  }
  return strWithMatch;
};

module.exports = {
  /**
   *
   */
  mtdBlurSearchInput: function() {
  },

  /**
   *
   */
  mtdDisplaySuggestions: function() {
    if (this.vdInputSuggestionTerm.length !== 0) {
    }
  },

  /**
   *
   */
  mtdSuggestSearchTermChanged: function() {
    const matches = [];
    if (this.vdInputSuggestionTerm.length !== 0) {
      var vueInstanceData = this._data;
      this.vpMemeList.forEach(function(eachMeme) {
        if (
          eachMeme.img !== '' &&
          (
            slugify(eachMeme.name).indexOf(slugify(vueInstanceData.vdInputSuggestionTerm)) > -1 ||
            slugify(String(eachMeme.year)).indexOf(slugify(vueInstanceData.vdInputSuggestionTerm)) > -1 ||
            slugify(String(eachMeme.category)).indexOf(slugify(vueInstanceData.vdInputSuggestionTerm)) > -1
          )
        ) {
          matches.push({
            img: eachMeme.img,
            name: eachMeme.name.showMatching(vueInstanceData.vdInputSuggestionTerm, '<span>' + vueInstanceData.vdInputSuggestionTerm + '</span>')
            // showMatching(eachMeme.name, vueInstanceData.vdInputSuggestionTerm, '<span>' + vueInstanceData.vdInputSuggestionTerm + '</span>')
          });
        }
      });
      this.vdMatchingMemes = matches;
    }
  },

  /**
   * Triggered when user clicks on suggested option.
   *
   * @param {number} optionId -
   * @param {string} optionLabel -
   */
  mtdSuggestionSelected: function(optionId, optionLabel) {
  },

  /**
   *
   * @param {object} meme -
   */
  mtdMemeClicked: function(meme) {
    this.$emit('memeclicked', meme)
  },
};
