export class Message {
    private readonly author: User
    private readonly message: string

    constructor(author: User, message: string) {
        this.author = author
        this.message = message
    }

    get getAuthor(): User {
        return this.author
    }

    get getMessage(): string {
        return this.message
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
    private readonly username: string

    constructor(username: string) {
        this.username = username
    }

    public equals(another: object) {
        if (this === another) {
            return true
        }
        if (another === undefined) {
            return false
        }
        if (this.constructor !== another.constructor) {
            return false
        }
        if (!(another instanceof User)) {
            return false
        }
        return this.username === another.username
    }
}

export interface ViewTimelinePolicy {
    isAllowedTo(requester: User, targetUser: User): boolean
}

export class Timeline {
    private readonly messages: Message[]

    constructor(...messages: Message[]) {
        this.messages = messages
    }
}

export class ViewTimeline {
    private readonly messageRepository: MessageRepository
    private readonly viewTimelinePolicy: ViewTimelinePolicy

    constructor(messageRepository: MessageRepository, viewTimelinePolicy: ViewTimelinePolicy) {
        this.messageRepository = messageRepository
        this.viewTimelinePolicy = viewTimelinePolicy
    }

    public view(viewTimelineRequest: ViewTimelineRequest): Timeline | undefined {
        if (this.viewTimelinePolicy.isAllowedTo(viewTimelineRequest.requester, viewTimelineRequest.targetUser)) {
            return new Timeline(
                ...this.messageRepository.load(viewTimelineRequest.targetUser)
            )
        }
        return undefined
    }
}
