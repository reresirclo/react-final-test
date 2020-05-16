import React from "react";
import PropTypes from "prop-types";
import { Grid, Container, Segment, Button, Divider } from "semantic-ui-react";
import Link from 'next/link'
import Router from 'next/router'

const Layout = ({ children }) => (
	<Grid columns='4' centered>
		<Grid.Column width='4'>
			<Container style={{ paddingTop: "10px", paddingBottom: "10px" }}>
				<Link href='/cart' as={`/cart`}>
					<Button as='a' fluid size='small'>
						Cart
					</Button>
				</Link>

				<Link href='/' as={`/`}>
					<Button as='a' fluid size='small'>
						Home
					</Button>
				</Link>
        <Button as='a' onClick={() => {Router.back()}} fluid size='small'>
						Back
					</Button>
				<Divider />
				{/* <Nav /> */}
				{children}
			</Container>
		</Grid.Column>
	</Grid>
);

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
