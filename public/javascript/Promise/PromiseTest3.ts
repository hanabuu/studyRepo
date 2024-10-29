const sampleResolve2 = (value: number): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, 1000);
  });
};

const sampleResolve = async (value: number): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, 1000);
    //    const ret = sampleResolve2(value);
    //    console.log("子ret", ret);
  });
};

const sample = async (): string => {
  //  forEachだとawaitにできないから、sampleResolveから帰ってくるものがPromiseだから待ってくれない
  //  [1, 2, 3, 4, 5].forEach((i) => {
  //    //console.log("開始" + i);
  //    const result1 = sampleResolve(i);
  //    console.log("ret1", result1);
  //  });
  for (let i = 0; i < 5; i += 1) {
    //console.log("開始" + i);
    const result2 = await sampleResolve(i);
    console.log("ret2", result2);
  }

  return "ループ終わった。";
};

sample().then((v) => {
  console.log(v); // => 0
  // => 1
  // => 2
  // => 3
  // => 4
  // => ループ終わった。
});
