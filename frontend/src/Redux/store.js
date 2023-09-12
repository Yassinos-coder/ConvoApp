import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './UserReducer'
import FriendsReducer from './FriendsReducer'
import MessageReducer from './MessageReducer'

const Store = configureStore({
    reducer : {
        UserReducer : UserReducer,
        FriendsReducer: FriendsReducer,
        MessageReducer: MessageReducer,
    }
})

export default Store