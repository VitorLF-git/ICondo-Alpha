import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const cors = require("cors")({ origin: true });


export const helloWorld = functions.https.onRequest((request, response) => { 
    
    cors(request, response, () => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send({text:"Hello from11 Vitor!"});
});
 
});
