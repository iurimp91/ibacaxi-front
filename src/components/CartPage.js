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
            <Footer>
                <div className="total-price">
                    <h1>TOTAL</h1>
                    <h2>R$ {formatNumber(totalPrice)}</h2>
                </div>
                <button>Checkout</button>
            </Footer>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #e1e5ea;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${(props) =>
        props.empty === 0 ? "center" : "flex-start"};
    text-align: center;

    span {
        font-size: 20px;
        line-height: 30px;
    }
`;

const ProductsList = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Footer = styled.footer`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: red;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px;

    h1 {
        margin-bottom: 10px;
    }
`;
