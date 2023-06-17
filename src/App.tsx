import React, { useState } from "react";

import { ThemeProvider } from "./context/Theme";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { Theme } from "./@types";
import Home from "./pages/Home/Home";

const App = () => {
  const [themeValue, setThemeValue] = useState<Theme>(Theme.Light);

  const onChangeTheme = (value: Theme) => () => {
    setThemeValue(value);
  };

  return (
    <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
      <Home />
      <ThemeSwitcher />
    </ThemeProvider>
  );
};

export default App;
