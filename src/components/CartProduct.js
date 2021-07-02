import styled from "styled-components";
import { useContext, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import formatNumber from "../functions/formatNumber";

export default function CartProduct(props) {
    const { id, productId, productName, image, brief, price, inventory } =
        props.product;
    const [newQuantity, setNewQuantity] = useState(props.product.quantity);
    const { user } = useContext(UserContext);
    const getCartProducts = props.getCartProducts;
    let config;
    if (user) {
        config = { headers: { Authorization: `Bearer ${user.token}` } };
    }

    function deleteFromCart() {
        const deleteRequest = axios.delete(
            `http://localhost:4000/cart?id=${id}`,
            config
        );

        deleteRequest.then((response) => {
            toast.success("Deleted!");
            getCartProducts();
        });

        deleteRequest.catch((error) => {
            toast.error("Your request failed, please try again.");
        });
    }

    function updateOrders(e) {
        setNewQuantity(e.target.value);

        const body = { productId, quantity: parseInt(e.target.value) };
        const updateQuantityRequest = axios.put(
            "http://localhost:4000/cart",
            body,
            config
        );

        updateQuantityRequest.then((response) => {
            toast.success("Quantity updated!");
            getCartProducts();
        });

        updateQuantityRequest.catch((error) => {
            toast.error("Your request failed, please try again.");
        });
    }

    return (
        <Container>
            <Toaster />
            <div className="product-info">
                <Picture src={image} alt={brief} />
                <DescriptionAndQuantity>
                    <h1>{productName}</h1>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="number"
                            min="1"
                            max={inventory}
                            onChange={(e) => updateOrders(e)}
                            value={newQuantity}
                        />
                    </form>
                </DescriptionAndQuantity>
            </div>
            <Price>R$ {formatNumber(newQuantity * price)}</Price>
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
    background-color: #ffffff;
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
