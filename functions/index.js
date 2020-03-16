const functions = require('firebase-functions');
const cors = require("cors")({ origin: true });
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.sendNotification = functions.firestore
    .document('portaria/{userId}')
    .onCreate(async (snap, context) => {

        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const newValue = snap.data();

        // access a particular field as you would any JS property
        const token = newValue.token;

        const content = newValue.content;

        // If un-follow we exit the function.
        console.log('New portaria message type', content, 'for token:', token);

        // Get the list of device notification tokens.
        // Get the follower profile.
        // The snapshot to the user's tokens.
        // Check if there are any device tokens.
        // Notification details.
        const payload = {
            notification: {
                title: 'Você tem um novo aviso!!',
                body: `Veja seu novo aviso!`,
            }
        };

        if (content === 'Encomenda') {

            payload.notification.title = 'Sua encomenda Chegou!';
            payload.notification.body = 'Sua encomenda Chegou!';

        }
        if (content === 'Carta') {

            payload.notification.title = 'Sua carta chegou!';
            payload.notification.body = 'Sua carta chegou!';

        }
        if (content === 'Visita') {

            payload.notification.title = 'Uma visita chegou!';
            payload.notification.body = 'Uma visita chegou!';

        }
        if (content === 'Alimentos') {

            payload.notification.title = 'Sua comida chegou!';
            payload.notification.body = 'Sua comida chegou!';

        }


        // Listing all tokens as an array.
        // Send notifications to all tokens.
        const response = await admin.messaging().sendToDevice(token, payload);
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


exports.sendFollowerNotification = functions.firestore
    .document('aviso/{avisoId}')
    .onCreate(async (snap, context) => {

        const newValue = snap.data();

        // access a particular field as you would any JS property
        const tokens = newValue.tokens;

        const content = newValue.content;

        const condominio = newValue.condominio;


        

        // Notification details.
        const payload = {
            notification: {
                title: 'You have a new follower!',
                body: `is now following you.`,
            }
        };

        // Listing all tokens as an array.
        // tokens = Object.keys(tokensSnapshot.val());
        // Send notifications to all tokens.
        const response = await admin.messaging().sendToDevice(tokens, payload);
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
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'contato.icondo@gmail.com',
        pass: 'Icondo123!'
    }
});

exports.sendEmail = functions.firestore
    .document('calendario/{calId}')
    .onCreate((snap, context) => {

        // getting dest email by query string

        const mailOptions = {
            from: '<contato.icondo@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: snap.data().email,
            subject: 'contact form message', // email subject
            html: `<h1>Order Confirmation</h1>` // email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send(snap.data().email);
        });
    });
// dw9TNDOf9BA:APA91bFC6WLz2fl5kg-Vf_zDmhs1ROzR5O5w1Q7_lKw6ieLNYEfTHcJ2lmgjNkIDM31G0m-Q1LvRmd9BfIoBCC20keDC-Swh8EJeRKZvYBMWo5DjDqhGwrlMrwetohXfIsbgXs4ZZnUo