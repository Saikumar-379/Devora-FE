import Body from "./Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>

      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
