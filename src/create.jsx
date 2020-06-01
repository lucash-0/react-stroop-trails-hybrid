import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const UnicodeStart = 97;

const styles = {
	toolbar: {
		position: "fixed",
		bottom: 0,
		left: 0,
		width: "100%",
		textAlign: "right"
	}
}

class Create extends React.Component {

	static propTypes = {
		classes: PropTypes.object.isRequired,
		source: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		alphaNumeric: PropTypes.bool
	}

	static defaultTypes = {
		alphaNumeric: false
	}

	state = {
		origin: undefined,
		diameter: 0,
		width: 0,
		height: 0,
		positions: [],
		diameterPoints: [],
		widthPoints: [],
		heightPoints: [],
		measureDiameter: false,
		measureWidth: false,
		measureHeight: false,
		showImage: true
	}

	handleNewPosition = (e) => {
		let x = e.nativeEvent.offsetX,
			y = e.nativeEvent.offsetY;

		if (this.state.measureDiameter) {
			this.setState(prev => {
				prev.diameterPoints.push({ x: x, y: y });
				if (prev.diameterPoints.length == 2) {
					prev.diameter = Math.floor(Math.sqrt(
						Math.pow(prev.diameterPoints[1].x - prev.diameterPoints[0].x, 2) +
						Math.pow(prev.diameterPoints[1].y - prev.diameterPoints[0].y, 2)
					));
				}
				return { diameterPoints: prev.diameterPoints, diameter: prev.diameter, measureDiameter: prev.diameterPoints.length != 2 };
			});;
			return
		}

		if (this.state.measureWidth) {
			this.setState(prev => {
				prev.widthPoints.push({ x: x, y: y });
				if (prev.widthPoints.length == 2) {
					prev.width = Math.floor(prev.widthPoints[1].x - prev.widthPoints[0].x);
				}
				return { widthPoints: prev.widthPoints, width: prev.width, measureWidth: prev.widthPoints.length != 2 };
			});
			return;
		}

		if (this.state.measureHeight) {
			this.setState(prev => {
				prev.heightPoints.push({ x: x, y: y });
				if (prev.heightPoints.length == 2) {
					prev.height = Math.floor(prev.heightPoints[1].y - prev.heightPoints[0].y);
				}
				return { heightPoints: prev.heightPoints, height: prev.height, measureHeight: prev.heightPoints.length != 2 };
			});
			return;
		}

		if (typeof this.state.origin === 'undefined') {
			this.setState({ origin: { x: x, y: y } });
			return;
		}

		let text;
		if (this.props.alphaNumeric) {
			if (this.state.positions.length % 2 == 0) {
				text = (this.state.positions.length + 2) / 2 + "";
			} else {
				text = String.fromCharCode((this.state.positions.length - 1) / 2 + UnicodeStart);
			}
		} else {
			text = (this.state.positions.length + 1) + "";
		}
		this.setState(prev => {
			prev.positions.push({
				x: x - prev.origin.x,
				y: y - prev.origin.y,
				text: text
			})
			return { positions: prev.positions }
		});
	}

	measuring = () => {
		return this.state.measureDiameter ||
			this.state.measureWidth ||
			this.state.measureHeight ||
			this.state.heightPoints.length == 1 ||
			this.state.widthPoints.length == 1 ||
			this.state.diameterPoints.length == 1
	}

	renderContent = () => {
		if (this.state.showImage) {
			return <img src="img" style={{height:"100vh"}} src={this.props.source} type={this.props.type} onClick={this.handleNewPosition}/>;
		}
		return <pre style={{textAlign:"left"}}>{ JSON.stringify({
			width: this.state.width,
			height: this.state.height,
			diameter: this.state.diameter,
			tokens: this.state.positions,
		},null,2) }</pre>;
	}

	renderButtonImage = () => {
		if (this.state.showImage) {
			return <Button onClick={()=>{ this.setState({showImage:false})}}>Show Data</Button>
		}
		return <Button onClick={()=>{ this.setState({showImage:true})}}>Show Image</Button>
	}

	renderButtonDiameter = () => {
		if (this.state.diameterPoints.length > 0 || this.measuring()) {
			return null;
		}
		return <Button onClick={()=>{ this.setState({measureDiameter:true})}}>Measure Diameter</Button>
	}

	renderButtonWidth = () => {
		if (this.state.widthPoints.length > 0 || this.measuring()) {
			return null;
		}
		return <Button onClick={()=>{ this.setState({measureWidth:true})}}>Measure Width</Button>
	}

	renderButtonHeight = () => {
		if (this.state.heightPoints.length > 0 || this.measuring()) {
			return null;
		}
		return <Button onClick={()=>{ this.setState({measureHeight:true})}}>Measure Height</Button>
	}

	render() {
		return (
			<div>
				<div style={{textAlign:"center"}}>
					{ this.renderContent() }
				</div>
				<div className={this.props.classes.toolbar}>
					{ this.renderButtonImage() }
					{ this.renderButtonDiameter() }
					{ this.renderButtonWidth() }
					{ this.renderButtonHeight() }
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Create);
