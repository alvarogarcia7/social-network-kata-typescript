import {
    Message,
    MessageRepository,
    Timeline,
    User,
    ViewTimeline,
    ViewTimelinePolicy,
    ViewTimelineRequest
} from './domain'
import {InMemoryMessageRepositoryImpl} from './PublishMessage.test';

describe('View Timeline', () => {
    it("Bob can view Alice's timeline", () => {
        const messageRepository: MessageRepository = new InMemoryMessageRepositoryImpl()
        messageRepository.load = jest.fn((_) => [
            new Message(new User('Alice'), 'hola mundo'),
            new Message(new User('Alice'), 'mi segundo tweet')]);

        const viewTimelinePolicy: ViewTimelinePolicy = {
            isAllowedTo: jest.fn((_1, _2) => true)
        }

        const viewTimeline = new ViewTimeline(messageRepository, viewTimelinePolicy)

        const userBob = new User('bob')
        const userAlice = new User('alice')
        const answer = viewTimeline.view(new ViewTimelineRequest(userBob, userAlice))

        expect(answer).toEqual(new Timeline(
            new Message(new User('Alice'), 'hola mundo'),
            new Message(new User('Alice'), 'mi segundo tweet'),
        ))
    })

    it("Bob cannot view Alice's timeline when not allowed", () => {
        const messageRepository: MessageRepository = new InMemoryMessageRepositoryImpl()
        messageRepository.load = jest.fn((_) => [
            new Message(new User('Alice'), 'hola mundo'), new Message(new User('Alice'), 'mi segundo tweet')]);

        const viewTimelinePolicy: ViewTimelinePolicy = {
            isAllowedTo: jest.fn((_1, _2) => false)
        }

        const viewTimeline = new ViewTimeline(messageRepository, viewTimelinePolicy)

        const userBob = new User('bob')
        const userAlice = new User('alice')
        const answer = viewTimeline.view(new ViewTimelineRequest(userBob, userAlice))

        expect(answer).toBeFalsy()
    })
})
