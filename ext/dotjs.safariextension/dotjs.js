$.ajax({
  url: 'http://localhost:3131/'+window.location.host.replace('www.','')+'.js',
  success: function(d){
    $(function(){ eval(d) })
  },
  error: function(){
    console.log('no dotjs server found at localhost:3131')
  }
})
