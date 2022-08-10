import '../styles/globals.css'
import {ChakraProvider} from "@chakra-ui/react";
import theme from "../libs/theme";
import MainLayout from "../components/layouts/MainLayout";
import Fonts from "../components/Fonts";
import {AnimatePresence} from "framer-motion";

function MyApp({ Component, pageProps, router }) {
  return (
      <ChakraProvider theme={theme}>
          <Fonts/>
          <MainLayout router={router}>
              <AnimatePresence exitBeforeEnter initial={true}>
                  <Component {...pageProps} />
              </AnimatePresence>
          </MainLayout>
      </ChakraProvider>
  )
}

export default MyApp
