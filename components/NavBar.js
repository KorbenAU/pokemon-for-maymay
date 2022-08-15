import React from "react";
import Logo from "./Logo";
import NextLink from "next/link";
import {HamburgerIcon} from "@chakra-ui/icons";
import {
    Box,
    Container,
    Flex,
    Heading,
    IconButton,
    Link,
    Menu,
    MenuButton, MenuItem, MenuList,
    Stack,
    useColorModeValue
} from "@chakra-ui/react";
import ThemeToggleButton from "./ThemeToggleButton";

const LinkItem = ({href, path, children}) => {
    const active = path === href;
    const inactiveColor = useColorModeValue("gray200", "whiteAlpha.900");

    return (
        <NextLink href={href}>
            <Link p={2}
                  bg={active ? "glassTeal" : undefined}
                  color={active ? "#202023" : inactiveColor}>
                {children}
            </Link>
        </NextLink>
    );
};

const NavBar = (props) => {
    const {path} = props;
    return (
        <Box position={"fixed"}
             as={"nav"}
             w={"100%"}
             bg={useColorModeValue("#ffffff40", "#20202380")}
             style={{backdropFilter: "blur(10px)"}}
             zIndex={1}
             {...props}>
            <Container display={"flex"}
                       p={2}
                       maxW={"container.md"}
                       wrap={"wrap"}
                       align={"center"}
                       justify={"space-between"}
            >
                <Flex align={"center"} mr={5}>
                    <Heading as={"h1"} size={"lg"} letterSpacing={"tighter"}>
                        <Logo/>
                    </Heading>
                </Flex>

                <Stack direction={{base: "column", md: "row"}}
                       display={{base: "none", md: "flex"}}
                       width={{base: "full", md: "auto"}}
                       alignItems={"center"}
                       flexGrow={1}
                       mt={{base: 4, md: 0}}
                >
                    <LinkItem href={"/Pokemon"} path={path}>
                        Pokemon
                    </LinkItem>

                    <LinkItem href={"/Search"} path={path}>
                        Search
                    </LinkItem>
                </Stack>

                <Box flex={1} align={"right"}>
                    <ThemeToggleButton/>
                    <Box ml={2} display={{base: "inline-block", md: "none"}}>
                        <Menu>
                            <MenuButton as={IconButton}
                                        icon={<HamburgerIcon/>}
                                        variant={"outline"}
                                        aria-label={"Options"}/>
                            <MenuList>
                                <NextLink href={"/"} passHref>
                                    <MenuItem as={Link}>
                                        Home
                                    </MenuItem>
                                </NextLink>
                                <NextLink href={"/Pokemon"} passHref>
                                    <MenuItem as={Link}>
                                        Pokemon
                                    </MenuItem>
                                </NextLink>
                                <NextLink href={"/Search"} passHref>
                                    <MenuItem as={Link}>
                                        Search
                                    </MenuItem>
                                </NextLink>
                            </MenuList>
                        </Menu>
                    </Box>
                </Box>

            </Container>
        </Box>
    );
};

export default NavBar;