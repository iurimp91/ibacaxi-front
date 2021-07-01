import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductsShowcase from "../ProductsShowcase/ProductsShowcase";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [generalQuery, setGeneralQuery] = useState("");

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
        const newQuery = `price=${price}&`;
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
            if (generalQuery.includes(newQuery)) {
                newGeneralQuery = generalQuery.replace(`${newQuery}`, "");
            } else if (!generalQuery.includes("price")) {
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
                            <li
                                key={category.id}
                                onClick={() => makeCategoryQuery(category.name)}
                            >
                                {category.name}
                            </li>
                        ))}
                    </CategoriesList>
                    <PriceFilter>
                        <h1>Order by</h1>
                        <li onClick={() => makePriceQuery("higher")}>
                            Higher price
                        </li>
                        <li onClick={() => makePriceQuery("lower")}>
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
    h1 {
        font-size: 20px;
        font-weight: bold;
        line-height: 30px;
    }
`;

const Container = styled.div`
    display: flex;
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 150px;
`;

const CategoriesList = styled.ul`
    display: flex;
    flex-direction: column;
`;

const PriceFilter = styled.ul`
    display: flex;
    flex-direction: column;
`;
