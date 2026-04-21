import React, { useMemo, useState } from "react";
import { ShoppingCart, Clock3, MapPin, Phone, Plus, Minus, CheckCircle2, Flame } from "lucide-react";

const menu = [
  {
    category: "Wings & Starters",
    items: [
      {
        id: "dirty-wings",
        name: "Dirty Wings",
        price: 13.99,
        description: "Harry's-style wings with your choice of sauce, dip, and wing count.",
        badge: "Popular",
        image:
          "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1200&q=80",
        modifiers: [
          { name: "Quantity", type: "single", required: true, options: [{ name: "10 Wings", price: 0 }, { name: "20 Wings", price: 12 }, { name: "30 Wings", price: 24 }] },
          { name: "Sauce", type: "single", required: true, options: [{ name: "Mild", price: 0 }, { name: "Medium", price: 0 }, { name: "Hot", price: 0 }, { name: "BBQ", price: 0 }, { name: "Garlic Parm", price: 1 }, { name: "Thai Chili", price: 1 }] },
          { name: "Dip", type: "single", required: true, options: [{ name: "Ranch", price: 0 }, { name: "Bleu Cheese", price: 0 }, { name: "No Dip", price: 0 }] },
          { name: "Extras", type: "multi", required: false, options: [{ name: "Extra Sauce", price: 1 }, { name: "Extra Dip", price: 1 }, { name: "Celery", price: 1 }] },
        ],
      },
      {
        id: "loaded-fries",
        name: "Loaded Fries",
        price: 9.99,
        description: "Crispy fries topped with cheese, bacon, and scallions.",
        image:
          "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=1200&q=80",
        modifiers: [
          { name: "Cheese", type: "single", required: true, options: [{ name: "Cheddar", price: 0 }, { name: "Mozzarella", price: 0 }, { name: "No Cheese", price: 0 }] },
          { name: "Sauce", type: "single", required: true, options: [{ name: "Ranch", price: 0 }, { name: "Chipotle Aioli", price: 0 }, { name: "No Sauce", price: 0 }] },
          { name: "Extras", type: "multi", required: false, options: [{ name: "Extra Bacon", price: 2 }, { name: "Jalapeños", price: 1 }, { name: "Sour Cream", price: 1 }] },
        ],
      },
      {
        id: "mozz-sticks",
        name: "Mozzarella Sticks",
        price: 8.49,
        description: "Golden fried mozzarella sticks served with your favorite dip.",
        image:
          "https://images.unsplash.com/photo-1548340748-6d2b7d7da280?auto=format&fit=crop&w=1200&q=80",
        modifiers: [
          { name: "Sauce", type: "single", required: true, options: [{ name: "Marinara", price: 0 }, { name: "Ranch", price: 0 }, { name: "Bleu Cheese", price: 0 }] },
        ],
      },
    ],
  },
  {
    category: "Burgers & Sandwiches",
    items: [
      {
        id: "harrys-cheeseburger",
        name: "Harry's Cheeseburger",
        price: 13.99,
        description: "Fresh grilled burger with classic toppings and your choice of side.",
        badge: "House Favorite",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
        modifiers: [
          { name: "Cheese", type: "single", required: true, options: [{ name: "American", price: 0 }, { name: "Cheddar", price: 0 }, { name: "Swiss", price: 0 }, { name: "No Cheese", price: 0 }] },
          { name: "Side", type: "single", required: true, options: [{ name: "Fries", price: 0 }, { name: "Chips", price: 0 }, { name: "Onion Rings", price: 2 }] },
          { name: "Toppings", type: "multi", required: false, options: [{ name: "Lettuce", price: 0 }, { name: "Tomato", price: 0 }, { name: "Onion", price: 0 }, { name: "Pickles", price: 0 }] },
          { name: "Extras", type: "multi", required: false, options: [{ name: "Bacon", price: 2 }, { name: "Extra Patty", price: 4 }, { name: "Jalapeños", price: 1 }] },
        ],
      },
      {
        id: "buffalo-chicken-sandwich",
        name: "Buffalo Chicken Sandwich",
        price: 13.49,
        description: "Crispy chicken tossed in buffalo sauce with lettuce and ranch.",
        image:
          "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=1200&q=80",
        modifiers: [
          { name: "Sauce Heat", type: "single", required: true, options: [{ name: "Mild", price: 0 }, { name: "Medium", price: 0 }, { name: "Hot", price: 0 }] },
          { name: "Side", type: "single", required: true, options: [{ name: "Fries", price: 0 }, { name: "Chips", price: 0 }, { name: "Onion Rings", price: 2 }] },
          { name: "Extras", type: "multi", required: false, options: [{ name: "Extra Ranch", price: 1 }, { name: "American Cheese", price: 1 }, { name: "Pickles", price: 0 }] },
        ],
      },
      {
        id: "reuben",
        name: "Reuben Sandwich",
        price: 14.49,
        description: "Corned beef, sauerkraut, Swiss, and dressing on grilled rye.",
        image:
          "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80",
        modifiers: [
          { name: "Bread", type: "single", required: true, options: [{ name: "Rye", price: 0 }, { name: "White", price: 0 }, { name: "Marble Rye", price: 1 }] },
          { name: "Side", type: "single", required: true, options: [{ name: "Fries", price: 0 }, { name: "Chips", price: 0 }, { name: "Coleslaw", price: 0 }] },
          { name: "Changes", type: "multi", required: false, options: [{ name: "No Sauerkraut", price: 0 }, { name: "No Dressing", price: 0 }, { name: "Extra Swiss", price: 1 }] },
        ],
      },
    ],
  },
  {
    category: "Wraps, Salads & Family Favorites",
    items: [
      {
        id: "house-salad",
        name: "House Salad",
        price: 6.5,
        description: "Romaine, iceberg, mozzarella, tomato, and onion with your choice of dressing.",
        image:
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80",
        modifiers: [
          { name: "Dressing", type: "single", required: true, options: [{ name: "Ranch", price: 0 }, { name: "Bleu Cheese", price: 0 }, { name: "Italian", price: 0 }, { name: "Balsamic", price: 0 }, { name: "Honey Mustard", price: 0 }] },
          { name: "Add Protein", type: "single", required: true, options: [{ name: "No Add-On", price: 0 }, { name: "Grilled Chicken", price: 4 }, { name: "Crispy Chicken", price: 4 }] },
        ],
      },
      {
        id: "caesar-wrap",
        name: "Chicken Caesar Wrap",
        price: 12.49,
        description: "Grilled or crispy chicken, romaine, parmesan, and Caesar dressing.",
        image:
          "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=1200&q=80",
        modifiers: [
          { name: "Protein", type: "single", required: true, options: [{ name: "Grilled Chicken", price: 0 }, { name: "Crispy Chicken", price: 0 }] },
          { name: "Side", type: "single", required: true, options: [{ name: "Fries", price: 0 }, { name: "Chips", price: 0 }, { name: "Side Salad", price: 2 }] },
          { name: "Caesar", type: "single", required: true, options: [{ name: "Regular Caesar", price: 0 }, { name: "Light Caesar", price: 0 }, { name: "No Dressing", price: 0 }] },
        ],
      },
      {
        id: "kids-tenders",
        name: "Kids Tenders & Fries",
        price: 8.0,
        description: "Two crispy tenders with fries and a simple drink choice.",
        image:
          "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1200&q=80",
        modifiers: [
          { name: "Sauce", type: "single", required: true, options: [{ name: "BBQ", price: 0 }, { name: "Honey Mustard", price: 0 }, { name: "Ranch", price: 0 }, { name: "No Sauce", price: 0 }] },
          { name: "Drink", type: "single", required: true, options: [{ name: "Water", price: 0 }, { name: "Soda", price: 0 }, { name: "No Drink", price: 0 }] },
        ],
      },
    ],
  },
];

