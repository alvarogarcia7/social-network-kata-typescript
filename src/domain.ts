export class Message {
    private message: string

    constructor(message: string) {
        this.message = message
    }
}

export interface MessageRepository {
    save(message: Message): boolean
}

