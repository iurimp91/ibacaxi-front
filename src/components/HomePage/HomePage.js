import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductsShowcase from "../ProductsShowcase/ProductsShowcase";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [generalQuery, setGeneralQuery] = useState("");
    const [priceCheck, setPriceCheck] = useState("Standard");

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    function getCategories() {
        const categoriesRequest = axios.get("http://localhost:4000/categories");

        categoriesRequest.then((response) => {
            setCategories(response.data);
        });

        categoriesRequest.catch((error) => {
            alert("Error!");
        });
    }

    function getProducts(generalQuery) {
        const prodRequest = axios.get(
            `http://localhost:4000/products?${generalQuery}`
        );
        prodRequest.then((respose) => {
            setProducts(respose.data);
        });
        prodRequest.catch((error) => alert("error"));
    }

    function makeCategoryQuery(categoryName) {
        const newQuery = `category=${categoryName}&`;
        makeGeneralQuery(newQuery);
    }

    function makePriceQuery(price) {
        let newQuery;
        if (price === "") {
            newQuery = "";
        } else {
            newQuery = `price=${price}&`;
        }
        makeGeneralQuery(newQuery);
    }

    function makeGeneralQuery(newQuery) {
        let newGeneralQuery;
        if (newQuery.includes("category")) {
            if (generalQuery.includes(newQuery)) {
                newGeneralQuery = generalQuery.replace(`${newQuery}`, "");
            } else if (
                newQuery !== "category=&" &&
                !generalQuery.includes(newQuery)
            ) {
                newGeneralQuery = generalQuery + `${newQuery}`;
            } else {
                newGeneralQuery = "";
            }
        } else {
            if (!generalQuery.includes("price")) {
                newGeneralQuery = generalQuery + `${newQuery}`;
            } else if (
                !generalQuery.includes(newQuery) &&
                generalQuery.includes("higher")
            ) {
                newGeneralQuery = generalQuery.replace("higher", "lower");
            } else if (
                !generalQuery.includes(newQuery) &&
                generalQuery.includes("lower")
            ) {
                newGeneralQuery = generalQuery.replace("lower", "higher");
            } else {
                newGeneralQuery = generalQuery.replace(
                    "price=lower&" || "price=higher&",
                    ""
                );
            }
        }

        setGeneralQuery(newGeneralQuery);
        getProducts(newGeneralQuery);
    }

    return (
        <Home>
            <Container>
                <Sidebar>
                    <CategoriesList>
                        <h1>Filter by</h1>
                        {categories.map((category) => (
                            <li key={category.name}>
                                <input
                                    type="checkbox"
                                    onClick={() =>
                                        makeCategoryQuery(category.name)
                                    }
                                />
                                {category.name}
                            </li>
                        ))}
                    </CategoriesList>
                    <PriceFilter>
                        <h1>Order by</h1>
                        <li key={"Standard"}>
                            <input
                                type="radio"
                                name="price-filter"
                                checked={priceCheck === "Standard"}
                                onChange={() => {
                                    makePriceQuery("");
                                    setPriceCheck("Standard");
                                }}
                            />
                            Standard
                        </li>
                        <li key={"Higher"}>
                            <input
                                type="radio"
                                name="price-filter"
                                checked={priceCheck === "Higher"}
                                onChange={() => {
                                    makePriceQuery("higher");
                                    setPriceCheck("Higher");
                                }}
                            />
                            Higher price
                        </li>
                        <li key={"Lower"}>
                            <input
                                type="radio"
                                name="price-filter"
                                checked={priceCheck === "Lower"}
                                onChange={() => {
                                    makePriceQuery("lower");
                                    setPriceCheck("Lower");
                                }}
                            />
                            Lower price
                        </li>
                    </PriceFilter>
                </Sidebar>
                <div>
                    <ProductsShowcase products={products} />
                </div>
            </Container>
        </Home>
    );
}

const Home = styled.div`
    max-width: 1500px;
    margin: 0px auto;
    padding: 100px 20px 0 20px;

    @media (max-width: 670px) {
        padding-top: 130px;
    }

    h1 {
        font-size: 20px;
        font-weight: bold;
        line-height: 30px;
    }
`;

const Container = styled.div`
    display: flex;

    @media (max-width: 670px) {
        flex-direction: column;
    }
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 150px;

    @media (max-width: 670px) {
        flex-direction: initial;
        align-items: center;
        justify-content: space-around;
    }
`;

const CategoriesList = styled.ul`
    display: flex;
    flex-direction: column;

    li {
        margin-bottom: 5px;
    }
`;

const PriceFilter = styled.ul`
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    @media (max-width: 670px) {
        margin-top: 0;
    }

    li {
        margin-bottom: 5px;
    }
`;
