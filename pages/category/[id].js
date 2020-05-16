import { useRouter } from "next/router";
import { withApollo } from "../../lib/apollo";
import React, { useState } from "react";
import { compose } from 'redux'
import { withRedux } from '../../lib/redux'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Segment, Container, Grid, Accordion, Dimmer, Loader, Button } from "semantic-ui-react";
import ProductList from "../../components/ProductList";
import { useQuery } from "@apollo/react-hooks";
import { CATEGORY_LIST_BY_ID, PRODUCT_LIST } from "../../graphql";
import Layout from "../../components/Layout";

const useCart = () => {
	return useSelector((state) => ({
		cart: state.cart,
	}));
};

const CategoryPage = () => {
	const { cart } = useCart();
	const router = useRouter();
	const { id: catId } = router.query;
	const [page, setPage] = useState(1);
	const dispatch = useDispatch()
	let { data: dataCat, loading: loadingCat, error: errorCat } = useQuery(CATEGORY_LIST_BY_ID, { variables: { catId } });
	let { data: dataProduct, loading: loadingProduct, error: errorProduct, fetchMore: fetchMoreProduct } = useQuery(PRODUCT_LIST, { variables: { catId, page: 1 } });

	const getData = (obj) => {
		const [child] = Object.keys(obj);
		const result = obj[child];
		return result;
	};

	if (loadingCat) {
		return <div>Loading</div>;
	}

	if (errorCat) {
		return <div>Opps there is a problem</div>;
	}

	if (dataCat) {
		[dataCat] = getData(dataCat);
		dataProduct = getData(dataProduct);
		console.log(dataProduct);

		return (
			<Layout>
				<div>
				<Button onClick={() => {
						setPage(page - 1)
					}}>
						Prev
					</Button>
					<Button onClick={() => {
						setPage(page + 1)
						// fetchMoreProduct({
						// 	variables: {
						// 		catId, page: 2
						// 	},
						// 	updateQuery: (prev, { fetchMoreResult }) => {
						// 	  if (!fetchMoreResult) return prev;
						// 	  return Object.assign({}, prev, {
						// 		feed: [...prev.feed, ...fetchMoreResult.feed]
						// 	  });
						// 	}
						//   })
					}}>
						Next
					</Button>
				</div>
				<div>
					<h1>{dataCat.name}</h1>
					<p>{dataCat.description}</p>
				</div>
				{<ProductList data={dataProduct} handleClick={(item) => {
					let data = cart;
					data = data.push(item)
					dispatch({
						type: 'ADD_TO_CART',
						cart: cart.concat(data),
					  })
				}} />}
			</Layout>
		);
	}
};

export default compose(withApollo, withRedux)(CategoryPage);
