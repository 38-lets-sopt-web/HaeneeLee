import { initStorage, getData } from "./store/storage.js";

initStorage();

const data = getData();
console.log("불러온 데이터:", data);
