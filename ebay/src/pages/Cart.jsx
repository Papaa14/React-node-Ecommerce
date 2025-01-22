import React, { useContext } from "react";
import { AppContext } from "../components/AppContext";
import ProductCard from "./../components/ProductCard";


function Cart() {
    const { cartItems, setCartItems } = useContext(
        AppContext
    );
    let productsToRender = cartItems.map(product => {
        return (<ProductCard
            key={product.idproduct}
            productId={product.idproduct}
            productType={product.category}
            outofstock={false}
            size={product.size}
            price={product.price}
            gender={product.gender}
            image={product.image}
            cart={true}
        />)
    })
    return (
        <main className="full-block">
            <section className="products-section products-accessories full-block" id="on-sale">
                <div className="container">
                    <h2 className="pageTitle">Cart</h2>
                    <div className="grid-container a" id="clothes_grid">
                        {productsToRender}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Cart;