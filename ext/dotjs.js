var extension = "js"
chrome.extension.sendRequest({method: "getStatus"}, function(response) {
  if (response["extension"] != undefined) {
  	extension = response["extension"];
  }

  $.ajax({
  url: 'http://localhost:3131/'+window.location.host.replace('www.','')+'.'+ extension,
  dataType: 'text',
  success: function(d){
    $(function(){ eval(d) })
  },
  error: function(){
    console.log('no dotjs server found at localhost:3131')
  }
})
});


