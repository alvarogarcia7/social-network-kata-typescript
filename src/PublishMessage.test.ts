import {Message, MessageRepository} from './domain'
import {PublishMessage} from './publishMessage'

describe('Publish Message', () => {
    it('add to an empty timeline', () => {

        const messageRepository: MessageRepository = {
            save: jest.fn((message) => true),
            load: jest.fn((user) => [])
        }

        const publishMessage = new PublishMessage(messageRepository)

        const answer = publishMessage.publish(new Message('' + 8))

        expect(messageRepository.save).toHaveBeenCalled()
        expect(answer).toBeTruthy()
    })
})
