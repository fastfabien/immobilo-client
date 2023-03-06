import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
// import Footer from "./components/Footer";
import Header from "./components/Layout";
import Home from "./pages/User/Home";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import Welcome from "./pages/User/Welcome";
import Dashboard from "./pages/User/Dashboard/Dashboard";
import Proprietes from "./pages/User/Dashboard/Propriete";
import Propriete from "./pages/User/Dashboard/proprieteView";
import MyPropriete from "./pages/User/Dashboard/MyPropriete"
import MarketPlaces from "./pages/User/Dashboard/MarketPlaces"
import MySales from "./pages/User/Dashboard/MySales"
import UserInformation from "./pages/User/UserInformation";
import Admin from "./pages/Admin/Admin";
import NewAdmin from "./pages/Admin/NewAdmin.admin";
import ProprieteAdmin from "./pages/Admin/proprietes.admin";
import NewProprieteAdmin from "./pages/Admin/newPropriete.admin";
import UserDashboard from "./pages/Admin/User.admin";
import GlobalStyle from "./styles/GlobalStyle";
import { light } from "./styles/Themes";
import { GoogleOAuthProvider} from '@react-oauth/google';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const initialOptions = {
  "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: "EUR",
  intent: "capture"
};


function App() {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={light}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Routes>
          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confirm/:confirmationCode" element={<Welcome />} />
          {/* DASHBOARD ROUTES */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/proprietes" element={<Proprietes />} />
          <Route path="/mes-proprietes" element={<MyPropriete />} />
          <Route path="/mes-ventes" element={<MySales />} />
          <Route path="/market" element={<MarketPlaces />} />
          <Route path="/information" element={<UserInformation />} />
          <Route path="/proprietes/:id" element={<Propriete />} />
          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/new" element={<NewAdmin />} />
          <Route path="/admin/user/:id" element={<UserDashboard />} />
          <Route path="/admin/proprietes" element={<ProprieteAdmin />} />
          <Route path="/admin/proprietes/new" element={<NewProprieteAdmin />} />
        </Routes>
        {/* <Footer /> */}
        </PayPalScriptProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
