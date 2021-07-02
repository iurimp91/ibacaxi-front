import { GlobalStyle } from "../styles/GlobalStyles.js";
import { ResetCSS } from "../styles/ResetCSS.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext.js";
import SignUpPage from "./SingUpPage.js";
import SignInPage from "./SingInPage.js";
import HomePage from "./HomePage/HomePage";
import CartPage from "./CartPage.js";
import ProductPage from "./ProductPage/ProductPage";
import CheckoutPage from "./CheckoutPage/CheckoutPage";
import SuccessPage from "./SuccessPage/SuccessPage";
import Header from "./Header/Header";
import NotFound from "./NotFound.js";

function App() {
    const [user, setUser] = useState();

    return (
        <BrowserRouter>
            <ResetCSS />
            <GlobalStyle />
            <UserContext.Provider value={{ user, setUser }}>
                <Header user={user} setUser={setUser} />
                <Switch>
                    <Route exact path="/success/:id">
                        <SuccessPage />
                    </Route>
                    <Route exact path="/sign-in">
                        <SignInPage />
                    </Route>
                    <Route exact path="/sign-up">
                        <SignUpPage />
                    </Route>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/cart">
                        <CartPage />
                    </Route>
                    <Route exact path="/checkout">
                        <CheckoutPage />
                    </Route>
                    <Route exact path="/product/:id">
                        <ProductPage />
                    </Route>

                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
