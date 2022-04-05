import type { NextPage, GetStaticProps } from 'next';
import { Card, Grid, Row, Text } from '@nextui-org/react';

import Head from 'next/head';
import { pokeApi } from '../api';
import { Layout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Listado de Pókemons'>
      <Grid.Container gap={2} justify='flex-start'>
        {pokemons.map(({ id, name, img }) => (
          <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            <Card hoverable clickable>
              <Card.Body css={{ p: 1 }}>
                <Card.Image src={img} width='100%' height={140} />
              </Card.Body>
              <Card.Footer>
                <Row justify='space-between'>
                  <Text transform='capitalize'>{name}</Text>
                  <Text>#{id}</Text>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Layout>
  );
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};
/* export async function getStaticProps(context){
  return{
    props:{},
  }
} */

export default HomePage;
