import { Route, Routes } from "react-router-dom";
import CartComp from "./cart/CartComp";
import Singleproducts from "./product/[productId]/singleproducts";
import Home from "./components/Home";
import Content from "./components/content";
function App() {
  return (
    <>    
    <Home>
      <Routes>
        <Route path="/" element={<Content/>}/>
        <Route path="/cart" element={<CartComp/>}/>
        <Route path="/product/:id" element={<Singleproducts/>}/>
    </Routes>
    </Home>
    </>
  );
}

export default App;
