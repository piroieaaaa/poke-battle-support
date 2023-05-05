import { useState, useCallback, useEffect, useRef } from 'react';
const PokeList = () => {
    const [ userInput, setUserInput ] = useState('');              // 表示用の値
    const lastUserInput = useRef('');                              // 1つ前の表示用の値
    const [ searchKey, setSearchKey ] = useState('');              // 検索キー
    const [ confirmedValue, setConfirmedValue ] = useState('');    // 選択された値
    // const { data, error, loading } = useCompletionList(searchKey); // 候補リスト


    
}

export default PokeList()