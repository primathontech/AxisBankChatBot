/* eslint-disable no-return-assign */
import React from 'react'

import Graph, { GraphType } from '@components/Graph'
import { createGraphValues } from '@utils/chartJsCommonFunctions';
import { convertToIndianNumberFormat } from '@utils/convertToIndianNumber';
import styles from "./styles.module.scss";

type DataType = {
    type: string;
    data: any;
    title: string;
    dataType: string;
}

const GraphCom = (props: DataType) => {
    const { type, data, title, dataType } = props;
    const ColorPalette = ["#97144D", "#BD6474", "#FF9595", "#CA5E8D", "#CA925E", "#DD5E5E", "#581633", "#DD0060", "#C1582B", "#7A371A"];
    let delayed: boolean;
    let dougnut;
    let lineChart;
    let barChart;
    let dataoOfDougnut;
    let dataofLineChart;

    if (type === "pie") {
        const { length } = data;
        dataoOfDougnut = data?.map((item: any) => item.count);
        const labels = data?.map((item: any) => item.label);
        const colors = ColorPalette.slice(0, length)

        dougnut = createGraphValues(GraphType.Doughnut, {
            data: dataoOfDougnut,
            labels,
            backgroundColor: colors,
        });
    } else if (type === "line") {
        dataofLineChart = data?.map((item: any) => Math.round(item.count));
        const labels = data?.map((item: any) => item.label);

        lineChart = createGraphValues(GraphType.LineGrid, {
            data: dataofLineChart,
            labels,
            borderColor: "#97144D",
            borderWidth: 2,
            cubicInterpolationMode: 'monotone',
            fill: true,
            pointBackgroundColor: "#97144D",
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context: any) => {
                    let delay = 0;
                    if (context.type === "data" && context.mode === "default" && !delayed) {
                        delay = context.dataIndex * 300 + context.datasetIndex * 100;
                    }
                    return delay;
                },
            },
            backgroundColor: (context: any) => {
                const bgColor = ['rgba(244,211,231)',
                    'rgba(247,225,239)',
                    'rgba(251,240,247)',
                ];
                if (!context.chart.chartArea) {
                    return;
                }
                const { ctx, chartArea: { top, bottom } } = context.chart;
                const grad = ctx.createLinearGradient(0, top, 0, bottom);
                grad.addColorStop(0, bgColor[0]);
                grad.addColorStop(0.5, bgColor[1]);
                grad.addColorStop(1, bgColor[2]);

                // eslint-disable-next-line consistent-return
                return grad;
            }
        });
    }
    else if (type === "bar") {
        const dataOfBar = data?.map((item: any) => item.count);
        const labels = data?.map((item: any) => item.label);
        const colors = data?.map(() => "#FFDADA")

        barChart = createGraphValues(GraphType.Bar, {
            data: dataOfBar,
            labels,
            backgroundColor: colors,
        });
    }

    let sum = 0;
    if (type === "pie") {
        dataoOfDougnut?.map((value: number) => (sum += value));
    }

    return (
        <div className={type === "line" ? styles.container : ""}>
            {title && type !== "line" && type !== "bar" && <div className={styles.headingWrapper}>
                <div className={styles.heading}>
                    <p>{title}</p>
                </div>
                <p className={styles.amount}>{dataType !== "percentage" && `₹ ${convertToIndianNumberFormat(sum)}`}</p>
            </div>}
            {type === "pie" && < div className={styles.doughnutGraphContainer}>
                <div className={styles.detailsContainer}>
                    {data.map((item: any, index: any) => <div>
                        <p className={styles.percentage}>{dataType === "percentage" ? `${Math.round(item.count)}%`
                            : `₹ ${Math.round(item.count).toLocaleString('en-IN')}`}</p>
                        <p className={styles.heading} style={{ color: `${ColorPalette[index]}` }}><span style={{ color: "#4B5563" }}>{item.label}</span></p>
                    </div>)}
                </div>
                <div className={styles.graphCon}>
                    <Graph
                        graphData={dougnut.graphData}
                        graphType={dougnut.type}
                        graphOptions={dougnut.options}
                    />
                </div>
            </div>}
            {type === "line" && <div className={styles.lineGraph}
            >
                <p className={styles.lineText}>Growth Graph</p>
                <Graph
                    graphData={lineChart.graphData}
                    graphType={lineChart.type}
                    graphOptions={lineChart.options}
                />
            </div>}
            {type === "bar" && <div className={styles.barGraph}
            >
                <Graph
                    graphData={barChart.graphData}
                    graphType={barChart.type}
                    graphOptions={barChart.options}
                />
            </div>}

        </div >
    )
}

export default GraphCom;
