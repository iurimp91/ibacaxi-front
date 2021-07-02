import styled from "styled-components";
import { useContext, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import formatNumber from "../functions/formatNumber";
import { useHistory } from "react-router-dom";

export default function CartProduct(props) {
    const { id, productId, productName, image, brief, price, inventory } =
        props.product;
    const [newQuantity, setNewQuantity] = useState(props.product.quantity);
    const { user } = useContext(UserContext);
    const getCartProducts = props.getCartProducts;
    const history = useHistory()
    let config;
    if (user) {
        config = { headers: { Authorization: `Bearer ${user.token}` } };
    }

    function deleteFromCart() {
        const deleteRequest = axios.delete(
            `${process.env.REACT_APP_API_URL}/cart?id=${id}`,
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
            `${process.env.REACT_APP_API_URL}/cart`,
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
                <Picture
                    src={image}
                    alt={brief}
                    onClick={() => history.push(`/product/${productId}`)}
                />
                <DescriptionAndQuantity>
                    <h1 onClick={() => history.push(`/product/${productId}`)}>
                        {productName}
                    </h1>
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
            <Price>R$<br/>{formatNumber(newQuantity * price)}</Price>
            <BsFillTrashFill className="trash-icon" onClick={deleteFromCart} />
        </Container>
    );
}

const Container = styled.li`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    background-color: #ffffff;
    margin-bottom: 10px;
    padding: 10px;
    position: relative;

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
    cursor: pointer;
`;

const DescriptionAndQuantity = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin-left: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    h1 {
        font-size: 15px;
        cursor: pointer;
        font-weight: 700;
    }

    input {
        width: 40px;
        margin-top: 14px;
    }
`;

const Price = styled.div`
    font-size: 15px;
    line-height: 20px;
    margin-right: 10px;
`;
