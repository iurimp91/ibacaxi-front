import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function ProductPage() {
    const [product, setProduct] = useState(false);
    let { id } = useParams();
    useEffect(() => {
        const productRequest = axios.get(`http://localhost:4000/product/${id}`);
        productRequest.then((respose) => {
            setProduct(respose.data);
        });
        productRequest.catch((error) => alert(error.response.status));
    }, [id]);

    return <Container>{product && product.name}</Container>;
}
const Container = styled.div`
    background-color: #e1e5ea;
    height: 100%;
    max-width: 1300px;
    margin: 0 auto;
`;
