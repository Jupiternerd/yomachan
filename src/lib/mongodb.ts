import { Db, MongoClient, ServerApiVersion  } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }

let database: Db;
export let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  console.log("Connecting to MongoDB in development mode");
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }

  
  client = globalWithMongo._mongoClient;
  database = client.db("test");
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  database = client.db("prod");
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default database;