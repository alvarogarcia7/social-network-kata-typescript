import {User} from './domain'

describe('User', () => {
    it('equality', () => {

        const user = new User('Alice')
        const anotherUser = new User('Alice')

        expect(user).toEqual(anotherUser)
    })
    it('not equality', () => {

        const user = new User('Alice')
        const anotherUser = new User('Bob')

        expect(user).not.toEqual(anotherUser)
    })
})
