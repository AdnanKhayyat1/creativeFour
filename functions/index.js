const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const app = express();


// Create a new item in the museum: takes a title and a path to an image.
var db = firebase.firestore();
var itemsRef = db.collection('items');

app.post('/api/items', async (req, res) => {
    try {
        console.log("test");
        let querySnapshot = await itemsRef.get();
        let numRecords = querySnapshot.docs.length;
        console.log("test");
        let item = {
            id: numRecords + 1,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            // description: req.body.description
        };
        itemsRef.doc(item.id.toString()).set(item);
        res.send(item);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
});
app.get('/api/items', async (req, res) => {
    try{
        let querySnapshot = await itemsRef.get();
        res.send(querySnapshot.docs.map(doc => doc.data()));
    }catch(err){
        res.sendStatus(500);
    }
});
app.delete('/api/items/:id', async (req, res) => {
    try{
        let id = req.params.id;
        res.send(itemsRef.doc(id.toString()).delete());

    }
    catch(error){
        console.log(error);
        res.sendStatus(505);
    }
});
app.put('/api/items/:id', async (req, res) => {
    try{
        let id = req.params.id;
        itemsRef.doc(id).update({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
        });
        res.send(true);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
