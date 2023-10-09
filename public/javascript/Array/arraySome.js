/** これらのうちのいずれかと一致するidを持つ要素を除外する */
const searchTarget = ["target","targer12"];

// interface ExampleData {
//     id:string;
//     value:number;
// }

const data = [
    {id:"target",value:1},
    {id:"target2",value:2},
    {id:"target3",value:3}
]

// someの使い方として以下は違いが出るらしい。someについては{}をつけないほうがよい。ヒットしないことがある
// {}は関数になってしまって、なければ条件式の判断をしてくれるみたい
// array.some( value => { value.aa === array.aa && value.bb === array.bb })
// array.some( value =>  value.aa === array.aa && value.bb === array.bb )
const filteredArray = data.filter(elem=>{
    return !searchTarget.some(elem2=>
        elem2 === elem.id
    )
})

console.log(filteredArray);