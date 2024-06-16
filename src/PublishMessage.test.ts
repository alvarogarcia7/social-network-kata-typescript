import {ApplicationConfiguration} from './app/ApplicationConfiguration'
import {Message, MessageRepository, User} from './Domain'
import {PublishMessage} from './PublishMessage'

export class InMemoryMessageRepositoryImpl implements MessageRepository {
    public load(targetUser: User): Message[] {
        return []
    }

    public save(message: Message): boolean {
        return false
    }
}

export class FakeApplicationConfiguration implements ApplicationConfiguration {
    private readonly user: User | undefined

    public constructor(user: User | undefined) {
        this.user = user
    }

    public getLoggedInUser(): User | undefined {
        return this.user
    }

}

describe('Publish Message', () => {
    it('add to an empty personal timeline', () => {

        const messageRepository = new InMemoryMessageRepositoryImpl()
        messageRepository.save = jest.fn((_) => true)
        const applicationConfiguration = new FakeApplicationConfiguration(new User('Alice'))

        const publishMessage = new PublishMessage(applicationConfiguration, messageRepository)

        const answer = publishMessage.publish(new Message(new User('Alice'), 'a message'))

        expect(messageRepository.save).toHaveBeenCalled()
        expect(answer).toBeTruthy()
    })

    it('add to an existing personal timeline', () => {

        const messageRepository = new InMemoryMessageRepositoryImpl()
        messageRepository.save(new Message(new User('Alice'), 'first message'))
        messageRepository.save = jest.fn((_) => true)
        const applicationConfiguration = new FakeApplicationConfiguration(new User('Alice'))

        const publishMessage = new PublishMessage(applicationConfiguration, messageRepository)

        const answer = publishMessage.publish(new Message(new User('Alice'), 'a message'))

        expect(messageRepository.save).toHaveBeenCalled()
        expect(answer).toBeTruthy()
    })

    it('Bob cannot add to Alice\'s to an existing personal timeline', () => {

        const messageRepository = new InMemoryMessageRepositoryImpl()
        messageRepository.save(new Message(new User('Alice'), 'first message'))
        messageRepository.save = jest.fn((_) => true)
        const applicationConfiguration = new FakeApplicationConfiguration(new User('Bob'))

        const publishMessage = new PublishMessage(applicationConfiguration, messageRepository)

        const answer = publishMessage.publish(new Message(new User('Alice'), 'a message'))

        expect(messageRepository.save).not.toHaveBeenCalled()
        expect(answer).toBeFalsy()
    })

    it('It is mandatory to be logged in to publish to an existing personal timeline', () => {

        const messageRepository = new InMemoryMessageRepositoryImpl()
        messageRepository.save(new Message(new User('Alice'), 'first message'))
        messageRepository.save = jest.fn((_) => true)
        const applicationConfiguration = new FakeApplicationConfiguration(undefined)

        const publishMessage = new PublishMessage(applicationConfiguration, messageRepository)

        const answer = publishMessage.publish(new Message(new User('Alice'), 'a message'))

        expect(messageRepository.save).not.toHaveBeenCalled()
        expect(answer).toBeFalsy()
    })
})
