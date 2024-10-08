import { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import HootList from "./components/HootList/HootList";
import HootDetails from "./components/HootDetails/HootDetails";
import HootForm from "./components/HootForm/HootForm";

import * as authService from "../src/services/authService"; // import the authservice
import * as hootService from "../src/services/hootService";

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [hoots, setHoots] = useState([]);

  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  async function handleAddHoot(hootFormData) {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    navigate("/hoots");
  }

  async function handleDeleteHoot(hootId) {
    const response = await hootService.deleteHoot(hootId);
    setHoots(hoots.filter((hoot) => hoot._id != hootId));
    navigate("/hoots");
  }

  async function handleUpdateHoot(hootId, hootFormData) {
    const updatedHoot = await hootService.update(hootId, hootFormData);
    setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));
    navigate(`/hoots/${hootId}`);
  }

  useEffect(() => {
    async function fetchAllHoot() {
      const hootData = await hootService.index();
      setHoots(hootData);
    }
    // check if we are logged in before we fetch!
    if (user) {
      fetchAllHoot();
    }
  }, [user]); // run the useEffect on page load, or when the user variable changes

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            // Protected Routes
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/hoots" element={<HootList hoots={hoots} />} />
              <Route
                path="/hoots/new"
                element={<HootForm handleAddHoot={handleAddHoot} />}
              />
              <Route
                path="/hoots/:hootId"
                element={<HootDetails handleDeleteHoot={handleDeleteHoot} />}
              />
              <Route
                path="/hoots/:hootId/edit"
                element={<HootForm handleUpdateHoot={handleUpdateHoot} />}
              />
            </>
          ) : (
            // Not Logged In Routes!
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
