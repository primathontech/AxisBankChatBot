import React, { memo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    ArcElement,
    BarElement,
    Filler,
    Tooltip,
} from 'chart.js';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    ArcElement,
    BarElement,
    Filler,
    Tooltip,
);

// Define an enum for the allowed graph types
export enum GraphType {
    Line = 'line',
    Doughnut = 'doughnut',
    LineGrid = 'lineGrid',
    Bar = 'bar'
    // Add more graph types here
}

// Define a type for graph component mappings
type GraphComponentType = {
    [key in GraphType]: React.ComponentType<any>;
};

// Add different types of graphs here
export const graphComponentsType: GraphComponentType = {
    [GraphType.Line]: Line,
    [GraphType.Doughnut]: Doughnut,
    [GraphType.LineGrid]: Line,
    [GraphType.Bar]: Bar,
};

type GraphProps = {
    graphType: GraphType;
    graphData: any;
    graphOptions?: any;
};

const Graph = (props: GraphProps) => {
    const { graphData, graphType, graphOptions } = props;

    const GraphComponent = graphComponentsType[graphType];

    return <GraphComponent data={graphData} options={graphOptions} />;
};

Graph.defaultProps = {
    graphOptions: null,
};

export default memo(Graph);
