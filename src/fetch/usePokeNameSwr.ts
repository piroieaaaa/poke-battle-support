import useSWR from 'swr'
import { fetcher } from './fetcher'

export const usePokeNameSwr = (nameElement :string) => {
    const {data, error, isLoading} = useSWR(`/api/poke-name?nameElement=${nameElement}`, fetcher)
    return {
        data,
        isLoading: isLoading,
        isError: error
    }
}