$.ajax({
  url: 'http://localhost:3131/'+window.location.host.replace('www.','')+'.css',
  dataType: 'text',
  success: function(d) {
    $('head').prepend('<style type="text/css">' + d + '</style>')
  },
  error: function(){
    console.log('no dotjs server found at localhost:3131')
  }
});
$.ajax({
  url: 'http://localhost:3131/'+window.location.host.replace('www.','')+'.js',
  dataType: 'text',
  success: function(d){
    $(function(){ eval(d) })
  },
  error: function(){
    console.log('no dotjs server found at localhost:3131')
  }
})
