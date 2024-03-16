import { useQuery } from '@tanstack/react-query';
import apiClient, { APIClient, FetchResponse } from '../services/api-client';
import genres from '../data/genres';
export interface Genre {
    id: number;
    name: string;
    image_background: string;
}

const genreService = new APIClient<Genre>("/genres")

const useGenres = () => {
    return useQuery({
        queryKey: ["genres"],
        queryFn: () => apiClient.get<FetchResponse<Genre>>("/genres").then(res => res.data),
        staleTime: 24 * 60 * 60 * 1000,
        initialData: {results: genres, count: genres.length}
    })
}

export default useGenres