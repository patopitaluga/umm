module.exports = {
  /**
   * To read GET variables php style (kinda). Remember that this is a function, so it's not used $_GET[] but $_GET().
   *
   * @param {string} parameterName - The GET variable you're considering. E.g. if the url is sending ?q=1 you'll use $_GET('q').
   * @return {string|null} The value in that variable or null.
   */
  '$_GET': function(parameterName) {
    /* global location*/
    var result = null;
    location.search
      .substr(1)
      .split('&')
      .forEach(function(foundGetVar) {
        var tmp = foundGetVar.split('=');
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
    return result;
  }
}
