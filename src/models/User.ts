import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
import { Model } from './Model';
import { Collection } from './Collection';

export interface IUserParams {
    id?: number,
    name?: string,
    age?: number
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<IUserParams> {
    static buildUser(data: IUserParams): User {
        return new User(
            new Eventing(),
            new ApiSync<IUserParams>(rootUrl),
            new Attributes<IUserParams>(data)
        )
    }

    static buildUserCollection() {
        return new Collection<User, IUserParams>(rootUrl, User.buildUser);
    }
}
