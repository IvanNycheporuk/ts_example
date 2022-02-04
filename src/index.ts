import { User, IUserParams } from './models/User';
import { UserEdit } from './views/UserEdit';
import { UserForm } from './views/UserForm';
import { UserList } from './views/UserList';

// let test = User.buildUserCollection();

// test.on('fetch', () => {
//     console.log('data has been retrieved from server');
// });

// test.fetch();

let user = User.buildUser({ name: 'Test', age: 22 });

let collection = User.buildUserCollection();

collection.on('fetch', () => {
    let collectionView = new UserList(document.getElementById('app'), collection);

    collectionView.render();
})

collection.fetch();



// collection.fetch();
// console.log(collection);



// let uf = new UserEdit(document.getElementById('app'), user);

// uf.render();

// console.log(uf);

