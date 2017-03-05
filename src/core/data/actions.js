export const ActionTypes = {
	Items: {
		INIT: 'items::init',
		UPDATE: 'items::update',
		ADD: 'items::add'
	},
	Tags: {
		INIT: 'tags::init',
		ADD: 'tags::add'
	}
};

// ------------ ITEM ACTIONS ----------- //
export function initItems (items) {
	return {
		type: ActionTypes.Items.INIT,
		payload: items
	};
}

export function updateItem (item) {
	return {
		type: ActionTypes.Items.UPDATE,
		payload: item
	};
}

export function addItem (id) {
	return {
		type: ActionTypes.Items.ADD,
		payload: {
			id,
			created: Date.now(),
			tags: '',
			title: 'untitled',
			image: undefined,
			thumbnail: undefined
		}
	};
}

// ------------- TAG ACTIONS ------------ //
export function initTags (tags) {
	return {
		type: ActionTypes.Tags.INIT,
		payload: tags
	};
}

export function addTag (newTag) {
	return {
		type: ActionTypes.Tags.ADD,
		payload: newTag
	};
}
