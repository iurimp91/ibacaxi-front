import styled from "styled-components";

export default function Product({ product }) {
    const { id, name, image, price, brief } = product;
    const formatedPrice = formatNumber(price);

    function formatNumber(int) {
        const str = String(int).padStart(3, "0");
        const formattedNumber = `
        ${str.slice(0, str.length - 2)},${str.slice(-2)}`;
        return formattedNumber;
    }

    return (
        <ProductBox>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{brief}</p>
            <Price>{formatedPrice}</Price>
        </ProductBox>
    );
}
const ProductBox = styled.div`
    position: relative;
    background-color: #cccccc;
    margin: 5px;
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
    }
`;
const Price = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
`;
