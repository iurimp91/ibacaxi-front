import axios from "axios";
import styled from "styled-components";
import ProductsShowcase from "../ProductsShowcase/ProductsShowcase";

export default function HomePage() {
    const products = [
        {
            id: 1,
            name: "Product",
            image: "https://fruitznveggies.com/wp-content/uploads/2020/09/Pear-1pc-100-Organic.jpg",
            quantity: 10,
            brief: "Brief Description",
            description:
                "Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto.",
            price: 1999,
        },
        {
            id: 2,
            name: "Product",
            image: "https://fruitznveggies.com/wp-content/uploads/2020/09/Pear-1pc-100-Organic.jpg",
            quantity: 10,
            brief: "Brief Description",
            description:
                "Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto. Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto.",
            price: 199,
        },
        {
            id: 3,
            name: "Product",
            image: "https://fruitznveggies.com/wp-content/uploads/2020/09/Pear-1pc-100-Organic.jpg",
            quantity: 10,
            brief: "Brief Description",
            description:
                "Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto.",
            price: 1999,
        },
        {
            id: 4,
            name: "Product",
            image: "https://fruitznveggies.com/wp-content/uploads/2020/09/Pear-1pc-100-Organic.jpg",
            quantity: 10,
            brief: "Brief Description",
            description:
                "Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto.",
            price: 199,
        },
        {
            id: 5,
            name: "Product",
            image: "https://fruitznveggies.com/wp-content/uploads/2020/09/Pear-1pc-100-Organic.jpg",
            quantity: 10,
            brief: "Brief Description",
            description:
                "Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto.",
            price: 1999,
        },
        {
            id: 6,
            name: "Product",
            image: "https://fruitznveggies.com/wp-content/uploads/2020/09/Pear-1pc-100-Organic.jpg",
            quantity: 10,
            brief: "Brief Description",
            description:
                "Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto.",
            price: 575,
        },
        {
            id: 7,
            name: "Product",
            image: "https://fruitznveggies.com/wp-content/uploads/2020/09/Pear-1pc-100-Organic.jpg",
            quantity: 10,
            brief: "Brief Description",
            description:
                "Esse é um produto, ele está presente na loja. Ele tem uma descrição. Compre o produto.",
            price: 199999,
        },
    ];
    return (
        <div>
            <h1>This is the home page</h1>
            Products Showcase:
            <ProductsShowcase products={products} />
        </div>
    );
}
