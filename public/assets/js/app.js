var psApp = angular.module('psApp', ['ng','ui.router','ngSanitize','ngCookies','ngProgress', 'ngMaterial']);

psApp.config(function($httpProvider) {

  var logsOutUserOn401 = function($location, $q, SessionService, FlashService) {
  var success = function(response) {
  	return response;
    };

    var error = function(response) {
      if(response.status === 401) {
        SessionService.unset('authenticated');
        $location.path('/');
        FlashService.show(response.data.flash);
      }
      return $q.reject(response);
    };

    return function(promise) {
      return promise.then(success, error);
    };
  };

  // $httpProvider.responseInterceptors.push(logsOutUserOn401);

});

var loginRequired = function(FlashService, AuthenticationService, $location, $q) {  
    var deferred = $q.defer();
    
    if(! AuthenticationService.isLoggedIn()) {
        $q.reject('User not logged in!')
        $location.path('/');
        FlashService.show('User not logged in!');
    } else {
        deferred.resolve();
    }

    return deferred.promise;
}

psApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // Login Page ========================================
        .state('login', {
            url: '/',
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
          })
           
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('setup',{
          url: '/setup',
          views:{
            '' : {templateUrl: 'templates/home.html'},

            'toolbar@setup' : {
              templateUrl: 'templates/toolbar.html',
            },

            'mainpage@setup' : {
              templateUrl: 'templates/setup.html',
              controller: 'SetupController'
            },

            'newpaper@setup' : {
              templateUrl: 'templates/newpaper.html'
            }
          }
        })

        .state('setup1', {
            url: '/setup1',
            views: {
              '' : {templateUrl: 'templates/home.html'},

              'sidebar@setup' : {
                templateUrl: 'templates/sidebar.html',
                // controller: 'SidebarController'
              },
              'mainpage@setup' :{
                templateUrl: 'templates/setup.html',
                controller: 'SetupController',
                resolve: {
                  booklist : function(FetchService){
                    return FetchService.getBooks();
                  }
                }
              },
            },
            resolve: { loginRequired: loginRequired }
        })

        .state('type', {
          url: '/type',
          views: {
            '' : {templateUrl: 'templates/home.html'},

            'sidebar@type' : {
                templateUrl: 'templates/sidebar.html',
                // controller: 'SidebarController'
              },

              'mainpage@type' : {
                templateUrl: 'templates/type.html',
                controller: 'TypingController',
                resolve: {
                  topiclist : function(FetchService){
                    return FetchService.getTopics();
                  },
                  examlist: function(FetchService){
                    return FetchService.getExams();
                  }
                }
              }
          },
          resolve: {loginRequired: loginRequired,
        }
        })

         $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
          });
        
});

psApp.factory("FetchService", function($http) {
  return {
    getBooks: function() {
      return $http.get('/getBooks');
    },
    getTopics: function() {
      return $http.get('/getTopics');
    },
    getExams: function(){
      return $http.get('/getExams')
    }

  };
});

psApp.factory("SessionService", function() {
  return {
    get: function(key) {
      return sessionStorage.getItem(key);
    },
    set: function(key, val) {
      return sessionStorage.setItem(key, val);
    },
    unset: function(key) {
      return sessionStorage.removeItem(key);
    }
  }
});

psApp.factory("FlashService", function($rootScope) {
  return {
    show: function(message) {
      $rootScope.flash = message;
    },
    clear: function() {
      $rootScope.flash = "";
    }
  }
});

psApp.factory("AuthenticationService", function($location, $http, $sanitize, SessionService, FlashService, $cookieStore, CSRF_TOKEN) {

  var cacheSession   = function() {
    SessionService.set('authenticated', true);
  };

  var uncacheSession = function() {
    SessionService.unset('authenticated');
  };

  var loginError = function(response) {
    FlashService.show(response.flash);
  };

  var sanitizeCredentials = function(credentials) {
    return {
      email: $sanitize(credentials.email),
      password: $sanitize(credentials.password),
      csrf_token: CSRF_TOKEN
    };
  };

  return {
    login: function(credentials) {
      var login = $http.post("/auth/login", sanitizeCredentials(credentials));
      login.success(cacheSession);
      login.success(FlashService.clear);
      login.success(function(data, status, headers, config) {
                    $cookieStore.put('firstname', data.firstname);
                    FlashService.show('Welcome ' + $cookieStore.get('firstname') + '!' );
                });
      login.error(loginError);
      return login;
    },
    logout: function() {
      var logout = $http.get("/auth/logout");
      $location.path('/');
      return logout;
    },
    isLoggedIn: function() {
      return SessionService.get('authenticated');
    }
  };
});

