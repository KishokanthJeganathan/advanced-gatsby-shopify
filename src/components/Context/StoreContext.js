import React, { createContext, useState } from 'react';
import Client from 'shopify-buy';

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
	domain: 'workout-fever.myshopify.com',
	storefrontAccessToken: '1eeedf87c033deb4047230d64cb6f158'
});

const items = {
	isCartOpen: false,
	cart: [],
	addProductToCart: () => {
		console.log('added to cart');
	},
	client
};

export const StoreContext = createContext(items);

export const StoreProvider = ({ children }) => {
	return <StoreContext.Provider value={items}>{children}</StoreContext.Provider>;
};
