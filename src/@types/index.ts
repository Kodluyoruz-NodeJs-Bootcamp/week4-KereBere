import * as session from "express-session"
import * as express from 'express';

declare module 'express-session' {
  interface Session {
    browserInfo: string;
    userId: string;
  }
}

declare module 'express' {
  interface Express {
    req: Request;
    res: Response;
    next: NextFunction;
  }
}

