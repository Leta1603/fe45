import { ReactElement } from "react";

export interface Post {
  id: number;
  image: string;
  text?: string;
  date: string;
  lesson_num: number;
  title: string;
  description: string;
  author?: number;
}
export type PostsList = Post[];

export enum TabsTypes {
  All = "all",
  MyPosts = "myPosts",
  Favourite = "favourite",
}

export type Tab = {
  key: TabsTypes;
  title: string;
  disabled: boolean;
};
export type TabsListType = Tab[];

export type Children = ReactElement | ReactElement[];

export enum Theme {
  Light = "light",
  Dark = "dark",
}

export enum LikeStatus {
  Like = "like",
  Dislike = "dislike",
}

export enum FavouriteStatus {
  Favourite = "favourite",
  NotFavourite = "notFavourite",
}

export enum Order {
  Date = "date",
  Title = "title",
}
