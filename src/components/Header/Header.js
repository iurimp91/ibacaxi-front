import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/img/logo.png";
import { IoPersonCircleSharp, IoCartSharp } from "react-icons/io5";
import SearchBar from "./SearchBar";

export default function Header() {
    

    return (
        <SafeMargin>
            <TopBar>
                <Title to={"/"}>
                    <img src={logo} alt="iBacaxi Logo" height="50px" />
                    <span>iBacaxi</span>
                </Title>
                <SearchBar>
                    
                </SearchBar>
                <Buttons>
                    <IoPersonCircleSharp />
                    <IoCartSharp />
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
`;