const menuItems = [
  {
    id: 1,
    category: 'wings',
    name: 'Traditional or Dirty Wings',
    price: 15.00,
    desc: 'Choice of hot, medium, mild, BBQ, Cajun, Old Bay, Teriyaki, or Gold BBQ. Served with homemade bleu cheese and carrots.'
  },
  {
    id: 2,
    category: 'wings',
    name: 'Premium Flavor Wings',
    price: 16.00,
    desc: 'Choose from Garlic Parm, Honey BBQ, Honey Thai Garlic, Honey Mustard, Thai Chili, Sweet Thai, Thai BBQ, or Chipotle.'
  },
  {
    id: 3,
    category: 'wings',
    name: 'Boneless Wings',
    price: 10.50,
    desc: 'Boneless wings with your choice of classic sauce and bleu cheese on the side.'
  },
  {
    id: 4,
    category: 'sandwiches',
    name: 'The Big Harry',
    price: 10.00,
    desc: '3/4 lb hand-patted burger on a fresh sub roll with lettuce, tomato, onion, and mayo.'
  },
  {
    id: 5,
    category: 'sandwiches',
    name: 'Mushroom Swiss Burger',
    price: 11.50,
    desc: 'Big burger smothered with melted Swiss and sautéed mushrooms.'
  },
  {
    id: 6,
    category: 'sandwiches',
    name: 'Philly Cheese Steak',
    price: 10.00,
    desc: 'Grilled steak and cheese with peppers and onions on a fresh sub roll.'
  },
  {
    id: 7,
    category: 'sandwiches',
    name: 'Chicken Philly',
    price: 10.00,
    desc: 'Grilled chicken and cheese with peppers and onions on a fresh sub roll.'
  },
  {
    id: 8,
    category: 'sandwiches',
    name: 'Crispy Chicken',
    price: 10.50,
    desc: 'Chicken tenders, crispy bacon, and melted American cheese.'
  },
  {
    id: 9,
    category: 'sandwiches',
    name: 'Buffalo Chicken Sub',
    price: 10.00,
    desc: 'Chicken tenders tossed in hot, medium, or mild with lettuce and bleu cheese.'
  },
  {
    id: 10,
    category: 'sandwiches',
    name: 'Chicken Spiedie',
    price: 10.00,
    desc: 'Grilled marinated chicken breast with melted mozzarella cheese.'
  },
  {
    id: 11,
    category: 'appetizers',
    name: 'Mozzarella Sticks',
    price: 8.00,
    desc: 'Classic fried mozzarella sticks.'
  },
  {
    id: 12,
    category: 'appetizers',
    name: 'Beer Battered Onion Rings',
    price: 8.00,
    desc: 'Crispy onion rings with pub-style batter.'
  },
  {
    id: 13,
    category: 'appetizers',
    name: 'French Fries',
    price: 5.00,
    desc: 'Classic fries. Great side for sandwiches and wings.'
  },
  {
    id: 14,
    category: 'appetizers',
    name: 'Bacon & Cheese Fries',
    price: 7.50,
    desc: 'Fries loaded with bacon and cheese.'
  },
  {
    id: 15,
    category: 'appetizers',
    name: 'Chicken Tenders',
    price: 9.00,
    desc: 'Crispy tenders served as an appetizer.'
  },
  {
    id: 16,
    category: 'appetizers',
    name: 'Sweet Thai Chili Shrimp',
    price: 11.00,
    desc: 'A sweet-and-spicy shrimp appetizer.'
  },
  {
    id: 17,
    category: 'salads',
    name: 'Buffalo Chicken Salad',
    price: 10.00,
    desc: 'Crispy chicken tossed in sauce over iceberg, romaine, tomato, onion, and mozzarella.'
  },
  {
    id: 18,
    category: 'salads',
    name: 'Chicken Spiedie Salad',
    price: 10.00,
    desc: 'Grilled marinated chicken over mixed greens with tomato, onion, and mozzarella.'
  },
  {
    id: 19,
    category: 'salads',
    name: 'Sweet Thai Shrimp Salad',
    price: 11.00,
    desc: 'Fried shrimp tossed in sweet thai, then grilled and served over salad.'
  },
  {
    id: 20,
    category: 'salads',
    name: 'House Salad',
    price: 6.50,
    desc: 'Iceberg lettuce, romaine, tomato, onion, and mozzarella.'
  },
  {
    id: 21,
    category: 'kids',
    name: "Kid's Tenders & Fries",
    price: 8.00,
    desc: '2 tenders with an order of fries.'
  },
  {
    id: 22,
    category: 'kids',
    name: "Kid's Fish & Chips",
    price: 10.00,
    desc: 'Crispy fish with fries.'
  }
];

const classicWingFlavors = ['Hot', 'Medium', 'Mild', 'BBQ', 'Cajun', 'Old Bay', 'Teriyaki', 'Gold BBQ'];
const premiumWingFlavors = ['Garlic Parm', 'Honey BBQ', 'Honey Thai Garlic', 'Honey Mustard', 'Thai Chili', 'Sweet Thai', 'Thai BBQ', 'Chipotle'];

