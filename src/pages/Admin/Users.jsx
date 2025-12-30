


// import { useState, useEffect, useMemo } from "react";
// import { 
//   Search, Filter, UserPlus, Mail, Shield, Trash2, Edit2, 
//   Users as UsersIcon, CheckCircle, XCircle, RefreshCcw, 
//   LayoutDashboard, Package, Settings, X, MoreHorizontal, 
//   FileText, Clock, Calendar, ArrowRight, Download, Ban
// } from "lucide-react";
// import api from "../../api";

// // --- 1. SUB-COMPONENTS ---

// // A. Smart Avatar
// const UserAvatar = ({ name, size = "sm" }) => {
//   const safeName = name || "User";
//   const initials = safeName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
//   const colors = ["bg-emerald-100 text-emerald-700", "bg-indigo-100 text-indigo-700", "bg-pink-100 text-pink-700", "bg-amber-100 text-amber-700"];
//   const colorClass = colors[safeName.length % colors.length];
  
//   const sizeClasses = size === "lg" ? "w-16 h-16 text-xl" : "w-10 h-10 text-xs";

//   return (
//     <div className={`${sizeClasses} rounded-full flex items-center justify-center font-bold shadow-sm ${colorClass} ring-2 ring-white`}>
//       {initials}
//     </div>
//   );
// };

// // B. Status Toggle Switch
// const StatusToggle = ({ isActive, onToggle }) => (
//   <button 
//     onClick={(e) => { e.stopPropagation(); onToggle(); }}
//     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${isActive ? 'bg-emerald-500' : 'bg-slate-200'}`}
//   >
//     <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
//   </button>
// );

// // C. Slide-Over Drawer (The Inspector)
// const UserDrawer = ({ user, onClose, onUpdateRole }) => {
//   if (!user) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex justify-end">
//       {/* Backdrop */}
//       <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
//       {/* Drawer Panel */}
//       <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        
//         {/* Drawer Header */}
//         <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-900 relative">
//           <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all">
//             <X size={18} />
//           </button>
//         </div>
        
//         {/* Profile Info */}
//         <div className="px-6 -mt-10 mb-6">
//           <div className="flex justify-between items-end">
//             <UserAvatar name={user.name} size="lg" />
//             <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 flex items-center gap-1">
//               <Shield size={12}/> {user.role}
//             </span>
//           </div>
//           <h2 className="text-2xl font-bold text-slate-900 mt-3">{user.name}</h2>
//           <p className="text-slate-500 flex items-center gap-2 text-sm mt-1">
//             <Mail size={14}/> {user.email}
//           </p>
//         </div>

//         {/* Drawer Body - Scrollable */}
//         <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-8">
          
//           {/* Stats Row */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
//               <p className="text-xs text-slate-500 uppercase font-bold">Orders</p>
//               <p className="text-2xl font-bold text-slate-900">12</p>
//             </div>
//             <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
//               <p className="text-xs text-slate-500 uppercase font-bold">Total Spent</p>
//               <p className="text-2xl font-bold text-emerald-600">₹45k</p>
//             </div>
//           </div>

//           {/* Activity Timeline */}
//           <div>
//             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Recent Activity</h3>
//             <div className="space-y-6 border-l-2 border-slate-100 ml-3 pl-6 relative">
//               {[
//                 { title: "Order Delivered", time: "2 hours ago", icon: Package, color: "text-emerald-600" },
//                 { title: "Updated Profile", time: "1 day ago", icon: Edit2, color: "text-blue-600" },
//                 { title: "Login Detected", time: "3 days ago", icon: Shield, color: "text-slate-400" },
//               ].map((item, i) => (
//                 <div key={i} className="relative">
//                   <div className={`absolute -left-[31px] top-0 p-1 bg-white border-2 border-slate-100 rounded-full ${item.color}`}>
//                     <item.icon size={14} />
//                   </div>
//                   <p className="text-sm font-medium text-slate-800">{item.title}</p>
//                   <p className="text-xs text-slate-400">{item.time}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Actions */}
//           <div>
//             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Danger Zone</h3>
//             <div className="flex gap-3">
//               <button className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
//                 Reset Password
//               </button>
//               <button className="flex-1 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
//                 Ban User
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };


