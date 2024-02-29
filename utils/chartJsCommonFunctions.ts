/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable no-unneeded-ternary */
import { GraphType } from '@components/Graph';

export const createGraphValues = (
    graphType: GraphType,
    data: any,
): any => {
    let options: any = {
        maintainAspectRatio: true,
        // cutoutPercentage: 80,
        elements: {
            borderWidth: 10,
        },
        hover: {
            mode: null,
        },
    };


    // Styling for doughnut chart
    if (graphType === GraphType.Doughnut) {
        options.responsive = true;
    }

    // Styling for line Chart
    if (graphType === GraphType.Line) {
        options = {
            ...options,
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                }
            }
        }
    }

    if (graphType === GraphType.LineGrid) {
        options = {
            ...options,
            scales: {
                x: {
                    display: false,
                },
                y: {
                    beginAtZero: false,
                    grid: {
                        display: false,
                    },
                },
            }
        }
    }


    return {
        type: graphType,
        options,
        graphData: {
            ...(data.labels && { labels: data.labels }),
            datasets: [data],
        },
    };
};