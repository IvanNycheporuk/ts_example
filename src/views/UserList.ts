import { IUserParams, User } from "../models/User";
import { CollectionView } from "./CollectionView";
import { UserShow } from './UserShow';

export class UserList extends CollectionView {
    renderItem(model: User, parentItem: Element): void {
        new UserShow(parentItem, model).render();
    }
}