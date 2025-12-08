// import { useState, useEffect } from "react";
// import api from "../../api";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "", price: "", type: "vegetable", description: "", image: "", quantity: ""
//   });

//   const fetchProducts = async () => {
//     const res = await api.get("/admin/products");
//     if (res.success) setProducts(res.products);
//   };

//   useEffect(() => { fetchProducts(); }, []);

//   const handleAdd = async () => {
//     await api.post("/admin/products", newProduct);
//     setNewProduct({ name:"", price:"", type:"vegetable", description:"", image:"", quantity:"" });
//     fetchProducts();
//   };

//   const handleDelete = async id => {
//     await api.delete(`/admin/products/${id}`);
//     fetchProducts();
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Products</h2>

//       {/* Add Product Form */}
//       <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-4">
//         <input className="p-2 border rounded" placeholder="Name" value={newProduct.name} onChange={e=>setNewProduct({...newProduct,name:e.target.value})}/>
//         <input className="p-2 border rounded" placeholder="Price" value={newProduct.price} onChange={e=>setNewProduct({...newProduct,price:e.target.value})}/>
//         <input className="p-2 border rounded" placeholder="Description" value={newProduct.description} onChange={e=>setNewProduct({...newProduct,description:e.target.value})}/>
//         <input className="p-2 border rounded" placeholder="Image URL" value={newProduct.image} onChange={e=>setNewProduct({...newProduct,image:e.target.value})}/>
//         <input className="p-2 border rounded" placeholder="Quantity" value={newProduct.quantity} onChange={e=>setNewProduct({...newProduct,quantity:e.target.value})}/>
//         <select className="p-2 border rounded" value={newProduct.type} onChange={e=>setNewProduct({...newProduct,type:e.target.value})}>
//           <option value="vegetable">Vegetable</option>
//           <option value="package">Package</option>
//         </select>
//         <button className="bg-green-600 text-white rounded px-4 py-2" onClick={handleAdd}>Add Product</button>
//       </div>

//       {/* Product Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="p-2">Name</th>
//               <th className="p-2">Type</th>
//               <th className="p-2">Price</th>
//               <th className="p-2">Quantity</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map(p => (
//               <tr key={p._id} className="border-b">
//                 <td className="p-2">{p.name}</td>
//                 <td className="p-2">{p.type}</td>
//                 <td className="p-2">₹{p.price}</td>
//                 <td className="p-2">{p.quantity}</td>
//                 <td className="p-2 space-x-2">
//                   <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={()=>handleDelete(p._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import api from "../../api";
// import { FaEdit, FaTrash } from "react-icons/fa";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "", price: "", type: "vegetable", description: "", image: "", quantity: ""
//   });
//   const [editProduct, setEditProduct] = useState(null); // product to edit
//   const [showModal, setShowModal] = useState(false);

//   // Fetch products from backend
//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("/admin/products");
//       if (res.success) setProducts(res.products);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => { fetchProducts(); }, []);

//   // Add product
//   const handleAdd = async () => {
//     try {
//       await api.post("/admin/products", newProduct);
//       setNewProduct({ name:"", price:"", type:"vegetable", description:"", image:"", quantity:"" });
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete product
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure to delete this product?")) return;
//     try {
//       await api.delete(`/admin/products/${id}`);
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Open edit modal
//   const handleEdit = (product) => {
//     setEditProduct(product);
//     setShowModal(true);
//   };

//   // Update product
//   const handleUpdate = async () => {
//     try {
//       await api.put(`/admin/products/${editProduct._id}`, editProduct);
//       setShowModal(false);
//       setEditProduct(null);
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Products</h2>

//       {/* Add Product Form */}
//       <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-4">
//         <input className="p-2 border rounded" placeholder="Name" value={newProduct.name} onChange={e=>setNewProduct({...newProduct,name:e.target.value})}/>
//         <input className="p-2 border rounded" placeholder="Price" type="number" value={newProduct.price} onChange={e=>setNewProduct({...newProduct,price:e.target.value})}/>
//         <input className="p-2 border rounded" placeholder="Description" value={newProduct.description} onChange={e=>setNewProduct({...newProduct,description:e.target.value})}/>
//         <input className="p-2 border rounded" placeholder="Image URL" value={newProduct.image} onChange={e=>setNewProduct({...newProduct,image:e.target.value})}/>
//         <input className="p-2 border rounded" placeholder="Quantity" value={newProduct.quantity} onChange={e=>setNewProduct({...newProduct,quantity:e.target.value})}/>
//         <select className="p-2 border rounded" value={newProduct.type} onChange={e=>setNewProduct({...newProduct,type:e.target.value})}>
//           <option value="vegetable">Vegetable</option>
//           <option value="package">Package</option>
//         </select>
//         <button className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700" onClick={handleAdd}>Add Product</button>
//       </div>

