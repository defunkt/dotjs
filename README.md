dotjs is a Google Chrome extension that executes JavaScript files in `~/.js`
based on their filename.

If you navigate to `http://www.google.com/`, dotjs will execute the JavaSript
in `~/.js/google.com.js`.

This makes it super easy to rewrite your favorite pages using JavaScript.

Bonus: the dotjs scripts you write have jQuery available, regardless of
whether the site you're targeting uses jQuery.

GreaseMonkey user scripts are great, but you need to publish them somewhere
and re-publish after making modifications. With dotjs, just add or edit files
in `~/.js`.

## Example

    $ cat ~/.js/github.com.js
    // swap github logo with trollface
    $('#header .logo img')
      .css('width', '100px')
      .css('margin-top', '-15px')
      .attr('src', 'https://img.skitch.com/20110207-x4s8eys3uy641yk72jigt38bby.png')

![](https://img.skitch.com/20110207-k3tkbubarg4yb8ym68rpm58m62.png)

## Install it

    git clone git@github.com:defunkt/dotjs.git
    cd dotjs
    ./bin/dotjs --install

## How It Works

The dotjs extension expects `http://localhost:3131/google.com.js` to return
the content of `~/.js/google.com.js`.


