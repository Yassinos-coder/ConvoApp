import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './UserReducer'
import FriendsReducer from './FriendsReducer'

const Store = configureStore({
    reducer : {
        UserReducer : UserReducer,
        FriendsReducer: FriendsReducer,
    }
})

export default Store