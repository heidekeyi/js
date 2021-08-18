type ft = <T, U>(f: T, s: U, n: number) => [T, U][];

let fn: ft = (a, b, n) => {
    return new Array(n).fill([a, b]);
}
const res = fn<string, number>('hello', 100, 10)
    .map((it,ix)=>{
        return [
            it[0],
            (it[1]+1) * ix * ix * ix
        ]
    })
console.log(res);
