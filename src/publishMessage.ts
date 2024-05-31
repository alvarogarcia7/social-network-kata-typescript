import {Message, MessageRepository} from './domain'

export class PublishMessage {
    private messageRepository: MessageRepository

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository
    }

    public publish(message: Message): boolean {
        return this.messageRepository.save(message)
    }
}