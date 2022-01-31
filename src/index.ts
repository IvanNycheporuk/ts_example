import { User } from './models/User';

let user = new User({ id: 13, name: 'mbnvasdasdas', age: 12 });

user.on('test', () => {
    console.log('test');
});

console.log(user.get('age'));

user.trigger('test');

console.log(user);

