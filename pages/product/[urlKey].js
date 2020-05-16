import { useRouter } from "next/router";
import { withApollo } from "../../lib/apollo";
import React, { useState } from "react";
import { Header, Segment, Container, Grid, Accordion, Dimmer, Label, Button } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import { PRODUCT_DETAIL } from "../../graphql";
import ReactHtmlParser from "react-html-parser";
import Layout from "../../components/Layout";

const CategoryPage = () => {
	const router = useRouter();
	const { urlKey } = router.query;
	let { data: dataProduct, loading: loadingProduct, error: errorProduct } = useQuery(PRODUCT_DETAIL, { variables: { urlKey } });

	const getData = (obj) => {
		const [child] = Object.keys(obj);
		const result = obj[child];
		return result;
	};

	if (loadingProduct) {
		return <div>Loading</div>;
	}

	if (errorProduct) {
		return <div>Opps there is a problem</div>;
	}

	if (dataProduct) {
		dataProduct = getData(dataProduct);
		const [data] = dataProduct.items;
		const { final_price, regular_price } = data.price_range.maximum_price;
		const finalPrice = final_price.value != regular_price.value ? final_price.value : null;

		return (
			<Layout>
				<Segment>
					<div>
						<img src={data.image.url} width='100%' height='auto' />
						<Header dividing as='h3'>
							{data.name}
						</Header>
						<p>
							{ReactHtmlParser(data.description.html, {
								transform: (x, i) => {
									const desc = x.name === "p" ? x.children[0].data : null;
									const list = x.name === "ul" ? x.children.filter((y) => y.name === "li").map((z) => <p>{z.children[0].data}</p>) : null;

									return (
										<div key={i}>
											{desc}
											{list}
										</div>
									);
								},
							})}
						</p>
						{finalPrice ? (
							<Label size='medium' color='teal'>
								{`${regular_price.currency} ${finalPrice}`}
							</Label>
						) : null}
						<Label size='medium' color='teal'>
							{finalPrice ? <s>{`${regular_price.currency} ${regular_price.value}`}</s> : `${regular_price.currency} ${regular_price.value}`}
						</Label>
					</div>
					<Button color='primary' fluid style={{ marginTop: "25px" }}>
						Add to Cart
					</Button>
				</Segment>
			</Layout>
		);
	}
};

export default withApollo(CategoryPage);
