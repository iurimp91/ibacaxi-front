import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import SignUpPage from "./SingUpPage";
import HomePage from "./HomePage/HomePage";

function App() {
    const [user, setUser] = useState();

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ user, setUser }}>
                <Switch>
                    <Route exact path="/sign-up">
                        <SignUpPage />
                    </Route>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