// // --- 2. MAIN COMPONENT ---

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [roleFilter, setRoleFilter] = useState("All");
  
//   // New State for Pro Features
//   const [selectedUserIds, setSelectedUserIds] = useState([]);
//   const [drawerUser, setDrawerUser] = useState(null);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/admin/users");
//       if (res.success) {
//         // Inject mock status data if API doesn't have it yet
//         const enhancedUsers = (res.users || []).map(u => ({ ...u, isActive: true }));
//         setUsers(enhancedUsers);
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // --- Bulk Selection Logic ---
//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedUserIds(users.map(u => u._id));
//     } else {
//       setSelectedUserIds([]);
//     }
//   };

//   const handleSelectOne = (id) => {
//     if (selectedUserIds.includes(id)) {
//       setSelectedUserIds(selectedUserIds.filter(uid => uid !== id));
//     } else {
//       setSelectedUserIds([...selectedUserIds, id]);
//     }
//   };

//   // --- Toggle Status Logic ---
//   const toggleUserStatus = (id) => {
//     setUsers(users.map(u => u._id === id ? { ...u, isActive: !u.isActive } : u));
//     // Here you would call api.put(`/admin/users/${id}`, { isActive: ... })
//   };

//   const filteredUsers = useMemo(() => {
//     return users.filter((user) => {
//       const matchSearch = (user.name || "").toLowerCase().includes(searchTerm.toLowerCase());
//       const matchRole = roleFilter === "All" || (roleFilter === "Admin" ? user.role === "admin" : user.role !== "admin");
//       return matchSearch && matchRole;
//     });
//   }, [users, searchTerm, roleFilter]);

//   return (
//     <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      
     
//       {/* MAIN CONTENT */}
//       <main className="flex-1 lg:ml-64 p-4 sm:p-8 relative">
        
//         {/* Header */}
//         <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Users</h1>
//             <p className="text-slate-500 mt-1">Manage system access and user profiles.</p>
//           </div>
//           <div className="flex items-center gap-3">
//              <button onClick={fetchUsers} className="p-2.5 bg-white border border-slate-200 rounded-full hover:bg-slate-50 text-slate-600 shadow-sm">
//               <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
//             </button>
//             <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full shadow-lg shadow-slate-900/20 transition-all flex items-center gap-2 text-sm">
//               <UserPlus size={18} /> Invite User
//             </button>
//           </div>
//         </header>

//         {/* Content Card */}
//         <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden min-h-[600px] flex flex-col">
          
