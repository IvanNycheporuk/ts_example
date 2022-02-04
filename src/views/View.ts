import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K> {
    public regions: { [key: string]: Element } = {};

    constructor(public parent: Element, public userModel: T) {
        this.bindModel();
    }

    abstract template(): string;

    bindEvent(fragment: DocumentFragment) {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [event, elem] = eventKey.split(':');

            fragment.querySelectorAll(elem).forEach(elem => elem.addEventListener(event, eventsMap[eventKey]));
        }
    }

    bindModel(): void {
        this.userModel.on('set', () => {
            this.render();
        })
    }

    eventsMap(): { [key: string]: () => void } {
        return {};
    }

    regionsMap(): { [key: string]: string } {
        return {}
    }

    mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap();

        for (let key in regionsMap) {
            const selector = regionsMap[key];
            const element = fragment.querySelector(selector);

            if (element) {
                this.regions[key] = element;
            }
        }
    }

    onRender(): void {

    }

    render(): void {
        let template = document.createElement('template');
        template.innerHTML = this.template();

        this.bindEvent(template.content);

        this.mapRegions(template.content);

        this.parent.innerHTML = '';

        this.onRender();

        this.parent.appendChild(template.content);
    }
}