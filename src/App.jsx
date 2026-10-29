
import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Login from "./login.jsx";

const slides = [
  {
    title: "STYLE DHAMAKA",
    subtitle: "Celebrate every moment in style.",
    offer: "UP TO 80% OFF",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85",
  },
  {
    title: "OWN YOUR STYLE",
    subtitle: "Fresh looks. Bold moves. Your fashion story.",
    offer: "UP TO 70% OFF",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=85",
  },
  {
    title: "EVERYDAY LUXE",
    subtitle: "Elevate your everyday wardrobe.",
    offer: "MIN. 40% OFF",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1800&q=85",
  },
];

const products = [
  { id: 1, name: "Floral Summer Dress", category: "Women", price: 799, oldPrice: 1599, rating: 4.4, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85" },
  { id: 2, name: "Elegant Party Dress", category: "Women", price: 1299, oldPrice: 2499, rating: 4.5, image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=85" },
  { id: 3, name: "Classic Men's Outfit", category: "Men", price: 999, oldPrice: 1999, rating: 4.4, image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=700&q=85" },
  { id: 4, name: "Casual Denim Look", category: "Men", price: 899, oldPrice: 1799, rating: 4.2, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=85" },
  { id: 5, name: "Classic Sneakers", category: "Footwear", price: 1299, oldPrice: 2499, rating: 4.5, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85" },
  { id: 6, name: "Running Shoes", category: "Footwear", price: 1499, oldPrice: 2999, rating: 4.6, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=700&q=85" },
  { id: 7, name: "Everyday Handbag", category: "Accessories", price: 899, oldPrice: 1799, rating: 4.3, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85" },
  { id: 8, name: "Premium Shoulder Bag", category: "Accessories", price: 1199, oldPrice: 2299, rating: 4.5, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85" },
  { id: 9, name: "Kids Casual Outfit", category: "Kids", price: 599, oldPrice: 999, rating: 4.2, image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=700&q=85" },
  { id: 10, name: "Trendy Summer Look", category: "Women", price: 699, oldPrice: 1399, rating: 4.3, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85" },
  { id: 11, name: "Modern Casual Shirt", category: "Men", price: 699, oldPrice: 1399, rating: 4.1, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=85" },
  { id: 12, name: "Stylish Streetwear", category: "Men", price: 1099, oldPrice: 2199, rating: 4.4, image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=700&q=85" },
];

const categories = ["All", "Women", "Men", "Kids", "Footwear", "Accessories"];
const money = (amount) => `₹${Number(amount).toLocaleString("en-IN")}`;

function App() {
  const [slide, setSlide] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [wishlist, setWishlist] = useState([]);
  const [bag, setBag] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [page, setPage] = useState("home");
  const [showLogin, setShowLogin] = useState(false);
  const [notice, setNotice] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((current) => (current + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 2500);
    return () => clearTimeout(timer);
  }, [notice]);

  const visibleProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const term = search.toLowerCase().trim();
      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "LowToHigh") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "HighToLow") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "TopRated") result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [category, search, sortBy]);

  const bagCount = bag.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = bag.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 49;
  const total = subtotal + delivery;

  const goHome = () => {
    setPage("home");
    setSelectedProduct(null);
    setCheckoutOpen(false);
    setOrderPlaced(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showMessage = (message) => setNotice(message);

  const openProduct = (product) => {
    setSelectedProduct(product);
    setSelectedSize("M");
    setPage("product");
    setCheckoutOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    setWishlist((current) =>
      exists
        ? current.filter((item) => item.id !== product.id)
        : [...current, product]
    );
    showMessage(exists ? "Removed from wishlist" : "Added to wishlist ❤️");
  };

  const addToBag = (product, size = "M") => {
    setBag((current) => {
      const exists = current.find(
        (item) => item.id === product.id && item.size === size
      );

      if (exists) {
        return current.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, size, quantity: 1 }];
    });
    showMessage(`${product.name} added to bag`);
  };

  const changeQuantity = (id, size, amount) => {
    setBag((current) =>
      current
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromBag = (id, size) => {
    setBag((current) =>
      current.filter((item) => !(item.id === id && item.size === size))
    );
    showMessage("Product removed from bag");
  };

  const startCheckout = () => {
    if (!bag.length) {
      showMessage("Your bag is empty");
      return;
    }
    setCheckoutOpen(true);
    setOrderPlaced(false);
  };

  const placeDemoOrder = (event) => {
    event.preventDefault();
    setOrderNumber(`LL${Date.now().toString().slice(-8)}`);
    setOrderPlaced(true);
    setCheckoutOpen(false);
    setBag([]);
    showMessage("Your demo order has been placed!");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ProductCard = ({ product }) => {
    const isLiked = wishlist.some((item) => item.id === product.id);

    return (
      <article className="category-card" key={product.id}>
        <div className="category-image-wrap">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onClick={() => openProduct(product)}
          />
          <button
            className={`heart-button ${isLiked ? "hearted" : ""}`}
            onClick={() => toggleWishlist(product)}
            aria-label="Toggle wishlist"
          >
            {isLiked ? "♥" : "♡"}
          </button>
          <span className="discount-tag">
            {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
          </span>
        </div>
        <div className="category-info">
          <h3>{product.name}</h3>
          <p>⭐ {product.rating} · {product.category}</p>
          <strong>
            {money(product.price)} <del>{money(product.oldPrice)}</del>
          </strong>
          <button onClick={() => openProduct(product)}>VIEW PRODUCT →</button>
        </div>
      </article>
    );
  };

  if (showLogin) {
    return <Login onLoginSuccess={() => setShowLogin(false)} />;
  }

  return (
    <div className="app">
      {/* NAVIGATION */}
      <header className="navbar">
        <button className="logo" onClick={goHome}>
          <span className="logo-pink">L</span>UXE LANE
        </button>

        <nav className="nav-links">
          {categories.slice(1).map((item) => (
            <button
              className="nav-link"
              key={item}
              onClick={() => {
                setCategory(item);
                setPage("home");
                setSelectedProduct(null);
                setTimeout(() => {
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                }, 50);
              }}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </nav>

        <form
          className="search-box"
          onSubmit={(event) => {
            event.preventDefault();
            setPage("home");
            setSelectedProduct(null);
            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span>⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search for products..."
          />
        </form>

        <div className="nav-actions">
          <button onClick={() => setPage("wishlist")}>
            ♡ <span>Wishlist</span> ({wishlist.length})
          </button>
          <button onClick={() => setPage("bag")}>
            🛍 <span>Bag</span> ({bagCount})
          </button>
          <button onClick={() => setShowLogin(true)}>👤 Login</button>
        </div>
      </header>

      {/* HOME PAGE */}
      {page === "home" && (
        <main>
          <section
            className="hero"
            style={{ backgroundImage: `url("${slides[slide].image}")` }}
          >
            <div className="hero-overlay">
              <span className="hero-kicker">THE LUXE LANE EDIT</span>
              <h1>{slides[slide].title}</h1>
              <p>{slides[slide].subtitle}</p>
              <h2>{slides[slide].offer}</h2>
              <button
                className="primary-button"
                onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              >
                SHOP NOW →
              </button>
            </div>
            <div className="carousel-dots">
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  className={slide === index ? "active" : ""}
                  onClick={() => setSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>
          </section>

          <section className="benefits">
            <div>🚚 <span><strong>Free Delivery</strong><small>On orders above ₹999</small></span></div>
            <div>↩️ <span><strong>Easy Returns</strong><small>Simple return process</small></span></div>
            <div>✨ <span><strong>Premium Styles</strong><small>Looks for every moment</small></span></div>
            <div>🔒 <span><strong>Secure Checkout</strong><small>Demo checkout available</small></span></div>
          </section>

          <section className="products-section" id="products">
            <div className="section-heading">
              <span>HANDPICKED FOR YOU</span>
              <h2>Trending Now</h2>
              <p>Discover your next favourite look.</p>
            </div>

            <div className="filter-row">
              <div className="category-filters">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={category === item ? "filter-active" : ""}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="Recommended">Recommended</option>
                <option value="LowToHigh">Price: Low to High</option>
                <option value="HighToLow">Price: High to Low</option>
                <option value="TopRated">Top Rated</option>
              </select>
            </div>

            {visibleProducts.length ? (
              <div className="category-grid">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No products found</h3>
                <p>Try another search or category.</p>
                <button onClick={() => { setSearch(""); setCategory("All"); }}>
                  CLEAR FILTERS
                </button>
              </div>
            )}
          </section>
        </main>
      )}

      {/* PRODUCT DETAILS PAGE */}
      {page === "product" && selectedProduct && (
        <main className="product-page">
          <button className="back-button" onClick={goHome}>← Continue Shopping</button>

          <div className="product-detail-layout">
            <div className="product-detail-image">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>

            <div className="product-detail-info">
              <span className="product-category-label">{selectedProduct.category}</span>
              <h1>{selectedProduct.name}</h1>
              <p className="detail-rating">⭐ {selectedProduct.rating} / 5 · Customer rating</p>

              <div className="detail-price">
                <strong>{money(selectedProduct.price)}</strong>
                <del>{money(selectedProduct.oldPrice)}</del>
                <span>
                  {Math.round((1 - selectedProduct.price / selectedProduct.oldPrice) * 100)}% OFF
                </span>
              </div>

              <p className="tax-note">Inclusive of all taxes</p>
              <hr />

              <h3>Select Size</h3>
              <div className="size-options">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className={selectedSize === size ? "size-selected" : ""}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="product-detail-actions">
                <button className="add-bag-button" onClick={() => addToBag(selectedProduct, selectedSize)}>
                  🛍 ADD TO BAG
                </button>
                <button className="detail-wishlist-button" onClick={() => toggleWishlist(selectedProduct)}>
                  {wishlist.some((item) => item.id === selectedProduct.id) ? "♥ WISHLISTED" : "♡ WISHLIST"}
                </button>
              </div>

              <div className="delivery-info">
                <h3>Product Details</h3>
                <p>• Premium quality and stylish design.</p>
                <p>• Perfect for everyday wear and special occasions.</p>
                <p>• Easy styling with your favourite accessories.</p>
                <hr />
                <h3>Delivery & Returns</h3>
                <p>• Free delivery on orders above ₹999.</p>
                <p>• Returns subject to store policy.</p>
              </div>
            </div>
          </div>

          {/* RELATED PRODUCTS */}
          <section className="related-products">
            <div className="section-heading">
              <span>COMPLETE YOUR LOOK</span>
              <h2>You May Also Like</h2>
              <p>Discover more styles picked for you.</p>
            </div>

            <div className="category-grid">
              {products
                .filter((product) => product.id !== selectedProduct.id)
                .sort((a, b) => {
                  if (a.category === selectedProduct.category && b.category !== selectedProduct.category) return -1;
                  if (a.category !== selectedProduct.category && b.category === selectedProduct.category) return 1;
                  return 0;
                })
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </section>
        </main>
      )}

      {/* WISHLIST PAGE */}
      {page === "wishlist" && (
        <main className="wishlist-page">
          <div className="page-title-row">
            <div>
              <h1>My Wishlist ♡</h1>
              <p>{wishlist.length} saved products</p>
            </div>
            <button className="back-button" onClick={goHome}>← Continue Shopping</button>
          </div>

          {wishlist.length === 0 ? (
            <div className="empty-state">
              <div className="empty-heart">♡</div>
              <h2>Your wishlist is empty!</h2>
              <p>Tap the heart on a product to save your favourite styles.</p>
              <button onClick={goHome}>EXPLORE PRODUCTS</button>
            </div>
          ) : (
            <div className="category-grid">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      )}

      {/* SHOPPING BAG PAGE */}
      {page === "bag" && (
        <main className="bag-page">
          <div className="page-title-row">
            <div>
              <h1>My Shopping Bag</h1>
              <p>{bagCount} items in your bag</p>
            </div>
            <button className="back-button" onClick={goHome}>← Continue Shopping</button>
          </div>

          {orderPlaced && (
            <section className="checkout-success">
              <div className="success-icon">✓</div>
              <h2>Order placed successfully!</h2>
              <p>Your demo order number is:</p>
              <strong>{orderNumber}</strong>
              <p>This is a frontend demo. No payment was taken.</p>
              <button onClick={goHome}>CONTINUE SHOPPING</button>
            </section>
          )}

          {!orderPlaced && bag.length === 0 && (
            <div className="empty-state">
              <div className="bag-empty-icon">🛍</div>
              <h2>Your bag is empty!</h2>
              <p>Add products you love and they will appear here.</p>
              <button onClick={goHome}>SHOP NOW</button>
            </div>
          )}

          {!orderPlaced && bag.length > 0 && (
            <>
              <div className="bag-layout">
                <div className="bag-products">
                  {bag.map((item) => (
                    <article className="bag-product-card" key={`${item.id}-${item.size}`}>
                      <img src={item.image} alt={item.name} />
                      <div className="bag-product-info">
                        <h3>{item.name}</h3>
                        <p>Category: {item.category}</p>
                        <p>Size: {item.size}</p>
                        <strong>{money(item.price)}</strong>
                        <div className="quantity-control">
                          <button onClick={() => changeQuantity(item.id, item.size, -1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => changeQuantity(item.id, item.size, 1)}>+</button>
                        </div>
                        <button className="bag-remove" onClick={() => removeFromBag(item.id, item.size)}>
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <aside className="bag-summary">
                  <h2>SHOPPING SUMMARY</h2>
                  <div className="bag-summary-row"><span>Total items</span><strong>{bagCount}</strong></div>
                  <div className="bag-summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                  <div className="bag-summary-row"><span>Delivery</span><strong>{delivery === 0 ? "FREE" : money(delivery)}</strong></div>

                  {subtotal > 0 && subtotal < 999 && (
                    <p className="delivery-hint">Add {money(999 - subtotal)} more for free delivery.</p>
                  )}

                  <div className="bag-summary-total"><span>Total amount</span><strong>{money(total)}</strong></div>
                  <button className="checkout-button" onClick={startCheckout}>PROCEED TO CHECKOUT →</button>
                </aside>
              </div>

              {checkoutOpen && (
                <section className="checkout-panel">
                  <h2>Delivery Details</h2>
                  <p>Complete the form to place a demo order.</p>

                  <form onSubmit={placeDemoOrder}>
                    <label>
                      Full name
                      <input name="fullName" required placeholder="Enter your full name" />
                    </label>
                    <label>
                      Mobile number
                      <input name="mobile" type="tel" required pattern="[0-9]{10}" maxLength="10" placeholder="10-digit mobile number" />
                    </label>
                    <label>
                      Email address
                      <input name="email" type="email" required placeholder="you@example.com" />
                    </label>
                    <label>
                      Delivery address
                      <textarea name="address" rows="3" required placeholder="House number, street, city and pincode" />
                    </label>
                    <label>
                      Payment method
                      <select name="payment" required>
                        <option value="COD">Cash on Delivery</option>
                        <option value="Demo UPI">Demo UPI — no real payment</option>
                      </select>
                    </label>
                    <div className="checkout-total">Order total: <strong>{money(total)}</strong></div>
                    <button type="submit" className="checkout-button">PLACE DEMO ORDER</button>
                    <button type="button" className="checkout-cancel" onClick={() => setCheckoutOpen(false)}>CANCEL</button>
                  </form>
                </section>
              )}
            </>
          )}
        </main>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-columns">
          <div>
            <h4>LUXE LANE</h4>
            <p>Fashion that feels like you.</p>
          </div>
          <div>
            <h4>SHOPPING</h4>
            <button onClick={() => { setCategory("Women"); goHome(); }}>Women</button>
            <button onClick={() => { setCategory("Men"); goHome(); }}>Men</button>
            <button onClick={() => { setCategory("Footwear"); goHome(); }}>Footwear</button>
          </div>
          <div>
            <h4>CUSTOMER CARE</h4>
            <p>Help & Support</p>
            <p>Shipping Information</p>
            <p>Returns Policy</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-logo">L.</span>
          <span>© 2026 Luxe Lane. All rights reserved.</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>BACK TO TOP ↑</button>
        </div>
      </footer>

      {notice && <div className="toast">{notice}</div>}
    </div>
  );
}

export default App;
