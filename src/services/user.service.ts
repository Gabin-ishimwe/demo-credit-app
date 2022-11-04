import UserDao from "../dao/user.dao";

class UserService {
  static async userRegister() {
    return UserDao.createUser();
  }
}

export default UserService;
