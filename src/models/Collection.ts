import axios, { AxiosResponse } from 'axios';

import { Eventing } from "./Eventing";

export class Collection<T, K> {
    models: T[] = [];
    events: Eventing = new Eventing();

    constructor(
        public rooutUrl: string,
        public desirealize: (json: K) => T
    ) { }

    get on() {
        return this.events.on
    }

    get trigger() {
        return this.events.trigger
    }

    fetch(): void {
        axios.get(this.rooutUrl)
            .then((res: AxiosResponse) => {
                res.data.forEach((element: K) => {
                    this.models.push(this.desirealize(element));
                });

                this.trigger('fetch');
            });
    }
}