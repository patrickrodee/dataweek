angular.module('myApp', ['snap'])
  .config(function(snapRemoteProvider) {
    snapRemoteProvider.globalOptions.disable = 'right';
});