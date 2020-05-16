import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { Header, Segment, Container, Grid, Accordion, Dimmer, Loader } from "semantic-ui-react";
import { CATEGORY_LIST } from "../graphql";
import { withApollo } from "../lib/apollo";
import Layout from "../components/Layout";
import Link from "next/link";

const square = { width: "100vw" };

const IndexPage = () => {
	const { data, loading } = useQuery(CATEGORY_LIST);
	const [activeIndex, setActiveIndex] = useState(-1);
	let content;

	const handleClick = (e, titleProps) => {
		const { index } = titleProps;
		const newIndex = activeIndex === index ? -1 : index;

		setActiveIndex(newIndex);
	};

	if (loading) {
		content = (
			<Container fluid>
				<Segment style={{ height: "100vh", widht: "100%" }}>
					<Dimmer>
						<Loader content='Loading' />
					</Dimmer>
				</Segment>
			</Container>
		);
	}

	if (data) {
		const [defaultCategory] = data.categoryList;
		const { children: mainCategory } = defaultCategory;

		content = (
			<Layout>
				<Grid centered columns={1} padded='vertically' as={Accordion}>
					{mainCategory.map((item, index) => (
						<div key={index}>
							<Grid.Column as={Accordion.Title} active={activeIndex === 0} index={index} onClick={handleClick}>
								<Segment circular style={square} inverted>
									<Header as='h2'>
										{item.name}
									</Header>
								</Segment>
							</Grid.Column>
							<Grid.Row columns={2} as={Accordion.Content} active={activeIndex === index}>
								<Grid.Column>
									{item.children != 0
										? item.children.map((child, i) => (
												<Link key={i} href={`/category/${child.id}`} as={`/category/${child.id}`}>
													<Segment circular style={square}>
														<Header as='h2'>
															{child.name}
														</Header>
													</Segment>
												</Link>
										  ))
										: "No Category"}
								</Grid.Column>
							</Grid.Row>
						</div>
					))}
				</Grid>
			</Layout>
		);
	}

	return content;
};

export default withApollo(IndexPage);
