import Navbar from "./components/nav/navbar";
import Footer from './components/footer/footer'
import { BrowserRouter } from "react-router-dom";
import Content from "./components/content";

function App() {
  return (
    <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <div className="flex-grow">
        <Content/>
      </div>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
