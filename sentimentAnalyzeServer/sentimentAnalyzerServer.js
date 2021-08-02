const express = require('express');
const app = new express();

const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = 'FB1gNNfXyqBw4xc_itr_4zk_RV8bPrl_zs3j2yOeX1cA';
    let api_url = 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/57450b18-0104-4625-bd89-7b24fcdea0ae';

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    const analyzeParams = {'url':req.query.url, 'features':{ 'entities':{ 'emotion':true, 'limit':1}}}

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then( analysisResults => { 
            console.log(analysisResults);
            console.log(JSON.stringify(analysisResults.result.entities[0].emotion,null,2));
            return res.send(analysisResults.result.entities[0].emotion,null,2);
        })

        .catch(err => {
            return res.send("Could not do desired operation " + err);
        });
});

app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {'url':req.query.url, 'features':{'entities':{'sentiment':true, 'limit':1}}}

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(analysisResults);
            console.log(JSON.stringify(analysisResults.result.entities[0].sentiment, null, 2));
            return res.send(analysisResults.result.entities[0].sentiment.label,null,2);
        })
        .catch(err => {
            return res.send("Could not do desired operation " + err);
        });
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {'text':req.query.text, 'features':{ 'entities':{ 'emotion':true, 'limit':1}}}

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then( analysisResults => { 
            console.log(analysisResults);
            console.log(JSON.stringify(analysisResults.result.entities[0].emotion,null,2));
            return res.send(analysisResults.result.entities[0].emotion,null,2);
        })

        .catch(err => {
            return res.send("Could not do desired operation " + err);
        });
});

app.get("/text/sentiment", (req,res) => {
const analyzeParams = {'text':req.query.text, 'features':{'entities':{'sentiment':true, 'limit':1}}}

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(analysisResults);
            console.log(JSON.stringify(analysisResults.result.entities[0].sentiment, null, 2));
            return res.send(analysisResults.result.entities[0].sentiment.label,null,2);
        })
        .catch(err => {
            return res.send("Could not do desired operation " + err);
        });
    });

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

