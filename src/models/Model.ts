import { AxiosPromise } from "axios";

type CallBack = () => void;

interface IEvents {
    on(eventName: string, callback: CallBack): void;
    trigger(eventName: string): void;
}

interface ISync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface IAttributes<T> {
    get<K extends keyof T>(propName: K): T[K];

    set(update: T): void;

    getAll(): T;
}

interface IHasId {
    id?: number
}

export class Model<T extends IHasId> {
    constructor(
        private events: IEvents,
        private apiSync: ISync<T>,
        private attributes: IAttributes<T>,
    ) { }

    on = this.events.on;

    get = this.attributes.get;

    trigger = this.events.trigger;

    set(params: T): void {
        this.attributes.set(params);

        this.trigger('set');
    }

    fetch(): void {
        const id = this.get('id');

        if (!id) {
            console.error('no such id');
            return;
        }

        this.apiSync.fetch(id)
            .then(res => {
                this.set(res.data);
                console.log(this.attributes)
            });
    }

    save(): void {
        this.apiSync.save(this.attributes.getAll())
            .then(res => this.trigger('save'))
            .catch(err => this.trigger('error_save'));
    }
}