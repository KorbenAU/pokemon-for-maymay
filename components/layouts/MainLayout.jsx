import React from "react";
import {Box, Container} from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "../Navbar";
import Footer from "../Footer";

const MainLayout = ({children, router}) => {
    return (
        <Box as={"main"} pb={0} minH={"100vh"} position={"relative"}>
            <Head>
                <meta name={"view port"}
                      content={"width=device-width,initial-scale=1"}/>
                <title>MayMay-Pokemon</title>
            </Head>

            <Navbar path={router.asPath}/>

            <Container maxW={"container.md"} pt={14}>
                {children}
            </Container>

            <Container maxW={"container.md"} pt={14}>
                <Footer/>
            </Container>
        </Box>
    );
};

export default MainLayout;
