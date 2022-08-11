import React from "react";
import {Box, Divider, Flex, Heading, Image, Spacer, useColorModeValue} from "@chakra-ui/react";

const PokemonEntryGridItem = ({name, imageUrl, onClick}) => {
    return (
        <Box w={"100%"}
             _hover={useColorModeValue({
                 cursor: "pointer",
                 "box-shadow": "rgba(100, 100, 111, 0.5) 0px 7px 29px 0px",
                 transform: "scale(1.05)"
             }, {
                 cursor: "pointer",
                 "box-shadow": "rgba(100, 100, 111, 0.9) 0px 7px 29px 0px",
                 transform: "scale(1.05)"
             })}
             transition={"all .3s ease-in-out"}
             borderColor={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
             bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
             borderWidth={1}
             borderStyle={"solid"}
             borderRadius={"md"}
             px={4}
             pt={2}
             pb={4}
             onClick={onClick}
        >
            <Flex direction={"column"} h={"100%"}>
                <Box>
                    <Heading as={"h2"} mt={2} fontSize={19}>
                        {name}
                    </Heading>
                </Box>
                <Divider my={3}/>
                <Box align={"center"} mt={3}>
                    <Image src={imageUrl}
                           alt={name}
                           placeholder={"blur"}
                           height={"80px"}
                           display={"inline-block"}
                           borderRadius={"lg"}/>
                </Box>
            </Flex>
        </Box>
    );
};

export default PokemonEntryGridItem;


