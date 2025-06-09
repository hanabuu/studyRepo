function* generatorFn () {
    console.log('start')
    yield 1
    // console.log('after yield 1')
    yield 2
    // console.log('after yield 2')
    yield 3
    // console.log('after yield 3')
}

const generator = generatorFn()

console.log(generator.next().value)
// console.log('stopped')
console.log(generator.next().value)
// console.log('stopped')
console.log(generator.next().value)
// console.log('stopped')
console.log(generator.next().value)