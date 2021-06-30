import { GlobalStyle } from "../styles/GlobalStyles.js";
import { ResetCSS } from "../styles/ResetCSS.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext.js";
import SignUpPage from "./SingUpPage.js";
import SignInPage from "./SingInPage.js";
import CartPage from "./CartPage.js";

function App() {
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
    <ResetCSS />
    <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route exact path="/">
            <SignInPage />
          </Route>
          <Route exact path="/sign-up">
            <SignUpPage />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;