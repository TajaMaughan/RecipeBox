import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const RecipeItem = ({ recipe }) => {
	const { title, url, tags } = recipe;
	return (
		<Fragment>
			<div className="card red lighten-5">
				<div className="card-content black-text">
					<div className="card-title center">
						<a
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							className="cyan-text text-darken-4"
						>
							{title}
						</a>
					</div>
					<div className="section">
						{tags.map(tag => (
							<div className="chip red lighten-2 white-text">{tag}</div>
						))}
					</div>
					<div className="right row">
						<div className="col">
							<a
								href="#!"
								className="waves-effect waves-red btn-small red lighten-3 cyan-text text-darken-2"
							>
								Edit
							</a>
						</div>
						<div className="col">
							<a
								href="#!"
								className="waves-effect waves-red btn-small red lighten-3 cyan-text text-darken-2 col"
							>
								Delete
							</a>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

RecipeItem.propTypes = {
	recipe: PropTypes.object.isRequired
};

export default RecipeItem;
