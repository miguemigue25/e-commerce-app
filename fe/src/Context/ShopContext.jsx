import React, { createContext, useState } from "react";
import { useEffect } from "react";



export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;       
    }
    return cart;
}
const ShopContextProvider = (props) => {

    const [all_product,setAll_Product] = useState([]); 
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        fetch('https://e-commerce-app-swart-rho.vercel.app/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))
        if(localStorage.getItem('auth-token')){
            fetch('https://e-commerce-app-swart-rho.vercel.app/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:"",
            
            }).then((response)=>response.json())
            .then((data)=>(setCartItems(data)));

        }
    },[])
    useEffect(() => {
    fetch('https://e-commerce-app-swart-rho.vercel.app/allproducts')
        .then((response) => response.json())
        .then((data) => setAll_Product(data));

    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
        fetch('https://e-commerce-app-swart-rho.vercel.app/getcart', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'auth-token': authToken,
                'Content-Type': 'application/json',
            },
            body: '',
        })
        .then((response) => response.json())
        .then((data) => setCartItems(data))
        .catch((error) => console.error(error));
    }
}, []);
    
   const addToCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
    if (localStorage.getItem('auth-token'))
    if (localStorage.getItem('auth-token')) {
        fetch('https://e-commerce-app-swart-rho.vercel.app/addtocart', {
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"itemId":itemId}),
        })
        .then((response)=>response.json())
        .then((data)=>console.log(data))
    }
}

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId]- 1}));
        if(localStorage.getItem('auth-token')){
            fetch('https://e-commerce-app-swart-rho.vercel.app/removefromcart', {
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"itemId":itemId}),
        })
        .then((response)=>response.json())
        .then((data)=>console.log(data))
            
            
        }
    } 
    
    

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item]>0) {
                let itemInfo = all_product.find((product) => product.id===Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item]>0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
