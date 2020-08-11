import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import '../style.scss';
import logo from '../images/logo.svg';
import { StoreContext } from './Context/StoreContext';
import { Cart } from './Cart/Cart';
import { Nav } from './ProductsListing/Nav';

const Header = ({ siteTitle }) => {
	const { client, checkout } = useContext(StoreContext);

	return (
		<header className="navbar" style={{ background: 'var(--purp)', boxShadow: 'var(--elevation-2)' }}>
			<div className="navbar-brand">
				<Link to="/" className="navbar-item">
					<img style={{ height: 60, maxHeight: 'none', marginBottom: 0 }} src={logo} alt="Level Up Logo" />
				</Link>
				<Nav />
				<p style={{ padding: '1rem', backgroundColor: 'white' }}>{checkout.lineItems.length}</p>
				<FaShoppingCart
					style={{ color: 'white', height: 30, width: 30, marginLeft: '20vw', marginTop: '1.5rem' }}
				/>
			</div>
			<Cart />
		</header>
	);
};

Header.propTypes = {
	siteTitle: PropTypes.string
};

Header.defaultProps = {
	siteTitle: ``
};

export default Header;
