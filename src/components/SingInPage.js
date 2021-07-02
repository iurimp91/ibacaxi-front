import { Container, Form } from "../styles/SignUpSignInStyles.js";
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import UserContext from "../contexts/UserContext";

export default function SignInPage() {
    const [disabled, setDisabled] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const { setUser } = useContext(UserContext);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const next = params.get("next");

    useEffect(() => {
        if (localStorage.user) {
            const userData = localStorage.getItem("user");
            setUser(userData);
            history.push("/");
        }
        // eslint-disable-next-line
    }, []);

    function signIn(e) {
        e.preventDefault();
        setDisabled(true);

        const toastLoadingId = toast.loading("Loading...");
        const body = { email, password };
        const request = axios.post(
            `${process.env.REACT_APP_API_URL}/sign-in`,
            body
        );

        request.then((response) => {
            toast.dismiss(toastLoadingId);
            toast.success("Logged in!");
            setEmail("");
            setPassword("");
            setUser(response.data);
            const stringUserData = JSON.stringify(response.data);
            localStorage.setItem("user", stringUserData);
            setDisabled(false);
            if (next) {
                history.push(next);
            } else {
                history.push("/");
            }
        });

        request.catch((error) => {
            setDisabled(false);
            toast.dismiss(toastLoadingId);

            if (error.response.status === 401) {
                toast.error("Invalid email or password, please try again.");
            } else {
                toast.error("Something went wrong, please try again.");
            }
        });
    }

    return (
        <Container>
            <Toaster />
            <Form disabled={disabled} onSubmit={signIn}>
                <input
                    disabled={disabled}
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    disabled={disabled}
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button disabled={disabled} type="submit">
                    Sign In
                </button>
            </Form>
            <Link to={disabled ? "" : `/sign-up${next ? `?next=${next}` : ""}`}>
                Create an account.
            </Link>
        </Container>
    );
}
