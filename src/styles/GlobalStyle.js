import { createGlobalStyle } from "styled-components";
import "@fontsource/changa";
import "@fontsource/work-sans";

const GlobalStyle = createGlobalStyle`


    *,*::before,*::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    h1,h2,h3,h4,h5,h5 {
        margin: 0;
        padding: 0;
    }

    body {
        font-family: "Work Sans";
        overflow-x: hidden;
        position: relative;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

`

export default GlobalStyle;