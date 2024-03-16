import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react';
import useGames from '../hooks/useGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';
import GameCardContainer from './GameCardContainer';
import { GameQuery } from '../App';
import React from 'react';

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({gameQuery}: Props) => {
    const {data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage} = useGames(gameQuery)
    const skeletons = Array(16).fill("")

    if (error) return <Text>{error.message}</Text>

  return (
        <Box padding={10}>
          <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 4}} spacing={6}>
              {isLoading && skeletons.map(skeleton => <GameCardSkeleton key={skeleton} />)}
              {data?.pages.map((games, index) => <React.Fragment key={index}>
                {games.results.map(game => <GameCardContainer key={game.id}>
                <GameCard game={game} />
              </GameCardContainer>)}
              </React.Fragment>)}
          </SimpleGrid>
          {hasNextPage && <Button marginY={5} disabled={isFetchingNextPage} onClick={() =>fetchNextPage()}>{isFetchingNextPage ? "Loading..." : "Load More"}</Button>}
        </Box>
  )
}

export default GameGrid