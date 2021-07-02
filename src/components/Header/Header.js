import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/img/logo.png";
import { IoPersonCircleSharp, IoCartSharp } from "react-icons/io5";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { RiContactsBookLine, RiLogoutBoxFill } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export default function Header() {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));
    
    function signOut() {
        const config = { headers: { Authorization: `Bearer ${localUser.token || user.token}` } };

        const request = axios.post("http://localhost:4000/sign-out", [] ,config);

        request.then((response) => {
            localStorage.removeItem("user");
            toast.success("Logged out!");
            history.push("/sign-in");
        });

        request.catch((error) => {
            toast.error("Your request failed, please try again.");
        });
    }

    return (
        <SafeMargin>
            <Toaster />
            <TopBar>
                <Title to={"/"}>
                    <img src={logo} alt="iBacaxi Logo" height="50px" />
                    <span>iBacaxi</span>
                </Title>
                <SearchBar />
                <Buttons>
                    {
                        (localUser || user)
                        ? 
                            <>
                                <RiLogoutBoxFill onClick={signOut} />
                                <span>Hello,<br/><strong>{localUser?.name}</strong></span>
                            </>
                        : <IoPersonCircleSharp onClick={() => history.push("/sign-in")} />
                    }
                    <IoCartSharp onClick={() => history.push("/cart")} />
                </Buttons>
            </TopBar>
        </SafeMargin>
    );
}

const SafeMargin = styled.div`
    height: 90px;
    background-color: transparent;
`;

const TopBar = styled.div`
    background-color: #e1e5ea;
    border-bottom: 1px solid #da7f8f;
    box-shadow: 0px 5px 15px #da7f8f;
    padding: 0px 10px;
    height: 80px;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
`;

const Title = styled(Link)`
    color: #da7f8f;
    font-size: 40px;
    font-family: "Comfortaa";
    font-weight: 700;
    display: flex;
    align-items: center;

    span {
        margin-top: 8px;

        @media (max-width: 614px) {
            display: none;
        }
    }
`;
const Buttons = styled.div`
    color: #da7f8f;
    font-size: 35px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        font-size: 15px;
        margin-right: 10px;
    }

    svg {
        cursor: pointer;
    }
`;