//       {/* Products Table */}
//       <div className="overflow-x-auto rounded shadow bg-white">
//         <table className="min-w-full">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Type</th>
//               <th className="p-3 text-left">Price</th>
//               <th className="p-3 text-left">Quantity</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map(p => (
//               <tr key={p._id} className="border-b hover:bg-green-50">
//                 <td className="p-2">{p.name}</td>
//                 <td className="p-2">{p.type}</td>
//                 <td className="p-2">₹{p.price}</td>
//                 <td className="p-2">{p.quantity}</td>
//                 <td className="p-2 flex gap-2">
//                   <button className="text-blue-600 hover:text-blue-800" onClick={()=>handleEdit(p)}><FaEdit /></button>
//                   <button className="text-red-600 hover:text-red-800" onClick={()=>handleDelete(p._id)}><FaTrash /></button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-lg">
//             <h3 className="text-xl font-bold mb-4">Edit Product</h3>
//             <div className="grid grid-cols-1 gap-3">
//               <input className="p-2 border rounded" placeholder="Name" value={editProduct.name} onChange={e=>setEditProduct({...editProduct,name:e.target.value})}/>
//               <input className="p-2 border rounded" placeholder="Price" type="number" value={editProduct.price} onChange={e=>setEditProduct({...editProduct,price:e.target.value})}/>
//               <input className="p-2 border rounded" placeholder="Description" value={editProduct.description} onChange={e=>setEditProduct({...editProduct,description:e.target.value})}/>
//               <input className="p-2 border rounded" placeholder="Image URL" value={editProduct.image} onChange={e=>setEditProduct({...editProduct,image:e.target.value})}/>
//               <input className="p-2 border rounded" placeholder="Quantity" value={editProduct.quantity} onChange={e=>setEditProduct({...editProduct,quantity:e.target.value})}/>
//               <select className="p-2 border rounded" value={editProduct.type} onChange={e=>setEditProduct({...editProduct,type:e.target.value})}>
//                 <option value="vegetable">Vegetable</option>
//                 <option value="package">Package</option>
//               </select>
//               <div className="flex justify-end gap-2 mt-4">
//                 <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={()=>{setShowModal(false); setEditProduct(null);}}>Cancel</button>
//                 <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={handleUpdate}>Update</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// // src/pages/Admin/Products.jsx
// import { useState, useEffect } from "react";
// import api from "../../api";
// import { FaEdit, FaTrash } from "react-icons/fa";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     type: "vegetable",
//     description: "",
//     image: "",
//   });
//   const [editProduct, setEditProduct] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("/admin/products");
//       if (res.success) setProducts(res.products);
//     } catch (err) {
//       console.error("Fetch products error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleAdd = async () => {
//     if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
//       alert("Name, Price and Quantity are required");
//       return;
//     }
//     try {
//       await api.post("/admin/products", {
//         ...newProduct,
//         price: Number(newProduct.price),
//       });
//       setNewProduct({
//         name: "",
//         price: "",
//         quantity: "",
//         type: "vegetable",
//         description: "",
//         image: "",
//       });
//       fetchProducts();
//     } catch (err) {
//       console.error("Add product error:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this product?")) return;
//     try {
//       await api.delete(`/admin/products/${id}`);
//       fetchProducts();
//     } catch (err) {
//       console.error("Delete product error:", err);
//     }
//   };

//   const handleEdit = (product) => {
//     setEditProduct({ ...product });
//     setShowModal(true);
//   };

//   const handleUpdate = async () => {
//     if (!editProduct.name || !editProduct.price || !editProduct.quantity) {
//       alert("Name, Price and Quantity are required");
//       return;
//     }
//     try {
//       await api.put(`/admin/products/${editProduct._id}`, {
//         ...editProduct,
//         price: Number(editProduct.price),
//       });
//       setShowModal(false);
//       setEditProduct(null);
//       fetchProducts();
//     } catch (err) {
//       console.error("Update product error:", err);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6 text-green-800">Products</h2>

