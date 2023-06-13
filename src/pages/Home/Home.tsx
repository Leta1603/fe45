import React, { useEffect, useMemo, useState } from "react";

import Title from "../../components/Title";
import CardsList from "../../components/CardsList";
import { PostsList, TabsTypes } from "../../@types";

import styles from "./Home.module.scss";
import TabsList from "../../components/TabsList";

const MOCK_ARRAY = [
  {
    id: 0,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title: "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 1,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title: "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 2,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title: "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 3,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title: "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 4,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title: "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 5,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title: "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 6,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title: "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 7,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title: "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 8,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title: "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 9,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title: "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 10,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title: "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 11,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title: "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState(TabsTypes.All);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [cardsList, setCardsList] = useState<PostsList>([]);

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
    setCardsList(MOCK_ARRAY);
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
      <TabsList tabsList={tabsList} activeTab={activeTab} onTabClick={onTabClick} />
      <CardsList cardsList={cardsList} />
    </div>
  );
};

export default Home;
