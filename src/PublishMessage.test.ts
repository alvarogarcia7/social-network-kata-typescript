import {Message, MessageRepository, User} from './domain'
import {PublishMessage} from './publishMessage'

class InMemoryMessageRepositoryImpl implements MessageRepository {
    public load(targetUser: User): Message[] {
        return []
    }

    public save(message: Message): boolean {
        return false
    }
}

describe('Publish Message', () => {
    it('add to an empty timeline', () => {

        const messageRepository = new InMemoryMessageRepositoryImpl()
        messageRepository.save = jest.fn((_) => true)

        const publishMessage = new PublishMessage(messageRepository)

        const answer = publishMessage.publish(new Message('' + 8))

        expect(messageRepository.save).toHaveBeenCalled()
        expect(answer).toBeTruthy()
    })
})
