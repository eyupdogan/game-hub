import { SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import useGames from '../hooks/useGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';
import GameCardContainer from './GameCardContainer';
import { GameQuery } from '../App';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({gameQuery}: Props) => {
    const {data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage} = useGames(gameQuery)
    const skeletons = Array(16).fill("")

    if (error) return <Text>{error.message}</Text>

    const fetchGamesCount = data?.pages.reduce((total, page) => total + page.results.length, 0) || 0

  return (
          <InfiniteScroll dataLength={fetchGamesCount} hasMore={!!hasNextPage} next={() => fetchNextPage()} loader={<Spinner />}>
          <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 4}} spacing={6} padding={10}>
              {isLoading && skeletons.map(skeleton => <GameCardSkeleton key={skeleton} />)}
              {data?.pages.map((games, index) => <React.Fragment key={index}>
                {games.results.map(game => <GameCardContainer key={game.id}>
                <GameCard game={game} />
              </GameCardContainer>)}
              </React.Fragment>)}
          </SimpleGrid>
          </InfiniteScroll>
  )
}

export default GameGrid