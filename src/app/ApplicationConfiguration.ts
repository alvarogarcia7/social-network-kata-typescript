import {User} from '../Domain'

export interface ApplicationConfiguration {
    getLoggedInUser(): User | undefined
}
