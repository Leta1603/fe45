import { useEffect, useMemo, useState } from "react";

import Title from "src/components/Title";
import CardsList from "src/components/CardsList";
import TabsList from "src/components/TabsList";
import { PostsList, TabsTypes } from "src/@types";

import styles from "./Home.module.scss";
import SelectedPostModal from "src/pages/Home/SelectedPostModal";
import SelectedImageModal from "./SelectedImageModal/SelectedImageModal";
import { useDispatch, useSelector } from "react-redux";
import { getPostList, PostSelectors } from "src/redux/reducers/postSlice";

const Home = () => {
  const [activeTab, setActiveTab] = useState(TabsTypes.All);
  const [isLoggedIn, setLoggedIn] = useState(false);
  // const [cardsList, setCardsList] = useState<PostsList>([]);
  const dispatch = useDispatch();
  const cardsList = useSelector(PostSelectors.getPostList);

  const tabsList = useMemo(
    () => [
      { key: TabsTypes.All, title: "All Posts", disabled: false },
      { key: TabsTypes.Popular, title: "Popular Posts", disabled: false },
      {
        key: TabsTypes.MyFavorite,
        title: "Favourite Posts",
        disabled: !isLoggedIn,
      },
    ],
    [isLoggedIn]
  );

  useEffect(() => {
    // setCardsList(MOCK_ARRAY);
    dispatch(getPostList());
  }, []);

  const onTabClick = (tab: TabsTypes) => () => {
    setActiveTab(tab);
    if (tab === TabsTypes.Popular) {
      setLoggedIn(true);
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
      <CardsList cardsList={cardsList} />
      <SelectedPostModal />
      <SelectedImageModal />
    </div>
  );
};

export default Home;
