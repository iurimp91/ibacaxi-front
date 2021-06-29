import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export default function SignUpPage() {
    const [disabled, setDisabled] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();

    function signUp(e) {
        e.preventDefault();
        setDisabled(true);
        if(password !== confirmPassword) {
            toast.error("Passwords don't match.");
            setDisabled(false);
        } else {
            const toastLoadingId = toast.loading("Loading...");
            const body = { name, email, password, confirmPassword };
            const request = axios.post("http://localhost:4000/sign-up", body);

            request.then(response => {
                toast.dismiss(toastLoadingId);
                toast.success("Account created!");
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setDisabled(false);
                history.push("/sign-in");
            });

            request.catch(error => {
                setDisabled(false);
                toast.dismiss(toastLoadingId);
                toast.error("Something went wrong, please try again.");
            });
        }
    }
    
    return(
        <Container>
            <Toaster />
            <Logo>iBacaxi</Logo>
            <Form disabled={disabled} onSubmit={signUp}>
                <input disabled={disabled} type="text" placeholder="Name" required onChange={e => setName(e.target.value)} value={name} />
                <input disabled={disabled} type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} value={email} />
                <input disabled={disabled} type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} value={password} />
                <input disabled={disabled} type="password" placeholder="Confirm password" required onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} />
                <button disabled={disabled} type="submit">Create Account</button>
            </Form>
            <Link to={disabled ? "" : "/sign-in"}>Already have an account? Sign in.</Link>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #E1E5EA;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a {
        text-decoration: none;
        font-size: 15px;
        font-weight: 700;
        margin-top: 20px;
        color: #DA7F8F;

        @media (min-width: 470px) {
            font-size: 20px; 
        }
    }
`;

const Logo = styled.div`
    color: #DA7F8F;
    font-size: 40px;
    font-family: "Comfortaa";
    margin-bottom: 24px;
    font-weight: 700;

    @media (min-width: 470px) {
        font-size: 50px; 
    }
`;

const Form = styled.form`
    text-align: center;
    padding: 0 20px;

    @media (min-width: 470px) {
        display: flex;
        flex-direction: column;    
    }

    input {
        width: 100%;
        height: 58px;
        border-radius: 5px;
        font-size: 20px;
        padding-left: 15px;
        background-color: ${props => props.disabled ? "#DCDCDC" : "#FFFFFF"};
        margin-bottom: 13px;
        border: 1px solid #DA7F8F;

        @media (min-width: 470px) {
            width: 430px;
            height: 70px;
            font-size: 25px;
        }
    }

    button {
        width: 100%;
        height: 50px;
        border: none;
        border-radius: 5px;
        background-color: #DA7F8F;
        opacity: ${props => props.disabled ? "0.7" : "1"};
        color: #FFFFFF;
        font-size: 20px;

        @media (min-width: 470px) {
            width: 430px;
            height: 62px;
            font-size: 25px;
        }
    }
`;