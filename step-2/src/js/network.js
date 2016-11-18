app.network = (function() {

  function getText(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.responseType = 'text';

    xhr.onload = function(e) {
      if (this.status == 200) {
        cb(this.response);
      }
    };
    xhr.send();
  }

  function postText(url, txt, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    xhr.responseType = 'text';

    xhr.onload = function(e) {
      if (this.status == 200) {
        cb(this.response);
      }
    };
    xhr.send(txt);
  }

  //get('http://localhost:7017/', console.log.bind(console));

  return {
    get: getText,
    post: postText
  }
}());
