
angular.module('app', [])
    .service('model', function($timeout) {
        
        var i = 0,
            data = [];
            
        $timeout(function genData(){
            i = i + 1;
            data.push({name : 'slide ' + i});
            if(i >= 50) {
                $timeout = null;
                return;
            }
            $timeout(genData, 1000);
        },1000);
        
        return {
            getData : function() {
                return data;
            }
        }
        
    })
    .directive('scrollelem', function() {
        return {
            restrict: 'A',
            replace: false,
            template: "<div class='element'>" + 
                "<span>{{slide.name}}</span>" + 
		"</div>",
            link : function(scope, element, attrs) {
                scope.$watch(scope.slides, function() {
                    scope.elementWidth = $('.element').width();
                    scope.scroller.width(scope.elementWidth * scope.slides.length);
                    scope.scroll.refresh();
                })
            }
        };
    })
    .directive('scroll', function() {
        return {
            restrict: 'E',
            replace: false,
            template:
                "<div id='wrapper' ng-controller='scrollCtrl'>" +
                    "<div class='scroller' scroll=''>" +  
                        "<ul>" + 
                            "<li ng-repeat='slide in slides' scrollelem=''>" +
                            "</li>" + 
                        "</ul>" +
                    "</div>" +
                "</div>",
            link : function(scope, element, attrs) {
                scope.scroll = new iScroll('wrapper', { hScrollbar: false, vScrollbar: false, vScroll: false});
                scope.scroller = $('.scroller');
                scope.wrapper = $('#wrapper');
            }
        };
    })
    .controller('scrollCtrl', function($scope, model) {
        $scope.slides = model.getData();
    })
    .controller('dateCtrl', function ($scope){
        $scope.input = 234234443432;
    })
    .filter('i18n', function() {
        var locale = 'fr-ca',
            lang = {
                hello:{
                    'en-us':'Hello Purple',
                    'fr-ca':'Bonjour Purple'
                }
            };
 
        return function(key) {
            return lang[key][locale];
        }
    })
    /*
    .filter('i18n', function() { 
        var log_untranslated = false;
        var placeholders = [];
        var string;
        var lang = {}
        

        for(var i=1; i < arguments.length; i++) {
            if(typeof(arguments[i]) == 'object') {
                angular.forEach(arguments[i], function(item) {
                    placeholders.push(item);
                })
            }
            else {
                placeholders.push(arguments[i]);
            }
        }

        var translated = lang[string]; // lang ist from the language file, e.g. de_DE.js
        if (translated === undefined) {
            if (log_untranslated == true) {
                // here we could track unreanslated strings by sending them to the server...
            }
            return sprintf(string, placeholders);
        }
        return sprintf(translated, placeholders);

    })
    */