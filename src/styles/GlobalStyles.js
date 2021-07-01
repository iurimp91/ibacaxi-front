import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html, body, #root {
        font-family: "Roboto";
        height: 100%;
        background-color: #e1e5ea;
    }

    ::-webkit-input-placeholder, input {
        font-family: "Roboto";
        color: #808080;
        outline: 0;
    }

    button {
        font-family: "Roboto";
        cursor: pointer;
    }
    
    a {
        font-family: "Roboto";
        text-decoration: none;
    }
`;
