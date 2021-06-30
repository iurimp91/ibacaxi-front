import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductsShowcase from "../ProductsShowcase/ProductsShowcase";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryQuery, setCategoryQuery] = useState("");
    const [priceQuery, setPriceQuery] = useState("");
    const [generalQuery ,setGeneralQuery] = useState("");

    useEffect(() => {
       getProducts();
    }, []);

    function getProducts(generalQuery) {
        const prodRequest = axios.get(`http://localhost:4000/products?${generalQuery}`);
        prodRequest.then((respose) => {
            setProducts(respose.data);
        });
        prodRequest.catch((error) => alert("error"));
    }

    useEffect(() => {
        if (categories.length !== 0) {
            return;
        }
        let previousCategory = [];
        const existingCategories = products.filter(item => {
            if (previousCategory.includes(item.categoryName)) {
                return false;
            } else {
                previousCategory.push(item.categoryName);
                return true;
            }
        });
    
        const categoriesNames = existingCategories.map(item => {
            return {categoryName: item.categoryName, categoryId: item.categoryId};
        });

        setCategories(categoriesNames.sort((a,b) => {
            return (a.categoryName > b.categoryName) ? 1 : ((b.categoryName > a.categoryName) ? -1 : 0);
        }));
    }, [products]);

    function makeCategoryQuery(categoryId) {
        const newQuery = `category=${categoryId}&`;
        makeGeneralQuery(newQuery)
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
            } else if (newQuery !== "category=&" && !generalQuery.includes(newQuery)) {
                newGeneralQuery = generalQuery + `${newQuery}`;
            } else {
                newGeneralQuery = "";
            }
        } else {
            if (generalQuery.includes(newQuery)) {
                newGeneralQuery = generalQuery.replace(`${newQuery}`, "");
            } else if (!generalQuery.includes("price")) {
                newGeneralQuery = generalQuery + `${newQuery}`;
            } else if (!generalQuery.includes(newQuery) && generalQuery.includes("higher")) {
                newGeneralQuery = generalQuery.replace("higher", "lower");
            } else if (!generalQuery.includes(newQuery) && generalQuery.includes("lower")) {
                newGeneralQuery = generalQuery.replace("lower", "higher");
            }
        }

        setGeneralQuery(newGeneralQuery);
        getProducts(newGeneralQuery);
    }
    
    return (
        <Home>
            <h1>Essa é a linda página principal.</h1>
            <Container>
                <Sidebar>
                    <CategoriesList>
                        <h1>Filter by</h1>
                        {categories.map((item, i) => 
                            <li onClick={() => makeCategoryQuery(item.categoryId)}>{item.categoryName}</li>
                        )}
                    </CategoriesList>
                    <PriceFilter>
                        <h1>Order by</h1>
                        <li onClick={() => makePriceQuery("higher")}>Higher price</li>
                        <li onClick={() => makePriceQuery("lower")}>Lower price</li>
                    </PriceFilter>       
                </Sidebar>
                <div className="products-list">
                    <ProductsShowcase products={products} />
                </div>
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

    .products-list {
        margin-left: 100px;
    }
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    width: 100px;
    background-color: blue;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 26px;
`;

const CategoriesList = styled.ul`
    display: flex;
    flex-direction: column;
`;

const PriceFilter = styled.ul`
    display: flex;
    flex-direction: column;
`;