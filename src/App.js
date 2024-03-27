import Header from "./Components/Header";
import Footer from "./Components/Footer";
import './bootstrap.min.css';
import HomeScreen from "./screens/HomeScreen";
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import LoginScreen from "../src/screens/loginScreen";
import RegisterScreen from "../src/screens/RegisterScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProfileScreen from "../src/screens/ProfileScreen";
import ProductListScreen from "../src/screens/ProductListScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
        <Routes>
          <Route path='/' element={<HomeScreen/>} exact/>
          <Route path='/product/:id' element={<ProductScreen/>} />
          <Route path='/shipping' element={<ShippingScreen/>} />
          <Route path='/placeorder' element={<PlaceOrderScreen/>} />
          <Route path='/order/:id' element={<OrderScreen/>} />
          <Route path='/login' element={<LoginScreen/>} />
          <Route path='/register' element={<RegisterScreen/>} />
          <Route path='/profile' element={<ProfileScreen/>} />
          <Route path='/payment' element={<PaymentScreen/>} />
          <Route path='/cart/:id?' element={<CartScreen/>} />

          <Route path='/admin/userlist' element={<UserListScreen/>} />
          <Route path='/admin/productlist' element={<ProductListScreen/>} />
          <Route path='/admin/user/:id/edit' element={<UserEditScreen/>} />
        </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
