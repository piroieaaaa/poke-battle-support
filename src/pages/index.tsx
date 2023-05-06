import { useState, useCallback, useEffect, useRef } from 'react';
import { usePokeNameSwr } from '@/fetch/usePokeNameSwr';

const PokeList = () => {
    // const [ userInput, setUserInput ] = useState('');                   // 表示用の値
    // const lastUserInput = useRef('');                                   // 1つ前の表示用の値
    // const [ searchKey, setSearchKey ] = useState('');                   // 検索キー
    // const [ confirmedValue, setConfirmedValue ] = useState('');         // 選択された値
    // const { pokeNames, error, loading } = usePokeNameSwr(searchKey);    // 候補リスト

    // useEffect(() => {
    //     if (pokeNames.length === 1 && userInput.length > lastUserInput.current.length) {
    //       // キーボード選択用: もし、検索候補が1件しかない場合は先頭一致でその要素が選択されたものとする。表示も更新する。
    //         setUserInput(String(pokeNames[0].NAME_JP));
    //         lastUserInput.current = String(pokeNames[0].NAME_JP);
    //         setConfirmedValue(String(pokeNames[0].NAME_JP));
    //     } else {
    //       // キーボード選択用: 正確に一致するものが候補にあればその要素が選択されたものとする
    //         const found = pokeNames.find(v => String(v.NAME_JP) === userInput);
    //         if (found !== undefined) {
    //             setConfirmedValue(String(found));
    //         }
    //     }
    //   }, [userInput, pokeNames])




  const { pokeNames, isLoading, isError } = usePokeNameSwr("ア")

  if(isLoading) return <div>Loading</div>
  if(isError) return <div>Error</div>
  return (
    <>
      <ul>
        {pokeNames.map((name: any) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </>
  );
}

export default PokeList