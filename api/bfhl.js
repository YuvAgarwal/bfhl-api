export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { data } = req.body;
      
      // Validate input
      if (!data || !Array.isArray(data)) {
        return res.status(400).json({
          is_success: false,
          message: "Invalid input. Expected an array in 'data' field."
        });
      }

      let odd_numbers = [];
      let even_numbers = [];
      let alphabets = [];
      let special_characters = [];
      let sum = 0;
      let all_alphabets = []; // To collect all alphabetic characters for concatenation

      for (let item of data) {
        const str = String(item);
        
        // Check if it's a pure number
        if (!isNaN(item) && /^\d+$/.test(str)) {
          let num = parseInt(item, 10);
          if (num % 2 === 0) {
            even_numbers.push(str); // Keep as string
          } else {
            odd_numbers.push(str); // Keep as string
          }
          sum += num;
        } 
        // Check if it's purely alphabetic (handles multi-character strings like "ABcD")
        else if (/^[a-zA-Z]+$/.test(str)) {
          alphabets.push(str.toUpperCase());
          // Add each character to all_alphabets for concatenation
          all_alphabets.push(...str.split(''));
        } 
        // Handle single special characters
        else if (str.length === 1 && !/[a-zA-Z0-9]/.test(str)) {
          special_characters.push(str);
        }
        // Handle mixed strings or other cases
        else {
          // Process character by character for mixed strings
          for (let char of str) {
            if (/[a-zA-Z]/.test(char)) {
              all_alphabets.push(char);
            } else if (!/[0-9]/.test(char)) {
              special_characters.push(char);
            }
          }
        }
      }

      // Create concatenation string: reverse order + alternating caps
      let concat_string = all_alphabets
        .reverse()
        .map((ch, i) => (i % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase()))
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
        message: "Internal server error"
      });
    }
  } 
  // Handle GET request (optional but good practice)
  else if (req.method === "GET") {
    return res.status(200).json({
      operation_code: 1
    });
  }
  else {
    return res.status(405).json({ 
      is_success: false, 
      message: "Method not allowed" 
    });
  }
}
