import React, { useContext, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';

export const Cart = () => {
	const { checkout, removeFromCart, checkCoupon, removeCoupon } = useContext(StoreContext);

	const [ coupon, setCoupon ] = useState('');

	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				right: 0,
				width: '40%',
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
			<form
				onSubmit={(e) => {
					e.preventDefault();
					checkCoupon(coupon);
					setCoupon('');
				}}
			>
				<input type="text" placeholder="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
				<button>Add Coupon</button>
			</form>
			<div>
				{checkout.discountApplications.length > 0 ? (
					<p>
						Coupon:
						<h5 className="title">
							{checkout.discountApplications[0].code} -{' '}
							{checkout.discountApplications[0].value.percentage}% off
						</h5>
						<button
							onClick={() => removeCoupon(checkout.discountApplications[0].code)}
							className="is-small button is-danger is-outlined"
						>
							Remove
						</button>
					</p>
				) : (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							checkCoupon(coupon);
						}}
					>
						<div className="field">
							<label htmlFor="coupon" className="label">
								Coupon
							</label>
							<input
								className="input"
								id="coupon"
								value={coupon}
								onChange={(e) => setCoupon(e.target.value)}
								type="text"
							/>
						</div>
						<button className="button">Add Coupon</button>
					</form>
				)}
			</div>
			{console.log(checkout)}
			Total: <h5 className="title">${checkout.totalPrice}</h5>
			<a style={{ backgroundColor: 'black', color: 'white', padding: '1rem' }} href={checkout.webUrl}>
				Checkout
			</a>
		</div>
	);
};
