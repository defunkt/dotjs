..................... dotjs ........................

dotjs  is a  Google Chrome  extension  that executes
JavaScript files in `~/.js` based on their filename.

If  you navigate to  `http://www.google.com/`, dotjs
will execute `~/.js/google.com.js`.

This makes it super  easy to spruce up your favorite
pages using JavaScript.

Bonus:  files  in `~/.js`  have jQuery 1.6.2 loaded,
regardless  of  whether  the  site  you're  hacking
uses jQuery.

Double bonus: `~/.js/default.js`  is loaded on every
request,  meaning you  can stick  plugins  or helper
functions in it.

GreaseMonkey user scripts are great, but you need to
publish them  somewhere and re-publish  after making
modifications. With dotjs, just add or edit files in
`~/.js`.

## Example

    $ cat ~/.js/github.com.js
    // swap github logo with trollface
    $('#header .site-logo img')
      .css('width', '97px')
      .css('height', '80px')
      .css('margin-top', '-15px')
      .attr('src', '//bit.ly/ghD24e')

![](http://cl.ly/G3UB)

## How It Works

Chrome extensions can't access the local filesystem,
so dotjs  runs a tiny  web server on port  3131 that
serves files out of ~/.js.

You don't  have to worry about  starting or stopping
this web server because  we put a pretty great plist
into  ~/Library/LaunchAgents that  handles  all that
for us.

The dotjs Chrome extension then makes ajax requests
to http://localhost:3131/convore.com.js any time you
hit a page on convore.com, for example, and executes
the returned JavaScript.

## Requires

- OS X
- Ruby 1.8
- rake (gem install rake)
- Google Chrome
- `/usr/local/bin` in your $PATH

## Install it

    git clone http://github.com/defunkt/dotjs
    cd dotjs
    rake install

## Chromium vs Google Chrome

Multiple Chromes installed? Drag builds/dotjs.crx to
whichever is your favorite.

## Uninstall it

    rake uninstall

## Credits

- Icon: <http://raphaeljs.com/icons/>
- jQuery: <http://jquery.com/>
- Ryan Tomayko for:

> "I almost wish you could just
   stick JavaScript in ~/.js. Do
   you know what I'm saying?"

## Linux

- [dotjs-ubuntu](https://github.com/glenbot/dotjs-ubuntu)

### Running the server manually (Fedora/RHEL)
1. install apache
    - `yum install httpd` in a terminal
2. make sure it runs on startup 
    - `chkconfig httpd on` in a terminal
    - to double check this, simply run `chkconfig | grep httpd` in a terminal.  `httpd [...] 5:on` means it worked
3. edit apache's configuration file (`nano /etc/httpd/conf/httpd.conf` in a terminal for an editor)
    - run apache as your user/group 
        - lines 241/242 for me, changed `apache` to `<USERNAME>`
    - set apache's default port
        - line 135 for me, changed `Listen 80` to `Listen 3131`
    - set apache's DocumentRoot to ~/.js
        - lines 291 and 316 for me, changed `/var/www/html` (in both of those lines) to `/home/<USERNAME>/.js`
4. use SELinux to allow apache to access ~/.js 
    - run `semanage fcontext -a -t httpd_sys_content_t "/home/<USERNAME>/.js(/.*)?"` in a terminal
    - thanks `irc.freenode.net/#fedora` and [the fedora documentation](http://docs.fedoraproject.org/en-US/Fedora/13/html/Managing_Confined_Services/sect-Managing_Confined_Services-The_Apache_HTTP_Server-Configuration_examples.html#sect-Managing_Confined_Services-Configuration_examples-Running_a_static_site) for help with this
5. reboot
6. install the chrome extension and test it!

#### Notes
- these commands will need administrator access, type `su -` in a shell (followed by the root password and the enter key) to get a root terminal.
- `<USERNAME>` in the commands above should be replaced with your username.  If you're unsure what that is type `whoami` in a terminal (should NOT be `root`)

## Other Browers

- [Firefox Add-on](https://github.com/rlr/dotjs-addon)
- [Safari Extension](https://github.com/wfarr/dotjs.safariextension)
- [Fluid UserScript](https://github.com/sj26/dotjs-fluid)
