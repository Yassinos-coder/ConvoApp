import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfig from "../Helpers/AxiosConfig";

export const GetMessages = createAsyncThunk(
  "dms/GetMessages",
  async ({ fetchData }) => {
    try {
      const response = await AxiosConfig.get(
        `/dms/GetMessages/${fetchData.from}/${fetchData.to}`
      );
      return response.data;
    } catch (err) {
      console.warn(`Error in GetMessage Reducer ${err}`);
    }
  }
);

export const SendMessage = createAsyncThunk(
  "dms/SendMessage",
  async ({ dataDM }) => {
    try {
      const response = await AxiosConfig.post("/dms/SendMessage", dataDM);
      return response.data;
    } catch (err) {
      console.warn(`Error in SendMessage Reducer ${err}`);
    }
  }
);

export const PurgeMessages = createAsyncThunk(
  "dms/PurgeMessages",
  async ({ purgeData }) => {
    try {
      const response = await AxiosConfig.post("/dms/purgeData", purgeData);
      return response.data;
    } catch (err) {
      console.warn(`Error in PurgeMessages ${err}`);
    }
  }
);

const MessageReducer = createSlice({
  name: "MessageHandler",
  initialState: {
    userMessages: [],
    status: "",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetMessages.fulfilled, (state, action) => {
        state.userMessages = action.payload.messagesData;
        state.status = action.payload.message;
      })
      .addCase(GetMessages.pending, (state) => {
        state.status = "GetMessagesPending";
      })
      .addCase(GetMessages.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(SendMessage.fulfilled, (state, action) => {
        state.userMessages = [
          ...state.userMessages,
          action.payload.newMessageData,
        ];
        state.status = action.payload.message;
      })
      .addCase(SendMessage.pending, (state) => {
        state.status = "GetMessagesPending";
      })
      .addCase(SendMessage.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(PurgeMessages.fulfilled, (state, action) => {
        state.userMessages = [
          ...state.userMessages,
          action.payload.newMessagesAfterPurge,
        ];
        state.status = action.payload.message;
      })
      .addCase(PurgeMessages.pending, (state) => {
        state.status = "GetMessagesPending";
      })
      .addCase(PurgeMessages.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default MessageReducer.reducer;
