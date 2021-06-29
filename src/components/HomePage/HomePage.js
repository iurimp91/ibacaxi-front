import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductsShowcase from "../ProductsShowcase/ProductsShowcase";

export default function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const prodRequest = axios.get("http://localhost:4000/products");
        prodRequest.then((respose) => {
            setProducts(respose.data);
        });
        prodRequest.catch((error) => alert("error"));
    }, []);

    return (
        <Home>
            <h1>Essa é a linda página principal.</h1>
            <Container>
                <Sidebar>
                    <ul>
                        <li>Placeholder</li>
                        <li>Placeholder</li>
                        <li>Placeholder</li>
                    </ul>
                </Sidebar>
                <ProductsShowcase products={products} />
            </Container>
        </Home>
    );
}
const Home = styled.div`
    background-color: #e1e5ea;
    height: 100%;
`;
const Container = styled.div`
    display: flex;
    height: 100%;
`;
const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    width: 100px;
    background-color: blue;
    height: 100%;
`;
