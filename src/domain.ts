export class Message {
    private message: string

    constructor(message: string) {
        this.message = message
    }
}

export interface MessageRepository {
    save(message: Message): boolean

    load(targetUser: User): Message[]
}

export class ViewTimelineRequest {
    public requester: User
    public targetUser: User

    constructor(requester: User, targetUser: User) {
        this.requester = requester
        this.targetUser = targetUser

    }

}

export class User {
    private username: string

    constructor(username: string) {
        this.username = username
    }

}

export interface ViewTimelinePolicy {
    isAllowedTo(requester: User, targetUser: User): boolean
}

export class Timeline {
    private messages: Message[]

    constructor(...messages: Message[]) {
        this.messages = messages
    }
}

export class ViewTimeline {
    private messageRepository: MessageRepository
    private viewTimelinePolicy: ViewTimelinePolicy

    constructor(messageRepository: MessageRepository, viewTimelinePolicy: ViewTimelinePolicy) {
        this.messageRepository = messageRepository
        this.viewTimelinePolicy = viewTimelinePolicy
    }

    public view(viewTimelineRequest: ViewTimelineRequest): Timeline {
        if (this.viewTimelinePolicy.isAllowedTo(viewTimelineRequest.requester, viewTimelineRequest.targetUser)) {
            return new Timeline(
                ...this.messageRepository.load(viewTimelineRequest.targetUser)
            )
        }
    }
}