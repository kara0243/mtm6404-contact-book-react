import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../db";

export default function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const snap = await getDoc(doc(db, "contacts", id));
      if (snap.exists()) setContact({ id: snap.id, ...snap.data() });
    };
    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      await deleteDoc(doc(db, "contacts", id));
      navigate("/");
    }
  };

  if (!contact) return <p>Loading...</p>;

  return (
    <div className="card shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
      <div className="card-body">
        <h2 className="card-title fw-bold mb-3">
          {contact.firstName} {contact.lastName}
        </h2>
        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item"><strong>Email:</strong> {contact.email}</li>
          {contact.phone && <li className="list-group-item"><strong>Phone:</strong> {contact.phone}</li>}
          {contact.address && <li className="list-group-item"><strong>Address:</strong> {contact.address}</li>}
          {contact.notes && <li className="list-group-item"><strong>Notes:</strong> {contact.notes}</li>}
        </ul>
        <div className="d-flex gap-2">
          <Link to={`/edit/${id}`} className="btn btn-primary">Edit</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
          <Link to="/" className="btn btn-secondary ms-auto">← Back</Link>
        </div>
      </div>
    </div>
  );
}