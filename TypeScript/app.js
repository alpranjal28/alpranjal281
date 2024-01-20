//tsc --init; in terminal for tsconfig.json file
//string
var cats = "oggy";
console.log(cats);
//number
var age = 3;
//array
var names = ["ajit", "sarojini", "shlesha", "pranjal"];
names.push("scooby");
// names.push(9) // TS wont let this pass
var gameList = ["assassins creed", "grand theft auto"];
console.log(gameList);
//OBJECTS
var persons = [
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
var caller = function () {
    return persons[2].name;
};
