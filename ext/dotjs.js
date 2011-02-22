$.each(['default', window.location.host.replace('www.','')], function(index, name) {
  $.ajax({
    url: 'http://localhost:3131/'+name+'.js',
    success: function(d){
      $(function(){ eval(d) })
    },
    error: function(){
      console.log('no dotjs server found at localhost:3131')
    }
  })
})
