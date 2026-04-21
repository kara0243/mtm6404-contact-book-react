import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../db";

export default function AddContact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "contacts"), form);
    navigate(`/contacts/${docRef.id}`);
  };

  return (
    <div className="card shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
      <div className="card-body">
        <h2 className="fw-bold mb-4">New Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input name="firstName" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input name="lastName" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input name="phone" className="form-control" onChange={handleChange} />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">Save Contact</button>
            <Link to="/" className="btn btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}