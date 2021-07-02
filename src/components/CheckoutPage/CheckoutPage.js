import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import formatNumber from "../../functions/formatNumber";
import toast, { Toaster } from "react-hot-toast";

export default function CheckoutPage() {
    const { user } = useContext(UserContext);
    const history = useHistory();
    const localUser = JSON.parse(localStorage.getItem("user"));
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState("");

    useEffect(() => {
        getCartProducts();
    }, []);

    function getCartProducts() {
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token || user.token}`,
            },
        };
        const cartRequest = axios.get("http://localhost:4000/cart", config);
        cartRequest.then((response) => {
            setCartProducts(response.data.products);
            setTotalPrice(response.data.total);
        });
        cartRequest.catch((error) => {
            alert("Error!");
        });
    }
    console.log(cartProducts, totalPrice);

    return (
        <Container>
            <Title>Your cart</Title>
            <Line />
            {cartProducts.map((p) => {
                return (
                    <div key={p.id}>
                        {p.productName}, {p.quantity}, R${" "}
                        {formatNumber(p.price)}
                    </div>
                );
            })}
            <Line />
            <Title>Billing details</Title>
            Name
            <input></input>
            Address
            <input></input>
            CC
            <input></input>
            <div>
                Expiration
                <input></input>
                CVV
                <input></input>
            </div>
            <Line />
            <div className="price-quantity">R$ {formatNumber()}</div>
            <button className="cart"> </button>
            <button className="buy">Buy now</button>
        </Container>
    );
}
const Container = styled.div`
    color: #3a4242;
    background-color: #e1e5ea;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: #969696;
`;

const Right = styled.div`
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
    .price-quantity {
        display: flex;
        justify-content: space-between;
    }
`;
const Left = styled.div`
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
