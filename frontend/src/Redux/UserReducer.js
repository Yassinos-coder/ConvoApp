import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfig from "../Helpers/AxiosConfig";

export const AddNewUser = createAsyncThunk(
  "users/AddNewUser",
  async ({ newUser }) => {
    try {
      const response = await AxiosConfig.post(
        "/users/newUserCreation",
        newUser
      );
      return response.data;
    } catch (err) {
      console.warn(`Error in AddNewUser Reducer ${err.message}`);
    }
  }
);

export const UserLogin = createAsyncThunk(
  "users/UserLogin",
  async ({ loginData }) => {
    try {
      const respone = await AxiosConfig.post("/users/login", loginData);
      return respone.data;
    } catch (err) {
      console.warn(`Error in UserLogin Reducer ${err.message}`);
    }
  }
);

export const GetAllUsers = createAsyncThunk("users/GetAllUsers", async () => {
  try {
    const response = await AxiosConfig.get("/users/GetAllUsers");
    return response.data;
  } catch (err) {
    console.warn(`Error in GetAllUsers Reducer ${err}`);
  }
});

export const uploadProfilePicture = createAsyncThunk(
  "users/uploadProfilePicture",
  async ({ picture, uuid }) => {
    try {
      const response = await AxiosConfig.post(
        `/users/UpdateProfilePicture/${uuid}`,
        picture
      );
      return response.data;
    } catch (err) {
      console.warn(`Error in uploadProfilePicture Reducer ${err}`);
    }
  }
);

export const UpdateUsername = createAsyncThunk('users/UpdateUsername', async({username, uuid}) => {
  try {
    const response = await AxiosConfig.post(`/users/UpdateUsername/${uuid}`,username)
    return response.data
  } catch (err) {
    console.warn(`Error in UpdateUsername Reducer ${err}`)
  }
})

export const UpdateEmail = createAsyncThunk('users/UpdateEmail', async({email, uuid}) => {
  try {
    const response = await AxiosConfig.post(`/users/UpdateEmail/${uuid}`,email)
    return response.data
  } catch (err) {
    console.warn(`Error in UpdateEmail Reducer ${err}`)
  }
})

export const UpdatePassword = createAsyncThunk('users/UpdatePassword', async({password, uuid}) => {
  try {
    const response = await AxiosConfig.post(`/users/UpdatePassword/${uuid}`,password)
    return response.data
  } catch (err) {
    console.warn(`Error in UpdatePassword Reducer ${err}`)
  }
})

const UserReducer = createSlice({
  name: "UserHandler",
  initialState: {
    userData: [],
    AllUserData: [],
    userToken: "",
    status: "",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddNewUser.fulfilled, (state, action) => {
        state.AllUserData = [...state.AllUserData, action.payload.userData];
        state.status = action.payload.message;
      })
      .addCase(AddNewUser.pending, (state, action) => {
        state.status = "creationPending";
      })
      .addCase(AddNewUser.rejected, (state, action) => {
        state.status = action.payload.message;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        const userDataToStore = {
          ...action.payload.userData,
          password: undefined,
        };
        localStorage.setItem(
          "userData",
          JSON.stringify(userDataToStore)
        );
        state.userToken = action.payload.userToken;
        state.status = action.payload.message;
      })
      .addCase(UserLogin.pending, (state, action) => {
        state.status = "loginPending";
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.status = action.payload.message;
      })
      .addCase(GetAllUsers.fulfilled, (state, action) => {
        state.AllUserData = action.payload.AllUsers;
        state.status = action.payload.message;
      })
      .addCase(GetAllUsers.pending, (state) => {
        state.status = "pendingGetAllUsers";
      })
      .addCase(GetAllUsers.rejected, (state, action) => {
        state.status = action.payload.message;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.status = action.payload.message;
      })
      .addCase(uploadProfilePicture.pending, (state) => {
        state.status = "pendingUploadProfilePicture";
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.status = action.payload.message;
      })
      .addCase(UpdateUsername.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.status = action.payload.message;
      })
      .addCase(UpdateUsername.pending, (state) => {
        state.status = "pendingUpdateUsername";
      })
      .addCase(UpdateUsername.rejected, (state, action) => {
        state.status = action.payload.message;
      })
      .addCase(UpdateEmail.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.status = action.payload.message;
      })
      .addCase(UpdateEmail.pending, (state) => {
        state.status = "pendingUpdateEmail";
      })
      .addCase(UpdateEmail.rejected, (state, action) => {
        state.status = action.payload.message;
      })
      .addCase(UpdatePassword.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.status = action.payload.message;
      })
      .addCase(UpdatePassword.pending, (state) => {
        state.status = "pendingUpdatePassword";
      })
      .addCase(UpdatePassword.rejected, (state, action) => {
        state.status = action.payload.message;
      })
  },
});

export default UserReducer.reducer;
