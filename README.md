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
2. create your own Project/App, choose the DATA type.
3. create your own bucket, in my sample the name is Bucket1
4. In that bucket(Bucket1), create new column, in my sample i create 2 column, column 1 = data1, and column2 = firstCol
5. git clone https://github.com/abdulMuhit/learnmesosfer
6. go to learnmesosfer directory
7. change the appID and appKey with your appId and appKey
8. type ionic serve
9. enjoy

* Ups, sorry, in this sample code, the update operation is not yet implemeted...
* If there any comment or some better code than this, please also let me know.

Thanks.
