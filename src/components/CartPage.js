import styled from "styled-components";
import CartProduct from "./CartProduct";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

export default function CartPage() {
    const { user } = useContext(UserContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const localUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getCartProducts();
        // eslint-disable-next-line
    }, []);

    function getCartProducts() {
        const config = { headers: { Authorization: `Bearer ${localUser.token || user.token}` } }

        const cartRequest = axios.get("http://localhost:4000/cart", config);

        cartRequest.then((response) => {
            setCartProducts(response.data);
        });

        cartRequest.catch((error) => {
            alert("Error!");
        });
    }

    useEffect(() => {
        let total = 0;
        cartProducts?.forEach((item) => {
            total += item.price * item.quantity;
        });
        setTotalPrice(total);
    }, [cartProducts]);

    return(
        <Container empty={cartProducts.length}>
            {
                cartProducts.length === 0
                ? 
                    <span>
                        Your cart is empty.<br/>
                        <Link to="/">Start to fill it now.</Link>
                    </span>
                : 
                    <ProductsList>
                        {
                            cartProducts.map((product, i) =>
                                <CartProduct
                                    product={product}
                                    getCartProducts={getCartProducts}
                                    key={i}
                                />
                            )
                        }
                    </ProductsList>
            }
            <Footer>
                <div className="total-price">
                    <h1>TOTAL</h1>
                    <h2>R$ {(totalPrice/100).toFixed(2).replace(".",",").replace("-","")}</h2>
                </div>
                <button>Checkout</button>
            </Footer>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #E1E5EA;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${props => props.empty === 0 ? "center" : "flex-start"};
    text-align: center;

    span {
        font-size: 20px;
        line-height: 30px;
    }
`;

const ProductsList = styled.ul`
    width:100%;
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