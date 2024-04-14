import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Comments } from "../Comments";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      const url = "http://o-complex.com:1337/products?page=1&page_size=20";
      const response = await fetch(url);
      const result = await response.json();
      setProducts(result.products);
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const goToDescription = (productId) => {
    navigate(`/${productId}`);
  };

  return (
    <>
      <Container>
        <h1>тестовое задание</h1>
        <Comments />
        <RowContainer>
          {products.map((el) => (
            <MiniContainer key={el.id}>
              <MiniMiniContainer className="MiniMiniContainer">
                <img src={el.image_url} alt={el.title} />
                <p>{el.title}</p>
                <button
                  style={{
                    background: "#222222",
                    color: "#fff",
                    borderRadius: "1rem",
                    width: "5rem",
                    height: "3rem",
                    marginBottom: "1rem",
                  }}
                  onClick={() => goToDescription(el.id)}
                >
                  купить
                </button>
              </MiniMiniContainer>
            </MiniContainer>
          ))}
        </RowContainer>
      </Container>
    </>
  );
};
const Container = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #777777;
    color: #fff;
    border-radius: 1rem;
    width: 50rem;
    height: 5rem;
  }
  img {
    margin-top: 1rem;
    width: 17rem;
    height: 22rem;
    border-radius: 1rem;
  }
  @media screen and (max-width: 360px) {
    h1 {
      width: 330px;
      height: 108px;
    }
    img {
      width: 200px;
      height: 200px;
      margin-top: 1rem;
      border-radius: 1rem;
    }

    .MiniMiniContainer {
      width: 21em;
      height: 100%;
      margin-right: 3rem;
    }
  }
`;
const RowContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
const MiniContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 calc(33.33% - 2rem);
  margin-bottom: 2rem;
`;
const MiniMiniContainer = styled("div")`
  background: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border-radius: 1rem;
  margin-left: 3rem;
  width: 25rem;
  height: 100%;

  p {
    text-decoration: none;
    color: #000000;
  }
`;
