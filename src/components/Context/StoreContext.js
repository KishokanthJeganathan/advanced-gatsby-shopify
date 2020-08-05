import React, { createContext, useState, useEffect } from 'react';
import Client from 'shopify-buy';

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
	domain: 'workout-fever.myshopify.com',
	storefrontAccessToken: '1eeedf87c033deb4047230d64cb6f158'
});

const items = {
	isCartOpen: false,
	cart: [],
	addProductToCart: () => {},
	client
};

export const StoreContext = createContext(items);

export const StoreProvider = ({ children }) => {
	useEffect(() => {
		initializeCheckout();
	}, []);

	const [ checkout, setCheckout ] = useState({});

	const initializeCheckout = async () => {
		try {
			const isBrowser = typeof window !== 'undefined';

			const currentShopifyId = isBrowser ? localStorage.getItem('checkout_id') : null;

			if (currentShopifyId) {
				setCheckout(currentShopifyId);
			} else {
				const newCheckout = await client.checkout.create();
				if (isBrowser) {
					localStorage.setItem('checkout_id', newCheckout.id);
					setCheckout(newCheckout.id);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};
	const addProductToCart = async (variantId) => {
		try {
			const lineItems = [
				{
					variantId,
					quantity: 1
				}
			];
			const addItems = await client.checkout.addLineItems(checkout, lineItems);
			console.log(addItems.webUrl);
		} catch (e) {
			console.error(e);
		}
	};
	return <StoreContext.Provider value={{ ...items, addProductToCart }}>{children}</StoreContext.Provider>;
};
