import {
    Message,
    MessageRepository,
    Timeline,
    User,
    ViewTimeline,
    ViewTimelinePolicy,
    ViewTimelineRequest
} from './domain'

describe('View Timeline', () => {
    it("Bob can view Alice's timeline", () => {

        const messageRepository: MessageRepository = {
            save: jest.fn((message) => true)
        }

        const viewTimelinePolicy: ViewTimelinePolicy = {
            isAllowedTo: jest.fn((_1, _2) => true)
        }

        const viewTimeline = new ViewTimeline(messageRepository, viewTimelinePolicy)

        const userBob = new User('bob')
        const userAlice = new User('alice')
        const answer = viewTimeline.view(new ViewTimelineRequest(userBob, userAlice))

        expect(answer).toEqual(new Timeline(
            new Message('hola mundo'),
            new Message('mi segundo tweet'),
        ))
    })
})
