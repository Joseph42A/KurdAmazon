import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 12),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "John@example.com",
    password: bcrypt.hashSync("123456", 12),
  },

  {
    name: "Joseph Sulaiman",
    email: "Joseph@example.com",
    password: bcrypt.hashSync("123456", 12),
  },
];

export default users;
