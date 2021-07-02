import styled from "styled-components";

export const Container = styled.div`
    height: 100%;
    background-color: #e1e5ea;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding-top: 50px;
    
    @media (max-width: 670px) {
        padding-top: 100px;
    }

    a {
        font-size: 15px;
        font-weight: 700;
        margin-top: 20px;
        color: #da7f8f;

        @media (min-width: 670px) {
            font-size: 20px;
        }
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
        background-color: ${(props) =>
            props.disabled ? "#DCDCDC" : "#FFFFFF"};
        margin-bottom: 13px;
        border: 1px solid #da7f8f;

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
        background-color: #da7f8f;
        opacity: ${(props) => (props.disabled ? "0.7" : "1")};
        color: #ffffff;
        font-size: 20px;
        font-weight: 700;

        @media (min-width: 470px) {
            width: 430px;
            height: 62px;
            font-size: 25px;
        }
    }
`;
