var mockData = [
  {
    id: 0,
    name: "Web",
    bookmarks: [
      {
        id: 0,
        name: 'Google',
        url: 'http://google.com',
        desc: 'General search',
        favicon: 'https://www.google.com/favicon.ico'
      },
      {
        id: 1,
        name: 'Facebook',
        url: 'https://www.facebook.com',
        desc: 'Social media',
        favicon: 'https://www.facebook.com/favicon.ico'
      }
    ]
  },
  {
    id: 1,
    name: "Development",
    bookmarks: [
      {
        id: 0,
        name: 'GitHub',
        url: 'https://github.com/',
        desc: 'Code versioning',
        favicon: 'https://github.com/favicon.ico'
      }
    ]
  }
];

var BookmarkSource = {
  fetch: function () {
    // returning a Promise because that is what fetch does.
    return new Promise(function (resolve, reject) {
      // simulate an asynchronous action where data is fetched on
      // a remote server somewhere.
      setTimeout(function () {
        // resolve with some mock data
        resolve(mockData);
      }, 250);
    });
  }
};

module.exports = BookmarkSource;
