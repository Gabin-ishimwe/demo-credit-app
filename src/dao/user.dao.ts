import db from "../database/db";

class UserDao {
  static async createUser() {
    const user = await db("users")
      .insert({
        first_name: "gabin",
        last_name: "ishimwe",
        email: "g.ishimwe@alustudent.com",
        password: "1234",
        role: "1",
      })
      .returning("*");
    console.log(user);
    return user;
  }
}

export default UserDao;
