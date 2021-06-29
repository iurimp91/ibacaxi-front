import styled from "styled-components";

export const Container = styled.div`
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

export const Logo = styled.div`
    color: #DA7F8F;
    font-size: 40px;
    font-family: "Comfortaa";
    margin-bottom: 24px;
    font-weight: 700;

    @media (min-width: 470px) {
        font-size: 50px; 
    }
`;

export const Form = styled.form`
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