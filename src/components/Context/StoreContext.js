import React, { createContext, useState, useEffect } from 'react';
import Client from 'shopify-buy';

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
	domain: 'workout-fever.myshopify.com',
	storefrontAccessToken: '1eeedf87c033deb4047230d64cb6f158'
});

const defaultValues = {
	isCartOpen: false,
	toggleCartOpen: () => {},
	cart: [],
	addProductToCart: () => {},
	client,
	checkout: {
		lineItems: []
	}
};

export const StoreContext = createContext(defaultValues);

export const StoreProvider = ({ children }) => {
	const [ checkout, setCheckout ] = useState(defaultValues.checkout);

	useEffect(() => {
		initializeCheckout();
	}, []);

	const initializeCheckout = async () => {
		try {
			// Check if it's a browser
			const isBrowser = typeof window !== 'undefined';

			// Check if id exists
			const currentCheckoutId = isBrowser ? localStorage.getItem('checkout_id') : null;

			let newCheckout = null;

			if (currentCheckoutId) {
				// If id exists, fetch checkout from Shopify
				newCheckout = await client.checkout.fetch(currentCheckoutId);
			} else {
				// If id does not, create new checkout
				newCheckout = await client.checkout.create();
				if (isBrowser) {
					localStorage.setItem('checkout_id', newCheckout.id);
				}
			}

			// Set checkout to state
			setCheckout(newCheckout);
		} catch (e) {
			console.error(e);
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
			const newCheckout = await client.checkout.addLineItems(checkout.id, lineItems);
			// Buy Now Button Code
			// window.open(addItems.webUrl, "_blank")
			console.log(newCheckout);
			setCheckout(newCheckout);
			// console.log(addItems.webUrl)
		} catch (e) {
			console.error(e);
		}
	};

	const removeFromCart = async (variantId) => {
		try {
			const remove = await client.checkout.removeLineItems(checkout.id, [ variantId ]);
			setCheckout(remove);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<StoreContext.Provider
			value={{
				...defaultValues,
				checkout,
				addProductToCart,
				removeFromCart
			}}
		>
			{children}
		</StoreContext.Provider>
	);
};
