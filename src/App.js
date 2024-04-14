import { styled } from "@mui/material";
import { Products } from "./components/Products";
import { Description } from "./components/Description";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Container>
        <Link to="/"></Link>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/:id" element={<Description />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
const Container = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
