import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Title from "src/components/Title";
import CardsList from "src/components/CardsList";
import TabsList from "src/components/TabsList";
import { Order, TabsTypes } from "src/@types";
import SelectedPostModal from "src/pages/Home/SelectedPostModal";
import SelectedImageModal from "./SelectedImageModal/SelectedImageModal";
import {
  getMyPosts,
  getPostsList,
  PostSelectors,
} from "src/redux/reducers/postSlice";
import { authSelectors } from "src/redux/reducers/authSlice";
import { PER_PAGE } from "src/utils/constants";
import Paginate from "src/components/Pagination";
import Button, { ButtonTypes } from "src/components/Button";

import styles from "./Home.module.scss";

const Home = () => {
  const [activeTab, setActiveTab] = useState(TabsTypes.All);
  const [ordering, setOrdering] = useState("");
  const dispatch = useDispatch();
  const allPostsList = useSelector(PostSelectors.getPostsList);
  const myPosts = useSelector(PostSelectors.getMyPosts);
  const favouritePosts = useSelector(PostSelectors.getFavouritePosts);
  const totalCount = useSelector(PostSelectors.getTotalPostsCount);
  const isListLoading = useSelector(PostSelectors.getPostsListLoading);

  const isLoggedIn = useSelector(authSelectors.getLoggedIn);

  const tabsList = useMemo(
    () => [
      { key: TabsTypes.All, title: "All Posts", disabled: false },
      { key: TabsTypes.Favourite, title: "Favourite Posts", disabled: false },
      {
        key: TabsTypes.MyPosts,
        title: "My Posts",
        disabled: !isLoggedIn,
      },
    ],
    [isLoggedIn]
  );

  //текущая страница, на которой мы находимся
  const [currentPage, setCurrentPage] = useState(1);

  //сколько итого у нас страниц
  const pagesCount = useMemo(
    () => Math.ceil(totalCount / PER_PAGE),
    [totalCount]
  );

  useEffect(() => {
    if (activeTab === TabsTypes.MyPosts) {
      dispatch(getMyPosts());
    } else {
      // сколько надо пропустить постов (сколько мы уже посмотрели)
      const offset = (currentPage - 1) * PER_PAGE;
      dispatch(getPostsList({ offset, isOverwrite: true, ordering }));
    }
  }, [currentPage, activeTab, ordering]);

  const onTabClick = (tab: TabsTypes) => () => {
    setActiveTab(tab);
  };

  const tabsContextSwitcher = () => {
    if (activeTab === TabsTypes.MyPosts) {
      return myPosts;
    } else if (activeTab === TabsTypes.Favourite) {
      return favouritePosts;
    } else {
      return allPostsList;
    }
  };

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  const onSortBtnClick = (btn: Order) => () => {
    if (btn === ordering) {
      setOrdering("");
      setCurrentPage(1);
    } else {
      setOrdering(btn);
    }
  };

  return (
    <div>
      <Title title={"Blog"} className={styles.pageTitle} />
      <TabsList
        tabsList={tabsList}
        activeTab={activeTab}
        onTabClick={onTabClick}
      />
      <div className={styles.containerButton}>
        <Button
          className={styles.buttonSort}
          type={
            ordering === Order.Date
              ? ButtonTypes.Primary
              : ButtonTypes.Secondary
          }
          title={"Date"}
          onClick={onSortBtnClick(Order.Date)}
        />
        <Button
          className={styles.buttonSort}
          type={
            ordering === Order.Title
              ? ButtonTypes.Primary
              : ButtonTypes.Secondary
          }
          title={"Title"}
          onClick={onSortBtnClick(Order.Title)}
        />
      </div>
      <CardsList
        cardsList={tabsContextSwitcher()}
        isListLoading={isListLoading}
      />
      <Paginate
        pagesCount={pagesCount}
        onPageChange={onPageChange}
        currentPage={currentPage}
      />
      <SelectedPostModal />
      <SelectedImageModal />
    </div>
  );
};

export default Home;