//           {/* Toolbar */}
//           <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
//             <div className="flex p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
//               {["All", "User", "Admin"].map((role) => (
//                 <button
//                   key={role}
//                   onClick={() => setRoleFilter(role)}
//                   className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
//                     roleFilter === role ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
//                   }`}
//                 >
//                   {role}
//                 </button>
//               ))}
//             </div>
//             <div className="relative w-full sm:w-72">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl text-sm outline-none transition-all"
//               />
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto flex-1">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-slate-50/50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
//                   <th className="p-5 w-10">
//                     <input 
//                       type="checkbox" 
//                       className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
//                       onChange={handleSelectAll}
//                       checked={selectedUserIds.length === users.length && users.length > 0}
//                     />
//                   </th>
//                   <th className="p-5">User</th>
//                   <th className="p-5">Role</th>
//                   <th className="p-5">Status</th>
//                   <th className="p-5">Joined</th>
//                   <th className="p-5 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {loading ? (
//                    <tr><td colSpan="6" className="p-10 text-center text-slate-400">Loading users...</td></tr>
//                 ) : filteredUsers.length > 0 ? (
//                   filteredUsers.map((u) => (
//                     <tr 
//                       key={u._id} 
//                       onClick={() => setDrawerUser(u)}
//                       className={`group transition-colors cursor-pointer ${selectedUserIds.includes(u._id) ? "bg-emerald-50/30" : "hover:bg-slate-50/60"}`}
//                     >
//                       <td className="p-5" onClick={(e) => e.stopPropagation()}>
//                         <input 
//                           type="checkbox" 
//                           className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
//                           checked={selectedUserIds.includes(u._id)}
//                           onChange={() => handleSelectOne(u._id)}
//                         />
//                       </td>
//                       <td className="p-5">
//                         <div className="flex items-center gap-3">
//                           <UserAvatar name={u.name} />
//                           <div>
//                             <span className="block font-semibold text-slate-900 text-sm">{u.name}</span>
//                             <span className="block text-xs text-slate-400">{u.email}</span>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="p-5">
//                         <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${
//                           u.role === 'admin' ? "bg-purple-50 text-purple-700 border-purple-100" : "bg-slate-100 text-slate-600 border-slate-200"
//                         }`}>
//                           {u.role === 'admin' && <Shield size={12} />} {u.role}
//                         </span>
//                       </td>
//                       <td className="p-5">
//                         <div className="flex items-center gap-2">
//                           <StatusToggle isActive={u.isActive} onToggle={() => toggleUserStatus(u._id)} />
//                           <span className={`text-xs font-medium ${u.isActive ? 'text-slate-700' : 'text-slate-400'}`}>
//                             {u.isActive ? 'Active' : 'Banned'}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="p-5 text-sm text-slate-500 font-mono">
//                         Oct 24, 2024
//                       </td>
//                       <td className="p-5 text-right">
//                         <button 
//                           onClick={(e) => { e.stopPropagation(); setDrawerUser(u); }}
//                           className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
//                         >
//                           <MoreHorizontal size={18} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={6} className="p-12 text-center text-slate-500">No users found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Floating Bulk Action Bar */}
//         {selectedUserIds.length > 0 && (
//           <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-6 animate-bounce-in">
//             <span className="text-sm font-medium flex items-center gap-2">
//               <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center text-xs font-bold">
//                 {selectedUserIds.length}
//               </div>
//               Selected
//             </span>
//             <div className="h-4 w-px bg-slate-700"></div>
//             <div className="flex gap-2">
//               <button className="px-3 py-1.5 hover:bg-white/10 rounded-lg text-sm transition-colors flex items-center gap-2 text-red-400">
//                 <Trash2 size={16} /> Delete
//               </button>
//               <button className="px-3 py-1.5 hover:bg-white/10 rounded-lg text-sm transition-colors flex items-center gap-2">
//                 <Download size={16} /> Export
//               </button>
//             </div>
//             <button onClick={() => setSelectedUserIds([])} className="ml-2 text-slate-500 hover:text-white">
//               <X size={18} />
//             </button>
//           </div>
//         )}
//       </main>

//       {/* Slide-Over Drawer */}
//       {drawerUser && (
//         <UserDrawer 
//           user={drawerUser} 
//           onClose={() => setDrawerUser(null)} 
//           onUpdateRole={() => {}}
//         />
//       )}

//     </div>
//   );
// }



import { useState, useEffect, useMemo } from "react";
import {
  Search,
  UserPlus,
  Mail,
  Shield,
  Trash2,
  Edit2,
  Users as UsersIcon,
  CheckCircle,
  XCircle,
  RefreshCcw,
  LayoutDashboard,
  Package,
  Settings,
  X,
  MoreHorizontal,
  FileText,
  Clock,
  Calendar,
  ArrowRight,
  Download,
  Ban,
} from "lucide-react";
import api from "../../api";
import "./Users.css";

// --- 1. SUB-COMPONENTS ---

// A. Smart Avatar
const UserAvatar = ({ name, size = "sm" }) => {
  const safeName = name || "User";
  const initials = safeName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const colors = [
    "bg-emerald-100 text-emerald-700",
    "bg-indigo-100 text-indigo-700",
    "bg-pink-100 text-pink-700",
    "bg-amber-100 text-amber-700",
  ];
  const colorClass = colors[safeName.length % colors.length];

  const sizeClasses =
    size === "lg" ? "w-16 h-16 text-xl" : "w-10 h-10 text-xs";

  return (
    <div
      className={`${sizeClasses} rounded-full flex items-center justify-center font-bold shadow-sm ${colorClass} ring-2 ring-white`}
    >
      {initials}
    </div>
  );
};

