// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'myApp.directives'])

.run(function($ionicPlatform, $http) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

})

.config(function($urlRouterProvider, $httpProvider) {

$httpProvider.interceptors.push('httpRequestInterceptor');

})

.factory('httpRequestInterceptor', function(){

    //insert your own appId an appKey here
    let setAppId = '###########';
    let setAppKey = '#########*****#########';
    
    return {
        request: function(config){

            config.headers['Content-Type'] = 'application/json';
            config.headers['Accept'] = 'application/json';
            config.headers["X-Mesosfer-AppId"] = setAppId;
            config.headers["X-Mesosfer-AppKey"] = setAppKey;
            
            if(sessionStorage.getItem('SessionStorageName')){
            config.headers['Authorization'] = 'Bearer '+ sessionStorage.getItem(sessionStorage.getItem('SessionStorageName'));;
            }
            return config;
        }
    }
})

.controller('mesosferCtrl', function ($http, $scope, httpRequestInterceptor) {

    let apiUrl = 'https://api.mesosfer.com/api/v2'
    let signinUrl = '/users/signin'
    let signupUrl = '/users';
    let dataUrl = '/data/bucket/';
    let thisUserUrl = '/users/me';

    $scope.SignView = true;
    $scope.datas = [];
    $scope.person = {};
    $scope.thisUserData;
    $scope.data = {};
    $scope.SignView = true;
    $scope.signUpMode = false;

    $scope.signUp = function(data){
        console.log('signup triggered');
        $scope.person = {};
        let url = apiUrl+signupUrl;
    //if(data.password = data.password2){
    return $http({
        method: 'POST',
        url: url,
        headers: {
            "Authorization": undefined, 
        },
        data: 
            {   
                "firstname":data.name,
                "lastname":data.lastname,
                "email": data.email,
                "password":data.password
            }
            }).then(function(response){
            console.log(response);

            //automate signin
            $scope.signin(data);
        }, function(error){
            console.log(error);
            alert(' Some error connection, please check your internet connection. ');    
        });
    //} else {
    //    alert('Password and the re-type password is different');
    //}    
    } 

    $scope.signin = function(data){
        $scope.person = {};
        let url = apiUrl+signinUrl;
    return $http({
        method: "POST",
        url: url,
        data: 
            {   
                "email":data.email, 
                "password": data.password
            }   
        }).then(function(response){
            SessionStorageName = response.data.objectId;
            sessionStorage.setItem(SessionStorageName, response.data.accessToken);
            sessionStorage.setItem('SessionStorageName', response.data.objectId);
            $scope.SignView= false;
            $scope.getUserData();
        }, function(error){
            console.log(error);
            alert('Maaf, Password atau email anda salah, atau terdapat gangguang koneksi, mohon ulangi lagi');
        }).finally(function(){
            console.log("finally done");
        }); 
    }

    $scope.getAllData = function(){

        let url = apiUrl+dataUrl+"Bucket1";
        let page = 0;
        let limit = 50;
        let skip = limit*page;

        let args = {
            params: {
                    where: {
                        //you can put some server data filter here
                    },
                    limit: limit,
                    count: 1,
                    skip: skip,
                    order: '-createdAt'
                }
        }

        return $http.get(url, args, function (data, response, error) {
            console.log(data);
        }).then(function(response){
            $scope.datas = response.data.results;
        }, function (error){
            console.log(error);
        });
    }

    $scope.getUserData = function(){
        let url = apiUrl+thisUserUrl;
        return $http.get(url, function (response) {
            }).then(function(response){
            $scope.thisUserData = response;            
        }, function(error){
            console.log(error);
        });
    }

//===============================

    $scope.deleteData = function(data){
        console.log('deleteData triggered');
        let url = apiUrl+dataUrl+"Bucket1/"+data.objectId;
        return $http ({
                method: 'DELETE',
                url: url
            }).then(function(response){
            console.log("Delete/update data", response);
            $scope.getAllData();

        }, function(error){
            console.log(error);
            alert('There some error, please check your internet connection')
        });
    }

    $scope.submitData = function(data) {
        $scope.data = {};
        let url = apiUrl+dataUrl+"Bucket1";
        console.log('post query trigered');
            return $http ({
                method: 'POST',
                url: url,
                data: { metadata: 
                        {
                            data1: data.data1,
                            firstCol: data.firstCol
                        }
                    }
            }).then(function(response) {
                console.log(response.data);
             $scope.getAllData();
            }, function(error){
                console.log(error);
                alert('Some internet connection, please check your internet connection');
            });

    }
   // signout
    $scope.signOut = function(){
        $scope.SignView = true;
        $scope.signUpMode = false;
        sessionStorage.clear();
    }

    //====end
})