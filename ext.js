var dotjsURL = 'http://chriswanstrath.com/dotjs/'

$.ajax({
  url: 'http://localhost:3131/' + window.location.host,
  success: function(d){
    $(function(){ eval(d) })
  },
  error: function(){
    console.log('No dotjs server found — ' + dotjsURL)
  }
})
