import styled from "styled-components";
import Product from "./Product";

export default function ProductsShowcase({ products }) {
    return (
        <Showcase>
            {products.map((p) => {
                return <Product key={p.id} product={p} />;
            })}
        </Showcase>
    );
}

const Showcase = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    height: 100%;
`;