const grid = document.getElementById('menu-grid');
const filters = document.querySelectorAll('.filter');
const modal = document.getElementById('item-modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

let activeFilter = 'all';
let cart = [];

function money(num) {
  return `$${num.toFixed(2)}`;
}

function renderMenu() {
  const filtered = activeFilter === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeFilter);

  grid.innerHTML = filtered.map(item => `
    <article class="menu-item">
      <span class="tag">${item.category}</span>
      <div class="menu-top">
        <div class="item-title">${item.name}</div>
        <div class="price">${money(item.price)}</div>
      </div>
      <div class="item-desc">${item.desc}</div>
      <button class="add-btn" data-id="${item.id}">Customize & Add</button>
    </article>
  `).join('');

  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => openItemModal(Number(btn.dataset.id)));
  });
}

function getExtraOptions(item) {
  if (item.name.includes('Big Harry')) {
    return `
      <label>Cheese
        <select name="cheese">
          <option value="No cheese">No cheese</option>
          <option value="American cheese (+$1.00)">American cheese (+$1.00)</option>
          <option value="Swiss cheese (+$1.00)">Swiss cheese (+$1.00)</option>
        </select>
      </label>
      <label>Add bacon
        <select name="bacon">
          <option value="No bacon">No bacon</option>
          <option value="Add bacon (+$2.00)">Add bacon (+$2.00)</option>
        </select>
      </label>
    `;
  }

  if (item.category === 'wings') {
    const flavors = item.name.includes('Premium') ? premiumWingFlavors : classicWingFlavors;
    return `
      <label>Flavor
        <select name="flavor">
          ${flavors.map(flavor => `<option value="${flavor}">${flavor}</option>`).join('')}
        </select>
      </label>
      <label>Extra dressing or sauce
        <select name="extra">
          <option value="None">None</option>
          <option value="Extra dressing (+$1.00)">Extra dressing (+$1.00)</option>
          <option value="Extra sauce (+$1.00)">Extra sauce (+$1.00)</option>
        </select>
      </label>
    `;
  }

  if (item.name.includes('Buffalo Chicken')) {
    return `
      <label>Sauce level
        <select name="flavor">
          <option value="Hot">Hot</option>
          <option value="Medium">Medium</option>
          <option value="Mild">Mild</option>
        </select>
      </label>
    `;
  }

  return `
    <label>Special instructions
      <textarea name="notes" placeholder="No onions, extra crispy, dressing on side..."></textarea>
    </label>
  `;
}

function getPriceAdjustments(formDataValues) {
  let extra = 0;
  Object.values(formDataValues).forEach(value => {
    if (value.includes('+$1.00')) extra += 1;
    if (value.includes('+$2.00')) extra += 2;
  });
  return extra;
}

function openItemModal(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  modal.classList.remove('hidden');

  modalContent.innerHTML = `
    <h2>${item.name}</h2>
    <p class="meta"><span class="inline-price">${money(item.price)}</span> • ${item.category}</p>
    <p class="item-desc">${item.desc}</p>

    <form id="item-form" class="form-grid">
      ${getExtraOptions(item)}
      <label>Quantity
        <input type="number" min="1" value="1" name="quantity" />
      </label>
      <button type="submit" class="submit-btn">Add to Order</button>
    </form>
  `;

  const form = document.getElementById('item-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    const quantity = Math.max(1, Number(values.quantity || 1));
    delete values.quantity;

    const extras = Object.values(values).filter(Boolean);
    const adjustedPrice = item.price + getPriceAdjustments(values);

    cart.push({
      name: item.name,
      quantity,
      price: adjustedPrice,
      extras
    });

    renderCart();
    modal.classList.add('hidden');
  });
}

function renderCart() {
  if (!cart.length) {
    cartItemsEl.innerHTML = '<p class="muted">Your cart is empty.</p>';
    cartTotalEl.textContent = '$0.00';
    return;
  }

  cartItemsEl.innerHTML = cart.map((line, index) => `
    <div class="cart-line">
      <div class="cart-line-head">
        <span>${line.quantity} × ${line.name}</span>
        <span>${money(line.quantity * line.price)}</span>
      </div>
      <div class="small muted">${line.extras.length ? line.extras.join(' • ') : 'Standard order'}</div>
      <button class="small" onclick="removeCartItem(${index})" style="margin-top:8px;border:0;background:transparent;color:#b91c1c;cursor:pointer;padding:0;">Remove</button>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalEl.textContent = money(total);
}

function removeCartItem(index) {
  cart.splice(index, 1);
  renderCart();
}
window.removeCartItem = removeCartItem;

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'));
    filter.classList.add('active');
    activeFilter = filter.dataset.filter;
    renderMenu();
  });
});

closeModal.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

checkoutBtn.addEventListener('click', () => {
  if (!cart.length) {
    alert('Add at least one item before checkout.');
    return;
  }
  alert('Demo checkout only. Next step would be connecting this site to real online ordering or payment processing.');
});

renderMenu();
renderCart();
