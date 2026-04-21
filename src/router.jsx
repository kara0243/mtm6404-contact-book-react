import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ContactList from "./pages/ContactList";
import ContactDetail from "./pages/ContactDetail";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ContactList /> },
      { path: "contacts/:id", element: <ContactDetail /> },
      { path: "add", element: <AddContact /> },
      { path: "edit/:id", element: <EditContact /> },
    ],
  },
]);

export default router;