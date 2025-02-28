import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Layout from "./Layout/Layout";
import Search from "./pages/AdvancedSearch";
import ObjectDetails from "./pages/ObjectDetails";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/objects/:objectId" element={<ObjectDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
