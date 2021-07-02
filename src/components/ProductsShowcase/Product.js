import { Link } from "react-router-dom";
import styled from "styled-components";
import formatNumber from "../../functions/formatNumber";

export default function Product({ product }) {
    const { id, name, image, price, brief, quantity } = product;
    const formatedPrice = formatNumber(price);

    return (
        <ProductBox>
            <Link to={`/product/${id}`}>
                <img src={image} alt={name} />
                <h3>{name}</h3>
                <p>{brief}</p>
                <Price>
                    {
                        quantity !== 0
                        ? ""
                        : <span>Out of stock!</span> 
                    }
                    R$ {formatedPrice}
                </Price>
            </Link>
        </ProductBox>
    );
}
const ProductBox = styled.div`
    cursor: pointer;
    position: relative;
    background-color: #cccccc;
    margin: 10px;
    width: 300px;
    height: 400px;
    border: 1px solid black;
    overflow: hidden;
    padding: 5px;

    @media (max-width: 670px) {
        height: 400px;
    }
    
    @media (max-width: 320px) {
        height: 350px;
    }

    img {
        width: 100%;
    }
    h3 {
        font-size: 24px;
        margin: 5px 0px;
    }
    a {
        color: #000;
    }
`;
const Price = styled.div`
    width: 96%;
    position: absolute;
    bottom: 5px;
    right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;

    span {
        font-size: 15px;
        font-weight: 700;
        color: red;
    }
`;
