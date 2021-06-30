import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import formatNumber from "../../functions/formatNumber";

export default function ProductPage() {
    const [product, setProduct] = useState(false);
    let { id } = useParams();
    useEffect(() => {
        const productRequest = axios.get(`http://localhost:4000/product/${id}`);
        productRequest.then((respose) => {
            setProduct(respose.data);
        });
        productRequest.catch((error) => alert(error.response.status));
        console.log(product);
    }, [id]);

    return (
        <Container>
            <ProductImage>
                <img src={product.image} alt={product.name} />
            </ProductImage>
            <ProductContainer>
                <Title>{product.name}</Title>
                <Line />
                <Price>R$ {formatNumber(product.price)}</Price>
                <button className="cart">Add to cart</button>
                <button className="buy">Buy now</button>
                <Description>{product.description}</Description>
            </ProductContainer>
        </Container>
    );
}
const Container = styled.div`
    color: #3a4242;
    background-color: #e1e5ea;
    height: 100%;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;

    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: #969696;
`;

const ProductContainer = styled.div`
    padding: 0px 10px;
    min-width: 400px;
    @media (max-width: 700px) {
        min-width: 320px;
    }
    * {
        margin-bottom: 10px;
    }
    button {
        font-family: Comfortaa;
        border-radius: 15px;
        height: 45px;
        width: 200px;
        font-size: 25px;
        margin-right: 10px;
        border: none;
        transition: 0.2s;
        &:hover {
            filter: brightness(0.8);
        }
        &.buy {
            border: 5px solid #da7f8f;
            background-color: #da7f8f;
            color: white;
        }
        &.cart {
            border: 5px solid #da7f8f;
            background-color: white;
            color: #da7f8f;
        }
    }
`;
const ProductImage = styled.div`
    width: 100%;
    max-width: 500px;
    margin: 0px auto 10px;
    display: flex;
    flex-direction: column;
    img {
        width: 100%;
    }
`;

const Price = styled.p`
    font-weight: bold;
    font-size: 30px;
`;

const Title = styled.p`
    font-weight: bold;
    font-size: 30px;
`;

const Description = styled.p`
    font-size: 24px;
`;
