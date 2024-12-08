import { useState } from 'react';

// 建物・部屋リストの型定義
interface BuildingRoom {
    name: string;
    children: BuildingRoom[];
};

const buildingRooms: BuildingRoom = {
    name: "建物",
    children: [{
        name: 'A棟群',
        children: [{
            name: 'A棟',
            children: [{
                name: "A-101講義室",
                children: []
            },
            {
                name: "A-201講義室",
                children: []
            }]
        },
        {
            name: 'A1棟',
            children: [{
                name: "A1-101講義室",
                children: []
            }]
        }]
    },
    {
        name: "B棟群",
        children: [{
            name: 'B棟',
            children: [{
                name: "B-201講義室",
                children: []
            },
            {
                name: "B-301講義室",
                children: []
            }]
        },
        {
            name: 'B1棟',
            children: [{
                name: "B1-301講義室",
                children: []
            }]
        }]
    }]
}

const searchBuildingRooms = (rooms: BuildingRoom[], searchTerm: string): BuildingRoom[] => {
    let results: BuildingRoom[] = [];

    rooms.forEach(room => {
        // 現在のノードが検索条件に一致する場合、結果に追加
        if (room.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push(room);
        }
        // 子ノードを再帰的に検索
        if (room.children.length > 0) {
            results = results.concat(searchBuildingRooms(room.children, searchTerm));
        }
    });

    return results;
};

// 検索コンポーネント
export function SearchComponent() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredResults, setFilteredResults] = useState<BuildingRoom[]>([]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term) {
            const results = searchBuildingRooms(buildingRooms.children, term);
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
                {filteredResults.length > 0 ? (
                    filteredResults.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))
                ) : (
                    searchTerm && <p>not found.</p>
                )}
            </ul>
        </div>
    );
};
