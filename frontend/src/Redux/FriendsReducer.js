import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfig from "../Helpers/AxiosConfig";

export const AddFriend = createAsyncThunk(
  "friends/AddFriend",
  async ({ friendData }) => {
    try {
      const response = await AxiosConfig.post("/friends/AddFriend", friendData);
      return response.data;
    } catch (err) {
      console.warn(`Error in AddFriend Reducer ${err}`);
    }
  }
);

export const GetFriends = createAsyncThunk('friends/GetFriends', async({uuid}) => {
  try {
    const response = await AxiosConfig.get(`/friends/GetFriendList/${uuid}`)
    return response.data
  } catch (err) {
    console.warn(`Error in GetFriends Reducer ${err}`)
  }
} )

const FriendsReducer = createSlice({
  name: "FriendsHandler",
  initialState: {
    userFriendList: [],
    status: "",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(AddFriend.fulfilled, (state, action) => {
        state.userFriendList = [...state.userFriendList, action.payload.userFriendList]
        state.status = 'accepted'
    })
    .addCase(AddFriend.pending, (state, action) => {
        state.status = 'addFriendPending'
    })
    .addCase(AddFriend.rejected, (state, action) => {
        state.status = 'rejected'
    })
    .addCase(GetFriends.fulfilled, (state, action) => {
      state.userFriendList = action.payload.userFriendList
      state.status = 'accepted'
  })
  .addCase(GetFriends.pending, (state) => {
      state.status = 'GetFriendsPending'
  })
  .addCase(GetFriends.rejected, (state) => {
      state.status = 'rejected'
  })
  },
});

export default FriendsReducer.reducer;
