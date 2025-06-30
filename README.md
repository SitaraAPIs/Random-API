🎲 Random Number API
A 100% free, unlimited, and open-source API that generates up to 5 random integers based on your own custom rules — including minimum, maximum, average, and percentage-based normal distribution.

🚀 Live Demo Example
lua
Copy
Edit
http://localhost:3000/random-min-10-average-1900&70-max-2000
This example generates 5 integers between 10 and 2000, with ~70% of the numbers near the average 1900, using a Gaussian (normal) distribution. The remaining ~30% are fully random.

🌟 Why People Love This
⚡ Instant API — no keys, no auth, no setup

🧠 Smart randomness with control over how numbers behave

🔁 Unlimited usage — zero restrictions, always free

🛠️ Open source and hackable — modify or self-host easily

🧊 Zero dependencies — built entirely with core Node.js

📊 Great for simulations, games, A/B testing, and more

📦 API Usage
Request Format
arduino
Copy
Edit
GET /random-min-<min>-average-<average>&<percentage>-max-<max>
Example
arduino
Copy
Edit
GET /random-min-100-average-300&80-max-500
Returns something like:

json
Copy
Edit
{
  "randomNumbers": [304, 305, 487, 311, 297]
}
🔢 Parameters
Parameter	Description
min	Minimum integer (inclusive)
average	Mean value for Gaussian distribution
percentage	Percentage of numbers near the average (0–100)
max	Maximum integer (inclusive for practical use)

✔️ average must be between min and max
✔️ percentage must be between 0 and 100

✅ Advantages
Easy to understand and use — RESTful and intuitive

No third-party dependencies — just native Node.js

Generates human-like randomness — mix of uniform + Gaussian

Open-source forever — fork, customize, or deploy as-is

Fun for developers and educators — great for experiments

⚠️ Limitations
Only supports GET requests

Response always returns 5 numbers

Currently runs only on localhost unless deployed manually

🧰 How to Run
Prerequisite
Node.js (v12+ recommended)

Steps
bash
Copy
Edit
git clone https://github.com/your-username/random-number-api.git
cd random-number-api
node index.js
Server will run at:

arduino
Copy
Edit
http://localhost:3000
👩‍💻 Contribute
Want to add features, fix bugs, or tweak behavior? Fork the repo and make it yours. Contributions are welcome!

📜 Summary
This API is:

✅ 100% Free

✅ Unlimited Use

✅ Fully Open Source

✅ Fun, Flexible, and Fast

Whether you're a developer, teacher, data scientist, or just someone who needs smart random numbers — this tool is built for you.
