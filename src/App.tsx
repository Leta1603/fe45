import React from "react";
import Button, { ButtonTypes } from "./components/Button";
import Title from "./components/Title";
import TabsList from "./components/TabsList";

const App = () => {
  return (
    <div>
      <Title title="Blog" />

      <TabsList />

      <Button disabled type={ButtonTypes.Primary} title={"Primary"} onClick={() => {}} />
      <Button type={ButtonTypes.Secondary} title={"Secondary"} onClick={() => {}} />
      <Button type={ButtonTypes.Error} title={"Error"} onClick={() => {}} />
    </div>
  );
};

export default App;
