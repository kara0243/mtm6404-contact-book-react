import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../db";
import { Link } from "react-router-dom";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const q = query(collection(db, "contacts"), orderBy("lastName"));
      const snapshot = await getDocs(q);
      setContacts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchContacts();
  }, []);

  const filtered = contacts.filter(c =>
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4 fw-bold">All Contacts</h2>
      <input
        className="form-control mb-4"
        placeholder="🔍 Search by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="list-group">
        {filtered.map(c => (
          <Link
            key={c.id}
            to={`/contacts/${c.id}`}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            <span>
              <strong>{c.lastName}</strong>, {c.firstName}
            </span>
            <span className="text-muted small">{c.email}</span>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="text-muted text-center mt-3">No contacts found.</p>
        )}
      </div>
    </div>
  );
}