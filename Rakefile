desc "Install dotjs"
task :install => 'install:all'

namespace :install do
  task :all => [ :prompt, :chrome, :daemon, :agent, :done ]

  task :prompt do
    puts "\e[1m\e[32mdotjs\e[0m"
    puts "\e[1m-----\e[0m"
    puts "I will install:", ""
    puts "1. The 'dotjs' Google Chrome Extension"
    puts "2. djsd(1) in /usr/local/bin"
    puts "3. com.github.dotjs in ~/Library/LaunchAgents",""
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
    if system("curl http://localhost:3131 &> /dev/null")
      puts "\e[1m\e[32mdotjs installation worked\e[0m"
      puts "drop files like google.com.js in ~/.js and enjoy hacking the web"
    else
      puts "\e[31mdotjs installation failed\e[0m"
      puts "check console.app or open an issue"
    end
  end

  desc "Install launch agent"
  task :agent do
    plist = "com.github.dotjs.plist"
    agent = File.expand_path("~/Library/LaunchAgents/#{plist}")
    cp plist, agent, :verbose => true
    chmod 0644, agent
    puts "starting djdb..."
    sh "launchctl load -w #{agent}"
    # wait for server to start
    sleep 5
  end

  desc "Install dotjs daemon"
  task :daemon do
    cp "bin/djsd", "/usr/local/bin", :verbose => true, :preserve => true
  end

  desc "Install Google Chrome extension"
  task :chrome do
    puts "Installing Google Chrome extension..."
    sh "open -a 'Google Chrome' builds/dotjs.crx &"
  end
end

desc "Uninstall dotjs"
task :uninstall => 'uninstall:all'

namespace :uninstall do
  task :all => [ :prompt, :daemon, :agent, :chrome, :done ]

  task :prompt do
    puts "\e[1m\e[32mdotjs\e[0m"
    puts "\e[1m-----\e[0m"
    puts "I will remove:", ""
    puts "1. djsd(1) from /usr/local/bin"
    puts "2. com.github.dotjs from ~/Library/LaunchAgents"
    puts "3. The 'dotjs' Google Chrome Extension",""
    puts "I will not remove:", ""
    puts "1. ~/.js", ""
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
    if system("curl http://localhost:3131 &> /dev/null")
      puts "\e[31mdotjs uninstall failed\e[0m"
      puts "djsd is still running"
    else
      puts "\e[1m\e[32mdotjs uninstall worked\e[0m"
      puts "your ~/.js was not touched"
    end
  end

  desc "Uninstall launch agent"
  task :agent do
    plist = "com.github.dotjs.plist"
    agent = File.expand_path("~/Library/LaunchAgents/#{plist}")
    sh "launchctl unload #{agent}"
    rm agent, :verbose => true
  end

  desc "Uninstall dotjs daemon"
  task :daemon do
    rm "/usr/local/bin/djsd", :verbose => true
  end

  desc "Uninstall Google Chrome extension"
  task :chrome do
    puts "\e[1mplease uninstall the google chrome extension manually:\e[0m"
    puts "google chrome > window > extensions > dotjs > uninstall"
  end
end
