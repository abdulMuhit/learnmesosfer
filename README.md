Hello,

# learnmesosfer
sample Ionic with mesosfer, CRUD operation

This is some sample Crud using mesosfer as the backand, tested and works on chrome and android.

you can see the mesosfer web here : https://mesosfer.com/ *Mobile BackEnd as a Service

I made this to give some sample for anyone who use javascript in mesosfer, 
because i see that the guide and javascript sdk is not ready yet it the doc.
It use the REST guide in the doc, convert the cUrl to $http (in angularjs).

some point in this sample :

1. curl in $http
2. use $httpProvider.interceptors so that we dont have to always type the header
3. Some basic signin, signout, retrive data, add data, delete data.
4. enjoy

how to use :

1. signin to mesosfer web to get your appid and app key
2. git clone https://github.com/abdulMuhit/learnmesosfer
3. go to learnmesosfer directory
4. change the appID and appKey with your appId and appKey
5. type ionic serve
6. enjoy

* Ups, sorry, in this sample code, the update operation is not yet implemeted...
* If there any comment or some better code than this, please also let me know.

Thanks.
