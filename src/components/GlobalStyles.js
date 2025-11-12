import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    *:before,
    *:after {
        box-sizing: border-box;
    }

    html, body {
    width: 100%;
    height: 100%;
    font-family: 'Montserrat', sans-serif;
    }

    a,
    a:visited {
        text-decoration: none;
        cursor: pointer;
    }

    button {
        cursor: pointer;
        outline: none;
    }

    ul li {
        list-style: none;
    }
`;

export default GlobalStyles;
