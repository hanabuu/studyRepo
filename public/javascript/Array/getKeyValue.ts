const list = {
    id: 1,
    count: 10,
    propaty: "aaaa",
    child: {
        id: 2,
        count: 20,
        propaty: "bbbb"
    }
};

console.log(Object.keys(list));
console.log(Object.values(list));

// プロパティの存在確認
console.log(Object.prototype.hasOwnProperty.call(list.child, "id"));

// 配列の動的追加(安全ではないので、jsの場合のみの例)
list.test = "test";

console.log(list);

// ---- 追記: TypeScriptで配列要素に型安全にプロパティを追加する例 ----

// [学習ポイント1] まずは「元データの型」を定義する
// ここでは 1 要素が Item 型（id / count / property を持つ）であることを明示する
// こうしておくと、この後の関数で item.id や item.count に安全にアクセスできる
type Item = {
    id: number;
    count: number;
    property: string;
};

// [学習ポイント2] 元配列は Item[] として型注釈しておく
// この時点では追加プロパティ（active, label など）は存在しない
// 追加は「新しい配列を作る」形で行う（元データを壊さない）
const itemList: Item[] = [
    { id: 1, count: 10, property: "aaaa" },
    { id: 2, count: 20, property: "bbbb" }
];

// [学習ポイント3] 任意キー追加の汎用関数
// T: 元要素の型（例: Item）
// K: 追加するキー名（例: "active", "label"）
// V: そのキーに入る値の型（例: boolean, string）
// items を readonly T[] にしているのは、「関数内で元配列を変更しない」意図を型で表すため
function addProp<T extends object, K extends string, V>(
    items: readonly T[],
    key: K,
    valueFactory: (item: T, index: number) => V
): Array<T & Record<K, V>> {
    // 返り値の型: T & Record<K, V>
    // 例) T=Item, K="active", V=boolean のとき Item & { active: boolean }
    // map + スプレッドで各要素をコピーしてから新規キーを付与するため、元配列は不変
    return items.map((item, index) => ({
        ...item,
        [key]: valueFactory(item, index)
    })) as Array<T & Record<K, V>>;
}

// [学習ポイント4] 使用例（追加後の型推論を確認）
// active を追加すると withActive の要素型は Item & { active: boolean }
const withActive = addProp(itemList, "active", (item) => item.count >= 15);
// label を追加すると withLabel の要素型は Item & { label: string }
const withLabel = addProp(itemList, "label", (item, index) => `${index + 1}:${item.property}`);

console.log(withActive);
console.log(withLabel);

// ---- 追記: 既存キーの上書きを禁止する型制約版 ----

// [学習ポイント5] 既存キー上書き禁止の型制約
// key: K & Exclude<K, keyof T> の意味:
// - keyof T は「T が既に持つキーの集合」（Item なら "id" | "count" | "property"）
// - Exclude<K, keyof T> で既存キーを除外
// - 結果として key には「まだ存在しないキー」だけ渡せる
function addPropNoOverwrite<T extends object, K extends string, V>(
    items: readonly T[],
    key: K & Exclude<K, keyof T>,
    valueFactory: (item: T, index: number) => V
): Array<T & Record<K, V>> {
    // 実装は addProp と同じ（不変更新）
    // 違いは key の型制約のみ
    return items.map((item, index) => ({
        ...item,
        [key]: valueFactory(item, index)
    })) as Array<T & Record<K, V>>;
}

// rank は元の Item に存在しないキーなので追加可能
const withRank = addPropNoOverwrite(itemList, "rank", (item, index) => `${index + 1}位`);
console.log(withRank);

// [学習ポイント6] readonly 配列（as const）にも対応
// addProp / addPropNoOverwrite の引数が readonly T[] なのでそのまま渡せる
const readonlyList = [
    { id: 10, count: 100, property: "readonly-a" },
    { id: 11, count: 200, property: "readonly-b" }
] as const;

// readonly 配列に対しても、新しい要素オブジェクトを持つ配列を返すため安全
const readonlyWithFlag = addPropNoOverwrite(readonlyList, "flag", (item) => item.count >= 150);
console.log(readonlyWithFlag);

// [学習ポイント7] 下記はコンパイルエラー例
// "id" は既存キーなので addPropNoOverwrite では指定不可
// const invalid = addPropNoOverwrite(itemList, "id", () => 999);