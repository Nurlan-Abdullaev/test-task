import { styled } from "@mui/material";
import { useEffect, useState } from "react";

export const Comments = () => {
  const [data, setData] = useState([]);

  const fetchComments = async () => {
    try {
      const url = "http://o-complex.com:1337/reviews";
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Container>
      {data.map((el, index) => (
        <Card className="Card" key={`${el.id}_${index}`}>
          <p>{el.id}</p>
          <p>{el.text}</p>
        </Card>
      ))}
    </Container>
  );
};

const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  grid-template-columns: repeat(2fr);
  gap: 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  @media screen and (max-width: 360px) {
    flex-direction: column;
    .Card {
      width: 300px;
      height: 200px;
    }
  }
`;

const Card = styled("div")`
  background: #d9d9d9;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 15rem;
  height: 20rem;
`;
