type CallBack = () => void;

export class Eventing {
    events: { [key: string]: CallBack[] } = {};

    on = (eventName: string, callback: CallBack): void => {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    trigger = (eventName: string): void => {
        const handlers = this.events[eventName];

        if (!handlers || handlers.length === 0) {
            console.log('such event is not registered!');
            return;
        }

        handlers.forEach(action => action());
    }
}