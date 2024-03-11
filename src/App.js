import Header from "./Components/Header";
import Footer from "./Components/Footer";
import './bootstrap.min.css';
import HomeScreen from "./screens/HomeScreen";
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
        <Routes>
          <Route path='/' element={<HomeScreen/>} exact/>
          <Route path='/product/:id' element={<ProductScreen/>} />
          <Route path='/cart/:id?' element={<CartScreen/>} />
        </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
