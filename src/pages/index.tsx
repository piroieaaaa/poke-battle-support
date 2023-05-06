import { useState, useCallback, useEffect, useRef } from 'react';
import { usePokeNameSwr } from '@/fetch/usePokeNameSwr';

const PokeList = () => {
    // const [ userInput, setUserInput ] = useState('');              // 表示用の値
    // const lastUserInput = useRef('');                              // 1つ前の表示用の値
    // const [ searchKey, setSearchKey ] = useState('');              // 検索キー
    // const [ confirmedValue, setConfirmedValue ] = useState('');    // 選択された値
    // // const { data, error, loading } = useCompletionList(searchKey); // 候補リスト

    // const response = await fetch("http://localhost:3000/api/poke-name");
    // const response = await fetch('/api/poke-name');
    // const data = await response.json();
    // console.log(response);
    // console.log(data);
  const { data, isLoading, isError } = usePokeNameSwr("ア")

  if(isLoading) return <div>Loading</div>
  if(isError) return <div>Error</div>
  return (
    <>
      <ul>
        {data.map((poke: any) => (
          <li key={poke.NAME_JP}>{poke.NAME_JP}</li>
        ))}
      </ul>
    </>
  );
}

export default PokeList