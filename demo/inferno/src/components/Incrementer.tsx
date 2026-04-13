import { Component } from 'inferno';
import { addOne } from '../utils/math';
import { Visualizer } from './Visualizer';

import './Incrementer.scss';

interface Props {
	name: string;
}

/*
 * The first interface defines prop shape
 * The second interface defines state shape
 */
export class Incrementer extends Component<Props, { value: number }> {
	public state = {
		value: 1
	};

	constructor(props, context) {
		super(props, context);
	}

	public doMath = () => {
		this.setState({
			value: addOne(this.state.value)
		});
	}

	public render() {
		// uncomment: example of type verification
		//
		// this.props.name = 1;
		// this.props.bar = 1;

		return (
			<div>
				{this.props.name}
				<button className="my-button" onClick={this.doMath}>Increment</button>
				<Visualizer value={this.state.value + 'THIS SHOULD FAIL ( npm run check )!'} />
			</div>
		);
	}
}
