/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable no-unneeded-ternary */
import { GraphType } from '@components/Graph';
import { convertToIndianNumberFormatAbs } from './convertToIndianNumberrAbb';
import { convertYear } from './convertYear';

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
        options = {
            ...options,
            plugins: {
                tooltip: {
                    boxPadding: 8,
                }
            }
        }
    }

    // Styling for line Chart
    if (graphType === GraphType.Line) {
        options = {
            ...options,
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: "rgba(175, 136, 154, 1)",
                        font: {
                            size: 8,
                            family: "Inter",
                        },
                        autoSkip: true,
                        maxTicksLimit: 5
                    },
                },
                y: {
                    beginAtZero: false,
                    border: {
                        display: false
                    },
                    grid: {
                        color: "#DADADA",
                    },
                    ticks: {
                        color: "rgba(175, 136, 154, 1)",
                        callback(value: any) {
                            return convertToIndianNumberFormatAbs(value);
                        },
                        font: {
                            size: 8,
                            family: "Inter",
                        }
                    },
                },
            },
            plugins: {
                tooltip: {
                    boxPadding: 8,
                    displayColors: false,
                }
            }
        }
    }

    if (graphType === GraphType.LineGrid) {
        options = {
            ...options,
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: "rgba(175, 136, 154, 1)",
                        callback(value: any) {
                            return convertYear(value);
                        },
                        font: {
                            size: 8,
                            family: "Inter",
                        }
                    },
                },
                y: {
                    beginAtZero: false,
                    border: {
                        display: false
                    },
                    grid: {
                        color: "#DADADA",
                    },
                    ticks: {
                        color: "rgba(175, 136, 154, 1)",
                        callback(value: any) {
                            return convertToIndianNumberFormatAbs(value);
                        },
                        font: {
                            size: 8,
                            family: "Inter",
                        }
                    },
                },
            },
            plugins: {
                tooltip: {
                    boxPadding: 8,
                    displayColors: false,
                }
            }
        }
    }

    if (graphType === GraphType.Bar) {
        options = {
            ...options,
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: "rgba(175, 136, 154, 1)",
                        callback(value: any) {
                            return convertYear(value);
                        },
                        font: {
                            size: 8,
                            family: "Inter",
                        }
                    },
                },
                y: {
                    beginAtZero: false,
                    border: {
                        display: false
                    },
                    grid: {
                        color: "#DADADA",
                    },
                    ticks: {
                        color: "rgba(175, 136, 154, 1)",
                        callback(value: any) {
                            return convertToIndianNumberFormatAbs(value);
                        },
                        font: {
                            size: 8,
                            family: "Inter",
                        }
                    },
                },
            },
            plugins: {
                tooltip: {
                    boxPadding: 8,
                }
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