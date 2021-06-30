import styled from "styled-components";
import CartProduct from "./CartProduct";
import { Link } from "react-router-dom";

export default function CartPage() {
    const cartProducts = [
        {
            id: 1,
            name: "Product",
            category: "Smartphone",
            image: "https://fruitznveggies.com/wp-content/uploads/2020/09/Pear-1pc-100-Organic.jpg",
            quantity: 10,
            brief: "Brief asd asdasd",
            description:
                "Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto.",
            price: 1999,
        },
        {
            id: 2,
            category: "Headphone",
            name: "Product",
            image: "https://fruitznveggies.com/wp-content/uploads/2020/09/Pear-1pc-100-Organic.jpg",
            quantity: 3,
            brief: "Brief Description",
            description:
                "Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto.",
            price: 1000,
        },
        {
            id: 3,
            category: "Printer",
            name: "Product",
            image: "https://fruitznveggies.com/wp-content/uploads/2020/09/Pear-1pc-100-Organic.jpg",
            quantity: 4,
            brief: "Brief Description",
            description:
                "Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto.",
            price: 250,
        },
    ];

    console.log(cartProducts.length);

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
                                <CartProduct product={product} key={i} />
                            )
                        }
                    </ProductsList>
            }
            <Footer>
                <div className="total-price">
                    <h1>TOTAL</h1>
                    <h2>R$ {(6000000/100).toFixed(2).replace(".",",").replace("-","")}</h2>
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