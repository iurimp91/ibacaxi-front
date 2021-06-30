import styled from "styled-components";
import { useState } from "react";

export default function CartProduct(props) {
    const { id, name, category, image, quantity, brief, description, price } = props.product;
    const [qty, setQty] = useState(1);

    return(
        <Container>
            <div className="product-info">
                <Picture src={image} alt={brief} />
                <DescriptionAndQuantity>
                    <h1>{brief}</h1>
                    <form onSubmit={e => e.preventDefault()}>
                        <input type="number" id="number" min="1" max={quantity} onChange={e => setQty(e.target.value)} value={qty} />
                    </form>
                </DescriptionAndQuantity>
            </div>
            <Price>R$ {(price/100).toFixed(2).replace(".",",").replace("-","")}</Price>
        </Container>
    );
}

const Container = styled.li`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    background-color: #FFFFFF;
    margin-bottom: 10px;
    padding: 10px;

    .product-info {
        height: 100%;
        display: flex;
    }
`;

const Picture = styled.img`
    width: 50px;
    height: 50px;
    border: 1px solid #000000;
    border-radius: 5px;
`;

const DescriptionAndQuantity = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin-left: 10px;

    h1 {
        font-size: 15px;
    }
`;

const Price = styled.div`

`;