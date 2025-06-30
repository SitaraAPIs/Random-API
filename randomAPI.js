/* The URL
http://localhost:3000/random-min-10-average-1900&70-max-2000
*/

const http = require('http');
const crypto = require('crypto');
const url = require('url');

const PORT = 3000;

// Helper: Generate cryptographically secure uniform random float [0,1)
function randomFloat() {
  const buf = crypto.randomBytes(4);
  const uint = buf.readUInt32BE(0);
  return uint / 0xffffffff;
}

// Helper: Generate uniform random integer between min (inclusive) and max (exclusive)
function randomInt(min, max) {
  return Math.floor(randomFloat() * (max - min)) + min;
}

// Helper: Generate a normal (Gaussian) random number using Box-Muller transform
// mean = average, stdDev = standard deviation
function gaussianRandom(mean, stdDev) {
  let u = 0, v = 0;
  while (u === 0) u = randomFloat(); // Convert [0,1) to (0,1)
  while (v === 0) v = randomFloat();
  const standardNormal = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + stdDev * standardNormal;
}

// Clamp a number between min and max
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

// Parse URL path and extract parameters based on the pattern:
// /random-min-<min>-average-<average>&<percentage>-max-<max>
function parseParams(pathname) {
  // Example: /random-min-10-average-20&70-max-100
  // Split on dashes and ampersands to get values
  // We'll do this robustly using regex

  const regex = /^\/random-min-(\-?\d+)-average-(\-?\d+)&(\d+)-max-(\-?\d+)$/;
  const match = pathname.match(regex);
  if (!match) return null;

  return {
    min: parseInt(match[1], 10),
    average: parseInt(match[2], 10),
    percentage: parseInt(match[3], 10),
    max: parseInt(match[4], 10),
  };
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Only GET requests are allowed' }));
  }

  const parsedUrl = url.parse(req.url);
  const params = parseParams(parsedUrl.pathname);

  if (!params) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(
      JSON.stringify({
        error:
          'Invalid URL format. Use /random-min-<min>-average-<average>&<percentage>-max-<max>',
      })
    );
  }

  const { min, average, percentage, max } = params;

  if (
    isNaN(min) ||
    isNaN(average) ||
    isNaN(percentage) ||
    isNaN(max) ||
    min > max ||
    average < min ||
    average > max ||
    percentage < 0 ||
    percentage > 100
  ) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(
      JSON.stringify({
        error: 'Invalid parameters. Check min <= average <= max and percentage 0-100',
      })
    );
  }

  // Generate up to 5 random numbers:
  const results = [];
  const stdDev = (max - min) * 0.1; // 10% of range for "around average"

  for (let i = 0; i < 5; i++) {
    const roll = randomFloat() * 100;
    let num;

    if (roll < percentage) {
      // generate around average using Gaussian
      num = gaussianRandom(average, stdDev);
    } else {
      // uniform random anywhere
      num = randomFloat() * (max - min) + min;
    }
    num = clamp(num, min, max);

    // Round to integer
    results.push(Math.round(num));
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ randomNumbers: results }));
});

server.listen(PORT, () => {
  console.log(`Random number API server running at http://localhost:${PORT}`);
  console.log('Example: http://localhost:3000/random-min-10-average-70&70-max-100');
});
