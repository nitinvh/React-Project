import ViewDetails from "./components/viewDetails";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UpdateForm from "./components/updateForm";
import LoginPage from "./components/loginPage";
import SignupPage from "./components/signupPage";
import AddDetails from "./components/addDetails";
import UserProfile from "./components/userProfile";
import UPassword from "./components/uPassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/home" element={<ViewDetails />}></Route>
          <Route path="/adddetails" element={ <AddDetails />}></Route>
          <Route path="/userprofile" element={ <UserProfile />}></Route>
          <Route path="/upassword" element={ <UPassword />}></Route>
          <Route path="/form/:id/:fname/:email/:role" element={<UpdateForm />} exact></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
