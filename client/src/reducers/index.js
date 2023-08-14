import { combineReducers } from 'redux'
import trains from './trains'
import users from './users'

export default combineReducers({
    trains: trains,
    users: users
})
