import React from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Trails from './trails';

// const UnicodeStart = 97;

const styles = {
	toolbar: {
		position: "fixed",
		bottom: 0,
		left: 0,
		width: "100%",
		textAlign: "right"
	}
};

class Test extends React.Component {

	static propTypes = {
		part: PropTypes.string.isRequired,
	}

	state = {
		start: undefined,
		stop: undefined,
		data: [],
		progress: 0,
		showTest: true
	}

	componentWillMount() {
		this.setState({ start: new Date().getTime() });
	}

	update = (type, date, correctToken, selectedToken) => {
		this.setState(prev => {
			prev.data.push({ stamp: date.getTime(), type: type, correctToken: correctToken, selectedToken: selectedToken });
			if (type === "Success") {
				prev.progress++;
			}
			return { data: prev.data, progress: prev.progress };
		});
	}

	handleSuccess = (date, token) => {
		this.update("Success", date, token, token);
	}

	handleError = (date, correctToken, selectedToken) => {
		this.update("Error", date, correctToken, selectedToken);
	}

	handleCompleted = (date) => {
		this.setState({ stop: date.getTime() });
	}

	handleMiss = (date, correctToken, x, y) => {
		this.update("Miss", date, correctToken, { text: "", x: x, y: y });
	}

	handleRetry = () => {
		this.setState({ progress: 0 });
	}

	renderContent = () => {
		if (this.state.showTest) {
			return (
				<Trails
					beginEndLabels
					completedText={"Completed! Please press the next button"}
					errorDuration={500}
					errorText="X"
					feedback
					onCompleted={this.handleCompleted}
					onError={this.handleError}
					onMiss={this.handleMiss}
					onRetry={this.handleRetry}
					onSuccess={this.handleSuccess}
					part={this.props.part}
					progress={this.state.progress}
					retry
				/>
			);
		}
		const { start, stop, data } = this.state;
		const debugData = JSON.stringify({ start, stop, data }, null, 2);
		return (
			<pre style={{ textAlign: "left" }}>
				{debugData}
			</pre>
		);
	}

	renderButton = () => {
		if (this.state.showTest) {
			return <Button onClick={()=>{ this.setState({ showTest: false }); }}>Show Data</Button>;
		}
		return <Button onClick={()=>{ this.setState({ showTest: true }); }}>{"Show Trails " + this.props.part}</Button>;
	}

	render() {
		return (
			<React.Fragment>
				<div style={{textAlign:"center", height:"100%"}}>
					{ this.renderContent() }
				</div>
				<div className={this.props.classes.toolbar}>
					{ this.renderButton() }
				</div>
			</React.Fragment>
		)
	}
}

export default withStyles(styles)(Test);