psApp.controller("LoginController", function($rootScope, $scope, $location, AuthenticationService, FlashService, ngProgress) {
  ngProgress.color('#A3E0FF');
  ngProgress.start();
  $scope.credentials = { email: "", password: "" };
  $scope.loginButtonName = 'Login';
  ngProgress.complete();
  $scope.login = function() {
      ngProgress.start();
      $scope.loginButtonName = 'Logging in...'
      AuthenticationService.login($scope.credentials).success(function() {
      FlashService.show("Successfully logged in!");
      // $rootScope.userfullname = 
      $location.path('setup');
    });
    AuthenticationService.login($scope.credentials).error(function() {
      $scope.loginButtonName = 'Login';
    });
  };
});



psApp.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

psApp.controller('SetupController', function($scope, $filter){
  var prevexamdata = [{name: "Electrochemistry", subject: "Chemistry", date: "08/02/2014", status: "Completed"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/02/2014", status: "Completed"},
  {name: "Electrochemistry", subject: "Chemistry", date: "09/09/2014", status: "Completed"},
  {name: "Rotational Motion", subject: "Physics", date: "08/02/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/08/2014", status: "Completed"},
  {name: "Electricity", subject: "Physics", date: "08/02/2014", status: "Completed"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/02/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/02/2014", status: "Completed"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/03/2014", status: "Completed"},
  {name: "Electrochemistry", subject: "Chemistry", date: "28/04/2014", status: "Completed"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/04/2014", status: "Draft"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/02/2014", status: "Completed"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "18/06/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "17/06/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/02/2014", status: "Completed"},
  {name: "Electrochemistry", subject: "Chemistry", date: "28/04/2014", status: "Completed"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/04/2014", status: "Draft"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/02/2014", status: "Completed"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "18/06/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "17/06/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "28/04/2014", status: "Completed"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/04/2014", status: "Draft"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/02/2014", status: "Completed"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "18/06/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "17/06/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "28/04/2014", status: "Completed"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/04/2014", status: "Draft"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/02/2014", status: "Completed"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "18/06/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "17/06/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "28/04/2014", status: "Completed"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/04/2014", status: "Draft"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/02/2014", status: "Completed"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "18/06/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "17/06/2014", status: "Draft"},
  {name: "Human Health and Diseases", subject: "Biology", date: "28/06/2014", status: "Completed"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/04/2014", status: "Draft"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Draft"},
  {name: "Electrochemistry", subject: "Chemistry", date: "08/02/2014", status: "Completed"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Completed"},
  {name: "Differentiation and AOI", subject: "Mathematics", date: "08/05/2014", status: "Completed"},
  {name: "Electrochemistry", subject: "Chemistry", date: "18/06/2014", status: "Completed"},
  {name: "Electrochemistry", subject: "Chemistry", date: "17/06/2014", status: "Completed"}];


   var tabs = [
      { title: 'Draft', content: "Tabs will become paginated if there isn't enough room for them."},
      { title: 'Completed', content: "You can swipe left and right on a mobile device to change tabs."}
    ];
    $scope.tabs = tabs;
    $scope.selectedIndex = 2;
    $scope.announceSelected = announceSelected;
    $scope.announceDeselected = announceDeselected;
    $scope.addTab = function (title, view) {
      view = view || title + " Content View";
      tabs.push({ title: title, content: view, disabled: false});
    };
    $scope.removeTab = function (tab) {
      for (var j = 0; j < tabs.length; j++) {
        if (tab.title == tabs[j].title) {
          $scope.tabs.splice(j, 1);
          break;
        }
      }
    };
    function announceDeselected(tab) {
      $scope.farewell = 'Goodbye ' + tab.title + '!';
    }
    function announceSelected(tab) {
      $scope.greeting = 'Hello ' + tab.title + '!';
    }

});