//       {/* Add Product Form */}
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
//         <h3 className="font-semibold mb-3 text-gray-800">Add New Product</h3>
//         <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
//           <input
//             className="p-2 border rounded text-sm"
//             placeholder="Name"
//             value={newProduct.name}
//             onChange={(e) =>
//               setNewProduct((p) => ({ ...p, name: e.target.value }))
//             }
//           />
//           <input
//             className="p-2 border rounded text-sm"
//             placeholder="Price"
//             type="number"
//             value={newProduct.price}
//             onChange={(e) =>
//               setNewProduct((p) => ({ ...p, price: e.target.value }))
//             }
//           />
//           <input
//             className="p-2 border rounded text-sm"
//             placeholder="Quantity (e.g. 1kg)"
//             value={newProduct.quantity}
//             onChange={(e) =>
//               setNewProduct((p) => ({ ...p, quantity: e.target.value }))
//             }
//           />
//           <input
//             className="p-2 border rounded text-sm"
//             placeholder="Description"
//             value={newProduct.description}
//             onChange={(e) =>
//               setNewProduct((p) => ({ ...p, description: e.target.value }))
//             }
//           />
//           <input
//             className="p-2 border rounded text-sm"
//             placeholder="Image URL"
//             value={newProduct.image}
//             onChange={(e) =>
//               setNewProduct((p) => ({ ...p, image: e.target.value }))
//             }
//           />
//           <select
//             className="p-2 border rounded text-sm"
//             value={newProduct.type}
//             onChange={(e) =>
//               setNewProduct((p) => ({ ...p, type: e.target.value }))
//             }
//           >
//             <option value="vegetable">Vegetable</option>
//             <option value="package">Package</option>
//           </select>
//         </div>
//         <div className="mt-3">
//           <button
//             className="bg-green-600 text-white rounded px-4 py-2 text-sm hover:bg-green-700"
//             onClick={handleAdd}
//           >
//             Add Product
//           </button>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="overflow-x-auto rounded-xl shadow bg-white border border-gray-100">
//         <table className="min-w-full">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="p-3 text-left text-sm">Name</th>
//               <th className="p-3 text-left text-sm">Type</th>
//               <th className="p-3 text-left text-sm">Price</th>
//               <th className="p-3 text-left text-sm">Quantity</th>
//               <th className="p-3 text-left text-sm">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p) => (
//               <tr
//                 key={p._id}
//                 className="border-b hover:bg-green-50 text-sm"
//               >
//                 <td className="p-2">{p.name}</td>
//                 <td className="p-2 capitalize">{p.type}</td>
//                 <td className="p-2">₹{p.price}</td>
//                 <td className="p-2">{p.quantity}</td>
//                 <td className="p-2 flex gap-2">
//                   <button
//                     className="text-blue-600 hover:text-blue-800"
//                     onClick={() => handleEdit(p)}
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     className="text-red-600 hover:text-red-800"
//                     onClick={() => handleDelete(p._id)}
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {products.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={5}
//                   className="p-3 text-center text-gray-500 text-sm"
//                 >
//                   No products found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit Modal */}
//       {showModal && editProduct && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
//             <h3 className="text-xl font-bold mb-4">Edit Product</h3>
//             <div className="grid grid-cols-1 gap-3 text-sm">
//               <input
//                 className="p-2 border rounded"
//                 placeholder="Name"
//                 value={editProduct.name}
//                 onChange={(e) =>
//                   setEditProduct((p) => ({ ...p, name: e.target.value }))
//                 }
//               />
//               <input
//                 className="p-2 border rounded"
//                 placeholder="Price"
//                 type="number"
//                 value={editProduct.price}
//                 onChange={(e) =>
//                   setEditProduct((p) => ({ ...p, price: e.target.value }))
//                 }
//               />
//               <input
//                 className="p-2 border rounded"
//                 placeholder="Quantity"
//                 value={editProduct.quantity}
//                 onChange={(e) =>
//                   setEditProduct((p) => ({ ...p, quantity: e.target.value }))
//                 }
//               />
//               <input
//                 className="p-2 border rounded"
//                 placeholder="Description"
//                 value={editProduct.description}
//                 onChange={(e) =>
//                   setEditProduct((p) => ({
//                     ...p,
//                     description: e.target.value,
//                   }))
//                 }
//               />
//               <input
//                 className="p-2 border rounded"
//                 placeholder="Image URL"
//                 value={editProduct.image}
//                 onChange={(e) =>
//                   setEditProduct((p) => ({ ...p, image: e.target.value }))
//                 }
//               />
//               <select
//                 className="p-2 border rounded"
//                 value={editProduct.type}
//                 onChange={(e) =>
//                   setEditProduct((p) => ({ ...p, type: e.target.value }))
//                 }
//               >
//                 <option value="vegetable">Vegetable</option>
//                 <option value="package">Package</option>
//               </select>
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
//                 onClick={() => {
//                   setShowModal(false);
//                   setEditProduct(null);
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
//                 onClick={handleUpdate}
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// // src/pages/Admin/Products.jsx
// import { useState, useEffect } from "react";
// import api from "../../api";
// import { FaEdit, FaTrash } from "react-icons/fa";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     type: "vegetable",
//     description: "",
//     image: "",
//   });

//   // Package க்கு select செய்யும் vegetables (new product)
//   const [packageVegIds, setPackageVegIds] = useState([]);

//   const [editProduct, setEditProduct] = useState(null);
//   const [editPackageVegIds, setEditPackageVegIds] = useState([]); // edit package vegetables
//   const [showModal, setShowModal] = useState(false);

//   // அனைத்து products load பண்ணுறது
//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("/admin/products");
//       if (res.success) setProducts(res.products);
//     } catch (err) {
//       console.error("Fetch products error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const allVegetables = products.filter((p) => p.type === "vegetable");

//   // Package New formக்கான toggle
//   const toggleNewPackageVeg = (id) => {
//     setPackageVegIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   // Package Edit formக்கான toggle
//   const toggleEditPackageVeg = (id) => {
//     setEditPackageVegIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   // Add product
//   const handleAdd = async () => {
//     if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
//       alert("Name, Price and Quantity are required");
//       return;
//     }

//     if (
//       newProduct.type === "package" &&
//       (!packageVegIds || packageVegIds.length === 0)
//     ) {
//       alert("Please select at least one vegetable for the package");
//       return;
//     }

//     try {
//       const payload = {
//         name: newProduct.name,
//         price: Number(newProduct.price),
//         quantity: newProduct.quantity,
//         type: newProduct.type,
//         description: newProduct.description,
//         image: newProduct.image,
//         vegetables: newProduct.type === "package" ? packageVegIds : [],
//       };

//       await api.post("/admin/products", payload);
//       setNewProduct({
//         name: "",
//         price: "",
//         quantity: "",
//         type: "vegetable",
//         description: "",
//         image: "",
//       });
//       setPackageVegIds([]);
//       fetchProducts();
//     } catch (err) {
//       console.error("Add product error:", err);
//     }
//   };

//   // Delete product
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this product?")) return;
//     try {
//       await api.delete(`/admin/products/${id}`);
//       fetchProducts();
//     } catch (err) {
//       console.error("Delete product error:", err);
//     }
//   };

//   // Open edit modal
//   const handleEdit = (product) => {
//     setEditProduct(product);

//     // product.vegetables இன்னும் ObjectId array only தான் இருப்பது expect பண்ணுறோம்
//     const ids = (product.vegetables || []).map((v) =>
//       typeof v === "string" ? v : v._id
//     );
//     setEditPackageVegIds(ids);

//     setShowModal(true);
//   };

//   // Update product
//   const handleUpdate = async () => {
//     if (!editProduct.name || !editProduct.price || !editProduct.quantity) {
//       alert("Name, Price and Quantity are required");
//       return;
//     }

//     if (
//       editProduct.type === "package" &&
//       (!editPackageVegIds || editPackageVegIds.length === 0)
//     ) {
//       alert("Please select at least one vegetable for the package");
//       return;
//     }

//     try {
//       const payload = {
//         name: editProduct.name,
//         price: Number(editProduct.price),
//         quantity: editProduct.quantity,
//         type: editProduct.type,
//         description: editProduct.description,
//         image: editProduct.image,
//         vegetables:
//           editProduct.type === "package" ? editPackageVegIds : [],
//       };

//       await api.put(`/admin/products/${editProduct._id}`, payload);
//       setShowModal(false);
//       setEditProduct(null);
//       setEditPackageVegIds([]);
//       fetchProducts();
//     } catch (err) {
//       console.error("Update product error:", err);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6 text-green-800">Products</h2>

//       {/* Add Product Form */}
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
//         <h3 className="font-semibold mb-3 text-gray-800">Add New Product</h3>
//         <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
//           <input
//             className="p-2 border rounded text-sm"
//             placeholder="Name"
//             value={newProduct.name}
//             onChange={(e) =>
//               setNewProduct((p) => ({ ...p, name: e.target.value }))
//             }
//           />
//           <input
//             className="p-2 border rounded text-sm"
//             placeholder="Price"
//             type="number"
//             value={newProduct.price}
//             onChange={(e) =>
//               setNewProduct((p) => ({ ...p, price: e.target.value }))
//             }
//           />
//           <input
//             className="p-2 border rounded text-sm"
//             placeholder="Quantity (e.g. 1kg)"
//             value={newProduct.quantity}
//             onChange={(e) =>
//               setNewProduct((p) => ({ ...p, quantity: e.target.value }))
//             }
//           />
//           <input
//             className="p-2 border rounded text-sm"
//             placeholder="Description"
//             value={newProduct.description}
//             onChange={(e) =>
//               setNewProduct((p) => ({ ...p, description: e.target.value }))
//             }
//           />
//           <input
//             className="p-2 border rounded text-sm"
//             placeholder="Image URL"
//             value={newProduct.image}
//             onChange={(e) =>
//               setNewProduct((p) => ({ ...p, image: e.target.value }))
//             }
//           />
//           <select
//             className="p-2 border rounded text-sm"
//             value={newProduct.type}
//             onChange={(e) => {
//               const val = e.target.value;
//               setNewProduct((p) => ({ ...p, type: val }));
//               if (val !== "package") setPackageVegIds([]);
//             }}
//           >
//             <option value="vegetable">Vegetable</option>
//             <option value="package">Package</option>
//           </select>
//         </div>

//         {/* Package vegetables selection */}
//         {newProduct.type === "package" && (
//           <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3">
//             <p className="text-sm font-semibold text-green-900 mb-2">
//               Select vegetables to include in this package
//             </p>
//             {allVegetables.length === 0 ? (
//               <p className="text-xs text-gray-600">
//                 No vegetables found. Please add vegetable products first.
//               </p>
//             ) : (
//               <div className="max-h-40 overflow-auto space-y-1 text-xs">
//                 {allVegetables.map((v) => (
//                   <label
//                     key={v._id}
//                     className="flex items-start gap-2 cursor-pointer hover:bg-green-100 rounded-lg px-2 py-1"
//                   >
//                     <input
//                       type="checkbox"
//                       className="mt-0.5"
//                       checked={packageVegIds.includes(v._id)}
//                       onChange={() => toggleNewPackageVeg(v._id)}
//                     />
//                     <div>
//                       <span className="font-semibold text-gray-900">
//                         {v.name}
//                       </span>
//                       <span className="text-gray-600 ml-1">
//                         ({v.quantity || "1kg"})
//                       </span>
//                       {v.description && (
//                         <p className="text-[11px] text-gray-500 line-clamp-1">
//                           {v.description}
//                         </p>
//                       )}
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         <div className="mt-3">
//           <button
//             className="bg-green-600 text-white rounded px-4 py-2 text-sm hover:bg-green-700"
//             onClick={handleAdd}
//           >
//             Add Product
//           </button>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="overflow-x-auto rounded-xl shadow bg-white border border-gray-100">
//         <table className="min-w-full text-sm">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Type</th>
//               <th className="p-3 text-left">Price</th>
//               <th className="p-3 text-left">Quantity</th>
//               <th className="p-3 text-left">Details</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p) => (
//               <tr
//                 key={p._id}
//                 className="border-b hover:bg-green-50"
//               >
//                 <td className="p-2">{p.name}</td>
//                 <td className="p-2 capitalize">{p.type}</td>
//                 <td className="p-2">₹{p.price}</td>
//                 <td className="p-2">{p.quantity}</td>
//                 <td className="p-2 text-xs">
//                   {p.type === "package"
//                     ? `${(p.vegetables || []).length} vegetables`
//                     : "-"}
//                 </td>
//                 <td className="p-2 flex gap-2">
//                   <button
//                     className="text-blue-600 hover:text-blue-800"
//                     onClick={() => handleEdit(p)}
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     className="text-red-600 hover:text-red-800"
//                     onClick={() => handleDelete(p._id)}
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {products.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={6}
//                   className="p-3 text-center text-gray-500"
//                 >
//                   No products found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit Modal */}
//       {showModal && editProduct && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
//             <h3 className="text-xl font-bold mb-4">Edit Product</h3>
//             <div className="grid grid-cols-1 gap-3 text-sm">
//               <input
//                 className="p-2 border rounded"
//                 placeholder="Name"
//                 value={editProduct.name}
//                 onChange={(e) =>
//                   setEditProduct((p) => ({ ...p, name: e.target.value }))
//                 }
//               />
//               <input
//                 className="p-2 border rounded"
//                 placeholder="Price"
//                 type="number"
//                 value={editProduct.price}
//                 onChange={(e) =>
//                   setEditProduct((p) => ({ ...p, price: e.target.value }))
//                 }
//               />
//               <input
//                 className="p-2 border rounded"
//                 placeholder="Quantity"
//                 value={editProduct.quantity}
//                 onChange={(e) =>
//                   setEditProduct((p) => ({ ...p, quantity: e.target.value }))
//                 }
//               />
//               <input
//                 className="p-2 border rounded"
//                 placeholder="Description"
//                 value={editProduct.description}
//                 onChange={(e) =>
//                   setEditProduct((p) => ({
//                     ...p,
//                     description: e.target.value,
//                   }))
//                 }
//               />
//               <input
//                 className="p-2 border rounded"
//                 placeholder="Image URL"
//                 value={editProduct.image}
//                 onChange={(e) =>
//                   setEditProduct((p) => ({ ...p, image: e.target.value }))
//                 }
//               />
//               <select
//                 className="p-2 border rounded"
//                 value={editProduct.type}
//                 onChange={(e) => {
//                   const val = e.target.value;
//                   setEditProduct((p) => ({ ...p, type: val }));
//                   if (val !== "package") setEditPackageVegIds([]);
//                 }}
//               >
//                 <option value="vegetable">Vegetable</option>
//                 <option value="package">Package</option>
//               </select>
//             </div>

//             {/* Edit Package vegetables selection */}
//             {editProduct.type === "package" && (
//               <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3 text-xs">
//                 <p className="font-semibold text-green-900 mb-1">
//                   Select vegetables for this package
//                 </p>
//                 {allVegetables.length === 0 ? (
//                   <p className="text-gray-600">
//                     No vegetables found. Please add vegetable products first.
//                   </p>
//                 ) : (
//                   <div className="max-h-40 overflow-auto space-y-1">
//                     {allVegetables.map((v) => (
//                       <label
//                         key={v._id}
//                         className="flex items-start gap-2 cursor-pointer hover:bg-green-100 rounded-lg px-2 py-1"
//                       >
//                         <input
//                           type="checkbox"
//                           className="mt-0.5"
//                           checked={editPackageVegIds.includes(v._id)}
//                           onChange={() => toggleEditPackageVeg(v._id)}
//                         />
//                         <div>
//                           <span className="font-semibold text-gray-900">
//                             {v.name}
//                           </span>
//                           <span className="text-gray-600 ml-1">
//                             ({v.quantity || "1kg"})
//                           </span>
//                           {v.description && (
//                             <p className="text-[11px] text-gray-500 line-clamp-1">
//                               {v.description}
//                             </p>
//                           )}
//                         </div>
//                       </label>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
//                 onClick={() => {
//                   setShowModal(false);
//                   setEditProduct(null);
//                   setEditPackageVegIds([]);
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
//                 onClick={handleUpdate}
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import api from "../../api";
import { 
  FaPlus, FaSearch, FaEdit, FaTrash, FaBoxOpen, FaLeaf, 
  FaThLarge, FaList, FaTimes, FaCloudUploadAlt, FaFilter 
} from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Form State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    type: "vegetable",
    description: "",
    image: "",
    vegetables: [], // for packages
  });

  // Data Fetching
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/products");
      if (res.success) setProducts(res.products);
    } catch (err) {
      console.error("Fetch products error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Computed Data
  const allVegetables = products.filter((p) => p.type === "vegetable");
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" ? true : p.type === filterType;
    return matchesSearch && matchesType;
  });

  // Handlers
  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentProduct({
      name: "", price: "", quantity: "", type: "vegetable", description: "", image: "", vegetables: []
    });
    setShowModal(true);
  };

  const handleOpenEdit = (product) => {
    setIsEditing(true);
    // Extract IDs if vegetables are populated objects
    const vegIds = (product.vegetables || []).map(v => typeof v === 'string' ? v : v._id);
    setCurrentProduct({ ...product, vegetables: vegIds });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this product?")) return;
    try {
      await api.delete(`/admin/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentProduct.name || !currentProduct.price) return alert("Name and Price required");
    
    if (currentProduct.type === "package" && currentProduct.vegetables.length === 0) {
      return alert("Select at least one vegetable for the package");
    }

    try {
      const payload = { ...currentProduct, price: Number(currentProduct.price) };
      if (isEditing) {
        await api.put(`/admin/products/${currentProduct._id}`, payload);
      } else {
        await api.post("/admin/products", payload);
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error("Submit error", err);
    }
  };

  const toggleVegSelection = (id) => {
    setCurrentProduct(prev => {
      const exists = prev.vegetables.includes(id);
      return {
        ...prev,
        vegetables: exists 
          ? prev.vegetables.filter(v => v !== id)
          : [...prev.vegetables, id]
      };
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* ====== HEADER SECTION ====== */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Product Inventory</h2>
          <p className="text-sm text-slate-500 mt-1">Manage vegetables, packages, and stock levels.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-black px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-200 transition-all hover:-translate-y-0.5"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* ====== STATS BAR ====== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><MdOutlineInventory2 size={24} /></div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">Total Items</p>
            <p className="text-2xl font-bold text-slate-800">{products.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-xl"><FaLeaf size={24} /></div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">Vegetables</p>
            <p className="text-2xl font-bold text-slate-800">{products.filter(p => p.type === 'vegetable').length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl"><FaBoxOpen size={24} /></div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">Packages</p>
            <p className="text-2xl font-bold text-slate-800">{products.filter(p => p.type === 'package').length}</p>
          </div>
        </div>
      </div>

      {/* ====== CONTROLS ====== */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 bg-transparent text-sm outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>
          <select 
            className="bg-transparent text-sm outline-none text-slate-600 font-medium cursor-pointer px-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="vegetable">Vegetables</option>
            <option value="package">Packages</option>
          </select>
        </div>

        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-slate-100 text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <FaList />
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-slate-100 text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <FaThLarge />
          </button>
        </div>
      </div>

      {/* ====== PRODUCT LIST / GRID ====== */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading inventory...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
          <p className="text-slate-500 font-medium">No products found.</p>
          <button onClick={() => {setSearchTerm(""); setFilterType("all")}} className="text-emerald-600 text-sm hover:underline mt-2">Clear filters</button>
        </div>
      ) : (
        <>
          {viewMode === 'list' ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock Unit</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {filteredProducts.map(p => (
                    <tr key={p._id} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                            {p.image ? (
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" onError={(e) => e.target.src='https://placehold.co/100x100?text=No+Img'} />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300"><FaLeaf /></div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{p.name}</p>
                            <p className="text-xs text-slate-400 truncate max-w-[200px]">{p.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${p.type === 'vegetable' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                          {p.type}
                        </span>
                      </td>
                      <td className="p-4 font-bold">₹{p.price}</td>
                      <td className="p-4 text-slate-500">{p.quantity}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleOpenEdit(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><FaEdit /></button>
                          <button onClick={() => handleDelete(p._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(p => (
                <div key={p._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden group flex flex-col">
                  <div className="h-40 bg-slate-100 relative overflow-hidden">
                     {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" onError={(e) => e.target.src='https://placehold.co/300x200?text=No+Img'} />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-4xl"><FaLeaf /></div>
                     )}
                     <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold uppercase shadow-sm">
                        {p.type}
                     </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-800 text-lg">{p.name}</h3>
                      <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg">₹{p.price}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2 flex-1">{p.description || "No description available."}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded">{p.quantity}</span>
                      <div className="flex gap-2">
                         <button onClick={() => handleOpenEdit(p)} className="text-slate-400 hover:text-blue-600 transition-colors"><FaEdit /></button>
                         <button onClick={() => handleDelete(p._id)} className="text-slate-400 hover:text-red-600 transition-colors"><FaTrash /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ====== ADD / EDIT MODAL ====== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" >
          <div className="  rounded-3xl shadow-2xl overflow-hidden animate-scaleUp flex flex-col max-h-[90vh]" style={{borderRadius:"20px",backgroundColor:"#e7eee7ff"}}>
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{isEditing ? "Edit Product" : "Add New Product"}</h3>
                <p className="text-xs text-slate-500">Fill in the details below.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 bg-white rounded-full text-slate-400 hover:text-red-500 shadow-sm hover:shadow transition-all">
                <FaTimes />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto custom-scrollbar" style={{width:"500px",height:"500px"}}>
              <form id="productForm" onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase" >Product Name</label>
                    <input 
                      className="w-full p-3  border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500  transition-all outline-none" 
                      placeholder="e.g. Organic Carrot"
                      value={currentProduct.name}
                      onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                      required
                      style={{backgroundColor:"white"}}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Type</label>
                    <select 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none cursor-pointer"
                      value={currentProduct.type}
                      onChange={(e) => setCurrentProduct({...currentProduct, type: e.target.value, vegetables: []})}
                    >
                      <option value="vegetable">Vegetable</option>
                      <option value="package">Combo Package</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Price (₹)</label>
                    <input 
                      type="number"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none" 
                      placeholder="0.00"
                      value={currentProduct.price}
                      onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Quantity Unit</label>
                    <input 
                      className="w-full p-3  border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none" 
                      placeholder="e.g. 1kg, 500g, 1 Pack"
                      value={currentProduct.quantity}
                      onChange={(e) => setCurrentProduct({...currentProduct, quantity: e.target.value})}
                      required
                      style={{backgroundColor:"white"}}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-500 uppercase">Image URL</label>
                   <div className="flex gap-2">
                      <input 
                        className="w-full p-3  border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none" 
                        placeholder="https://..."
                        value={currentProduct.image}
                        onChange={(e) => setCurrentProduct({...currentProduct, image: e.target.value})}
                        style={{backgroundColor:"white"}}
                      />
                      <div className="w-12 h-12  rounded-xl border border-slate-200 overflow-hidden flex-shrink-0" style={{backgroundColor:"white"}}>
                         {currentProduct.image ? (
                           <img src={currentProduct.image} className="w-full h-full object-cover" onError={(e) => e.target.src=''} />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-slate-300"><FaCloudUploadAlt /></div>
                         )}
                      </div>
                   </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                  <textarea 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none resize-none h-24" 
                    placeholder="Short description about the product..."
                    value={currentProduct.description}
                    onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                  />
                </div>

                {/* PACKAGE SELECTION LOGIC */}
                {currentProduct.type === "package" && (
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 animate-fadeIn">
                    <label className="text-xs font-bold text-emerald-700 uppercase mb-2 block flex justify-between">
                       <span>Select Package Contents</span>
                       <span className="bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded text-[10px]">{currentProduct.vegetables.length} Selected</span>
                    </label>
                    
                    {allVegetables.length === 0 ? (
                       <p className="text-sm text-slate-500 italic">No individual vegetables available to add.</p>
                    ) : (
                       <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                          {allVegetables.map(veg => {
                             const isSelected = currentProduct.vegetables.includes(veg._id);
                             return (
                                <div 
                                   key={veg._id}
                                   onClick={() => toggleVegSelection(veg._id)}
                                   className={`cursor-pointer p-2 rounded-xl border text-sm flex items-center gap-2 transition-all
                                      ${isSelected ? 'bg-emerald-600 text-white border-emerald-600 shadow-md transform scale-[1.02]' : 'bg-white border-slate-200 hover:border-emerald-300'}`}
                                >
                                   <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-white border-white' : 'bg-slate-100 border-slate-300'}`}>
                                      {isSelected && <div className="w-2 h-2 bg-emerald-600 rounded-sm"></div>}
                                   </div>
                                   <span className="truncate font-medium">{veg.name}</span>
                                </div>
                             )
                          })}
                       </div>
                    )}
                  </div>
                )}

              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold  text-white  transition-all hover:-translate-y-0.5" style={{backgroundColor:"green"}}
              >
                {isEditing ? "Update Product" : "Create Product"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}