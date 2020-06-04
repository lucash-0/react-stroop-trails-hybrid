import React from "react";
import PropTypes from "prop-types";
import Styles from "styles";
import { withStyles } from "@material-ui/core/styles";

class Marker extends React.PureComponent {
  static propTypes = {
    rx: PropTypes.number.isRequired,
    ry: PropTypes.number.isRequired,
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    colour: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
    theme: PropTypes.object,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    classes: PropTypes.any.isRequired,
  };

  render() {
    let x = this.props.cx - this.props.r,
      y = this.props.cy - this.props.r,
      width = this.props.r * 2,
      height = this.props.r * 2,
      stroke = this.props.theme.stroke,
      strokeWidth = this.props.theme.strokeWidth,
      fill = this.props.theme.fill;

    return (
      <g
        transform={"translate(" + this.props.cx + "," + this.props.cy + ")"}
        onClick={this.props.onClick}
        className={this.props.classes.marker}
      >
        <ellipse
          cx={0}
          cy={0}
          rx={this.props.rx}
          ry={this.props.ry}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
        />
        <text
          x="0"
          y="0"
          textAnchor="middle"
          dy=".3em"
          fontSize={this.props.fontSize}
          fill={"#" + this.props.colour}
        >
          {this.props.text.toLowerCase()}
        </text>
      </g>
    );
  }
}

export default withStyles(Styles)(Marker);
