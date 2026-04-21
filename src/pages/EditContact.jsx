import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../db";

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });

  useEffect(() => {
    const fetchContact = async () => {
      const snap = await getDoc(doc(db, "contacts", id));
      if (snap.exists()) setForm(snap.data());
    };
    fetchContact();
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await updateDoc(doc(db, "contacts", id), form);
    navigate(`/contacts/${id}`);
  };

  return (
    <div className="card shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
      <div className="card-body">
        <h2 className="fw-bold mb-4">Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input name="firstName" className="form-control" value={form.firstName} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input name="lastName" className="form-control" value={form.lastName} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input name="phone" className="form-control" value={form.phone || ""} onChange={handleChange} />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">Update Contact</button>
            <Link to={`/contacts/${id}`} className="btn btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}