import React from 'react';
import { StoreProvider } from './src/components/Context/StoreContext';

export const wrapRootElement = ({ element }) => {
	return <StoreProvider>{element}</StoreProvider>;
};
