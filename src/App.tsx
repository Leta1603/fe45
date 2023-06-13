import React from "react";
import PostCard, { PostCardSize } from "./components/PostCard";

const App = () => {
  const postCardArray = [
    {
      id: 0,
      image:
        "https://images.unsplash.com/photo-1541873676-a18131494184?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=418&q=80",
      title: "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
      text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
      date: "April 20, 2021",
      lesson_num: 1,
      author: 0,
      size: PostCardSize.Large,
    },
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1592561199818-6b69d3d1d6e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80",
      title: "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
      text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
      date: "April 20, 2021",
      lesson_num: 1,
      author: 0,
      size: PostCardSize.Medium,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1611462985358-60d3498e0364?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
      text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
      date: "April 20, 2021",
      lesson_num: 1,
      author: 0,
      size: PostCardSize.Small,
    },
  ];

  return (
    <div>
      {postCardArray.map(({ id, image, title, text, date, lesson_num, author, size }) => (
        <PostCard
          key={id}
          id={id}
          title={title}
          text={text}
          date={date}
          image={image}
          lesson_num={lesson_num}
          author={author}
          size={size}
        />
      ))}
    </div>
  );
};

export default App;
