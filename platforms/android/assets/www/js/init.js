var app = angular.module('app', []);

app.provider('movie', function () {
  var version;
  return {
    setVersion: function (value) {
      version = value;
    },
    $get: function () {
      return {
          title: 'The Matrix' + ' ' + version
      }
    }
  }
});

app.config(function (movieProvider) {
  movieProvider.setVersion('Reloaded');
});

app.controller('MyController', function (movie) {
  expect(movie.title).toEqual('The Matrix Reloaded');
});