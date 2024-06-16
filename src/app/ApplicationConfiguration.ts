import {User} from '../domain'

export interface ApplicationConfiguration {
    getLoggedInUser(): User | undefined
}
