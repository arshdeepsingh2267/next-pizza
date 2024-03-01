import Users from "@/models/Users";
import db from "@/utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;
export default async function handler(req, res) {
  let success = false;

  if (req.method === "POST") {
    await db.connect();
    const { email, password } = req.body;
    try {
      let user = await Users.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Try logging in with correct email" });
      }

      const pwdCompare = await bcrypt.compare(password, user.password);
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ success, error: "Try logging in with correct password" });
      }

      const data = {
        user: {
          id: user["_id"],
        },
      };

      const authToken = jwt.sign(data, jwtSecret);
      const isAdmin = await user.isAdmin;
      success = true;
      res.json({ success: success, authToken: authToken, isAdmin: isAdmin });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error");
    }
  }
}
