import { useState, useCallback, useEffect, useRef } from 'react';
import { usePokeNameSwr } from '@/fetch/usePokeNameSwr';

const BattlePoke = (props: {partyOrder: number}) => {
    const [ userInput, setUserInput ] = useState('');
    const { pokeNames , isLoading, isError } = usePokeNameSwr(userInput);
    const [ decidedPoke, setDecidedPoke ] = useState('');

    useEffect(() => {
        console.log(`useEffect():pokeNames=${pokeNames}`);
        if (pokeNames && pokeNames.length == 1 && pokeNames[0] == userInput){
            setDecidedPoke(userInput);
        } else {
            setDecidedPoke('');
        }
    },[userInput, pokeNames])

    const onChange = (input: string) => {
        console.log(`onChange():input=${input}`)
        setUserInput(input);
    };

    return (
        <div>
            { isError ? <div>エラー： {String(isError)}</div> : undefined }
            <label className="text-gray-700 dark:text-gray-200">ポケモン（{props.partyOrder}）：
                <input type="text" className="px-4 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name="pokeName" list="pokeNameList" value={userInput} onChange={(e) => onChange(e.target.value)}/>
            </label>
            { isLoading ? "🌀" : (
                <datalist id="pokeNameList">
                    { pokeNames.map((name: string) => (<option key={name} value={name} />))}
                </datalist>
            )}
        </div>
    )
}

const MyParty = () => {
    return(
        <>
            <BattlePoke partyOrder={1} />
            <BattlePoke partyOrder={2} />
            <BattlePoke partyOrder={3} />
            <BattlePoke partyOrder={4} />
            <BattlePoke partyOrder={5} />
            <BattlePoke partyOrder={6} />
        </>
    )
}

export default MyParty