const functions = require('firebase-functions');
const cors = require("cors")({ origin: true });



const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.aranha = functions.https.onRequest((request, response) => {
    cors(request, response, () => {

        response.setHeader('Access-Control-Allow-Origin', '*');
        response.send({ text: "Hello from Firebase!" });
    });
});


exports.sendnot = functions.firestore
    .document('portaria/{userId}')
    .onWrite(async (change, context) => {
        const followerUid = context.params.followerUid;
        const followedUid = context.params.followedUid;
        // If un-follow we exit the function.
        console.log('We have a new follower UID:', followerUid, 'for user:', followedUid);

        // Get the list of device notification tokens.
        // Get the follower profile.
        // The snapshot to the user's tokens.
        // Check if there are any device tokens.
        // Notification details.
        const payload = {
            notification: {
                title: 'You have a new follower!',
                body: `is now following you.`,
            }
        };

        // Listing all tokens as an array.
        // Send notifications to all tokens.
        const response = await admin.messaging().sendToDevice("dw9TNDOf9BA:APA91bFC6WLz2fl5kg-Vf_zDmhs1ROzR5O5w1Q7_lKw6ieLNYEfTHcJ2lmgjNkIDM31G0m-Q1LvRmd9BfIoBCC20keDC-Swh8EJeRKZvYBMWo5DjDqhGwrlMrwetohXfIsbgXs4ZZnUo", payload);
        // For each message check if there was an error.
        const tokensToRemove = [];
        response.results.forEach((result, index) => {
            const error = result.error;
            if (error) {
                console.error('Failure sending notification to', tokens[index], error);
                // Cleanup the tokens who are not registered anymore.
                if (error.code === 'messaging/invalid-registration-token' ||
                    error.code === 'messaging/registration-token-not-registered') {
                    tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
                }
            }
        });
        return Promise.all(tokensToRemove);
    });
// dw9TNDOf9BA:APA91bFC6WLz2fl5kg-Vf_zDmhs1ROzR5O5w1Q7_lKw6ieLNYEfTHcJ2lmgjNkIDM31G0m-Q1LvRmd9BfIoBCC20keDC-Swh8EJeRKZvYBMWo5DjDqhGwrlMrwetohXfIsbgXs4ZZnUo