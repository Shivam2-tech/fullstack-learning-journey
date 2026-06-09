const fs = require("fs");

fs.writeFileSync("skils.txt", "HTML");
fs.appendFileSync("skils.txt", "\nCSS\nJavaScript");
const data = fs.readFileSync("skils.txt", "utf8");

console.log(data);

fs.writeFileSync("student.txt","Name:");
fs.appendFileSync("student.txt","Shivam\nAge:18\nLearning: Node.js");

const content=fs.readFileSync("student.txt","utf8");
console.log(content);

