import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

interface UserParams {
    id?: number,
    name?: string,
    age?: number
}

export class User {
    public test: Eventing = new Eventing();
    public sync: Sync<UserParams> = new Sync<UserParams>('http://localhost:3000/users');
    public attributes: Attributes<UserParams>;

    constructor(attr: UserParams) {
        this.attributes = new Attributes(attr);
    }

    get on() {
        return this.test.on;
    }

    get get() {
        return this.attributes.get;
    }

    get trigger() {
        return this.test.trigger;
    }

    set(params: UserParams): void {
        this.attributes.set(params);

        this.trigger('set');
    }
}
