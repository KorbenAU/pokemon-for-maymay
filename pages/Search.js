import React, {useEffect, useState} from "react";
import {getPokemonEntries} from "../API";
import Section from "../components/Section";
import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputRightElement, SimpleGrid, Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import Fuse from "fuse.js";
import PokemonDetails from "../components/PokemonDetails";

const Search = (props) => {
    const [entries, setEntries] = useState();
    const [unsorted, setUnsorted] = useState();
    const [loading, setLoading] = useState(false);
    const [searchKey, setSearchKey] = useState();
    const [selected, setSelected] = useState();

    const compare = (a, b) => {
        if (a.initial) {
            if (a.initial < b.initial) {
                return -1;
            }
            if (a.initial > b.initial) {
                return 1;
            }
            return 0;
        } else {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }
    };

    const fetchPokemonEntries = async () => {
        setLoading(true);
        const {results} = await getPokemonEntries(0, 2000);

        results.sort(compare);

        setUnsorted(results);

        const sortedEntries = generateInitialEntries(results);

        sortedEntries.sort(compare);

        setEntries(sortedEntries);

        setLoading(false);
    };

    const generateInitialEntries = (results) => results.reduce((acc, cur) => {
        if (acc.some(e => e.initial === cur.name.charAt(0))) {
            acc.find(e => e.initial === cur.name.charAt(0)).entries.push(cur);
        } else {
            acc = [...acc, {
                initial: cur.name.charAt(0),
                entries: [cur]
            }];
        }
        return acc;
    }, []);

    useEffect(() => {
        fetchPokemonEntries();
    }, []);

    const handleSearchChange = key => {
        if (key.length < 3) {
            setEntries(generateInitialEntries(unsorted));
            return;
        }

        const fuse = new Fuse(unsorted, {
            keys: ["name"]
        });

        const results = fuse.search(key).map(r => r.item);

        setEntries(generateInitialEntries(results));
    };

    const handleSelectedPokemon = (entry) => {
        setSelected(entry);
    };

    const handleCancleButtonClicked = () => {
        setSelected(null);
    };

    return (
        <>
            {
                selected ?
                    <PokemonDetails
                        onCancel={handleCancleButtonClicked}
                        entry={selected}/> :
                    <Section>
                        <Flex direction={"column"}>
                            <InputGroup my={10} size="md">
                                <Input
                                    pr="4.5rem"
                                    value={searchKey}
                                    borderColor={useColorModeValue("whiteAlpha.800", "whiteAlpha.200")}
                                    type={"text"}
                                    placeholder="Pokemon name"
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                />
                                <InputRightElement width="6rem">
                                    <Button h="1.75rem" size="sm">
                                        {"Search"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                            {entries && <Box>
                                <SimpleGrid columns={[1, 3, 3]}>
                                    {entries.map(entry => (
                                        <Section key={entry.initial}>
                                            <Heading>{entry.initial}</Heading>
                                            <Stack>
                                                {entry.entries.map(e => (
                                                    <Box key={e.name}
                                                         width={"200px"}
                                                         p={1}
                                                         px={3}
                                                         onClick={() => handleSelectedPokemon(e)}
                                                         _hover={{
                                                             cursor: "pointer",
                                                             boxShadow: "rgba(100, 100, 111, 0.5) 0px 7px 29px 0px",
                                                             transform: "scale(1.05)"
                                                         }}
                                                         transition={"all .2s ease-in-out"}>
                                                        <Text>{e.name}</Text>
                                                    </Box>
                                                ))}
                                            </Stack>
                                        </Section>
                                    ))}
                                </SimpleGrid>
                            </Box>}
                        </Flex>
                    </Section>
            }
        </>
    );
};

export default Search;
