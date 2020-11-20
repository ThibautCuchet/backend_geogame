const bcrypt = require("bcrypt");

const SALTROUNDS = 10;
const FILE_PATH = __dirname + "/users.json";

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  async save() {
    let userList = getUserListFromFile(FILE_PATH);
    const hashed = await bcrypt.hash(this.password, 10);

    userList.push({
      username: this.username,
      email: this.email,
      password: hashed,
    });

    saveUserListToFile(FILE_PATH, userList);
    return true;
  }

  static checkCredentials(username, password) {
    if (!username || !password) return false;
    const userFound = User.getUserFromUsername(username);
    if (!userFound) return Promise.resolve(false);
    return bcrypt
      .compare(password, userFound.password)
      .then((match) => match)
      .catch((err) => console.error("checkCreditentials:", err));
  }

  static isUser(username, email) {
    const userFound =
      User.getuserFromEmail(email) || User.getUserFromUsername(username);
    return userFound !== undefined;
  }

  static getuserFromEmail(email) {
    const userList = getUserListFromFile(FILE_PATH);
    return userList.find((user) => user.email === email);
  }

  static getUserFromUsername(username) {
    const userList = getUserListFromFile(FILE_PATH);
    return userList.find((user) => user.username === username);
  }
}

function getUserListFromFile(filePath) {
  const fs = require("fs");
  if (!fs.existsSync(filePath)) return [];
  let userList = fs.readFileSync(filePath);
  if (userList) userList = JSON.parse(userList);
  else userList = [];
  return userList;
}

function saveUserListToFile(filePath, userList) {
  const fs = require("fs");
  fs.writeFileSync(filePath, JSON.stringify(userList));
}

module.exports = User;
