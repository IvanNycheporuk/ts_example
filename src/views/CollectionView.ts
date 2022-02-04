import { Collection } from "../models/Collection";
import { IUserParams, User } from "../models/User";

export abstract class CollectionView {
    constructor(public parent: Element, public collection: Collection<User, IUserParams>) {
    }

    render() {
        let wrapper = document.createElement('fragment');

        this.collection.models.forEach(model => {
            let innerDiv = document.createElement('div');

            this.renderItem(model, innerDiv);

            wrapper.appendChild(innerDiv);
        });

        this.parent.appendChild(wrapper);

    }

    abstract renderItem(model: User, parentItem: Element): void;
}