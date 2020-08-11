import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import Layout from '../components/layout';
import AddToCart from '../components/Cart/AddToCart';

const ProductDetailTemplate = ({ data }) => {
	// const { shopifyProduct: product } = data;
	// const { images: [ firstImage ], variants: [ firstVariant ] } = product;
	return (
		<Layout>
			{/* <div className="columns">
				<div className="column">
					<Image fluid={firstImage.localFile.childImageSharp.fluid} />
				</div>
				<div className="column">
					<h1 className="title">{product.title}</h1>
					<p className="subtitle is-4">${firstVariant.price}</p>
					<p>{product.description}</p>
					<AddToCart variantId={firstVariant.shopifyId} />
				</div>
			</div>{' '} */}
			<h1>hello from collections</h1>

			{console.log(data)}
		</Layout>
	);
};

export default ProductDetailTemplate;

export const query = graphql`
	query($handle: String!) {
		shopifyCollection(handle: { eq: $handle }) {
			products {
				title
				images {
					localFile {
						childImageSharp {
							fluid {
								src
							}
						}
					}
				}
			}
		}
	}
`;
