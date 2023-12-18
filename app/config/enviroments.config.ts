import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const enviroments = {
    NODE_ENV: process.env.NODE_ENV,
    VITE_URL: process.env.VITE_URL,
    PORT: process.env.PORT,
    // db
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    // session
    SECRET_SESSION_KEY: process.env.SECRET_SESSION_KEY as string,
};

export default enviroments;
