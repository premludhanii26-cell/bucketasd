const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "../db.json"); 

async function readData(){
    const products = await fs.readFile(filePath, "utf-8");
    return JSON.parse(products);
}
async function writeData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

async function delayReadFile() {
    await new Promise((resolve, reject) => {
     setTimeout(resolve, 1500);
    });
    return await readData();
}

module.exports = { readData, delayReadFile, writeData };