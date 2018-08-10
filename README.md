# Unsplash Search Wrapper (Typescript)

[![Coverage Status](https://coveralls.io/repos/github/arifaydogmus/unsplash-search/badge.svg?branch=master)](https://coveralls.io/github/arifaydogmus/unsplash-search?branch=master)
[![Build Status](https://travis-ci.org/arifaydogmus/unsplash-search.svg?branch=master)](https://travis-ci.org/arifaydogmus/unsplash-search)

Unsplash?
Beautiful, free photos brought to you by the world’s most generous community of photographers.
With this module, you can search on Unsplash, access the credits and download high-resoulution version. (even raw)

You can integrate it to the admin panel, use in web page, electron app or in node app.

## Features

- Search in
  - all Unsplash photos
  - only landscapes
  - only portraits
  - only squarish (Instagram ready)
- Result includes
  - Author credits
  - Links (raw, download, full-size, thumbnail)
  - Related color
  - Dimension
  - Likes

## Requirements

- A valid [Unsplash](https://unsplash.com/developers) API key (Free)

## Getting Started

Installation:

```bash
npm install unsplash-search
```

## Basic Usage

Create an instance with a valid API access key (see [Requirements](#requirements))
A working demo on [mnfy.me/unsplash-search](http://mnfy.me/unsplash-search-demo) (Made with React)
Demo source code also avialable on https://github.com/arifaydogmus/unsplash-search-demo

```js
import UnsplashSearch from 'unsplash-search';

const accessKey = '<your api access key>';
const provider = new UnsplashSearch(acessKey);

// Search 'berlin' and get 3rd page
provider
  .searchAll('berlin', 3)
  .then(data => {
    console.log('Total images in result:', data.totalImages);
    console.log('Total pages', data.totalPages);

    data.images.forEach(image => {
      console.log(
        `Taken by ${image.author.name} and download on ${image.urls.full}`
      );
    });
  })
  .catch(error => error);
```

![alt text](/media/demo-screenshot.jpg)

---

# API Methods

Following methods available names and paramters (if available) describe it self.

#### searchAll(query, page)

Searches in all available photos

#### searchLandscapes(query, page)

Searches only landscape oriented photos

#### searchPortraits(query, page)

Searches only portrait oriented photos

#### searchSquares(query, page)

Searches only square size photos

#### getQueryLimit()

Returns your API query limit

#### getRemaingQuery()

Returns your remaining API call

#### getItemsPerPage()

Returns active setting for how many images will be in result.
Default is 10.

#### setItemsPerPage(limit)

Set setting for how many images will be in result
Max is 30 according to Unsplash API.

## Warnings

- Unsplash official API has orient base search but the images in result may not be your selection.
- Obviously the wrapper uses the Unsplash API so, respect to API query limitations.

## License

[ISC License](LICENSE.txt) - [Arif Aydogmus](https://github.com/arifaydogmus)
