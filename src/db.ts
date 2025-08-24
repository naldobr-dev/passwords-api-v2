import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.DATABASE_NAME || "db-psswrds";

if (!uri) {
  throw new Error("MONGODB_URI não está definido no .env");
}

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  if (db) return db;

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log(`Conectado ao MongoDB: ${dbName}`);

  return db;
}

export function getDb() {
  if (!db) throw new Error("Banco de dados não conectado ainda");
  return db;
}
