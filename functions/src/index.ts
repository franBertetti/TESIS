import * as functions from 'firebase-functions';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

import * as admin from 'firebase-admin';
admin.initializeApp();

exports.newSubscriberNotification = functions.firestore
    .document('subscribers/{subscriptionId}')
    .onCreate(async event => {
        
    const data = event.data();

    const userId = data.userId
    const subscriber = data.subscriberId

    // Notification content
    const payload = {
      notification: {
          title: 'Tesis App A actualizado tu estado ! ',
          body: `Bienvenido ${subscriber},ya eres un conductor!`,
          icon: 'https://img.icons8.com/metro/1600/idea.png',
          sound: 'default'
      }
    }

    // ref to the device collection for the user
    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', userId)


    // get the user's tokens and send notifications
    const devices = await devicesRef.get();

    const tokens = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push( token )
    })

    return admin.messaging().sendToDevice(tokens, payload)

});



exports.nuevaNotificacionDeConductor = functions.firestore
    .document('conductores/{conductorId}')
    .onCreate(async event => {
        
    const data = event.data();

    const userId = data.userId
    const conductor = data.conductorId

    // Notification content
    const payload = {
      notification: {
          title: 'Tesis App te da la bienvenida como conductor ! ',
          body: `Bienvenido ${conductor},ya estas listo para brindar el servicio!`,
          icon: 'https://img.icons8.com/metro/1600/idea.png'
      }
    }

    // ref to the device collection for the user
    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', userId)


    // get the user's tokens and send notifications
    const devices = await devicesRef.get();

    const tokens = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push( token )
    })

    return admin.messaging().sendToDevice(tokens, payload)

});

exports.notificarEstadoConductor = functions.firestore
.document('conductores/{conductorId}')
.onUpdate(async event => {

  const data = event.after.data();

  const userId = data.userId
  const conductor = data.conductorId

   // Notification content
   const payload = {
    notification: {
        title: 'Tesis App te da la bienvenida como conductor ! ',
        body: `Bienvenido ${conductor},ya estas listo para brindar el servicio!`,
        icon: 'https://img.icons8.com/metro/1600/idea.png'
    }
  }

  const db = admin.firestore()
  const devicesRef = db.collection('devices').where('userId', '==', userId)

    // get the user's tokens and send notifications
    const devices = await devicesRef.get();

    const tokens = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push( token )
    })

    return admin.messaging().sendToDevice(tokens, payload)

});