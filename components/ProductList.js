import { Header, Image, Container, Grid, Icon, Button, Label, Segment, Divider } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import { useState, useMemo } from "react";
import Link from "next/link";

const ProductList = ({ data, handleClick }) => {
	const { items, pageInfo } = data;
	return useMemo(
		() => (
			<Grid columns={1}>
				{items.map((item, index) => {
					const { final_price, regular_price } = item.price_range.maximum_price;
					const finalPrice = final_price.value != regular_price.value ? final_price.value : null;
					return (
						<Grid.Column key={`${item.sku}-${index}`}>
							<Segment compact attached='top'>
								{finalPrice ? (
									<>
										<Label color='red' ribbon>
											Disc
										</Label>
										<Header as='span' size='medium'>
											{item.name}
										</Header>
									</>
								) : (
									<Header as='span' size='medium'>
										{item.name}
									</Header>
								)}
                                <Divider/>
								<Link href={`/product/${item.url_key}`}>
									<div>
										<Image fluid src={item.image.url} />
										<div>
											{finalPrice ? (
												<Label size='medium' color='teal'>
													{`${regular_price.currency} ${finalPrice}`}
												</Label>
											) : null}
											<Label size='medium' color='teal'>
												{finalPrice ? <s>{`${regular_price.currency} ${regular_price.value}`}</s> : `${regular_price.currency} ${regular_price.value}`}
											</Label>
										</div>
									</div>
								</Link>
								<Button style={{ marginTop: "15px" }} animated='fade' fluid primary onClick={() => {
                                    handleClick(item)
                                }}>
									<Button.Content visible>
										<Icon name='shop' />
									</Button.Content>
									<Button.Content hidden>Add to Cart</Button.Content>
								</Button>
							</Segment>
						</Grid.Column>
					);
				})}
			</Grid>
		),
		[items]
	);
};

export default ProductList;
