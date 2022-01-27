import 'reflect-metadata';
import { createConnection } from 'typeorm';

export const connectDB = async () => {
  createConnection()
    .then(async (connection) => {
      console.log('MySQL DB Connected');
      // const user = new User();
      // user.name = "Timber";
      // user.username = "Saw";
      // user.email = "email@email.com"
      // user.password = "passsword";
      // await connection.manager.save(user);
      // console.log("Saved a new user with id: " + user.id);

      // console.log("Loading users from the database...");
      // const users = await connection.manager.find(User);
      // console.log("Loaded users: ", users);

      // console.log("Here you can setup and run express/koa/any other framework.");
    })
    .catch((error) => console.log(error));
};

// DB CONNECTION
import mongoose from 'mongoose';

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log('Database connection successful');
    })
    .catch((error) => {
      console.log('Database connection failed !');
      console.error(error);
      process.exit(1);
    });
};