// B. Status Toggle Switch
const StatusToggle = ({ isActive, onToggle }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    className={`status-toggle relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
      isActive ? "bg-emerald-500" : "bg-slate-200"
    }`}
  >
    <span
      className={`status-toggle__thumb inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        isActive ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

// C. Slide-Over Drawer (The Inspector)
const UserDrawer = ({ user, onClose, onUpdateRole }) => {
  if (!user) return null;

  return (
    <div className="user-drawer-overlay fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="user-drawer-backdrop absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="user-drawer-panel relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        {/* Drawer Header */}
        <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-900 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 -mt-10 mb-6">
          <div className="flex justify-between items-end">
            <UserAvatar name={user.name} size="lg" />
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 flex items-center gap-1">
              <Shield size={12} /> {user.role}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-3">
            {user.name}
          </h2>
          <p className="text-slate-500 flex items-center gap-2 text-sm mt-1">
            <Mail size={14} /> {user.email}
          </p>
        </div>

        {/* Drawer Body - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-8 custom-scrollbar">
          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xs text-slate-500 uppercase font-bold">
                Orders
              </p>
              <p className="text-2xl font-bold text-slate-900">12</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xs text-slate-500 uppercase font-bold">
                Total Spent
              </p>
              <p className="text-2xl font-bold text-emerald-600">₹45k</p>
            </div>
          </div>

          {/* Activity Timeline */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
              Recent Activity
            </h3>
            <div className="space-y-6 border-l-2 border-slate-100 ml-3 pl-6 relative">
              {[
                {
                  title: "Order Delivered",
                  time: "2 hours ago",
                  icon: Package,
                  color: "text-emerald-600",
                },
                {
                  title: "Updated Profile",
                  time: "1 day ago",
                  icon: Edit2,
                  color: "text-blue-600",
                },
                {
                  title: "Login Detected",
                  time: "3 days ago",
                  icon: Shield,
                  color: "text-slate-400",
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div
                    className={`absolute -left-[31px] top-0 p-1 bg-white border-2 border-slate-100 rounded-full ${item.color}`}
                  >
                    <item.icon size={14} />
                  </div>
                  <p className="text-sm font-medium text-slate-800">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-400">{item.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
              Danger Zone
            </h3>
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                Reset Password
              </button>
              <button className="flex-1 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                Ban User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. MAIN COMPONENT ---

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // Pro features
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [drawerUser, setDrawerUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users");
      if (res.success) {
        const enhancedUsers = (res.users || []).map((u) => ({
          ...u,
          isActive: true,
        }));
        setUsers(enhancedUsers);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- Bulk Selection Logic ---
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUserIds(users.map((u) => u._id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter((uid) => uid !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  // --- Toggle Status Logic ---
  const toggleUserStatus = (id) => {
    setUsers(
      users.map((u) =>
        u._id === id ? { ...u, isActive: !u.isActive } : u
      )
    );
    // api.put(`/admin/users/${id}`, { isActive: ... })
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch = (user.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchRole =
        roleFilter === "All"
          ? true
          : roleFilter === "Admin"
          ? user.role === "admin"
          : user.role !== "admin";
      return matchSearch && matchRole;
    });
  }, [users, searchTerm, roleFilter]);

  return (
    <div className="users-page flex min-h-screen font-sans text-slate-800" style={{borderRadius:"15px"}}>
      {/* MAIN CONTENT */}
      <main className="users-main flex-1 lg:ml-64 p-4 sm:p-8 relative">
        {/* Header */}
        <header className="users-header flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="users-header__title">
              Users
            </h1>
            <p className="users-header__subtitle">
              Manage system access and user profiles.
            </p>
          </div>
          <div className="users-header__actions flex items-center gap-3">
            <button
              onClick={fetchUsers}
              className="btn-icon btn-refresh"
            >
              <RefreshCcw
                size={18}
                className={loading ? "animate-spin" : ""}
              />
            </button>
            <button className="btn btn-primary btn-with-icon">
              <UserPlus size={18} /> Invite User
            </button>
          </div>
        </header>

        {/* Content Card */}
        <div className="users-card bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden min-h-[600px] flex flex-col">
          {/* Toolbar */}
          <div className="users-toolbar p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90">
            <div className="users-role-tabs flex p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
              {["All", "User", "Admin"].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`users-role-tab px-6 py-2 text-sm font-medium rounded-lg transition-all ${
                    roleFilter === role
                      ? "users-role-tab--active bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            <div className="users-search relative w-full sm:w-72" >
              <Search
                className="users-search__icon absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
                style={{marginLeft:"30px"}}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="users-search__input w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-xl text-sm outline-none transition-all"
                style={{marginLeft:"20px"}}
              />
            </div>
          </div>

          {/* Table */}
          <div className="users-table-wrapper overflow-x-auto flex-1">
            <table className="users-table w-full text-left border-collapse">
              <thead>
                <tr className="users-table__head-row bg-slate-50/50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                  <th className="p-5 w-10">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      onChange={handleSelectAll}
                      checked={
                        selectedUserIds.length === users.length &&
                        users.length > 0
                      }
                    />
                  </th>
                  <th className="p-5">User</th>
                  <th className="p-5">Role</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Joined</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-10 text-center text-slate-400"
                    >
                      Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <tr
                      key={u._id}
                      onClick={() => setDrawerUser(u)}
                      className={`user-row group transition-colors cursor-pointer ${
                        selectedUserIds.includes(u._id)
                          ? "bg-emerald-50/30"
                          : "hover:bg-slate-50/60"
                      }`}
                    >
                      <td
                        className="p-5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                          checked={selectedUserIds.includes(u._id)}
                          onChange={() => handleSelectOne(u._id)}
                        />
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <UserAvatar name={u.name} />
                          <div>
                            <span className="block font-semibold text-slate-900 text-sm">
                              {u.name}
                            </span>
                            <span className="block text-xs text-slate-400">
                              {u.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${
                            u.role === "admin"
                              ? "bg-purple-50 text-purple-700 border-purple-100"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          {u.role === "admin" && <Shield size={12} />}{" "}
                          {u.role}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <StatusToggle
                            isActive={u.isActive}
                            onToggle={() => toggleUserStatus(u._id)}
                          />
                          <span
                            className={`text-xs font-medium ${
                              u.isActive
                                ? "text-slate-700"
                                : "text-slate-400"
                            }`}
                          >
                            {u.isActive ? "Active" : "Banned"}
                          </span>
                        </div>
                      </td>
                      <td className="p-5 text-sm text-slate-500 font-mono">
                        Oct 24, 2024
                      </td>
                      <td className="p-5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDrawerUser(u);
                          }}
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-12 text-center text-slate-500"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Floating Bulk Action Bar */}
        {selectedUserIds.length > 0 && (
          <div className="users-bulk-bar fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-6 animate-bounce-in">
            <span className="text-sm font-medium flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center text-xs font-bold">
                {selectedUserIds.length}
              </div>
              Selected
            </span>
            <div className="h-4 w-px bg-slate-700"></div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 hover:bg-white/10 rounded-lg text-sm transition-colors flex items-center gap-2 text-red-400">
                <Trash2 size={16} /> Delete
              </button>
              <button className="px-3 py-1.5 hover:bg-white/10 rounded-lg text-sm transition-colors flex items-center gap-2">
                <Download size={16} /> Export
              </button>
            </div>
            <button
              onClick={() => setSelectedUserIds([])}
              className="ml-2 text-slate-500 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </main>

      {/* Slide-Over Drawer */}
      {drawerUser && (
        <UserDrawer
          user={drawerUser}
          onClose={() => setDrawerUser(null)}
          onUpdateRole={() => {}}
        />
      )}
    </div>
  );
}