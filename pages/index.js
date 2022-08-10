import {getPokemon, pokemonImageURL} from "../API";
import {Box, Container, Flex, Text} from "@chakra-ui/react";
import Image from "next/image";
import {capitalizeFirstLetter} from "../Utils/Utils";

export default function Home({pokemon}) {

    const {sprites, name} = pokemon;

    return (
        <>
            <Flex align="center" justify="center" my={'2em'}>
                <Text fontSize='2em'>Hey Maymay, This is {capitalizeFirstLetter(name)}!</Text>
            </Flex>

            <Flex align="center" justify="center">
                <Image height={250}
                       width={250}
                       src={sprites.other.dream_world.front_default}
                       alt={"Pokemon Avatar"}
                />
            </Flex>
        </>
    )
        ;
}

export async function getStaticProps() {

    const randomId = Math.floor(Math.random() * 1154) + 1;
    const pokemon = await getPokemon(randomId);

    return {
        props: {
            pokemon: pokemon
        },
        revalidate: 1,
    };
}
