import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    p.title {
        font-weight: bold;
        font-size: 30px;
    }
    & > * {
        margin-bottom: 10px;
    }
    button {
        font-family: Comfortaa;
        border-radius: 15px;
        height: 45px;
        width: 200px;
        font-size: 25px;
        margin-right: 10px;
        border: none;
        transition: 0.2s;
        border: 5px solid #da7f8f;
        background-color: #da7f8f;
        color: white;
        &:hover {
            filter: brightness(0.8);
        }
        @media (max-width: 430px) {
            width: 100%;
        }
    }

    input {
        font-size: 20px;
        color: black;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid black;
        max-width: 400px;
        margin-top: 10px;
    }
    .cc-details {
        display: flex;
        div {
            margin-right: 10px;
        }
        .small {
            width: 70px;
            text-align: center;
        }
    }
`;

export default Form;
