import { useContext, createContext } from "react";

export const CategoryContext = createContext();

const actions = {
	SET_CATEGORIES: "SET_CATEGORIES",
	CHOOSE_CATEGORY: "CHOOSE_CATEGORY",
};

export const CategoryReducer = (state, action) => {
	let newState = [...state];
	switch (action.type) {
		//SET_CATEGORIES
		case actions.SET_CATEGORIES:
			const newState = action.payload;
			return newState;
		case actions.CHOOSE_CATEGORY:
			const categoryId = action.payload;
			return newState.map((category) => {
				if (category.id === categoryId) {
					category.isSelected = true;
				} else {
					category.isSelected = false;
				}
				return category;
			});
		default:
			return newState;
	}
};

export const useCategoryContext = () => {
	//
	const { state, dispatch } = useContext(CategoryContext);

	const setCategoryList = (categories) =>
		dispatch({
			type: actions.SET_CATEGORIES,
			payload: categories,
		});

	const chooseCategory = (categoryId) =>
		dispatch({
			type: actions.CHOOSE_CATEGORY,
			payload: categoryId,
		});

	const categories = state;

	return {
		categories,
		setCategoryList,
		chooseCategory,
	};
};
