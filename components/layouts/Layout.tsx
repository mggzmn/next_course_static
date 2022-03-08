import { FC } from 'react';

import Head from 'next/head';
interface Props {
  title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Mariana Guzmán' />
        <meta name='description' content={`Información sobre el pókemon ${title}`} />
        <meta name='keywords' content={`${title}, pokemon, pokedex`} />
      </Head>
      {/* Navbar */}
      <main>{children}</main>
    </>
  );
};
