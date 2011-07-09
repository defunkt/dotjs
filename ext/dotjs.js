function dotjs(u) {
  $.ajax({
    url: u,
    dataType: 'text',
    success: function(d){
      $(function(){ eval(d) })
    },
    error: function(){
      console.log('no dotjs server found at localhost:3131')
    }
  });
}
subdomain = window.location.pathname.split('/')[1]
if (subdomain) {
  dotjs('http://localhost:3131/'+window.location.host.replace('www.','')+'.'+subdomain+'.js');
}
dotjs('http://localhost:3131/'+window.location.host.replace('www.','')+'.js');
