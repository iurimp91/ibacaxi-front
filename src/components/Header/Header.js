import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/img/logo.png";
import { IoPersonCircleSharp, IoCartSharp } from "react-icons/io5";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import { RiLogoutBoxFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Header({ user, setUser }) {
    const history = useHistory();
    const localUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (localUser && !user) {
            setUser(JSON.parse(localStorage.user));
        }
        // eslint-disable-next-line
    }, [user]);

    function signOut() {
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };

        const request = axios.post(
            `${process.env.REACT_APP_API_URL}/sign-out`,
            [],
            config
        );

        request.then((response) => {
            localStorage.removeItem("user");
            setUser(false);
            toast.success("Logged out!");
        });

        request.catch((error) => {
            toast.error("Your request failed, please try again.");
        });
    }

    return (
        <   >
            <Toaster />
            <TopBar>
                <Title to={"/"}>
                    <img src={logo} alt="iBacaxi Logo" height="50px" />
                    <span>iBacaxi</span>
                </Title>
                <SearchBar />
                <Buttons>
                    {user ? (
                        <>
                            <RiLogoutBoxFill onClick={signOut} />
                            <span>
                                Hello,
                                <br />
                                <strong>
                                    {user && user.name.split(" ")[0]}
                                </strong>
                            </span>
                        </>
                    ) : (
                        <IoPersonCircleSharp
                            onClick={() => history.push("/sign-in")}
                        />
                    )}
                    <IoCartSharp onClick={() => history.push("/cart")} />
                </Buttons>
            </TopBar>
        </>
    );
}

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

    @media (max-width: 670px) {
        box-shadow: none;
    }
`;

const Title = styled(Link)`
    color: #da7f8f;
    font-size: 35px;
    font-family: "Comfortaa";
    font-weight: 700;
    display: flex;
    align-items: center;

    span {
        margin-top: 8px;
        margin-left: 5px;
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
