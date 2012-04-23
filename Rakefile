require 'erb'
require 'net/http'

desc "Install dotjs"
task :install => 'install:all'

WINDOWS = RUBY_PLATFORM =~ /(:?mswin|mingw)/ ? true : false
# Setup
if WINDOWS
  JS_DIR_NAME = "_js"
  JS_DIR = File.join(ENV['HOME'], JS_DIR_NAME)
  DAEMON_INSTALL_DIR = File.join(JS_DIR, "bin")
  AGENT_FILE = "djsd.vbs"
  AGENT_DIR = DAEMON_INSTALL_DIR
else
  JS_DIR_NAME = ".js"
  JS_DIR = File.join(ENV['HOME'], JS_DIR_NAME)
  DAEMON_INSTALL_DIR = "/usr/local/bin"
  AGENT_FILE = "com.github.dotjs.plist"
  AGENT_DIR = "~/Library/LaunchAgents"
end
AGENT = File.expand_path(File.join(AGENT_DIR, AGENT_FILE))

def colorize(string, color)
  return string if WINDOWS
  case color
  when "green"
    "\e[1m\e[32m#{string}\e[0m"
  when "red"
    "\e[31m#{string}\e[0m"
  when "bold"
    "\e[1m#{string}\e[0m"
  end
end

namespace :install do
  task :all => [ :prompt, :create_dir, :agent, :daemon, :chrome, :start, :done ]

  task :prompt do
    puts colorize("dotjs", "green")
    puts colorize("-----", "bold")
    puts "I will install:", ""
    puts "1. The 'dotjs' Google Chrome Extension"
    puts "2. djsd(1) in #{DAEMON_INSTALL_DIR}"
    puts "3. #{AGENT_FILE} in #{AGENT_DIR}",""
    print "Ok? (y/n) "

    begin
      until %w( k ok y yes n no ).include?(answer = $stdin.gets.chomp.downcase)
        puts "(psst... please type y or n)"
        puts "Install dotjs? (y/n)"
      end
    rescue Interrupt
      exit 1
    end

    exit 1 if answer =~ /n/
  end

  task :done do
    begin
      Net::HTTP.get_response(URI('http://localhost:3131'))
      puts colorize("dotjs installation worked", "green")
      puts "drop files like google.com.js in ~/#{JS_DIR_NAME} and enjoy hacking the web"
    rescue Errno::ECONNREFUSED
      puts colorize("dotjs installation failed", "red")
      puts "check console.app or open an issue"
    end
  end

  desc "Install launch agent"
  task :agent do
    path = File.expand_path(AGENT_DIR)
    if !File.directory? path
      mkdir path
    end

    File.open(AGENT, "w") do |f|
      f.puts ERB.new(IO.read(AGENT_FILE)).result(binding)
    end
  end

  desc "Install dotjs daemon"
  task :daemon => :install_dir_writeable do
    cp "bin/djsd", DAEMON_INSTALL_DIR, :verbose => true, :preserve => true
  end

  desc "Create ~/.js"
  task :create_dir do
    if !File.directory? JS_DIR
      mkdir JS_DIR
      chmod 0755, JS_DIR
    end
  end

  desc "Install Google Chrome extension"
  task :chrome do
    if WINDOWS
      puts "--------------------------------------------------------------"
      puts "Windows specific setup:"
      puts "  Please drag builds/dotjs.crx onto a chrome window to install"
      puts "--------------------------------------------------------------"
    else
      puts "Installing Google Chrome extension..."
      sh "open -a 'Google Chrome' builds/dotjs.crx &"
    end
  end

  desc "Start dotjs server"
  task :start do
    if WINDOWS
      sh "cmd /C \"#{AGENT}\" setup"
    else
      chmod 0644, AGENT
      sh "launchctl load -w #{AGENT}"
    end
    # wait for server to start
    sleep 5
  end
end

desc "Uninstall dotjs"
task :uninstall => 'uninstall:all'

namespace :uninstall do
  task :all => [ :prompt, :daemon, :agent, :chrome, :done ]

  task :prompt do
    puts colorize("dotjs", "green")
    puts colorize("-----", "bold")
    puts "I will remove:", ""
    puts "1. djsd(1) from #{DAEMON_INSTALL_DIR}"
    puts "2. #{AGENT_FILE} from #{AGENT_DIR}"
    puts "3. The 'dotjs' Google Chrome Extension",""
    puts "I will not remove:", ""
    puts "1. ~/#{JS_DIR_NAME}", ""
    print "Ok? (y/n) "

    begin
      until %w( k ok y yes n no ).include?(answer = $stdin.gets.chomp.downcase)
        puts "(psst... please type y or n)"
        puts "Uninstall dotjs? (y/n)"
      end
    rescue Interrupt
      exit 1
    end

    exit 1 if answer =~ /n/
  end

  task :done do
    if WINDOWS
      puts "dotjs uninstall worked"
      puts "The dotjs server will continue to run until you restart"
      puts "your ~/#{JS_DIR_NAME} was not touched"
    else
      begin
        Net::HTTP.get_response(URI('http://localhost:3131'))
        puts colorize("dotjs uninstall failed", "red")
        puts "djsd is still running"
      rescue Errno::ECONNREFUSED
        puts colorize("dotjs uninstall worked", "green")
        puts "your ~/#{JS_DIR_NAME} was not touched"
      end
    end
  end

  desc "Uninstall launch agent"
  task :agent do
    if WINDOWS
      sh "cmd /C \"#{AGENT}\" uninstall"
    else
      sh "launchctl unload #{AGENT}"
    end
    rm AGENT, :verbose => true
  end

  desc "Uninstall dotjs daemon"
  task :daemon => :install_dir_writeable do
    rm File.join(DAEMON_INSTALL_DIR, "djsd"), :verbose => true
  end

  desc "Uninstall Google Chrome extension"
  task :chrome do
    puts colorize("please uninstall the google chrome extension manually:", "bold")
    puts "google chrome > window > extensions > dotjs > uninstall"
  end
end

# Check write permissions on DAEMON_INSTALL_DIR
task :install_dir_writeable do
  if not File.writable?(DAEMON_INSTALL_DIR)
    abort "Error: Can't write to #{DAEMON_INSTALL_DIR}. Try again using `sudo`."
  end
end
