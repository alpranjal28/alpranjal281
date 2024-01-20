//tsc --init; in terminal for tsconfig.json file

//string
let cats: string = "oggy";
console.log(cats);

//number
let age: number = 3;

//array
let names = ["ajit", "sarojini", "shlesha", "pranjal"];
names.push("scooby");
// names.push(9) // TS wont let this pass
let gameList: string[] = ["assassins creed", "grand theft auto"];
console.log(gameList);

//OBJECTS
let persons = [
    {
        name: "ajit",
        age: 54,
    },
    {
        name: "sarojini",
        age: 52,
    },
    {
        name: "shlesha",
        age: 22,
    },
    {
        name: "pranjal",
        age: 26,
    },
];
console.log(persons[3]);

let caller= ()=>{
    return persons[2].name
}