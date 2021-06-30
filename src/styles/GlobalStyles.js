import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: "Roboto";
        height: 100%;
    }
    
    #root {
        background-color: black;
        height: 100%;
    }

    ::-webkit-input-placeholder, input {
        font-family: "Roboto";
        color: #808080;
        outline: 0;
    }

    button {
        font-family: "Roboto";
    }
    
    a {
        font-family: "Roboto";
        text-decoration: none;
    }
`;
