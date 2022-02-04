import { IUserParams, User } from "../models/User";
import { View } from "./View";

export class UserShow extends View<User, IUserParams> {
    public template(): string {
        return `
            <div>
            <h1>User Form</h1>
            <p>User name is ${this.userModel.get('name')}</p>
            <p>User age is ${this.userModel.get('age')}</p>
            </div>
        `
    }
}