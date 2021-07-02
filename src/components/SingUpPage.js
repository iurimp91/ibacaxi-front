import { Container, Form } from "../styles/SignUpSignInStyles.js";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function SignUpPage() {
    const [disabled, setDisabled] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const next = params.get("next");

    function signUp(e) {
        e.preventDefault();
        setDisabled(true);
        if (password !== confirmPassword) {
            toast.error("Passwords don't match.");
            setDisabled(false);
        } else {
            const toastLoadingId = toast.loading("Loading...");
            const body = { name, email, password };
            const request = axios.post(
                `${process.env.REACT_APP_API_URL}/sign-up`,
                body
            );

            request.then((response) => {
                toast.dismiss(toastLoadingId);
                toast.success("Account created!");
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setDisabled(false);
                history.push(`/sign-in${next ? `?next=${next}` : ""}`);
            });

            request.catch((error) => {
                setDisabled(false);
                toast.dismiss(toastLoadingId);

                if (error.response.status === 409) {
                    toast.error("This email is already in use.");
                } else {
                    toast.error("Something went wrong, please try again.");
                }
            });
        }
    }

    return (
        <Container>
            <Toaster />
            <Form disabled={disabled} onSubmit={signUp}>
                <input
                    disabled={disabled}
                    type="text"
                    placeholder="Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
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
                <input
                    disabled={disabled}
                    type="password"
                    placeholder="Confirm password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <button disabled={disabled} type="submit">
                    Create Account
                </button>
            </Form>
            <Link to={disabled ? "" : `/sign-in${next ? `?next=${next}` : ""}`}>
                Already have an account? Sign in.
            </Link>
        </Container>
    );
}
