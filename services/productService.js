const { delayReadFile, writeData } = require("../database/dbAccess");

async function getAllProducts() {
    return await delayReadFile();
}

async function getProductById(id) {
    let data = await delayReadFile();
    return data.find((item) => item.id === id);
}

async function modifyData(newData) {
    let data = await delayReadFile();
    data.push(newData);
    await writeData(data);
    return newData;
}

module.exports = { getAllProducts, getProductById, modifyData };