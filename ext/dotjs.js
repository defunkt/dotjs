var xhr = new XMLHttpRequest();

xhr.onload = function (event) {
  documentReady(this.responseText);
}

xhr.open('get', 'https://localhost:3131/'+location.hostname.replace(/^www\./,'')+'.js', true);
xhr.responseType = 'text';
xhr.send();

function documentReady (responseType) {
  if (!document.body) {
    setTimeout(documentReady, 10, responseText);
  } else {
    eval(responseText);
  }
}
