import React, { useContext } from 'react';
import { AppContext } from "../components/AppContext";
import HeroBanner from "../components/HeroBanner";
import DiscoverSection from "../components/DiscoverSection";
import ProductsSection from "../components/ProductsSection";


function Home() {
    const { isUserLogged, user } = useContext(AppContext); // Access the context
    
    return (
        <div>
            <main className="full-block">
                <HeroBanner />     
                    
                          
            </main>
        </div>
    )
}

export default Home;
