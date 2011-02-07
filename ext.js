var dotjsURL = 'https://github.com/defunkt/dotjs'

$.ajax({
  url: 'http://localhost:3131/'+window.location.host.replace('www.','')+'.js',
  success: function(d){
    $(function(){ eval(d) })
  },
  error: function(){
    console.log('No dotjs server found — ' + dotjsURL)
  }
})
