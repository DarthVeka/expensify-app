const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve({
        //     message: 'This is my resolved data',
        //     code: 200
        // });
        reject('belaj!!!');
    }, 3500);
});

console.log('before');

promise.then((data) => {
    console.log(data);
}).catch((err) => {
    console.log('error: ', err);
});

console.log('after');
