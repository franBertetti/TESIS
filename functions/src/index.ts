import * as functions from 'firebase-functions';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
import * as admin from 'firebase-admin';
admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  console.log('hello');
  response.send("Hello from Firebase!");
});


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

      tokens.push(token)
    })

    return admin.messaging().sendToDevice(tokens, payload)

  });

  exports.setConfirmacionRechazadaSolicitudReserva = functions.firestore
  .document('reservaAnticipada/{idCliente}')
  .onCreate(async event => {

    const data = event.data();

    const rta = data.rta;
    const nombreConductor = data.nombreConductor;
    const idCliente = data.idCliente;
    const fecha = data.fecha;
    const hora = data.hora;
    const numContratacion = data.numContratacion;
    // Notification content
    const payload = {
      notification: {
        title: `Desafortunadamente ${nombreConductor} rechazo su solicitud !`,
        body: ` La solicitud nro ${numContratacion} del día ${fecha} a las ${hora} fue rechazada, deberas crear una nueva solicitud.`,
        icon: 'https://img.icons8.com/metro/1600/idea.png',
        sound: 'default'
      }
    }

    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', idCliente)

    // get the user's tokens and send nottifications
    const devices = await devicesRef.get();

    const tokens = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push(token)
    })
    if (rta === 'Cancelada') {
      return admin.messaging().sendToDevice(tokens, payload)
    }
    return 'bebelo con soda';

  })

exports.setConfirmacionAceptadaSolicitudReserva = functions.firestore
  .document('reservaAnticipada/{idCliente}')
  .onCreate(async event => {

    const data = event.data();

    const rta = data.rta;
    const nombreConductor = data.nombreConductor;
    const idCliente = data.idCliente;
    const fecha = data.fecha;
    const hora = data.hora;
    const numContratacion = data.numContratacion;
    // Notification content
    const payload = {
      notification: {
        title: `Enhorabuena! ${nombreConductor} acepto su solicitud !`,
        body: ` La solicitud nro ${numContratacion} del día ${fecha} a las ${hora} fue aceptada!`,
        icon: 'https://img.icons8.com/metro/1600/idea.png',
        sound: 'default'
      }
    }

    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', idCliente)

    // get the user's tokens and send nottifications
    const devices = await devicesRef.get();

    const tokens = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push(token)
    })
    if (rta === 'Aceptada') {
      return admin.messaging().sendToDevice(tokens, payload)
    }
    return 'bebelo con soda';

  })

exports.enviarSolicitudReservaAnticipada = functions.firestore
  .document('solicitudDeReserva/{idConductor}')
  .onCreate(async event => {

    const data = event.data();

    const direccionDeBusqueda = data.direccionDeBusqueda;
    const nombreCliente = data.nombreCliente;
    const idConductor = data.idConductor;
    const fecha = data.fecha;
    const hora = data.hora;
    // Notification content
    const payload = {
      notification: {
        title: 'Tienes un pasajero que desea contratarte!',
        body: `El cliente ${nombreCliente} desea que el día ${fecha} a las ${hora} lo busques en ${direccionDeBusqueda}. Confirma si estas disponible o no !`,
        icon: 'https://img.icons8.com/metro/1600/idea.png',
        sound: 'default'
      }
    }

    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', idConductor)

    // get the user's tokens and send nottifications
    const devices = await devicesRef.get();

    const tokens = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push(token)
    })

    return admin.messaging().sendToDevice(tokens, payload)

  });

exports.notificarReservaViajeInmediato = functions.firestore
  .document('reservaInmediata/{idConductor}')
  .onCreate(async event => {

    const data = event.data();

    const direccionDeBusqueda = data.direccionDeBusqueda;
    const nombreCliente = data.nombreCliente;
    const idConductor = data.idConductor;

    // Notification content
    const payload = {
      notification: {
        title: 'Tienes un pasajero esperando por ti!',
        body: `El cliente ${nombreCliente} te esta esperando en ${direccionDeBusqueda}. Andando !`,
        icon: 'https://img.icons8.com/metro/1600/idea.png',
        sound: 'default'
      }
    }

    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', idConductor)

    // get the user's tokens and send nottifications
    const devices = await devicesRef.get();

    const tokens = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push(token)
    })

    return admin.messaging().sendToDevice(tokens, payload)

  });


exports.notificarEstadoNoAprobadoConductor = functions.firestore
  .document('conductores/{userId}')
  .onUpdate(async event => {

    const data = event.after.data();

    const userId = data.userId
    const estado = data.estado
    const nombre = data.nombre

    // Notification content
    const payload = {
      notification: {
        title: 'Tu solicitud de conductor fue denegada..',
        body: `Ups, lo sentimos ${nombre},pero parece que la información no es correcta. Cualquier inquietud puedes ponerte en contacto con nosotros a pickApp@contacto.com.ar.`,
        icon: 'https://img.icons8.com/metro/1600/idea.png',
        sound: 'default'
      }
    }

    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', userId)

    // get the user's tokens and send nottifications
    const devices = await devicesRef.get();

    const tokens = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push(token)
    })

    if (estado === 'NoAprobado') {
      return admin.messaging().sendToDevice(tokens, payload)
    }
    return 'bebelo con soda';

  });

exports.notificarEstadoAprobadoConductor = functions.firestore
  .document('conductores/{userId}')
  .onUpdate(async event => {

    const data = event.after.data();

    const userId = data.userId
    const estado = data.estado
    const nombre = data.nombre

    // Notification content
    const payload = {
      notification: {
        title: 'PickApp te da la bienvenida como conductor ! ',
        body: `Bienvenido ${nombre},has sido autorizado para ser conductor!`,
        icon: 'https://img.icons8.com/metro/1600/idea.png',
        sound: 'default'
      }
    }

    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', userId)

    // get the user's tokens and send nottifications
    const devices = await devicesRef.get();

    const tokens = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push(token)
    })

    if (estado === 'Aprobado') {
      return admin.messaging().sendToDevice(tokens, payload)
    }
    return 'No es aprobado';


  });