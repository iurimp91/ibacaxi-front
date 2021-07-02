import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import toast, { Toaster } from "react-hot-toast";
import Form from "./CheckoutFormStyle";
import Loader from "react-loader-spinner";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function CheckoutForm({ totalPrice }) {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [creditCard, setCreditCard] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [cvv, setCVV] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const today = new Date();
    const currentMonth = String(today.getMonth()).padStart(2, "0");
    const currentYear = String(today.getFullYear()).substring(2);

    function placeOrder(e) {
        e.preventDefault();
        let error = 0;
        if (!name.trim()) {
            toast.error("Name is required");
            error++;
        }
        if (!address.trim()) {
            toast.error("Adress is required");
            error++;
        }
        if (error) {
            return;
        }
        setLoading(true);
        const expiration = `${month.padStart(2, "0")}/${year}`;
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const body = { name, address, creditCard, expiration, cvv, totalPrice };
        const orderRequest = axios.post(
            "http://localhost:4000/checkout",
            body,
            config
        );

        orderRequest.then((response) => {
            console.log(response.data.order);
            history.push(`/success/${response.data.order}`);
        });

        orderRequest.catch((error) => {
            toast("Error!");
            setLoading(false);
        });
    }

    return (
        <Form onSubmit={(e) => placeOrder(e)}>
            <Toaster />
            <p className="title">Billing details</p>
            Full Name
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
            ></input>
            Full Address
            <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={loading}
                required
            ></input>
            Credit Card
            <input
                value={creditCard}
                onChange={(e) =>
                    setCreditCard(
                        e.target.value.replace(/[^\d+]/g, "").substring(0, 16)
                    )
                }
                minLength="16"
                inputMode="numeric"
                disabled={loading}
                required
            ></input>
            <div className="cc-details">
                <div>
                    <p>Expiration</p>
                    <input
                        value={month}
                        onChange={(e) =>
                            setMonth(
                                e.target.value
                                    .replace(/[^\d+]/g, "")
                                    .substring(0, 2)
                            )
                        }
                        className="small"
                        placeholder="MM"
                        minLength="2"
                        type="number"
                        min={year === currentYear ? currentMonth : "01"}
                        max="12"
                        disabled={loading}
                        required
                    />
                    /
                    <input
                        value={year}
                        onChange={(e) =>
                            setYear(
                                e.target.value
                                    .replace(/[^\d+]/g, "")
                                    .substring(0, 2)
                            )
                        }
                        className="small"
                        placeholder="YY"
                        minLength="2"
                        type="number"
                        min="21"
                        disabled={loading}
                        required
                    />
                </div>
                <div>
                    <p>CVV</p>
                    <input
                        value={cvv}
                        onChange={(e) =>
                            setCVV(
                                e.target.value
                                    .replace(/[^\d+]/g, "")
                                    .substring(0, 3)
                            )
                        }
                        className="small"
                        minLength="3"
                        type="number"
                        disabled={loading}
                        required
                    />
                </div>
            </div>
            <button disabled={loading}>
                {loading ? (
                    <Loader
                        type="ThreeDots"
                        color="#FFFFFF"
                        width={51}
                        height={13}
                    />
                ) : (
                    <>Place order!</>
                )}
            </button>
        </Form>
    );
}
