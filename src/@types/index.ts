import * as session from "express-session"

declare module "express-session"{
    interface Session{
        userID : string;
        token: string
    }
}