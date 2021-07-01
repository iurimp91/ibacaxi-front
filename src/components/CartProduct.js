import styled from "styled-components";
import { useContext, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import UserContext from "../contexts/UserContext";
import axios from "axios";

export default function CartProduct(props) {
    console.log(props);
    const { productId, productName, image, brief, price, inventory } = props.product;
    const [newQuantity, setNewQuantity] = useState(props.product.quantity);
    const { user } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));

    console.log(props)

    function deleteFromCart() {
        alert("Em breve você poderá deletar do carrinho clicando aqui!");
    }

    function updateOrders(e) {
        setNewQuantity(e.target.value);
        console.log(e.target.value);

        const config = { headers: { Authorization: `Bearer ${localUser.token || user.token}` } }
        const body = { productId, quantity: parseInt(e.target.value) };
        const updateQuantityRequest = axios.put("http://localhost:4000/cart", body, config);

        updateQuantityRequest.then((response) => {
            alert("Ok!");
        });

        updateQuantityRequest.catch((error) => {
            alert("Error");
        });
    }

    return(
        <Container>
            <div className="product-info">
                <Picture src={image} alt={brief} />
                <DescriptionAndQuantity>
                    <h1>{productName}</h1>
                    <form onSubmit={e => e.preventDefault()}>
                        <input type="number" id="number" min="1" max={inventory} onChange={e => updateOrders(e)} value={newQuantity} />
                    </form>
                </DescriptionAndQuantity>
            </div>
            <Price>R$ {(newQuantity*price/100).toFixed(2).replace(".",",").replace("-","")}</Price>
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