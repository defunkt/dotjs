base = localStorage.dotjs_host || 'http://localhost:3131/';

$.ajax({
  url: base+window.location.hostname.replace('www.','')+'.js',
  dataType: 'text',
  success: function(d){
    $(function(){ eval(d) })
  },
  error: function(){
    console.log('no dotjs server found: ' + base)
  }
})
