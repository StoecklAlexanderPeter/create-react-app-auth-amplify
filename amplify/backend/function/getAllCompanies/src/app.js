/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
});


/**********************
 * Example get method *
 **********************/

app.get('/company', function(req, res) {
    /*
exports.findAll = function(req, res) {
    Company.findAll(function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
};

Company.findAll = function(result) {
    dbConn.query("Select * from companies WHERE sogcDate BETWEEN (CURRENT_DATE() - INTERVAL 1 MONTH) AND CURRENT_DATE();", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('companies : ', res);
            result(null, res);
        }
    });
};
  */

    db.query("Select * from companies WHERE sogcDate BETWEEN (CURRENT_DATE() - INTERVAL 1 MONTH) AND CURRENT_DATE();", function(err, res) {
        if (err) {
            res.send(err)
        } else {
            res.json(res);
        }
    });




    // Add your code here
    res.json({ success: 'get call succeed!', url: req.url });
});

app.get('/company/*', function(req, res) {
    // Add your code here
    res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post('/company', function(req, res) {
    // Add your code here
    res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

app.post('/company/*', function(req, res) {
    // Add your code here
    res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
 * Example put method *
 ****************************/

app.put('/company', function(req, res) {
    // Add your code here
    res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/company/*', function(req, res) {
    // Add your code here
    res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/company', function(req, res) {
    // Add your code here
    res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/company/*', function(req, res) {
    // Add your code here
    res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app