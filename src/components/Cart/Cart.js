import React, { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

export const Cart = () => {
	const { checkout, removeFromCart } = useContext(StoreContext);
	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				right: 0,
				width: '20%',
				height: '100%',
				background: 'white',
				padding: 60,
				boxShadow: 'var(--elevation-4)'
			}}
		>
			<h3>Cart</h3>
			{checkout.lineItems.map((item) => (
				<div key={item.id}>
					<h4>{item.title}</h4>
					<p>{item.quantity}</p>
					<p>${item.variant.price}</p>
					<button onClick={() => removeFromCart(item.id)}>Remove</button>
				</div>
			))}
			Total: <h5 className="title">${checkout.totalPrice}</h5>
		</div>
	);
};
