type Dog = {
  bow: () => void;
};
type Cat = {
  myao: () => void;
};

const dog: Dog = {
  bow: () => console.log("bow"),
};
const cat: Cat = {
  myao: () => console.log("myao"),
};

const pet = (pet: Dog | Cat): void => {
  console.log("aa");
  // inでプロパティにbowが含まれているか判断
  if ("bow" in pet) {
    console.log("dog");
    dog.bow();
  } else {
    console.log("cat");
    cat.myao();
  }
};

pet(dog);
pet(cat);
