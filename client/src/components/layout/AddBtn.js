import React from 'react';

const AddBtn = () => {
	return (
		<div className="fixed-action-btn">
			<a
				href="#add-recipe-modal"
				className="btn-floating btn-large red lighten-1 modal-trigger"
			>
				<i className="large material-icons">add</i>
			</a>
		</div>
	);
};

export default AddBtn;
