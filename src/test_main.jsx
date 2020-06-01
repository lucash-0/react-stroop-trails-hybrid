import React from 'react';
import ReactDOM from 'react-dom';
import Test from 'test';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	'@global': {
		'.trails-svg': {
			background: 'linen',
			width: '100%',
			height: '100%'
		}
	},
	wrapper: {
		border: '4px solid black',
		margin: '0 auto',
		height: '55vh',
		width: '75vw'
	}
};

const Testt = props => (
	<div>
		<div style={{ color: 'black', textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center' }}>Sample</div>
		<div className={props.classes.wrapper}>
			<Test part="ASample" />
		</div>
	</div>
);

const TestWithStyles = withStyles(styles)(Testt);

ReactDOM.render(<TestWithStyles />, document.getElementById('root'));
