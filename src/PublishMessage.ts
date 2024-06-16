import {ApplicationConfiguration} from './app/ApplicationConfiguration'
import {Message, MessageRepository} from './Domain'

export class PublishMessage {
    private readonly messageRepository: MessageRepository
    private readonly applicationConfiguration: ApplicationConfiguration

    constructor(applicationConfiguration: ApplicationConfiguration, messageRepository: MessageRepository) {
        this.applicationConfiguration = applicationConfiguration
        this.messageRepository = messageRepository
    }

    public publish(message: Message): boolean {
        if (message.getAuthor.equals(this.applicationConfiguration.getLoggedInUser())) {
            return this.messageRepository.save(message)
        }
        return false
    }
}