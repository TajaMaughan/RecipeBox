import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddRecipeModal = () => {
	const [recipe, setRecipe] = useState({
		title: '',
		url: '',
		tags: []
	});

	const { title, url, tags } = recipe;

	const onChange = e =>
		setRecipe({
			...recipe,
			[e.target.name]: e.target.value
		});

	const onSubmit = () => {
		if (title === '' || url === '') {
			M.toast({ html: 'Please enter a title and url' });
		} else {
			const newRecipe = {
				title,
				url,
				tags
			};

			// addRecipe(newRecipe);

			// Clear Fields
		}
	};

	return (
		<div
			id="add-recipe-modal"
			className="modal teal lighten-5"
			style={modalStyle}
		>
			<div className="modal-content">
				<h4>Recipe Info</h4>
				<div className="row">
					<div className="input-field">
						<input type="text" name="title" volue={title} onChange={onChange} />
						<label htmlFor="title" className="active">
							Title
						</label>
					</div>
					<div className="row">
						<div className="input-field">
							<input type="text" name="url" volue={url} onChange={onChange} />
							<label htmlFor="url" className="active">
								Url
							</label>
						</div>
					</div>
					<div className="row">
						<div className="chips chips-placeholder" placeholder="tags"></div>
					</div>
				</div>
				<div className="modal-footer teal lighten-5">
					<a
						href="#!"
						onClick={onSubmit}
						className="modal-close waves-effect waves-red red lighten-1 btn"
					>
						Enter{' '}
					</a>
				</div>
			</div>
		</div>
	);
};

const modalStyle = {
	width: '75%',
	height: '75%'
};

export default AddRecipeModal;
