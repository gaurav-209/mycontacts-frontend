import React, { useEffect, useState } from "react";
import { API } from "../api";
import toast from "react-hot-toast";

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    address: "",
    city: "",
    country: "",
    notes: "",
    isFavorite: false,
  });
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch all contacts
  const fetchContacts = async () => {
    try {
      const { data } = await API.get("/contacts");
      setContacts(data.contacts);
    } catch {
      toast.error("Failed to load contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ✅ Handle add/update contact
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/contacts/${editingId}`, form);
        toast.success("Contact updated successfully!");
        setEditingId(null);
      } else {
        await API.post("/contacts", form);
        toast.success("Contact added!");
      }
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
        address: "",
        city: "",
        country: "",
        notes: "",
        isFavorite: false,
      });
      fetchContacts();
    } catch {
      toast.error("Error saving contact");
    }
  };

  // ✅ Delete contact
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await API.delete(`/contacts/${id}`);
      toast.success("Contact deleted!");
      fetchContacts();
    } catch {
      toast.error("Failed to delete contact");
    }
  };

  // ✅ Edit contact (prefill form)
  const handleEdit = (contact) => {
    setForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company || "",
      jobTitle: contact.jobTitle || "",
      address: contact.address || "",
      city: contact.city || "",
      country: contact.country || "",
      notes: contact.notes || "",
      isFavorite: contact.isFavorite || false,
    });
    setEditingId(contact._id);
  };

  // ✅ Toggle Favorite
  const toggleFavorite = async (id, currentValue) => {
    try {
      await API.put(`/contacts/${id}`, { isFavorite: !currentValue });
      fetchContacts();
    } catch {
      toast.error("Failed to update favorite status");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 mt-5 rounded shadow">
      <h2 className="text-3xl font-semibold mb-6 text-center">My Contacts</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          name="jobTitle"
          placeholder="Job Title"
          value={form.jobTitle}
          onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className="border p-2 rounded"
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="border p-2 rounded md:col-span-2"
        />

        <label className="flex items-center space-x-2 md:col-span-2">
          <input
            type="checkbox"
            checked={form.isFavorite}
            onChange={(e) => setForm({ ...form, isFavorite: e.target.checked })}
          />
          <span>Mark as Favorite ⭐</span>
        </label>

        <button
          className={`md:col-span-2 w-full ${
            editingId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          } text-white p-2 rounded`}
        >
          {editingId ? "Update Contact" : "Add Contact"}
        </button>
      </form>

      {/* Contact List */}
      <div className="divide-y divide-gray-200">
        {contacts.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No contacts found.</p>
        ) : (
          contacts.map((c) => (
            <div
              key={c._id}
              className="flex justify-between items-start p-4 hover:bg-gray-50 transition-all"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{c.name}</h3>
                  {c.isFavorite && <span className="text-yellow-500">⭐</span>}
                </div>
                <p className="text-sm text-gray-600">
                  {c.email} • {c.phone}
                </p>
                {(c.company || c.jobTitle) && (
                  <p className="text-sm text-gray-500">
                    {c.jobTitle} {c.company && `@ ${c.company}`}
                  </p>
                )}
                {(c.city || c.country) && (
                  <p className="text-sm text-gray-500">
                    {c.city}, {c.country}
                  </p>
                )}
                {c.notes && (
                  <p className="text-sm text-gray-400 mt-1 italic">{c.notes}</p>
                )}
              </div>

              <div className="space-x-2 flex-shrink-0">
                <button
                  onClick={() => toggleFavorite(c._id, c.isFavorite)}
                  className="text-yellow-500 hover:text-yellow-600"
                  title="Toggle Favorite"
                >
                  {c.isFavorite ? "★" : "☆"}
                </button>
                <button
                  onClick={() => handleEdit(c)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
