import { IUserParams, User } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, IUserParams> {
    eventsMap(): { [key: string]: () => void } {
        return {
            'click:._set-age': this.onSetAgeClick,
            'click:._change-name': this.onChangeNameClick,
            'click:._save-data': this.onSaveData
        }
    }

    onSetAgeClick = (): void => {
        this.setRadomAge();
    }

    onChangeNameClick = (): void => {
        const name = this.parent.querySelector('input')?.value;

        if (!name) {
            console.log('name cant be null');
            return;
        }

        this.userModel.set({ name });
    }

    onSaveData = (): void => {
        this.userModel.save();
    }

    template(): string {
        return `
            <div>                
                <input placeholder="name" />
                <button class="_change-name">update name</button>
                <button class="_set-age">click me</button>
                <button class="_save-data">save data</button>
            </div>
        `;
    }

    setRadomAge() {
        const age = Math.floor(Math.random() * 100);

        this.userModel.set({ age });
    }
}