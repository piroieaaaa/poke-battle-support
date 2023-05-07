import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import * as path from 'path'

// POKEテーブルから名称を取得する
const getPokeNames = async (req:NextApiRequest, res:NextApiResponse) => {
    // 名前の要素が未指定の場合、検索しない
    if (!req.query.searchKey) {
        res.json([])
        return;
    }

    // DB接続
    const sqlitePath: string = path.join(process.cwd(), 'src', 'db', 'poke.db')
    const db = await open(
        {filename: sqlitePath,
        driver: sqlite3.Database}
    );

    // 名前取得
    const names = await db.all('select NAME_JP from POKE where NAME_JP like ? || "%" order by NO',[req.query.searchKey]);
    res.json(names.map((name: any) => String(name.NAME_JP)));

    // DB切断
    db.close();
}

export default getPokeNames