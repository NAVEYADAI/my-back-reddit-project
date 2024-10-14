import { Post } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/category/category.entity";
import { SubCategory } from "src/sub-category/sub-category.entity";
import { User } from "src/user/user.entity";
import { Like } from "typeorm";

// console.log(process.env.DATABASE_USERNAME)
// export const typeOrmModel=():TypeOrmModule=>{return {
//     type: `postgres`,
//     host: process.env.DATABASE_HOST,
//     port: +process.env.DATABASE_PORT,
//     username: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_DATABASE,
//     entities: [
//       Category,
//       Like,
//       Post,
//       Response,
//       SubCategory,
//       User,
//     ],
//     synchronize: true,
//   }}

export default () => ({
  jwt:{
    secret: process.env.JWT_SECRET,
  }
})