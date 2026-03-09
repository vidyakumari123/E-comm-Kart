import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser } from "./authAPI";
import { updateUser } from '../user/userAPI'
import { signOut } from "./authAPI";
const initialState = {
  loggedInUser: JSON.parse(localStorage.getItem("user")) || null,
  // loggedInUser: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  },
);

// export const checkUserAsync = createAsyncThunk(
//   "user/checkUser",
//   async (loginInfo) => {

//       const response = await checkUser(loginInfo);
//       return response;

//   }
// );
export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(loginInfo);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// export const updateUserAsync = createAsyncThunk(
//   "user/updateUser",
//   async (update, { rejectWithValue }) => {
//     try {
//       const response = await updateUser(update);
//       return response;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   },
// );

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update, { rejectWithValue }) => {
    try {
      const response = await updateUser(update);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);


export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async () => {
    const response = await signOut();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })

      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload.data;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })

      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        // state.error=action.error
        state.error = { message: action.payload };
      })

      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })

      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload.data;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
