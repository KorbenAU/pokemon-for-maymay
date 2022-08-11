import {getPokemonEntries} from "../API";
import {Button, Flex, SimpleGrid, Spacer, Text} from "@chakra-ui/react";
import {capitalizeFirstLetter} from "../Utils/Utils";
import {useEffect, useState} from "react";
import Section from "../components/Section";
import PokemonEntryGridItem from "../components/PokemonEntryGridItem";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import PokemonDetails from "../components/PokemonDetails";

export default function Pokemon() {

    const [data, setData] = useState(null);
    const [offSet, setOffSet] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [limit, setLimit] = useState(12);
    const [selectedPokemon, setSelectedPokemon] = useState();

    const fetchEntries = async () => {
        setLoading(true);
        const pokemonEntries = await getPokemonEntries(offSet, limit);
        setData(pokemonEntries);
        setLoading(false);
    };

    const handlePokemonCardClick = (entry) => {
        setSelectedPokemon(entry);
    };

    const handleNextClick = async () => {
        const current = offSet + limit;
        setOffSet(current);
    };

    const handlePrevClick = async () => {
        const current = offSet - limit;
        setOffSet(current);
    };

    const handleCancelClick = () => {
        setSelectedPokemon(null);
    };

    useEffect(() => {
        fetchEntries();
    }, [offSet]);

    const showPokemonList = () => (
        <Section>
            {!isLoading && data && <Section delay={0.1}>
                <Flex alignItems={"center"} mt={10}>
                    <Text>
                        {offSet + limit}/{data.count}
                    </Text>
                    <Spacer/>
                    {data.previous && <Button mr={2} leftIcon={<ChevronLeftIcon/>}
                                              colorScheme="teal" onClick={handlePrevClick}>
                    </Button>}
                    {data.next && <Button rightIcon={<ChevronRightIcon/>}
                                          colorScheme="teal" onClick={handleNextClick}>
                    </Button>}
                </Flex>
                <SimpleGrid columns={[2, 2, 3]} gap={6} my={5}>
                    {
                        data.results.map(entry => {
                            const pokeIds = entry.url.split("/");
                            const pokeId = pokeIds[pokeIds.length - 2];
                            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`;
                            return (
                                <Section key={pokeId}>
                                    <PokemonEntryGridItem
                                        name={capitalizeFirstLetter(entry.name)}
                                        imageUrl={image}
                                        onClick={() => handlePokemonCardClick(entry)}/>
                                </Section>
                            );
                        })
                    }
                </SimpleGrid>
                <Flex alignItems={"center"}>
                    <Text>
                        {offSet + limit}/{data.count}
                    </Text>
                    <Spacer/>
                    {data.previous && <Button mr={2} leftIcon={<ChevronLeftIcon/>}
                                              colorScheme="teal" onClick={handlePrevClick}>
                    </Button>}
                    {data.next && <Button rightIcon={<ChevronRightIcon/>}
                                          colorScheme="teal" onClick={handleNextClick}>
                    </Button>}
                </Flex>
            </Section>}
        </Section>
    );

    const showPokemonDetails = () => {
        return <PokemonDetails onCancel={handleCancelClick} entry={selectedPokemon}/>;
    };

    return (
        <>
            {selectedPokemon ? showPokemonDetails() : showPokemonList()}
        </>
    );
}
