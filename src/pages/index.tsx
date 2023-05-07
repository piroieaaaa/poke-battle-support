import { useState, useCallback, useEffect, useRef } from 'react';
import { usePokeNameSwr } from '@/fetch/usePokeNameSwr';

const PokeList = () => {
    const [ userInput, setUserInput ] = useState('');                       // 表示用の値
    const lastUserInput = useRef('');                                       // 1つ前の表示用の値
    const [ searchKey, setSearchKey ] = useState('');                       // 検索キー
    const [ confirmedValue, setConfirmedValue ] = useState('');             // 選択された値
    const { pokeNames , isLoading, isError } = usePokeNameSwr(searchKey);   // 候補リスト

    useEffect(() => {
        console.log(`useEffect():userInput=${userInput}`);
        if (!pokeNames) return;
        if (pokeNames.length === 1 && userInput.length > lastUserInput.current.length) {
            // キーボード選択用: もし、検索候補が1件しかない場合は先頭一致でその要素が選択されたものとする。表示も更新する。
            setUserInput(pokeNames[0]);
            lastUserInput.current = pokeNames[0];
            setConfirmedValue(pokeNames[0]);
        } else {
            // キーボード選択用: 正確に一致するものが候補にあればその要素が選択されたものとする
            const found :string = pokeNames.find((name: string) => name == userInput) ?? '';
            if (!found) {
                setConfirmedValue(found);
            }
        }
    }, [userInput])

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`onChange():userInput=${userInput}, e.target.value=${e.target.value}`);
        lastUserInput.current = userInput; // 最後の入力をとっておく
        setUserInput(e.target.value);
        if (pokeNames.some((name: string) => name == e.target.value)) {
            // マウス選択用: 候補のリストを検索して正確にマッチするものがあったら確定(検索はしない)
            setConfirmedValue(e.target.value);
        } else {
            // キーボード選択用: 正確にマッチするものがなければサーバーに問い合わせて候補リストを最新化
            setSearchKey(e.target.value);
        }
    }, [pokeNames]);

    return (
        <div>
            { isError ? <div>エラー: {String(isError)}</div> : undefined }
            <label>ポケモン選択: <input type="text" name="pokeName" list="pokeNameList" value={userInput} onChange={onChange}/></label>
            { isLoading ? "🌀" : (
                <datalist id="pokeNameList">
                    { pokeNames.map((name: string) => (<option key={name} value={name} />))}
                </datalist>
            )}
        </div>
    )

//   const { pokeNames, isLoading, isError } = usePokeNameSwr("ア")
//   if(isLoading) return <div>Loading</div>
//   if(isError) return <div>Error</div>
//   return (
//     <>
//       <ul>
//         {pokeNames.map((name: any) => (
//           <li key={name}>{name}</li>
//         ))}
//       </ul>
//     </>
//   );
}

export default PokeList