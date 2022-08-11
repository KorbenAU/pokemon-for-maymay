import {getPokemonEntries, getPokemonEntriesWithUrl} from "../API";
import {Button, Flex, SimpleGrid, Spacer, Text, useDisclosure} from "@chakra-ui/react";
import {capitalizeFirstLetter} from "../Utils/Utils";
import {useEffect, useState} from "react";
import Section from "../components/Section";
import PokemonEntryGridItem from "../components/PokemonEntryGridItem";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import PokemonDetails from "../components/PokemonDetails";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

export default function Pokemon() {

    const [data, setData] = useState(null);
    const [offSet, setOffSet] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [limit, setLimit] = useState(12);
    const [selectedPokemon, setSelectedPokemon] = useState();

    const {isOpen, onOpen, onClose} = useDisclosure();

    const fetchEntries = async () => {
        setLoading(true);
        const pokemonEntries = await getPokemonEntries(offSet, limit);
        setData(pokemonEntries);
        setLoading(false);
    };

    const handlePokemonCardClick = (entry) => {
        setSelectedPokemon(entry);
        onOpen();
    };

    const handleNextClick = async () => {
        const current = offSet + limit;
        setOffSet(current);
    };

    const handlePrevClick = async () => {
        const current = offSet - limit;
        setOffSet(current);
    };

    useEffect(() => {
        fetchEntries();
    }, [offSet]);

    const showPokemonList = () => (
        <Section>
            {!isLoading && data && <Section delay={0.1}>
                <SimpleGrid columns={[2, 2, 3]} gap={6} mt={10}>
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
                        {offSet}/{data.count}
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

    const showPokemonDetails = (entry) => {
        return <PokemonDetails entry={entry}/>;
    };

    return (
        <>
            {showPokemonList()}
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                size={["full", "full", "xl"]}
                isCentered

            >
                <ModalOverlay backdropBlur="2px"
                />
                <ModalContent>
                    <ModalHeader>{capitalizeFirstLetter(selectedPokemon?.name||"null")}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <PokemonDetails entry={selectedPokemon}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
        ;
}
