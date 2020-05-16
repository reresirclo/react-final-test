import gql from "graphql-tag";

const CATEGORY_LIST = gql`
	query CategoryList {
		categoryList {
			children {
				name
				image
				children {
					id
					name
				}
			}
		}
	}
`;

const CATEGORY_LIST_BY_ID = gql`
	query CategoryListById($catId: String!) {
		categoryList(filters: { ids: { eq: $catId } }) {
			name
			image
			description
		}
	}
`;

const PRODUCT_LIST = gql`
	query Products($catId: String!, $page: Int!) {
		products(filter: { category_id: { eq: $catId } }, currentPage: $page, pageSize: 8) {
			total_count
			items {
				id
				name
				url_key
				sku
				image {
					url
				}
				price_range {
					maximum_price {
						final_price {
							currency
							value
						}
						regular_price {
							currency
							value
						}
					}
				}
			}
			page_info {
				current_page
				total_pages
				page_size
			}
		}
	}
`;

const PRODUCT_DETAIL = gql`
	query Products($urlKey: String!) {
		products(filter: { url_key: { eq: $urlKey } }) {
			total_count
			items {
				id
				sku
				name
				image {
					url
				}
				description {
					html
				}
				price_range {
					maximum_price {
						final_price {
							currency
							value
						}
						regular_price {
							currency
							value
						}
					}
				}
			}
			page_info {
				current_page
				total_pages
				page_size
			}
		}
	}
`;

export { CATEGORY_LIST, PRODUCT_LIST, PRODUCT_DETAIL, CATEGORY_LIST_BY_ID };
