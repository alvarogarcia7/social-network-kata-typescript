class Message {
    private message: string

    constructor(message: string) {
        this.message = message
    }
}

interface MessageRepository {
    save(message: Message): boolean
}

class PublishMessage {
    private messageRepository: MessageRepository

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository
    }

    public publish(message: Message): boolean {
        return this.messageRepository.save(message)
    }
}

describe('Publish Message', () => {
    it('add to an empty timeline', () => {

        const messageRepository: MessageRepository = {
            save: jest.fn((message) => true)
        }

        const publishMessage = new PublishMessage(messageRepository)

        const answer = publishMessage.publish(new Message('' + 8))

        expect(messageRepository.save).toHaveBeenCalled()
        expect(answer).toBeTruthy()
    })
})
