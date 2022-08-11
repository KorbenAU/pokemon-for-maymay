import {getRandomPokemon} from "../API";
import {Flex, Text} from "@chakra-ui/react";
import Image from "next/image";
import {capitalizeFirstLetter} from "../Utils/Utils";

export default function Home({pokemon}) {

    const {sprites, name} = pokemon;

    return (
        <>
            <Flex align="center" justify="center" my={"2em"}>
                <Text fontSize="2em">Hey Maymay, This is {capitalizeFirstLetter(name)}!</Text>
            </Flex>

            <Flex align="center" justify="center">
                <Image height={350}
                       width={350}
                       src={sprites["other"]["official-artwork"]["front_default"] || sprites["front_default"]}
                       alt={"Pokemon Avatar"}
                />
            </Flex>
        </>
    );
}

export async function getStaticProps() {
    const pokemon = await getRandomPokemon();

    return {
        props: {
            pokemon: pokemon
        },
        revalidate: 10,
    };
}
