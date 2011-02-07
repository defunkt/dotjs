# $ ruby -rubygems web.rb -p 3131
require 'sinatra'

get '/:host' do
  content_type 'text/plain'
  headers 'Access-Control-Allow-Origin' => '*'
  host = params[:host].gsub('..', '.')
  if File.exist? file = File.expand_path("~/.js/#{host}.js")
    File.read(file)
   end
end
