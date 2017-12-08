//
// Object destructuring
//

// const person = {
//     name: 'Isus',
//     age: 27,
//     location: {
//         city: 'Betlehem',
//         temp: 36
//     }
// }
// const { name: firstName = 'Unknown', age, location } = person;
// const { city, temp: temperature } = person.location;

// console.log(`${firstName} is ${age}.`);
// console.log(`${city} is like ${temperature}`);
// console.log(`${name}`);


//
// Array destructuring
//
const address = ['Podgradina bb', '72250', 'Vitez', 'Federacija', 'Bosna i Hercegovina'];

const [street, , city, , country, continent = 'Europe'] = address;

console.log(`You are in ${city}, and the address is following ${street} ${country} ${continent}`);