const pickupTimes = [
  "ASAP (20–30 min)",
  "In 30 minutes",
  "In 45 minutes",
  "In 1 hour",
  "Tonight at 6:00 PM",
  "Tonight at 6:30 PM",
  "Tonight at 7:00 PM",
];

const hours = [
  ["Mon", "Closed"],
  ["Tue", "3 PM – 9 PM"],
  ["Wed", "3 PM – 9 PM"],
  ["Thu", "11 AM – 11 PM"],
  ["Fri", "11 AM – 11 PM"],
  ["Sat", "3 PM – 11 PM"],
  ["Sun", "12 PM – 8 PM"],
];

function getDefaultSelections(item) {
  const selections = {};
  item.modifiers.forEach((group) => {
    if (group.type === "single") {
      selections[group.name] = group.options[0]?.name || "";
    } else {
      selections[group.name] = [];
    }
  });
  return selections;
}

function formatMoney(value) {
  return `$${value.toFixed(2)}`;
}

function calculateItemTotal(item, selections) {
  let total = item.price;
  item.modifiers.forEach((group) => {
    const selected = selections[group.name];
    if (group.type === "single") {
      const match = group.options.find((option) => option.name === selected);
      if (match) total += match.price;
    } else {
      selected.forEach((name) => {
        const match = group.options.find((option) => option.name === name);
        if (match) total += match.price;
      });
    }
  });
  return total;
}

