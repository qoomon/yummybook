# yummybook
[![Build Status](https://travis-ci.com/qoomon/yummybook.svg?branch=master)](https://travis-ci.com/qoomon/yummybook)

![Main](/doc/screenshots/main.png)

![Recipe](/doc/screenshots/recipe.png)

## Usage
* Add recipes to [data](data) directory
  * Copy [_TEMPLATE](_TEMPLATE) directory and rename it to recipe rename
  * Adjust [recipe.json](_TEMPLATE/recipe.json) within recipe directory
  * Replace or remove pictures
    * Picture file names need to start with `picture-`
* Run [`build_cookbook`](build_cookbook)
* Open [app/index.html](app/index.html) in your browser