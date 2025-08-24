"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
exports.getDb = getDb;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGODB_URI || "";
const dbName = process.env.DATABASE_NAME || "db-psswrds";
if (!uri) {
    throw new Error("MONGODB_URI não está definido no .env");
}
let client;
let db;
async function connectToDatabase() {
    if (db)
        return db;
    client = new mongodb_1.MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log(`Conectado ao MongoDB: ${dbName}`);
    return db;
}
function getDb() {
    if (!db)
        throw new Error("Banco de dados não conectado ainda");
    return db;
}
