import './Visualizer.css';

/*
 * This is example of Inferno functional component
 * Functional components provide great performance but does not have state
 */

interface VisualizerProps {
	value: number;
}

export function Visualizer(props: VisualizerProps) {
	return <div className="visualizer">{props.value}</div>;
}
