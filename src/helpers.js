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
  },

  /**
   * Process images from files that have been uploaded by users.
   *
   * @param {object} _file -
   * @param {function} _callback - will return the processed file.
   */
  processImageFile: function(_file, _callback) {
    if (typeof _file !== 'object') throw new Error('_file param in processImageFile function  should be an {object} File.');

    var reader = new FileReader();
    reader.onload = function(readerEvent) {
      /* global Image */
      var image = new Image();
      image.onload = function() {
        var canvas = document.createElement('canvas');
        // Will be displayed on screen as big as 356px xo 712px is ok for retina display width (thumb)
        // Consider that might use a differente size for the upload than for showing the image to the user inmidiately.
        var maxSize = 712;
        var width = image.width;
        var height = image.height;
        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        // var resizedImage = dataURLToBlob(dataUrl);
        _callback(dataUrl);
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(_file);
  },
};
