import styled from "styled-components";
import CartProduct from "./CartProduct";
import { Link } from "react-router-dom";

export default function CartPage() {
    const cartProductsList = [
        {
            id: 1,
            name: "Product",
            category: "Smartphone",
            image: "https://fruitznveggies.com/wp-content/uploads/2020/09/Pear-1pc-100-Organic.jpg",
            quantity: 10,
            brief: "Brief Descasdasdasdasdasdsadription",
            description:
                "Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto.",
            price: 1999,
        },];
    //     {
    //         id: 2,
    //         category: "Headphone",
    //         name: "Product",
    //         image: "https://fruitznveggies.com/wp-content/uploads/2020/09/Pear-1pc-100-Organic.jpg",
    //         quantity: 3,
    //         brief: "Brief Description",
    //         description:
    //             "Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto.",
    //         price: 1000,
    //     },
    //     {
    //         id: 3,
    //         category: "Printer",
    //         name: "Product",
    //         image: "https://fruitznveggies.com/wp-content/uploads/2020/09/Pear-1pc-100-Organic.jpg",
    //         quantity: 4,
    //         brief: "Brief Description",
    //         description:
    //             "Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto.",
    //         price: 250,
    //     },
    // ];

    console.log(cartProductsList.length);

    return(
        <Container empty={cartProductsList.length}>
            {
                cartProductsList.length === 0
                ? 
                    <span>
                        Your cart is empty.<br/>
                        <Link to="/">Start to fill it now.</Link>
                    </span>
                : 
                    <ProductsList>
                        {
                            cartProductsList.map((product, i) =>
                                <CartProduct product={product} key={i} />
                            )
                        }
                    </ProductsList>
            }
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