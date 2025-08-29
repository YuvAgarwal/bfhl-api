export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { data } = req.body;

      let odd_numbers = [];
      let even_numbers = [];
      let alphabets = [];
      let special_characters = [];
      let sum = 0;

      for (let item of data) {
        if (!isNaN(item)) {
          let num = parseInt(item, 10);
          if (num % 2 === 0) even_numbers.push(item);
          else odd_numbers.push(item);
          sum += num;
        } else if (/^[a-zA-Z]+$/.test(item)) {
          alphabets.push(item.toUpperCase());
        } else {
          special_characters.push(item);
        }
      }

      let concat_string = alphabets.join("");
      concat_string = concat_string
        .split("")
        .reverse()
        .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
        .join("");

      return res.status(200).json({
        is_success: true,
        user_id: "yuv_agarwal_15112004",
        email: "yuv.agarwal@vitstudent.ac.in",
        roll_number: "22BCE0461",
        odd_numbers,
        even_numbers,
        alphabets,
        special_characters,
        sum: sum.toString(),
        concat_string,
      });
    } catch (error) {
      return res.status(500).json({
        is_success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(405).json({ is_success: false, message: "Method not allowed" });
  }
}
