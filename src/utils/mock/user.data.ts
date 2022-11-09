import { hashPassword } from "../../helpers/bcrypt.helper";

export const user = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com",
    password: hashPassword("Password123"),
  },
  {
    first_name: "Mary",
    last_name: "Jane",
    email: "jane@gmail.com",
    password: hashPassword("Password123"),
  },
  {
    first_name: "Tom",
    last_name: "Jerry",
    email: "tom@gmail.com",
    password: hashPassword("Password123"),
  },
];
