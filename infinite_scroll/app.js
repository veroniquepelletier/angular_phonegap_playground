angular.module('app', [])
    .service('model', function() {
        var data = [];
        
    })
    .directive('ifscroll', function() {
        
    })
    .controller('scrollCtrl', function($scope, model) {
        console.log('new scrollCtrl')
        var scroll = new iScroll('wrapper', { hScrollbar: false, vScrollbar: false, vScroll: false});
    })