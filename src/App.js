import "./App.css";
import Navbar from "./Components/Navbar";
import Contacts from "./Components/contact/Contacts";
import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AddContact, Contact, EditContact, ViewContact } from "./Components";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast } from "react-toastify";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getAllGroups,
  updateContact,
} from "./services/ContactServices";
import {
  COMMENT,
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
} from "./helpers/colors";
import { ContactContext } from "./context/contactContext";
import { contactSchema } from "./Validations/ContactValidation";
import { useImmer } from "use-immer";

function App() {
  const [contacts, setContacts] = useImmer([]);
  const [loading, setLoading] = useImmer(false);
  const [groups, setGroups] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      setLoading(true);

      const { data: contactsData } = await getAllContacts();
      const { data: groupsData } = await getAllGroups();
      setContacts(contactsData);
      setFilteredContacts(contactsData);
      setGroups(groupsData);

      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const createContactForm = async (values) => {
    try {
      setLoading(true);
      const { status, data } = await createContact(values);

      console.log(status);
      if (status === 201) {
        toast.success("مخاطب با موفقیت ساخته شد", { icon: "🚀" });
        setContacts((draft) => {
          draft.push(data);
        });
        setFilteredContacts((draft) => {
          draft.push(data);
        });

        setLoading((prevLoding) => !prevLoding);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4">
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}>
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}>
              انصراف
            </button>
          </div>
        );
      },
    });
  };
  const removeContact = async (contactId) => {
    let prevContacts = [...contacts];
    try {
      setLoading(true);
      setContacts((draft) => draft.filter((c) => c.id !== contactId));
      setFilteredContacts((draft) => draft.filter((c) => c.id !== contactId));

      const response = await deleteContact(contactId);
      toast.error("مخاطب با موفقیت حذف شد", { icon: "💣" });
      if (response !== 200) {
        const { data: contactsData } = await getAllContacts();

        setContacts(contactsData);
        setLoading(false);
      }
    } catch (err) {
      setFilteredContacts(prevContacts);
      setContacts(prevContacts);
      console.log(err.message);
      setLoading(false);
    }
  };
  const updatedContact = async (values, contactId) => {
    const contactsState = contacts;
    try {
      let allContact = [...contacts];
      let id = allContact.findIndex(
        (contact) => contact.id === parseInt(contactId)
      );
      setLoading(true);
      allContact[id] = values;

      setContacts(allContact);
      setFilteredContacts(allContact);
      const { data } = await updateContact(values, contactId);

      console.log(data);
      if (data) {
        setLoading(false);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
      setContacts(contactsState);
      setFilteredContacts(contactsState);
      setLoading(false);
    }
  };

  let filterTimeOut;
  const contactSearch = (query) => {
    if (!query) return setFilteredContacts([...contacts]);

    clearTimeout(filterTimeOut);
    filterTimeOut = setTimeout(() => {
        setFilteredContacts((draft) =>
        draft.filter((contact) => {
          return contact.fullname.toLowerCase().includes(query.toLowerCase());
        })
      );
    }, 1000);

  
  };
  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contacts,
        filteredContacts,
        groups,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
        updatedContact,
        setContacts,
        setFilteredContacts,
      }}>
      <div className="App">
      <ToastContainer rtl={true} position="top-right" theme="colored" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contact/:contactId" element={<ViewContact />} />
          <Route
            path="/contacts/edit/:contactId"
            element={
              <EditContact loading={loading} updateContact={updateContact} />
            }
          />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
}

export default App;
