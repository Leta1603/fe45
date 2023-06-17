import React, { useState } from "react";

import { ThemeProvider } from "./context/Theme";
import { Theme } from "./@types";
import Router from "./pages/Router";

const App = () => {
  const [themeValue, setThemeValue] = useState<Theme>(Theme.Light);

  const onChangeTheme = (value: Theme) => () => {
    setThemeValue(value);
  };

  return (
    <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
