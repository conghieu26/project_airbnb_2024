import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILocationItem } from "../../constant/constant";
import { axiosInterceptorWithCybertoken } from "../../services/services";
export interface ILocationState {
  inspectOfSearchPage: ILocationItem[];
  listRoomByIdLocation: [];
}

export const getInspectOfSearchPage = createAsyncThunk(
  "locationSlice/getInspectOfSearchPage",
  async () => {
    try {
      const resp = await axiosInterceptorWithCybertoken.get("/api/vi-tri/");
      console.log(resp);
      return resp;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getListRoomByIdLocation = createAsyncThunk(
  "locationSlice/getListRoomByIdLocation",
  async (id: string | undefined) => {
    try {
      const resp = await axiosInterceptorWithCybertoken.get(
        `/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`,
      );
      return resp;
    } catch (error) {
      console.log(error);
    }
  },
);

const initialState: ILocationState = {
  inspectOfSearchPage: [],
  listRoomByIdLocation: [],
};

export const locationSlice = createSlice({
  name: "locationSlice",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getInspectOfSearchPage.fulfilled, (state, action) => {
      state.inspectOfSearchPage = action.payload?.data;
    });
    build.addCase(getListRoomByIdLocation.fulfilled, (state, action) => {
      state.listRoomByIdLocation = action.payload?.data;
    });
  },
});

export default locationSlice.reducer;
