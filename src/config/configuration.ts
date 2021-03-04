import dotenv from "dotenv";
import config from "dotenv";

export default () => ({
    port: parseInt(process.env.PORT, 10) || 8080,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
      databaseName: process.env.DATABASE_DB
    },
    secretConfig:{
        secret:process.env.SECRET_KEY
    }
  });