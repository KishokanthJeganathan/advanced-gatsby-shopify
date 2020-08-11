import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

export const Nav = () => {
	const { allShopifyCollection } = useStaticQuery(
		graphql`
			{
				allShopifyCollection {
					nodes {
						title
						handle
					}
				}
			}
		`
	);
	return (
		<nav>
			{allShopifyCollection.nodes.map((collection) => (
				<Link to={`collection/${collection.handle}`} style={{ margin: '1rem', color: 'white' }}>
					{collection.title}
				</Link>
			))}
		</nav>
	);
};
