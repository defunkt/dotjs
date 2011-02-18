##################### dotjs ########################

dotjs  is a  Google Chrome  extension  that executes
JavaScript files in `~/.js` based on their filename.

If  you navigate to  `http://www.google.com/`, dotjs
will execute `~/.js/google.com.js`.

This makes it super  easy to spruce up your favorite
pages using JavaScript.

Bonus:  files in `~/.js`  have jQuery  1.4.4 loaded,
regardless  of  whether  the  site  you're  hacking
uses jQuery.

GreaseMonkey user scripts are great, but you need to
publish them  somewhere and re-publish  after making
modifications. With dotjs, just add or edit files in
`~/.js`.

Protip: keep `~/.js` under version control and share
it with the world.

## Example

    $ cat ~/.js/github.com.js
    // swap github logo with trollface
    $('#header .logo img')
      .css('width', '100px')
      .css('margin-top', '-15px')
      .attr('src', '//bit.ly/ghD24e')

![](https://bit.ly/gAHTbC)

## Requires

- Ruby 1.8
- rake (gem install rake)
- Google Chrome
- `/usr/local/bin` in your $PATH

## Install it

    git clone http://github.com/defunkt/dotjs
    cd dotjs
    rake install

## Uninstall it

    rake uninstall

## Credits

-   Icon: http://raphaeljs.com/icons/
- jQuery: http://jquery.com/
