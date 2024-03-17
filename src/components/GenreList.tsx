import { Button, HStack, Heading, Image, List, ListItem, Spinner } from '@chakra-ui/react'
import useGenres from '../hooks/useGenres'
import getCroppedImageUrl from '../services/image-url'
import useGameQueryStore from '../store'

const GenreList = () => {
    const {isLoading, data, error} = useGenres()
    const selectedGenreId = useGameQueryStore(store => store.gameQuery.genreId)
    const setSelectedGenreId = useGameQueryStore(store => store.setGenreId)

    if (isLoading) return <Spinner />

    if (error) return null

  return (
    <>
        <Heading fontSize="2xl" marginBottom={3}>Genres</Heading>
        <List>
            {data?.results.map(genre => <ListItem key={genre.id} paddingY="5px">
                <HStack>
                    <Image objectFit="cover" boxSize="32px" borderRadius={8} src={getCroppedImageUrl(genre.image_background)} />
                    <Button whiteSpace="normal" textAlign="left" fontWeight={genre.id === selectedGenreId ? "bold" : "normal"} 
                        variant="link" fontSize="lg" onClick={() => setSelectedGenreId(genre.id)}>{genre.name}</Button>
                </HStack>
            </ListItem>)}
        </List>
    </>
  )
}

export default GenreList