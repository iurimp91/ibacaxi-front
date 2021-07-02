import styled from "styled-components";
import { Link } from "react-router-dom";

export default function DropdownMenu(props) {
    const { productsList, setProductsList, setProductName } = props;

    function selectProduct(e) {
        e.stopPropagation();
        setProductsList([]);
        setProductName("");
    }

    return (
        <Container>
            {productsList.map((product) => 
                <Link key={product.id} to={`/product/${product.id}`} onClick={selectProduct}>
                    <img src={product.image} alt={product.brief} />
                    <h1>{product.name}</h1>
                </Link>
            )}
        </Container>
    );
}

const Container = styled.ul`
    background-color: #FFFFFF;
    width: 100%;
    display: flex;
    flex-direction: column;

    a {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 10px;
        text-decoration: none;
        color: #000000;
    }
    
    a:hover {
        background-color: #DCDCDC;
    }

    img {
        width: 30px;
        height: 30px;
    }

    h1 {
        margin-left: 5px;
    }
`;