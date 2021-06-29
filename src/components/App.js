import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext.js";
import SignUpPage from "./SingUpPage.js";

function App() {
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route exact path="/">
            <SignUpPage />
          </Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;