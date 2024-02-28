import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
	return (
		<div>
			<h1>404 Not Found</h1>
			<p>Sorry, we couldn't find what you were looking for.</p>
			<Link to='/'>Go Home</Link>
		</div>
	);
};

export default NotFound;
