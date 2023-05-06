import useSWR from 'swr'
import { fetcher } from './fetcher'

export const usePokeNameSwr = (searchKey :string) => {
    const {data, error, isLoading} = useSWR(`/api/poke-name?searchKey=${searchKey}`, fetcher)
    return {
        pokeNames: data,
        isLoading: isLoading,
        isError: error
    }
}