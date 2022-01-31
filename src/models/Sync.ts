import axios, { AxiosPromise, AxiosResponse } from 'axios';

interface IHasId {
    id?: number;
}

export class Sync<T extends IHasId> {
    constructor(public rooutUrl: string) { }

    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rooutUrl}/${id}`);
    }

    save(data: T): AxiosPromise {
        const { id } = data;

        if (id) {
            return axios.put(`${this.rooutUrl}/${id}`, data);
        }

        return axios.post(`${this.rooutUrl}/users`, data);
    }
}