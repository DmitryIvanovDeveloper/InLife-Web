import IDialogueItemModel from "../../../Business/Models/IDialogueItemModel";

export default class Database {
    public async Add(item: IDialogueItemModel) {

        try {
            await fetch('https://06ff-146-255-225-30.ngrok-free.app/api/levels/dialogue/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            })

            console.log("fetch");

        }
        catch (error) {
            console.log(error)
        }
    }

    public async Remove(id: string) {
        try {
            await fetch('https://06ff-146-255-225-30.ngrok-free.app/api/levels/dialogue/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id})
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}