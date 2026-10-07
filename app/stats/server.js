// ShopList stats service — Node.js, no external packages.
// It does not touch the database. It asks the backend for the product list
// over HTTP and calculates statistics from it: one service calling another.
const http = require('http');

const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:5000';

async function getStats() {
  const response = await fetch(`${BACKEND_URL}/products`);
  if (!response.ok) {
    throw new Error(`backend returned ${response.status}`);
  }
  const products = await response.json();
  const prices = products.map(p => Number(p.price));
  const total = prices.reduce((sum, price) => sum + price, 0);

  return {
    count: products.length,
    total: Number(total.toFixed(2)),
    average: products.length ? Number((total / products.length).toFixed(2)) : 0,
    max: products.length ? Math.max(...prices) : 0
  };
}

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    return send(res, 200, { status: 'ok' });
  }
  if (req.method === 'GET' && req.url === '/stats') {
    try {
      return send(res, 200, await getStats());
    } catch (err) {
      return send(res, 502, { error: 'backend unavailable', detail: err.message });
    }
  }
  send(res, 404, { error: 'not found' });
});

// 0.0.0.0, not localhost: inside a container, localhost is the container itself.
server.listen(PORT, '0.0.0.0', () => {
  console.log(`stats service listening on 0.0.0.0:${PORT}, backend at ${BACKEND_URL}`);
});
