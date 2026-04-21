import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <nav className="navbar navbar-dark bg-dark px-4">
        <Link to="/" className="navbar-brand fw-bold fs-4">
          Contact Book
        </Link>
        <Link to="/add" className="btn btn-success btn-sm">
          + Add Contact
        </Link>
      </nav>

      <main className="container py-4">
        <Outlet />
      </main>
    </div>
  );
}