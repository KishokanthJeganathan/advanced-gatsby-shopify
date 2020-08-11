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
	const isBrowser = typeof window !== 'undefined';

	useEffect(() => {
		initializeCheckout();
	}, []);

	const getNewId = async () => {
		try {
			const newCheckout = await client.checkout.create();
			if (isBrowser) {
				localStorage.setItem('checkout_id', newCheckout.id);
			}
			return newCheckout;
		} catch (e) {
			console.error(e);
		}
	};

	const initializeCheckout = async () => {
		try {
			// Check if id exists
			const currentCheckoutId = isBrowser ? localStorage.getItem('checkout_id') : null;

			let newCheckout = null;

			if (currentCheckoutId) {
				// If id exists, fetch checkout from Shopify
				newCheckout = await client.checkout.fetch(currentCheckoutId);
				if (newCheckout.completedAt) {
					newCheckout = await getNewId();
				}
			} else {
				// If id does not, create new checkout
				newCheckout = await getNewId();
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

	const checkCoupon = async (coupon) => {
		const newCheckout = await client.checkout.addDiscount(checkout.id, coupon);
		setCheckout(newCheckout);
	};

	const removeCoupon = async (coupon) => {
		const newCheckout = await client.checkout.removeDiscount(checkout.id, coupon);
		setCheckout(newCheckout);
	};

	return (
		<StoreContext.Provider
			value={{
				...defaultValues,
				checkout,
				addProductToCart,
				removeFromCart,
				checkCoupon,
				removeCoupon
			}}
		>
			{children}
		</StoreContext.Provider>
	);
};
