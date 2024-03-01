import Orders from "@/models/Orders";
import db from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db.connect();
    try {
      if (req.body.email === undefined || req.body.email === null) {
        throw new Error();
      }
      let data = req.body.order_data;
      await data.splice(0, 0, { order_date: req.body.order_date });

      let eId = await Orders.findOne({ email: req.body.email });
      if (eId === null) {
        try {
          await Orders.create({
            email: req.body.email,
            order_data: [data],
          }).then(() => {
            res.json({ success: true });
          });
        } catch (error) {
          res.send("Server error: ", error.message);
        }
      } else {
        try {
          await Orders.findOneAndUpdate(
            { email: req.body.email },
            { $push: { order_data: data } }
          ).then(() => {
            res.json({ success: true });
          });
        } catch (error) {
          res.status(400).send("Server error: ", error.message);
        }
      }
    } catch (error) {
      res.status(400).json({ success: false });
    }

    await db.disconnect();
    //{order_data:[{Date},{MAr},{Peppy},{}],email: "", order_date:Date() }
  }
}
