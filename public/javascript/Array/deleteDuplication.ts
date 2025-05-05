// https://tech.iimon.co.jp/entry/2024/12/20

// filter() と indexOf() を使った重複削除
// indexOf() を毎回呼び出すため、データ量が多いと非効率。
// オブジェクトのような複雑なデータには不向き。
const numbers: number[] = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers_map = numbers.filter(
  (item, index, array) => array.indexOf(item) === index
);

console.log(uniqueNumbers_map);

// シンプルな重複削除
// オブジェクトの配列には使えない
const uniqueNumbers_set = [...new Set(numbers)];

console.log(uniqueNumbers_set);

// 追加したときには別オブジェクトとして扱われるため、オブジェクトは使えない
const set = new Set();
set.add({ id: 1 });
set.add({ id: 1 }); // 別のオブジェクトとして扱われる

console.log(set.size);

// オブジェクトの場合（失敗する）
// companyとstoreが同じ場合は重複削除したい
const accounts = [
  { company: "iimon", store: "東京" },
  { company: "iimon", store: "東京" },
  { company: "iimon", store: "大阪" },
  { company: "iimon", store: "福岡" },
];

const uniqueAccountsSet = Array.from(new Set(accounts));
console.log(uniqueAccountsSet);

// Mapによる削除（削除できる）
const uniqueAccounts_map = Array.from(
  new Map(
    accounts.map((account) => [`${account.company}-${account.store}`, account])
  ).values()
);

console.log(uniqueAccounts_map);

// Mapの場合同じキーが追加されると新しい値で上書きされる
const map = new Map();
map.set("key", "value1");
map.set("key", "value2");

console.log(map.get("key"));

// 大容量の配列を作るやつ
// const largeArray = Array.from({ length: 1000000 }, () => Math.floor(Math.random() * 10000));
