import Orders from "@/models/Orders";
import db from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db.connect();
    try {
      let data = await Orders.findOne({ email: req.body.email });
      res.json({ order_data: data });
    } catch (error) {
      res.send("Server error: " + error.message);
    }
    await db.disconnect();
  }
}
