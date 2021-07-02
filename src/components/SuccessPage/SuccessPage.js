import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function SuccessPage() {
    const { user } = useContext(UserContext);
    const history = useHistory();
    const [orderInfo, setOrderInfo] = useState({});
    const { id } = useParams();
    const { date, email, orderId } = orderInfo;
    useEffect(() => {
        if (!localStorage.user) {
            history.push("/");
            return;
        }
        if (user && user.token) {
            getOrderInfo();
        }
        // eslint-disable-next-line
    }, [user]);

    function getOrderInfo() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const orderInfoRequest = axios.get(
            `http://localhost:4000/order?id=${id}`,
            config
        );
        orderInfoRequest.then((response) => {
            setOrderInfo(response.data);
        });
        orderInfoRequest.catch((error) => {
            history.push("/");
        });
    }

    return (
        <Container>
            <Title>Your order has been placed!</Title>
            {orderInfo.email && (
                <>
                    <p>
                        Please check <strong>{email}</strong> for your
                        confirmation email.
                    </p>
                    <p>Order placed on: {String(new Date(date))}</p>
                    <p>Order id: {orderId}</p>
                </>
            )}
            <Button onClick={() => history.push("/")}>Go home</Button>
        </Container>
    );
}
const Container = styled.div`
    padding: 20px 20px;
    color: #3a4242;
    background-color: #e1e5ea;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 20px;
    & > * {
        margin-bottom: 10px;
    }
`;

const Title = styled.p`
    font-weight: bold;
    font-size: 30px;
`;

const Button = styled.button`
    width: 100%;
    max-width: 300px;
    height: 50px;
    border: none;
    border-radius: 5px;
    background-color: #da7f8f;
    opacity: ${(props) => (props.disabled ? "0.7" : "1")};
    color: #ffffff;
    font-size: 20px;
`;
