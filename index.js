var request = require('request');
var http = require('http');
var timers = require('timers');

// Source - https://medium.com/dev-bits/writing-neat-asynchronous-node-js-code-with-promises-32ed3a4fd098

var userDetails;
var postDetails;

function postRequest(){
    var options = {
        url: "https://jsonplaceholder.typicode.com/posts",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1
        })
    };

    return new Promise(function (resolve, reject) {
        request.post(options, function(err, resp, body) {
            if(err){
                reject(err);
            } else {
                console.log('POST request successful')
                console.log(body)
            }
        })
    })
}

function getUsers() {
    // Setting URL and headers for request
    var options = {
        url: 'https://jsonplaceholder.typicode.com/users',
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function(resolve, reject) {
     // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                userDetails = JSON.parse(body);
                resolve(userDetails)                
            }
        })
    })
}

function getPosts(userId) {
    // Setting URL and headers for request
    var options = {
        url: 'https://jsonplaceholder.typicode.com/posts/' + userId,
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function(resolve, reject) {
     // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                postDetails = JSON.parse(body);
                resolve(postDetails)                
            }
        })
    })
}

function main() {
    var initializePromise = getUsers();
    initializePromise.then(function(result) {
        userDetails = result;
        console.log("Initialized user details");
        // Use user details from here
        console.log(userDetails[0].id)
    }, function(err) {
        console.log(err);
    }).then(function(result) {
        console.log(userDetails[0].name);
    }).then(function(result) {
            var initializePromiseGetPost = getPosts(userDetails[0].id);
            initializePromiseGetPost.then(function(result) {
            postDetails = result;
            console.log("Initialized post details");
            console.log(postDetails.title)
        }, function(err) {
            console.log(err);
        })
    })
}

main();