import styled from "styled-components";
import formatNumber from "../../functions/formatNumber";

export default function CheckoutProductsCard({ cartProducts, totalPrice }) {
    return (
        <List>
            {cartProducts.map((p) => {
                return (
                    <li key={p.id}>
                        <div className="left">
                            <Image bg={p.image} />
                            <ProductText>
                                <span className="name">{p.productName}</span>
                                <span className="quantity">X{p.quantity}</span>
                            </ProductText>
                        </div>
                        <div className="right">
                            R$ {formatNumber(p.price * p.quantity)}
                        </div>
                    </li>
                );
            })}
            <li className="total">
                <span>Total</span>
                <span>R$ {formatNumber(totalPrice)}</span>
            </li>
        </List>
    );
}

const List = styled.ul`
    border-radius: 15px;
    background-color: #ffffff;
    width: 100%;
    li {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #dadada;
        padding: 5px 5px;
        width: 100%;
        .left {
            display: flex;
            width: calc(100% - 140px);
        }
        .right {
            flex-shrink: 0;
        }
    }
    .total {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        height: 50px;
        padding-left: 65px;
        border: none;
    }
`;

const Image = styled.div`
    width: 50px;
    min-width: 50px;
    height: 50px;
    max-height: 50px;
    margin-right: 10px;
    border-radius: 15px;
    background-image: url("${(props) => props.bg}");
    background-position: center;
    background-size: cover;
`;

const ProductText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    .name {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .quantity {
        font-size: 14px;
    }
`;
