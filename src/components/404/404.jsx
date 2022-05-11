import React from 'react';
import './404.css';
function ErrorPage() {
	return (
		<div>
			<section id='not-found'>
				<div className='circles'>
					<p>
						404
						<small>PAGE NOT FOUND</small>
					</p>
					<span className='circle big'></span>
					<span className='circle med'></span>
					<span className='circle small'></span>
				</div>
			</section>
		</div>
	);
}

export default ErrorPage;
