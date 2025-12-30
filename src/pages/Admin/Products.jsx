


// src/pages/Admin/Products.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Leaf,
  Package as PackageIcon,
  X,
  Loader2,
} from "lucide-react";
import api from "../../api";
import "./Products.css";

// ---------- Helpers: stock parsing & formatting ----------

const parseStockInputToNumber = (type, value) => {
  if (!value) return 0;
  const txt = String(value).trim().toLowerCase();
  if (!txt) return 0;
  const num = parseFloat(txt);
  if (Number.isNaN(num)) return 0;

  if (type === "vegetable") {
    if (txt.includes("kg")) return Math.round(num * 1000); // 1kg → 1000
    if (txt.includes("g")) return Math.round(num); // 500g → 500
    return Math.round(num * 1000); // default kg
  }
  return Math.round(num); // packages = units
};

const makeStockInputFromProduct = (product) => {
  if (!product || product.stock == null) return "";
  if (product.type === "vegetable") {
    const grams = product.stock;
    if (grams <= 0) return "";
    const kg = grams / 1000;
    return Number.isInteger(kg) ? `${kg}kg` : `${kg.toFixed(1)}kg`;
  }
  return String(product.stock);
};

const formatStockDisplay = (product) => {
  if (!product || product.stock == null) return "0";
  if (product.type !== "vegetable") return String(product.stock);
  const grams = Math.round(product.stock);
  if (grams <= 0) return "0kg";
  const kg = Math.floor(grams / 1000);
  const g = grams % 1000;
  if (kg > 0 && g > 0) return `${kg}kg ${g}g`;
  if (kg > 0) return `${kg}kg`;
  return `${g}g`;
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [allVegetables, setAllVegetables] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_LIMIT = 20;

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "vegetable",
    quantity: "",
    stock: 0,
    description: "",
    image: "",
    vegetables: [],
  });
  const [stockInput, setStockInput] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef(null);

  // ---------- Fetch products ----------
  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/products?page=${page}&limit=${PAGE_LIMIT}`);
      if (res.success) {
        setProducts(res.products || []);
        setTotalPages(res.totalPages || 1);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Fetch products error:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const veg = products.filter((p) => p.type === "vegetable");
    setAllVegetables(veg);
  }, [products]);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" ? true : p.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalProducts = products.length;
  const vegCount = products.filter((p) => p.type === "vegetable").length;
  const packageCount = products.filter((p) => p.type === "package").length;

  // ---------- Modal control ----------
  const openAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setForm({
      name: "",
      price: "",
      type: "vegetable",
      quantity: "",
      stock: 0,
      description: "",
      image: "",
      vegetables: [],
    });
    setStockInput("");
    setFormErrors({});
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setIsEditing(true);
    setEditingId(product._id);

    const vegIds = (product.vegetables || []).map((v) =>
      typeof v === "string" ? v : v._id
    );

    setForm({
      name: product.name,
      price: product.price,
      type: product.type,
      quantity: product.quantity || "",
      stock: product.stock || 0,
      description: product.description || "",
      image: product.image || "",
      vegetables: vegIds,
    });
    setStockInput(makeStockInputFromProduct(product));
    setFormErrors({});
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  // ---------- Form handlers ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleStockChange = (e) => {
    const val = e.target.value;
    setStockInput(val);
    const num = parseStockInputToNumber(form.type, val);
    setForm((prev) => ({ ...prev, stock: num }));
  };

  const handleToggleVegetable = (id) => {
    setForm((prev) => {
      const exists = prev.vegetables.includes(id);
      return {
        ...prev,
        vegetables: exists
          ? prev.vegetables.filter((v) => v !== id)
          : [...prev.vegetables, id],
      };
    });
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await api.post("/upload/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.success) {
        setForm((prev) => ({ ...prev, image: res.url }));
      } else {
        alert(res.message || "Image upload failed");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Image upload failed");
    }
  };

  // ---------- Validate & submit ----------
  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.price || Number(form.price) <= 0)
      errors.price = "Valid price is required";
    if (!form.type) errors.type = "Type is required";

    if (form.type === "package" && (!form.vegetables || !form.vegetables.length)) {
      errors.vegetables = "Select at least one vegetable";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        name: form.name.trim(),
        price: Number(form.price),
        type: form.type,
        quantity: form.quantity,
        description: form.description || "",
        image: form.image || "",
        stock: parseStockInputToNumber(form.type, stockInput),
        vegetables: form.type === "package" ? form.vegetables : [],
      };

      if (isEditing && editingId) {
        const res = await api.put(`/admin/products/${editingId}`, payload);
        if (!res.success) throw new Error(res.message || "Update failed");
        alert("Product updated successfully");
      } else {
        const res = await api.post("/admin/products", payload);
        if (!res.success) throw new Error(res.message || "Create failed");
        alert("Product added successfully");
      }

      closeModal();
      fetchProducts(currentPage);
    } catch (err) {
      console.error("Submit product error:", err);
      alert(err.message || "Submit failed");
    }
  };

  // ---------- Delete ----------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      const res = await api.delete(`/admin/products/${id}`);
      if (!res.success) throw new Error(res.message || "Delete failed");
      alert("Product deleted");
      fetchProducts(currentPage);
    } catch (err) {
      console.error("Delete product error:", err);
      alert(err.message || "Delete failed");
    }
  };

  // ---------- Pagination ----------
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  // ---------- UI ----------
  return (
    <div className="products-page" style={{borderRadius:"15px"}}>
      <div className="products-container custom-scrollbar">
        {/* Header */}
        <div className="products-header">
          <div className="products-title">
            <h2>Product Inventory</h2>
            <p>Manage vegetables and package products, prices, and stock.</p>
          </div>
          <button className="btn btn-primary btn-with-icon" onClick={openAddModal}>
            <Plus size={16} />
            <span>Add Product</span>
          </button>
        </div>

        {/* Stats */}
        {!loading && totalProducts > 0 && (
          <div className="stats-grid">
            <div className="stat-card stat-card--total">
              <p className="stat-label">Total Products</p>
              <p className="stat-value">{totalProducts}</p>
            </div>
            <div className="stat-card stat-card--veg">
              <p className="stat-label">Vegetables</p>
              <p className="stat-value">{vegCount}</p>
            </div>
            <div className="stat-card stat-card--pkg">
              <p className="stat-label">Packages</p>
              <p className="stat-value">{packageCount}</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="filters-row">
          <div className="search-box">
            <span className="search-icon">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-pill-group">
            {[
              { value: "all", label: "All" },
              { value: "vegetable", label: "Vegetables" },
              { value: "package", label: "Packages" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={
                  "filter-pill" +
                  (filterType === opt.value ? " filter-pill--active" : "")
                }
                onClick={() => setFilterType(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table / Loading / Empty */}
        {loading ? (
          <div className="card loading-card">
            <div className="loading-header">
              <Loader2 className="spin" size={18} />
              <span>Loading inventory...</span>
            </div>
            <div className="loading-rows">
              {[1, 2, 3, 4].map((i) => (
                <div className="loading-row" key={i} />
              ))}
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="card card-empty">
            <p className="empty-title">No products found.</p>
            <p className="empty-subtitle">
              Try adjusting your search or filters, or add a new product.
            </p>
          </div>
        ) : (
          <div className="card table-card">
            <div className="table-wrapper">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Stock</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p._id} className="product-row">
                      <td>
                        <div className="product-info">
                          <div className="product-image">
                            {p.image ? (
                              <img src={p.image} alt={p.name} />
                            ) : (
                              <ImageIcon size={20} className="product-image-placeholder" />
                            )}
                          </div>
                          <div>
                            <div className="product-name">{p.name}</div>
                            {p.description && (
                              <div className="product-description">
                                {p.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={
                            "badge " +
                            (p.type === "vegetable" ? "badge--veg" : "badge--pkg")
                          }
                        >
                          {p.type === "vegetable" ? (
                            <Leaf size={12} />
                          ) : (
                            <PackageIcon size={12} />
                          )}
                          <span>
                            {p.type.charAt(0).toUpperCase() + p.type.slice(1)}
                          </span>
                        </span>
                      </td>
                      <td>
                        <span className="price">
                          LKR {Number(p.price || 0).toLocaleString()}
                        </span>
                      </td>
                      <td>{p.quantity || "-"}</td>
                      <td>
                        <span className="stock-pill">{formatStockDisplay(p)}</span>
                      </td>
                      <td className="text-right">
                        <button
                          className="btn-icon btn-icon--edit"
                          onClick={() => openEditModal(p)}
                          title="Edit product"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="btn-icon btn-icon--delete"
                          onClick={() => handleDelete(p._id)}
                          title="Delete product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          <div className="pagination-buttons">
            <button
              className="btn-pill"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              className="btn-pill"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <div>
                  <h3>{isEditing ? "Edit Product" : "Add Product"}</h3>
                  <p>
                    {isEditing
                      ? "Update product details and stock."
                      : "Create a new product for your inventory."}
                  </p>
                </div>
                <button className="btn-icon btn-close" onClick={closeModal}>
                  <X size={16} />
                </button>
              </div>

              <div className="modal-body custom-scrollbar">
                <form onSubmit={handleSubmit} className="form-grid">
                  {/* Name */}
                  <div className="field">
                    <label className="field-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="field-input"
                      required
                    />
                    {formErrors.name && (
                      <p className="field-error">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Type */}
                  <div className="field">
                    <label className="field-label">Type</label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="field-input"
                    >
                      <option value="vegetable">Vegetable</option>
                      <option value="package">Package</option>
                    </select>
                    {formErrors.type && (
                      <p className="field-error">{formErrors.type}</p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="field">
                    <label className="field-label">Price (per unit)</label>
                    <input
                      type="number"
                      min={0}
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      className="field-input"
                      required
                    />
                    {formErrors.price && (
                      <p className="field-error">{formErrors.price}</p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="field">
                    <label className="field-label">Display Quantity / Units</label>
                    <input
                      type="text"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      className="field-input"
                      placeholder={
                        form.type === "vegetable"
                          ? "e.g. 500g, 1kg"
                          : "e.g. 1 pack, Family pack"
                      }
                    />
                  </div>

                  {/* Stock */}
                  <div className="field">
                    <label className="field-label">Stock</label>
                    <input
                      type="text"
                      value={stockInput}
                      onChange={handleStockChange}
                      className="field-input"
                      placeholder={
                        form.type === "vegetable"
                          ? "e.g. 1kg, 500g"
                          : "e.g. 10 (units)"
                      }
                    />
                  </div>

                  {/* Image */}
                  <div className="field field-full">
                    <label className="field-label">Image URL / Upload</label>
                    <div className="image-row">
                      <input
                        type="text"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        className="field-input"
                        placeholder="Paste image URL or upload a file"
                      />
                      <button
                        type="button"
                        className="btn btn-outline btn-with-icon"
                        onClick={handleImageUploadClick}
                      >
                        <ImageIcon size={16} />
                        <span>Upload</span>
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageFileChange}
                        className="hidden-input"
                      />
                    </div>
                    {form.image && (
                      <img src={form.image} alt="Preview" className="image-preview" />
                    )}
                  </div>

                  {/* Description */}
                  <div className="field field-full">
                    <label className="field-label">Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="field-textarea"
                      rows={3}
                    />
                  </div>

                  {/* Vegetables for package */}
                  {form.type === "package" && (
                    <div className="field field-full">
                      <label className="field-label">Select Vegetables</label>
                      <div className="chips-row">
                        {allVegetables.length === 0 && (
                          <p className="field-help">
                            No vegetables available. Add vegetables first.
                          </p>
                        )}
                        {allVegetables.map((veg) => {
                          const selected = form.vegetables.includes(veg._id);
                          return (
                            <button
                              type="button"
                              key={veg._id}
                              className={
                                "chip" + (selected ? " chip--selected" : "")
                              }
                              onClick={() => handleToggleVegetable(veg._id)}
                            >
                              {veg.name}
                            </button>
                          );
                        })}
                      </div>
                      {formErrors.vegetables && (
                        <p className="field-error">{formErrors.vegetables}</p>
                      )}
                    </div>
                  )}

                  {/* Submit */}
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      {isEditing ? "Update Product" : "Add Product"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}