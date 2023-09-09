import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfig from "../Helpers/AxiosConfig";

export const AddFriend = createAsyncThunk(
  "friedns/AddFriend",
  async ({ friendData }) => {
    try {
      const response = await AxiosConfig.post("/friends/AddFriend", friendData);
      return response.data;
    } catch (err) {
      console.warn(`Error in AddFriend Reducer ${err}`);
    }
  }
);

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
        state.userFriendList = action.payload
        state.status = 'accepted'
    })
    .addCase(AddFriend.pending, (state, action) => {
        state.status = 'addFriendPending'
    })
    .addCase(AddFriend.rejected, (state, action) => {
        state.status = 'rejected'
    })
  },
});

export default FriendsReducer.reducer;
