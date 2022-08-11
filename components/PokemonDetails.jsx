import React, {useEffect, useState} from "react";
import Section from "./Section";
import {Box, Divider, Flex, Image, Progress, Spacer, Stack, Text} from "@chakra-ui/react";
import {getEntityByUrl} from "../API";

const PokemonDetails = ({entry}) => {
    const [detail, setDetail] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const fetchDetails = async () => {
        setIsLoading(true);

        const pokemon = await getEntityByUrl(entry.url);
        setDetail(pokemon);

        const pokeIds = entry.url.split("/");
        const pokeId = pokeIds[pokeIds.length - 2];
        setImageUrl(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`);

        setIsLoading(false);
    };

    useEffect(() => {
        fetchDetails();
    }, [entry]);

    return (
        <>
            {detail && <Section delay={0.3}>
                <Flex direction={"column"}>
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
                </Flex>
            </Section>}
        </>
    );
};

export default PokemonDetails;
