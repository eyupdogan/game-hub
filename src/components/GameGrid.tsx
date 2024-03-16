import { SimpleGrid, Text } from '@chakra-ui/react';
import useGames from '../hooks/useGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';
import GameCardContainer from './GameCardContainer';
import { GameQuery } from '../App';

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({gameQuery}: Props) => {
    const {data, error, isLoading} = useGames(gameQuery)
    const skeletons = Array(16).fill("")

    if (error) return <Text>{error.message}</Text>

  return (
        <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 4}} spacing={6} padding={10}>
            {isLoading && skeletons.map(skeleton => <GameCardSkeleton key={skeleton} />)}
            {data?.results.map(game => <GameCardContainer key={game.id}>
              <GameCard game={game} />
            </GameCardContainer>)}
        </SimpleGrid>
  )
}

export default GameGrid