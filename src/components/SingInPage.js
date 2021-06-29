import { Container, Logo, Form } from "../styles/SignUpSignInStyles.js";
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import UserContext from "../contexts/UserContext";

export default function SignInPage() {
    const [disabled, setDisabled] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const {setUser} = useContext(UserContext);

    useEffect(() => {
        if(localStorage.length !== 0) {
            const userData = localStorage.getItem("user");
            setUser(userData);
            history.push("/");
        }
    }, []);

    function signIn(e) {
        e.preventDefault();
        setDisabled(true);
    
        const toastLoadingId = toast.loading("Loading...");
        const body = { email, password };
        const request = axios.post("http://localhost:4000/sign-in", body);

        request.then(response => {
            toast.dismiss(toastLoadingId);
            toast.success("Logged in!");
            setEmail("");
            setPassword("");
            setUser(response.data);
            const stringUserData = JSON.stringify(response.data);
            localStorage.setItem("user", stringUserData);
            setDisabled(false);
            history.push("/");
        });

        request.catch(error => {
            setDisabled(false);
            toast.dismiss(toastLoadingId);

            if(error.response.status === 404) {
                toast.error("Invalid email or password, please try again.");
            } else {
                toast.error("Something went wrong, please try again.");
            }
        });
    }
    
    return(
        <Container>
            <Toaster />
            <Logo>iBacaxi</Logo>
            <Form disabled={disabled} onSubmit={signIn}>
                <input disabled={disabled} type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} value={email} />
                <input disabled={disabled} type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} value={password} />
                <button disabled={disabled} type="submit">Sign In</button>
            </Form>
            <Link to={disabled ? "" : "/sign-up"}>Create an account.</Link>
        </Container>
    );
}