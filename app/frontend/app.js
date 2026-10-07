const API = '/api';

async function loadProducts() {
  const response = await fetch(`${API}/products`);
  const products = await response.json();
  const list = document.getElementById('product-list');
  list.innerHTML = products.map(p =>
    `<li>
      <span>${p.name} — $${parseFloat(p.price).toFixed(2)}</span>
      <button onclick="deleteProduct(${p.id})">Delete</button>
    </li>`
  ).join('');
  loadStats();
}

// Stats come from a different service (Node.js). If it is down,
// the product list keeps working — that is the point of separate services.
async function loadStats() {
  const text = document.getElementById('stats-text');
  try {
    const response = await fetch(`${API}/stats`);
    if (!response.ok) throw new Error(`stats returned ${response.status}`);
    const s = await response.json();
    text.textContent = `${s.count} products · total $${s.total.toFixed(2)} · average $${s.average.toFixed(2)}`;
  } catch (err) {
    text.textContent = 'Stats service unavailable — the product list still works.';
  }
}

async function deleteProduct(id) {
  await fetch(`${API}/products/${id}`, { method: 'DELETE' });
  loadProducts();
}

document.getElementById('add-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  await fetch(`${API}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price })
  });
  e.target.reset();
  loadProducts();
});

loadProducts();