function ItemModal({ item, onClose, onAdd }) {
  const [selections, setSelections] = useState(getDefaultSelections(item));
  const [notes, setNotes] = useState("");

  const total = useMemo(() => calculateItemTotal(item, selections), [item, selections]);

  const handleSingleSelect = (groupName, value) => {
    setSelections((prev) => ({ ...prev, [groupName]: value }));
  };

  const handleMultiToggle = (groupName, value) => {
    setSelections((prev) => {
      const current = prev[groupName] || [];
      return {
        ...prev,
        [groupName]: current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value],
      };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 md:items-center md:p-6">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl md:rounded-3xl">
        <div className="relative h-56 w-full overflow-hidden">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-stone-900">
            Close
          </button>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-stone-900">{item.name}</h3>
              <p className="mt-2 text-sm text-stone-600">{item.description}</p>
            </div>
            <div className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">{formatMoney(total)}</div>
          </div>

          <div className="mt-6 space-y-6">
            {item.modifiers.map((group) => (
              <div key={group.name}>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-semibold text-stone-800">{group.name}</label>
                  <span className="text-xs text-stone-500">{group.type === "single" ? "Choose one" : "Choose any"}</span>
                </div>

                {group.type === "single" ? (
                  <div className="grid gap-2">
                    {group.options.map((option) => (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => handleSingleSelect(group.name, option.name)}
                        className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${
                          selections[group.name] === option.name
                            ? "border-red-700 bg-red-50 text-red-800"
                            : "border-stone-200 bg-white text-stone-700"
                        }`}
                      >
                        <span>{option.name}</span>
                        <span>{option.price > 0 ? `+${formatMoney(option.price)}` : "Included"}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {group.options.map((option) => {
                      const checked = selections[group.name]?.includes(option.name);
                      return (
                        <button
                          key={option.name}
                          type="button"
                          onClick={() => handleMultiToggle(group.name, option.name)}
                          className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${
                            checked ? "border-red-700 bg-red-50 text-red-800" : "border-stone-200 bg-white text-stone-700"
                          }`}
                        >
                          <span>{option.name}</span>
                          <span>{option.price > 0 ? `+${formatMoney(option.price)}` : "Free"}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            <div>
              <label className="mb-2 block text-sm font-semibold text-stone-800">Special instructions</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-red-500"
                placeholder="Example: extra crispy, no onions, sauce on the side"
              />
            </div>
          </div>

          <button
            onClick={() => onAdd({ item, selections, notes, unitPrice: total })}
            className="mt-8 w-full rounded-2xl bg-stone-900 px-5 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-black"
          >
            Add to cart • {formatMoney(total)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HarrysInnOrderingSite() {
  const [selectedCategory, setSelectedCategory] = useState(menu[0].category);
  const [activeItem, setActiveItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [checkout, setCheckout] = useState({
    name: "",
    phone: "",
    pickupTime: pickupTimes[0],
    payment: "Pay at Pickup",
  });

  const currentSection = menu.find((section) => section.category === selectedCategory) || menu[0];

  const subtotal = cart.reduce((sum, entry) => sum + entry.unitPrice * entry.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const addToCart = ({ item, selections, notes, unitPrice }) => {
    const newEntry = {
      id: `${item.id}-${Date.now()}`,
      itemName: item.name,
      unitPrice,
      quantity: 1,
      selections,
      notes,
    };
    setCart((prev) => [...prev, newEntry]);
    setActiveItem(null);
  };

  const updateQuantity = (id, direction) => {
    setCart((prev) =>
      prev
        .map((entry) =>
          entry.id === id ? { ...entry, quantity: direction === "inc" ? entry.quantity + 1 : entry.quantity - 1 } : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const submitOrder = () => {
    setOrderPlaced(true);
    setShowCheckout(false);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <header className="relative overflow-hidden bg-[linear-gradient(135deg,#111827,#7f1d1d)] text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.15fr,0.85fr] lg:py-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-100">
              <Flame className="h-4 w-4" /> Harry's Inn • Elmira Heights
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">Online ordering made easy for Harry's Inn.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-200 md:text-lg">
              A real, mobile-friendly pickup ordering experience designed for Harry's Inn so customers can skip the phone call, customize food, and place cleaner orders faster.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Food only</div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Pickup focused</div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Live-ready demo</div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                <MapPin className="h-5 w-5 text-red-200" />
                <p className="mt-3 text-sm font-semibold">308 E 14th St</p>
                <p className="text-sm text-stone-300">Elmira, NY 14903</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                <Phone className="h-5 w-5 text-red-200" />
                <p className="mt-3 text-sm font-semibold">(607) 734-0202</p>
                <p className="text-sm text-stone-300">Call-in line replaced by web flow</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                <Clock3 className="h-5 w-5 text-red-200" />
                <p className="mt-3 text-sm font-semibold">Pickup windows</p>
                <p className="text-sm text-stone-300">Fast ordering during busy hours</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 text-stone-900 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Pitch version</p>
                <h2 className="mt-2 text-2xl font-bold">Ready to show Harry's Inn</h2>
              </div>
              <div className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">Demo</div>
            </div>

            <div className="mt-6 rounded-3xl bg-stone-100 p-5">
              <p className="text-sm font-semibold text-stone-800">What this version already does</p>
              <ul className="mt-3 space-y-2 text-sm text-stone-600">
                <li>• Menu browsing by category</li>
                <li>• Item customizations and add-ons</li>
                <li>• Working cart with quantity controls</li>
                <li>• Pickup time selection</li>
                <li>• Customer info capture for pickup</li>
              </ul>
            </div>

            <button
              onClick={() => document.getElementById("menu-section")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-6 w-full rounded-2xl bg-stone-900 px-5 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-black"
            >
              Open live demo
            </button>
            <p className="mt-3 text-xs text-stone-500">To go fully public, this just needs deployment plus a live payment/order backend.</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {orderPlaced && (
          <div className="mb-8 flex items-start gap-3 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-5 w-5" />
            <div>
              <p className="font-semibold">Demo order submitted successfully.</p>
              <p className="text-sm text-emerald-800">This confirmation is for the pitch/demo flow. A real live version would send this order to Square, Toast, GloriaFood, or a custom backend.</p>
            </div>
          </div>
        )}

        <section className="grid gap-8 lg:grid-cols-[1fr,360px]" id="menu-section">
          <div>
            <div className="mb-6 flex flex-wrap gap-3">
              {menu.map((section) => (
                <button
                  key={section.category}
                  onClick={() => setSelectedCategory(section.category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedCategory === section.category ? "bg-stone-900 text-white" : "bg-white text-stone-700 shadow-sm"
                  }`}
                >
                  {section.category}
                </button>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {currentSection.items.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-stone-200">
                  <div className="relative h-48">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    {item.badge && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-red-700">{item.badge}</span>}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <p className="mt-2 text-sm text-stone-600">{item.description}</p>
                      </div>
                      <span className="whitespace-nowrap rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold">{formatMoney(item.price)}</span>
                    </div>

                    <button
                      onClick={() => setActiveItem(item)}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
                    >
                      <Plus className="h-4 w-4" /> Customize & add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-stone-200 lg:sticky lg:top-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">Your cart</h2>
                <p className="text-sm text-stone-500">Pickup only</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-2 text-sm font-semibold">
                <ShoppingCart className="h-4 w-4" /> {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {cart.length === 0 ? (
                <div className="rounded-3xl bg-stone-50 p-5 text-sm text-stone-500">Add food items to start a demo order.</div>
              ) : (
                cart.map((entry) => (
                  <div key={entry.id} className="rounded-3xl border border-stone-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{entry.itemName}</p>
                        <div className="mt-2 space-y-1 text-xs text-stone-500">
                          {Object.entries(entry.selections).map(([group, value]) => (
                            <p key={group}>
                              <span className="font-medium text-stone-700">{group}:</span>{" "}
                              {Array.isArray(value) ? (value.length ? value.join(", ") : "None") : value}
                            </p>
                          ))}
                          {entry.notes ? <p><span className="font-medium text-stone-700">Notes:</span> {entry.notes}</p> : null}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatMoney(entry.unitPrice * entry.quantity)}</p>
                        <p className="text-xs text-stone-500">{formatMoney(entry.unitPrice)} each</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-stone-200 px-2 py-1">
                        <button onClick={() => updateQuantity(entry.id, "dec")} className="rounded-full p-1 text-stone-700 hover:bg-stone-100">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold">{entry.quantity}</span>
                        <button onClick={() => updateQuantity(entry.id, "inc")} className="rounded-full p-1 text-stone-700 hover:bg-stone-100">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 rounded-3xl bg-stone-50 p-4 text-sm">
              <div className="flex items-center justify-between py-1 text-stone-600"><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div>
              <div className="flex items-center justify-between py-1 text-stone-600"><span>Estimated tax</span><span>{formatMoney(tax)}</span></div>
              <div className="mt-2 flex items-center justify-between border-t border-stone-200 pt-3 text-base font-bold"><span>Total</span><span>{formatMoney(total)}</span></div>
            </div>

            <button
              disabled={!cart.length}
              onClick={() => setShowCheckout(true)}
              className="mt-5 w-full rounded-2xl bg-stone-900 px-5 py-4 text-sm font-bold text-white shadow-lg transition enabled:hover:bg-black disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              Continue to pickup details
            </button>

            <div className="mt-6 rounded-3xl bg-red-50 p-4 text-sm text-red-900">
              <p className="font-semibold">Harry's Inn info</p>
              <p className="mt-2">308 E 14th St, Elmira, NY 14903</p>
              <p>(607) 734-0202</p>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-red-800">
                {hours.map(([day, time]) => (
                  <React.Fragment key={day}>
                    <span>{day}</span>
                    <span className="text-right">{time}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>

      {activeItem && <ItemModal item={activeItem} onClose={() => setActiveItem(null)} onAdd={addToCart} />}

      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 md:items-center md:p-6">
          <div className="w-full max-w-xl rounded-t-3xl bg-white p-6 shadow-2xl md:rounded-3xl md:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-2xl font-bold">Pickup details</h3>
                <p className="mt-2 text-sm text-stone-500">This makes the demo feel like a real ordering flow.</p>
              </div>
              <button onClick={() => setShowCheckout(false)} className="rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold text-stone-700">Close</button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold">Name</label>
                <input value={checkout.name} onChange={(e) => setCheckout({ ...checkout, name: e.target.value })} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm" placeholder="Customer name" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Phone</label>
                <input value={checkout.phone} onChange={(e) => setCheckout({ ...checkout, phone: e.target.value })} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm" placeholder="(555) 555-5555" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Pickup time</label>
                <select value={checkout.pickupTime} onChange={(e) => setCheckout({ ...checkout, pickupTime: e.target.value })} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm">
                  {pickupTimes.map((time) => <option key={time}>{time}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Payment</label>
                <select value={checkout.payment} onChange={(e) => setCheckout({ ...checkout, payment: e.target.value })} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm">
                  <option>Pay at Pickup</option>
                  <option>Pay Online (connect Square/Toast)</option>
                </select>
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-stone-50 p-4 text-sm">
              <div className="flex items-center justify-between"><span>Total due</span><span className="font-bold">{formatMoney(total)}</span></div>
              <div className="mt-2 text-stone-500">Pickup: {checkout.pickupTime}</div>
            </div>

            <button onClick={submitOrder} className="mt-6 w-full rounded-2xl bg-red-700 px-5 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-red-800">
              Submit demo order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
