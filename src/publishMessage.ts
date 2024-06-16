import {ApplicationConfiguration} from './app/ApplicationConfiguration'
import {Message, MessageRepository} from './domain'

export class PublishMessage {
    private messageRepository: MessageRepository
    private applicationConfiguration: ApplicationConfiguration;

    constructor(applicationConfiguration: ApplicationConfiguration, messageRepository: MessageRepository) {
        this.applicationConfiguration = applicationConfiguration;
        this.messageRepository = messageRepository
    }

    public publish(message: Message): boolean {
        return this.messageRepository.save(message)
    }
}