import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "src/redux/store";
import { Post } from "src/@types";

type InitialState = {
  isSelectedPostModalOpened: boolean;
  selectedPost: Post | null;
};

const initialState: InitialState = {
  isSelectedPostModalOpened: false,
  selectedPost: null,
};

const postSlice = createSlice({
  name: "postReducer",
  initialState,
  reducers: {
    setSelectedPostModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isSelectedPostModalOpened = action.payload; //тут данные ловятся и кладутся на нужное место
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  }, // вот тут живут функции, которые ловят экшены по типу(т.е. по названию ф-и)
});

export const { setSelectedPostModalOpened, setSelectedPost } = postSlice.actions;
// а вот тут живут сами экшены, которые рождаются библиотекой исходя
// из названия ф-ии, которая их ловит

export const PostSelectors = {
  getSelectedPostModalOpened: (state: RootState) => state.postReducer.isSelectedPostModalOpened,
  getSelectedPost: (state: RootState) => state.postReducer.selectedPost,
};
// вот отсюда мы достаем данные, которые заранее видоизменили снежками (экшенами)

export default postSlice.reducer; // это мы группу функций экспортируем единым объектом
// чтобы потом запихнуть в store и чтобы редакс видел, куда ему дальше
// распределять экшены (снежки)
