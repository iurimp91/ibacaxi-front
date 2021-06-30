import { Link } from "react-router-dom";
import styled from "styled-components";
import formatNumber from "../../functions/formatNumber";

export default function Product({ product }) {
    const { id, name, image, price, brief } = product;
    const formatedPrice = formatNumber(price);

    return (
        <ProductBox>
            <Link to={`/product/${id}`}>
                <img src={image} alt={name} />
                <h3>{name}</h3>
                <p>{brief}</p>
                <Price>R$ {formatedPrice}</Price>
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
    position: absolute;
    bottom: 5px;
    right: 5px;
`;
