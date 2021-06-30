import styled from "styled-components";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";

export default function CartProduct(props) {
    const { id, name, category, image, quantity, brief, description, price } = props.product;
    const [qty, setQty] = useState(1);

    function deleteFromCart() {
        alert("Em breve você poderá deletar do carrinho clicando aqui!");
    }

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
            <Price>R$ {(qty*price/100).toFixed(2).replace(".",",").replace("-","")}</Price>
            <BsFillTrashFill className="trash-icon" onClick={deleteFromCart} />
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
    position: relative;
    background-color: blue;

    .product-info {
        width: 75%;
        height: 100%;
        display: flex;
    }

    .trash-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
    }
`;

const Picture = styled.img`
    width: 50px;
    height: 50px;
    border: 1px solid #000000;
    border-radius: 5px;
`;

const DescriptionAndQuantity = styled.div`
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin-left: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    background-color: red;

    h1 {
        font-size: 15px;
    }

    input {
        width: 40px;
    }
`;

const Price = styled.div`
    font-size: 15px;
    background: green;
`;