import { TextField, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Description = () => {
  const [productset, setProductset] = useState([]);
  const [counter, setCounter] = useState(0);
  const [totalPrice1, setTotalPrice1] = useState(0);
  const [totalPrice2, setTotalPrice2] = useState(0);
  const goBackNavigate = useNavigate();
  const { id } = useParams();

  const fetchProducts = async () => {
    try {
      const url = "http://o-complex.com:1337/products?page=1&page_size=20";
      const response = await fetch(url);
      const result = await response.json();
      setProductset(result.products);
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (productset.length > 0) {
      const selectedProduct = productset.find(
        (product) => product.id === parseInt(id)
      );
      if (selectedProduct) {
        setTotalPrice1(selectedProduct.price * counter);
      }
    }
  }, [counter, id, productset]);

  useEffect(() => {
    if (productset.length > 0) {
      const selectedProduct = productset.find(
        (product) => product.id === parseInt(id)
      );
      if (selectedProduct) {
        setTotalPrice2(selectedProduct.price);
      }
    }
  }, [id, productset]);

  const incrementCount = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const decrementCount = () => {
    if (counter > 0) {
      setCounter((prevCounter) => prevCounter - 1);
    }
  };

  const back = () => {
    goBackNavigate(-1);
  };

  const handleOrder = async () => {
    try {
      const url = "http://o-complex.com:1337/order";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: parseInt(id),
          quantity: counter,
          totalPrice2: counter,
        }),
      });
      if (response.ok) {
      } else {
        throw new Error("Ошибка при выполнении заказа");
      }
    } catch (error) {
      console.error("Произошла ошибка при выполнении заказа:", error);
    }
  };

  return (
    <Main>
      <OrderContainer className="OrderContainer">
        <h1>Добавленные товары</h1>
        <div>
          <p style={{ color: "#fff" }}>товар {counter}</p>
          <button>X</button>
          <button>{totalPrice1}</button>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="телефон номер"
            variant="outlined"
            placeholder="+7"
          />
          <button
            style={{
              background: "#222222",
              color: "#fff",
              borderRadius: "1rem",
              width: "5rem",
              height: "3rem",
              borderBottom: "none",
            }}
            onClick={handleOrder}
          >
            заказать
          </button>
        </div>
      </OrderContainer>
      <Container className="Container">
        {productset.length > 0 && (
          <MiniContainer>
            <MiniMiniContainer className="MiniMiniContainer2">
              <img
                src={productset[id - 1].image_url}
                alt={productset[id - 1].title}
              />
              <p>товар {productset[id - 1].id}</p>
              <div>
                <p style={{ marginTop: "-1rem" }}>{productset[id - 1].title}</p>
                <p style={{ marginTop: "-1rem" }}>
                  {productset[id - 1].description}
                </p>
              </div>
              <p>цена: {totalPrice2}₽</p>
              <ButtonContainer>
                <button onClick={decrementCount}>-</button>
                <button>{counter}</button>
                <button onClick={incrementCount}>+</button>
                <button onClick={back}>возвращаться</button>
              </ButtonContainer>
            </MiniMiniContainer>
          </MiniContainer>
        )}
      </Container>
    </Main>
  );
};
const Main = styled("div")`
  @media screen and (max-width: 360px) {
    .OrderContainer {
      width: 20rem;
      height: 20rem;
    }
    .MiniMiniContainer2 {
      width: 20rem;
      height: 100%;
      img {
        margin-top: 1rem;
        width: 10rem;
        height: 10rem;
        border-radius: 1rem;
      }
    }
  }
`;

const OrderContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #777777;
  border-radius: 1rem;
  margin-bottom: 1rem;
  width: 50rem;
  height: 15rem;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
`;

const Container = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const MiniContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 50rem;
  height: 40rem;
  img {
    margin-top: 1rem;
    width: 15rem;
    height: 15rem;
    border-radius: 1rem;
  }
`;

const ButtonContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 20rem;
  height: 10rem;
  button {
    background: #222222;
    color: #fff;
    border-radius: 1rem;
    width: 100%;
    height: 3rem;
  }
`;
