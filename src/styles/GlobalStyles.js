import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body, .root {
        font-family: "Roboto";
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
    }
`;