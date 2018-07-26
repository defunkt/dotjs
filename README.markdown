This project is archived and no longer mainted.

Check out its successor, which is way better and 
runs on all platforms: 

[Witchcraft](https://github.com/luciopaiva/witchcraft)

dotjs
=====

dotjs  is a  Google Chrome  extension  that executes
JavaScript files in `~/.js` based on their filename.

If  you navigate to  `http://www.google.com/`, dotjs
will execute `~/.js/google.com.js`.

This makes it super  easy to spruce up your favorite
pages using JavaScript.

On subdomains such as `http://gist.github.com` dotjs
will try to load `~/.js/gist.github.com.js`  as well
as `~/.js/github.com.js` and `~/.js/com.js`.

Bonus:  files  in `~/.js`  have jQuery 1.9  loaded,
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
    $('a[class^=header-logo-]').html(
        $('<img>')
            .attr('src', '//bit.ly/ghD24e')
            .css({'width': 'auto', 'height': '22px'})
        );

![](http://puu.sh/1Kjvw)

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

Now open <https://localhost:3131> in Chrome and follow these steps:

- Click the "X" Padlock icon in the address bar
- Click "Certificate Information"
- Drag the large cert icon to your desktop
- Open it with Keychain
- Configure its **Trust** section as shown: http://cl.ly/Pdny

Finally install the Google Chrome extension:

http://bit.ly/dotjs

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

## Windows

- [dotjs-universal](https://github.com/p3lim/dotjs-universal)

## Other Browsers

- [Firefox Add-on](https://github.com/rlr/dotjs-addon)
- [Safari Extension](https://github.com/wfarr/dotjs.safariextension)
- [Fluid UserScript](https://github.com/sj26/dotjs-fluid)
