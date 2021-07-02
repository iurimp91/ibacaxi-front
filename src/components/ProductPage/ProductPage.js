import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import formatNumber from "../../functions/formatNumber";
import toast, { Toaster } from "react-hot-toast";

export default function ProductPage() {
    const [product, setProduct] = useState(false);
    let { id } = useParams();
    const [orderQuantity, setOrderQuantity] = useState(1);
    const { user } = useContext(UserContext);
    const history = useHistory();
    const localUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const productRequest = axios.get(`http://localhost:4000/product/${id}`);
        productRequest.then((respose) => {
            setProduct(respose.data);
            console.log(respose.data);
        });
        productRequest.catch((error) => alert(error.response.status));
    }, [id]);

    function addToCart(goCart) {
        if (!user && !localUser) {
            toast("Please, log in before adding to cart.");
            return history.push(`/sign-in?next=/product/${id}`);
        }
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token || user.token}`,
            },
        };
        const body = {
            userId: localUser.id || user.id,
            productId: product.id,
            quantity: parseInt(orderQuantity),
        };
        const addCartRequest = axios.post(
            "http://localhost:4000/cart",
            body,
            config
        );

        addCartRequest.then((response) => {
            toast.success("Added to cart!");
            if (goCart === true) {
                return history.push("/cart");
            }
        });

        addCartRequest.catch((error) => {
            if (error.response.status === 403) {
                toast.error("Sold out.");
            } else {
                toast.error("Error");
            }
        });
    }

    return (
        <Container>
            <Toaster />
            <ProductImage>
                <img src={product.image} alt={product.name} />
            </ProductImage>
            <ProductContainer>
                <Title>{product.name}</Title>
                <Line />
                <div className="price-quantity">
                    <Price>R$ {formatNumber(product.price)}</Price>
                    <input
                        type="number"
                        min="1"
                        max={product.quantity}
                        onChange={(e) => setOrderQuantity(e.target.value)}
                        value={orderQuantity}
                    />
                </div>
                <button className="cart" onClick={addToCart}>
                    Add to cart
                </button>
                <button className="buy">Buy now</button>

                <Description>{product.description}</Description>
            </ProductContainer>
        </Container>
    );
}
const Container = styled.div`
    color: #3a4242;
    background-color: #e1e5ea;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;

    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: #969696;
`;

const ProductContainer = styled.div`
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
const ProductImage = styled.div`
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
