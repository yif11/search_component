import { useState } from 'react';

// 建物・部屋リストの型定義
interface BuildingRoom {
    // id: number;
    // parent: string;
    // current: string;
    children: string[];
};

// サンプルデータ
const buildingRooms: BuildingRoom[] = [
    // { id: 1, parent: 'A棟', current: 'A棟' },
    // { id: 2, parent: 'A棟', current: 'A1棟' },
    // { id: 3, parent: 'B棟', current: 'B棟' },
    // { id: 4, parent: 'A棟', current: 'A-101講義室' },
    // { id: 5, parent: 'A棟', current: 'A-201講義室' },
    { children: ['A棟群', 'A棟', 'A-101講義室'] },
    { children: ['A棟群', 'A棟', 'A-201講義室'] },
    { children: ['A棟群', 'A1棟', 'A1-101講義室'] },
    { children: ['B棟群', 'B棟', 'B-201講義室'] },
    { children: ['B棟群', 'B1棟', 'B1-301講義室'] },
];

// 検索コンポーネント
export function SearchComponent() {
    // 検索キーワードの状態
    const [searchTerm, setSearchTerm] = useState<string>('');
    // フィルタリング結果の状態
    const filteredResults = searchTerm ? buildingRooms.filter((item) =>
        // item.parent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // item.current.toLowerCase().includes(searchTerm.toLowerCase())
        item.children.some((child) => child.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : [];

    // キーワードが変更された時の処理
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="input keyword"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {/* <ul>
                {filteredResults.map((item) => (
                    <li key={item.children[0]}>
                        <strong>{item.children[1]}</strong>: {item.children[2]}
                    </li>
                ))}
            </ul> */}
            <ul>
                {filteredResults.map((item, index) => (
                    <li key={index}>
                        {item.children.map((child, idx) => (
                            <span key={idx}>
                                {child}
                                {idx < item.children.length - 1 && ' > '}
                            </span>
                        ))}
                    </li>
                ))}
            </ul>
            {searchTerm && filteredResults.length === 0 && <p>not found.</p>}
        </div>
    );
};
