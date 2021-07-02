import styled from "styled-components";
import CartProduct from "./CartProduct";
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import formatNumber from "../functions/formatNumber";

export default function CartPage() {
    const { user } = useContext(UserContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const history = useHistory();
    const localUser = JSON.parse(localStorage.getItem("user"));
    let config;
    if (user) {
        config = { headers: { Authorization: `Bearer ${user.token}` } };
    }
    useEffect(() => {
        if (user) {
            getCartProducts();
            return;
        }
        if (!localUser) {
            history.push("/sign-in?next=/cart");
        }
        // eslint-disable-next-line
    }, [user]);

    function getCartProducts() {
        const cartRequest = axios.get("http://localhost:4000/cart", config);

        cartRequest.then((response) => {
            setCartProducts(response.data.products);
            setTotalPrice(response.data.total);
        });

        cartRequest.catch((error) => {
            alert("Error!");
        });
    }

    return (
        <Container empty={cartProducts.length}>
            <div className="products">
                {cartProducts.length === 0 ? (
                    <span>
                        Your cart is empty.
                        <br />
                        <Link to="/">Start to fill it now.</Link>
                    </span>
                ) : (
                    <ProductsList>
                        {cartProducts.map((product) => (
                            <CartProduct
                                product={product}
                                getCartProducts={getCartProducts}
                                key={product.id}
                            />
                        ))}
                    </ProductsList>
                )}
            </div>
            <Footer empty={cartProducts.length}>
                <div className="total-price">
                    <h1>TOTAL</h1>
                    <h2>R$ {formatNumber(totalPrice)}</h2>
                </div>
                <button onClick={() => history.push("/checkout")}>Checkout</button>
            </Footer>
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    background-color: #e1e5ea;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${(props) =>
        props.empty === 0 ? "center" : "flex-start"};
    text-align: center;
    padding-top: 140px;
    padding-bottom: 70px;

    @media (min-width: 670px) {
        padding-top: 100px;
        flex-direction: initial;
        align-items: ${(props) =>
            props.empty === 0 ? "center" : "flex-start"};
    }

    span {
        font-size: 20px;
        line-height: 30px;
    }

    .products {
        width: 100%;

        @media (min-width: 670px) {
            width: 50%;
        }
    }
`;

const ProductsList = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 80px;

    @media (min-width: 670px) {
        padding-bottom: 10px;
    }
`;

const Footer = styled.footer`
    width: 100%;
    height: 70px;
    display: ${(props) =>
        props.empty === 0 ? "none" : "flex"};
    justify-content: space-between;
    align-items: center;
    background-color: #da7f8f;
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 10px;

    @media (min-width: 670px) {
        width: 46%;
        height: 82%;
        margin-left: 20px;
        top: 100px;
        right: 15px;
        border-radius: 5px;
        flex-direction: column;
        justify-content: space-evenly;
    }

    h1 {
        margin-bottom: 10px;
    }

    .total-price {
        font-weight: 700;
        color: #FFFFFF;

        @media (min-width: 670px) {
            font-size: 30px;
        }
        
    }

    button {
        width: 120px;
        height: 40px;
        border-radius: 5px;
        border: none;
        background-color: #FFFFFF;
        font-size: 15px;
        font-weight: 700;
        color: #da7f8f;

        @media (min-width: 670px) {
            width: 200px;
            height: 80px;
            font-size: 25px;
        }
    }

    button:hover {
        opacity: 0.8;
    }
`;
