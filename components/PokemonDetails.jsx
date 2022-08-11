import React, {useEffect, useState} from "react";
import Section from "./Section";
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Image, List, ListIcon, ListItem,
    Progress,
    SimpleGrid,
    Spacer,
    Stack, Text
} from "@chakra-ui/react";
import {getEntityByUrl} from "../API";
import PokemonEntryGridItem from "./PokemonEntryGridItem";
import {capitalizeFirstLetter} from "../Utils/Utils";
import {CloseIcon, SpinnerIcon, StarIcon, TriangleUpIcon} from "@chakra-ui/icons";

const PokemonDetails = ({entry, onCancel}) => {
    const [detail, setDetail] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [species, setSpecies] = useState();
    const [varieties, setVarieties] = useState([]);

    const fetchDetails = async () => {
        setIsLoading(true);

        const pokemon = await getEntityByUrl(entry.url);
        setDetail(pokemon);

        const pokeIds = entry.url.split("/");
        const pokeId = pokeIds[pokeIds.length - 2];
        setImageUrl(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`);

        const species = await getEntityByUrl(pokemon.species.url);
        setSpecies(species);

        const {varieties} = species;
        const vIds = varieties.map(v => {
            const pokeIds = v.pokemon.url.split("/");
            const pokeId = pokeIds[pokeIds.length - 2];
            return {
                name: v.pokemon.name,
                id: pokeId
            };
        });

        setVarieties(vIds);
        setIsLoading(false);
    };

    const getDescription = (species) => {
        var textList = species.flavor_text_entries
            .filter(item => item.language.name == "en")
            .map(item => item.flavor_text);

        return textList.filter((item, index) => textList.indexOf(item) === index);
    };

    useEffect(() => {
        fetchDetails();
    }, [entry]);

    return (
        <Section>
            {detail && <Section delay={0.3}>
                <Flex direction={"column"}>
                    <Box mt={20} mr={["0", "0", "0"]}>
                        <Flex alignItems={"center"} justify={"space-between"}>
                            <Heading>{capitalizeFirstLetter(entry.name)}</Heading>
                            <Button rightIcon={<CloseIcon/>}
                                    colorScheme="teal" onClick={onCancel}>
                                Go back
                            </Button>
                        </Flex>
                    </Box>
                    <Divider my={5}/>
                    <Box>
                        <Flex direction={{base: "column", md: "row"}}
                              alignItems={"center"}
                              justify={"space-around"}>
                            <Image
                                boxSize={["50%", "50%", "30%"]}
                                objectFit="cover"
                                src={imageUrl}
                                alt={entry.name}
                                mb={["10", "10", "0"]}
                                mt={["0", "0", "0"]}
                            />
                            <Stack spacing={3}>
                                <Flex alignItems={"center"}>
                                    <Text>Height</Text>
                                    <Spacer/>
                                    <Text>{detail.height} ft</Text>
                                </Flex>
                                <Flex alignItems={"center"}>
                                    <Text>Weight</Text>
                                    <Spacer/>
                                    <Text>{detail.weight} kg</Text>
                                </Flex>
                                <Divider/>
                                {
                                    detail.stats.map(stat => (
                                        <Flex alignItems={"center"} key={stat.stat.name}>
                                            <Text mr={5}>{stat.stat.name}</Text>
                                            <Spacer/>
                                            <Box width={"200px"}>
                                                <Progress size="md" value={stat.base_stat} min={0} max={150}/>
                                            </Box>
                                            <Text ml={2}>{stat.base_stat}</Text>
                                        </Flex>
                                    ))
                                }
                            </Stack>
                        </Flex>
                    </Box>
                    <Divider my={5}/>
                    <Box>
                        {species && <Text>
                            {
                                getDescription(species)
                                    .map(text => {
                                        return text + " ";
                                    })
                            }
                        </Text>}
                    </Box>
                    <Divider my={5}/>
                    <Box>
                        <Heading>Information</Heading>
                        <List spacing={3} mt={5} fontSize={"1.2em"}>
                            <ListItem>
                                <ListIcon as={StarIcon} color="teal"/>
                                Types of this Pokemon:
                                {detail.types.map(type => (
                                    " " + type.type.name + " "
                                ))}
                            </ListItem>
                            <ListItem>
                                <ListIcon as={TriangleUpIcon} color="teal"/>
                                It's habitat is {species ? species.habitat.name : ""}
                            </ListItem>
                            <ListItem>
                                <ListIcon as={SpinnerIcon} color="teal"/>
                                It's growth rate is {species ? species.growth_rate.name : ""}
                            </ListItem>
                        </List>
                    </Box>
                    <Divider my={5}/>
                    <Box>
                        <Heading>Species</Heading>
                    </Box>
                    <Box>
                        <SimpleGrid columns={[2, 2, 3]} gap={6} mt={10}>
                            {varieties.map(v => {
                                const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${v.id}.png`;
                                return (
                                    <Section key={v.id}>
                                        <PokemonEntryGridItem
                                            name={v.name}
                                            imageUrl={image}/>
                                    </Section>
                                );
                            })}
                        </SimpleGrid>
                    </Box>
                </Flex>
            </Section>}
        </Section>
    );
};

export default PokemonDetails;
