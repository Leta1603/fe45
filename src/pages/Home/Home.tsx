import { useEffect, useMemo, useState } from "react";

import Title from "src/components/Title";
import CardsList from "src/components/CardsList";
import TabsList from "src/components/TabsList";
import { TabsTypes } from "src/@types";

import styles from "./Home.module.scss";
import SelectedPostModal from "src/pages/Home/SelectedPostModal";
import SelectedImageModal from "./SelectedImageModal/SelectedImageModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyPosts,
  getPostList,
  PostSelectors,
} from "src/redux/reducers/postSlice";
import { authSelectors } from "src/redux/reducers/authSlice";

const Home = () => {
  const [activeTab, setActiveTab] = useState(TabsTypes.All);
  // const [isLoggedIn, setLoggedIn] = useState(false);
  // const [cardsList, setCardsList] = useState<PostsList>([]);
  const dispatch = useDispatch();
  const allPostsList = useSelector(PostSelectors.getPostList);
  const myPosts = useSelector(PostSelectors.getMyPosts);

  const isLoggedIn = useSelector(authSelectors.getLoggedIn);

  const tabsList = useMemo(
    () => [
      { key: TabsTypes.All, title: "All Posts", disabled: false },
      { key: TabsTypes.Popular, title: "Popular Posts", disabled: false },
      {
        key: TabsTypes.MyPosts,
        title: "My Posts",
        disabled: !isLoggedIn,
      },
    ],
    [isLoggedIn]
  );

  useEffect(() => {
    if (activeTab === TabsTypes.MyPosts) {
      dispatch(getMyPosts());
    } else {
      dispatch(getPostList());
    }
  }, [activeTab]);

  useEffect(() => {
    // setCardsList(MOCK_ARRAY);
    dispatch(getPostList());
  }, []);

  const onTabClick = (tab: TabsTypes) => () => {
    setActiveTab(tab);
    // if (tab === TabsTypes.Popular) {
    //   setLoggedIn(true);
    // }
  };

  const tabsContextSwitcher = () => {
    if (activeTab === TabsTypes.MyPosts) {
      return myPosts;
    } else {
      return allPostsList;
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
      <CardsList cardsList={tabsContextSwitcher()} />
      <SelectedPostModal />
      <SelectedImageModal />
    </div>
  );
};

export default Home;
