import React, { useState } from 'react';

// 建物・部屋リストの型定義
type BuildingRoom = {
    id: number;
    parent: string;
    current: string;
};

// サンプルデータ
const buildingRooms: BuildingRoom[] = [
    { id: 1, parent: 'A棟', current: 'A棟' },
    { id: 2, parent: 'A棟', current: 'A1棟' },
    { id: 3, parent: 'B棟', current: 'B棟' },
    { id: 4, parent: 'A棟', current: 'A-101講義室' },
    { id: 5, parent: 'A棟', current: 'A-201講義室' },
];

// Propsの型定義
type SearchComponentProps = {};

// 検索コンポーネント
const SearchComponent: React.FC<SearchComponentProps> = () => {
    // 検索キーワードの状態
    const [searchTerm, setSearchTerm] = useState<string>('');
    // フィルタリング結果の状態
    const [filteredResults, setFilteredResults] = useState<BuildingRoom[]>([]);

    // キーワードが変更された時の処理
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term) {
            const results = buildingRooms.filter((item) =>
                item.parent.toLowerCase().includes(term.toLowerCase()) ||
                item.current.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredResults(results);
        } else {
            setFilteredResults([]);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="input keyword"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <ul>
                {filteredResults.map((item) => (
                    <li key={item.id}>
                        <strong>{item.parent}</strong>: {item.current}
                    </li>
                ))}
            </ul>
            {searchTerm && filteredResults.length === 0 && <p>not found.</p>}
        </div>
    );
};

export default SearchComponent;
