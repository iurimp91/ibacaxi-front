import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductsShowcase from "../ProductsShowcase/ProductsShowcase";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryQuery, setCategoryQuery] = useState("");
    let priceQuery = "";

    useEffect(() => {
       getProducts();
    }, []);

    function getProducts(categoryQuery, priceQuery) {
        console.log(categoryQuery);
        const prodRequest = axios.get(`http://localhost:4000/products?${categoryQuery}${priceQuery}`);
        prodRequest.then((respose) => {
            setProducts(respose.data);
        });
        prodRequest.catch((error) => alert("error"));
    }

    useEffect(() => {
        if(categories.length !== 0) {
            return;
        }
        let previousCategory = [];
        const existingCategories = products.filter(item => {
            if(previousCategory.includes(item.categoryName)) {
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
        let newQuery;
        if(categoryId !== "" && categoryQuery.includes(categoryId)) {
            newQuery = categoryQuery.replace(`category=${categoryId}&`, "");
        } else if(categoryId !== "" && !categoryQuery.includes(categoryId)) {
            newQuery = categoryQuery + `category=${categoryId}&`;
        } else {
            newQuery = "";
        }
        setCategoryQuery(newQuery);
        getProducts(newQuery);
    }

    console.log(categoryQuery);

    function makePriceQuery(price) {
        priceQuery = `price=${price}&`;
        getProducts(priceQuery);
    }

    function makeGeneralQuery() {

    }
    
    return (
        <Home>
            <h1>Essa é a linda página principal.</h1>
            <Container>
                <Sidebar>
                    <CategoriesList>
                        <h1>Filter by</h1>
                        <li onClick={() => makeCategoryQuery("")}>Standard</li>
                        {categories.map((item, i) => 
                            <li onClick={() => makeCategoryQuery(item.categoryId)}>{item.categoryName}</li>
                        )}
                    </CategoriesList>
                    <PriceFilter>
                        <h1>Order by</h1>
                        <li onClick={() => makePriceQuery("")}>Standard</li>
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