import {extendTheme} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

const styles = {
    global: props => ({
        body: {
            bg: mode("#f0e7db", "#202023")(props)
        },
    })
};

const components = {
    Heading: {
        variants: {
            "section-title": {
                textDecoration: "underline",
                fontSize: 20,
                textUnderlineOffset: 6,
                textDecorationColor: "#525252",
                textDecorationThickness: 4,
                marginTop: 3,
                marginBottom: 4
            }
        }
    },
    Link: {
        baseStyle: props => ({
            color: mode("#3d7aed", "#ff63c3")(props),
            textUnderlineOffset: 3
        })
    },
    Modal: {
        baseStyle: (props) => ({
            dialog: {
                maxWidth: ["95%", "95%", "95%"],
                minWidth: "60%",
                minHeight: "50%",
                bg: mode("#f0e7db", "#202023")(props)
            }
        })
    }
};

const fonts = {
    heading: "M PLUS Rounded 1c"
};

const colors = {
    glassTeal: "#88ccca"
};

const config = {
    initialColorMode: "dark",
    useSystemColorMode: true
};

const theme = extendTheme({
    config, styles, components, colors, fonts
});

export default theme;
