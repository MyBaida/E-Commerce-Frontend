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
import LoginScreen from "../src/screens/loginScreen";
import RegisterScreen from "../src/screens/RegisterScreen";

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
          <Route path='/login' element={<LoginScreen/>} />
          <Route path='/register' element={<RegisterScreen/>} />
          <Route path='/payment' element={<PaymentScreen/>} />
          <Route path='/cart/:id?' element={<CartScreen/>} />
        </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
