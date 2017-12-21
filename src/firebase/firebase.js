import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { firebase, googleProvider, facebookProvider, database as default };




// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses')
// .on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expenses);
// });

// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });
//         console.log(expenses);
//     });

// database.ref('expenses').push({
//     description: 'Rent',
//     note: '',
//     amount: 600,
//     createdAt: 100000
// })


// database.ref('notes').push({
//     title: 'first note',
//     body: 'This is my note'
// })

// database.ref('notes/-L0F2bywBGr8Ykcocpfv').remove();

// const firebaseNotes = {
//     notes: {
//         skldfkls: {
//             title: 'first note',
//             body: 'This is my note'
//         },
//         oinsdfwoei: {
//             title: 'second note',
//             body: 'This is my second note'
//         }
//     }
// }

// const notes = [{
//     id: 12,
//     title: 'first note',
//     body: 'This is my note'
// },{
//     id: 13,
//     title: 'second note',
//     body: 'This is my second note'
// }];

// database.ref('notes').set(notes);

// database.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
//   })

// database.ref('location/city')
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     }).catch((err) => {
//             console.log('Fetching data failed', err);
//     });

// database.ref().set({
//     name: 'Veka',
//     age: 27,
//     stressLevel: 6,
//     job: {
//         title: 'Software developer',
//         company: 'Google'
//     },
//     location: {
//         city: 'Vitez',
//         country: 'BiH'
//     }
// }).then(() => {
//     console.log('Data is saved!');
// }).catch((err) => {
//     console.log('This failed.', err);
// });

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seatle'
// });

// database.ref('isSingle')
//     .remove()
//     .then(() => {
//         console.log('Data removed');        
//     })
//     .catch((err) => {
//         console.log('Did not remove data', err);
//     });
