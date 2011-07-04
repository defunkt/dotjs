function apply(file) {
  var pathToScript = chrome.extension.getURL("scripts/" + file);

  console.log("dotjs fetching: " + pathToScript)
  chrome.extension.sendRequest({'action': 'fetchScript', 'url': pathToScript},
    function(script) { if (script != null && script != "") { eval(script); } });
}

apply("default.js");
apply(window.location.host + ".js");
