import { GlobalStyle } from "../styles/GlobalStyles.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext.js";
import SignUpPage from "./SingUpPage.js";
import SignInPage from "./SingInPage.js";

function App() {
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
    <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route exact path="/sign-up">
            <SignUpPage />
          </Route>
          <Route exact path="/">
            <SignInPage />
          </Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;