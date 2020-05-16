import Layout from "../components/Layout";
import { withRedux } from "../lib/redux";
import { useSelector } from "react-redux";

const useCart = () => {
	return useSelector((state) => ({
		cart: state.cart,
	}));
};

const Cart = () => {
	const { cart } = useCart();

	const asd = cart.reduce((acc, obj) => {
		let key = obj.sku;
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(obj);
		return acc;
    }, {});
    
	return (
		<Layout>
			{cart.map((item) => (
				<div>{item.name} {asd[item.sku].length}</div>
			))}
		</Layout>
	);
};

export default withRedux(Cart);
