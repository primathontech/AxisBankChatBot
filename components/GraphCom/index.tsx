/* eslint-disable no-return-assign */
import React from 'react'

import Graph, { GraphType } from '@components/Graph'
import { createGraphValues } from '@utils/chartJsCommonFunctions';
// import RightArrow from "../../public/images/svgs/right-up-arrow.svg";
// import DownArrow from "../../public/images/svgs/down-arrow.svg";
// import InfoIcon from "../../public/images/svgs/info.svg";
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
    let delayed: boolean;
    // const [buttonClick, setButtonClick] = useState(false)
    // const ScholarshipAmountWiseGraphValues = createGraphValues(GraphType.Line, {
    //     data: [482, 765, 134, 589, 257, 701, 318, 923],
    //     labels: ["abc", "efg", "rgtn", "brje", "db", "dvs", "bfjl", "abc"],
    //     borderColor: "#a23",
    //     pointStyle: false,
    //     borderWidth: 1,
    //     cubicInterpolationMode: 'monotone',
    // });
    let dougnut;
    let lineChart;
    let dataoOfDougnut;
    let dataofLineChart;
    if (type === "pie") {
        dataoOfDougnut = data?.map((item: any) => item.count);
        const labels = data?.map((item: any) => item.label);
        const colors = data?.map((item: any) => `#${item.color}`)

        dougnut = createGraphValues(GraphType.Doughnut, {
            data: dataoOfDougnut,
            labels,
            backgroundColor: colors,
        });
    } else {
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

    let sum = 0;
    if (type === "pie") {
        dataoOfDougnut?.map((value: number) => (sum += value));
    }

    return (
        <div className={type === "line" ? styles.container : ""}>
            {title && type !== "line" && <div className={styles.headingWrapper}>
                <div className={styles.heading}>
                    <p>{title}</p>
                </div>
                <p className={styles.amount}>{dataType !== "percentage" && `₹ ${convertToIndianNumberFormat(sum)}`}</p>
            </div>}
            {type === "pie" && < div className={styles.doughnutGraphContainer}>
                <div className={styles.detailsContainer}>
                    {data.map((item: any) => <div>
                        <p className={styles.percentage}>{dataType === "percentage" ? `${Math.round(item.count)} %`
                            : `₹ ${Math.round(item.count).toLocaleString('en-IN')}`}</p>
                        <p className={styles.heading} style={{ color: `#${item.color}` }}><span style={{ color: "#4B5563" }}>{item.label}</span></p>
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

        </div >
    )
}

export default GraphCom;

/* {type === "line" && <button type='button' className={styles.button} onClick={() => 
            setButtonClick(!buttonClick)}>
                <span>
                    View current capital Status
                </span>
                <DownArrow />
            </button>}

            {
                buttonClick && type === "line" && <div className={styles.allLineGraphs}>
                    <div className={styles.lineGraphContainer}>
                        <div>
                            <p className={styles.heading}>Mutual Fund</p>
                            <div className={styles.valueContainer}>
                                <span className={styles.value}>12,00,000</span>
                                <span>
                                    <span className={styles.image}>
                                        <RightArrow />
                                    </span>
                                    <span className={styles.percentageIncrease}>3.4%</span>
                                </span>
                            </div>
                        </div>
                        <div style={{ width: "65px" }}>
                            <Graph
                                graphData={ScholarshipAmountWiseGraphValues.graphData}
                                graphType={ScholarshipAmountWiseGraphValues.type}
                                graphOptions={ScholarshipAmountWiseGraphValues.options}
                            />
                        </div>
                    </div>
                    <div className={styles.lineGraphContainer}>
                        <div>
                            <p className={styles.heading}>Stocks</p>
                            <div className={styles.valueContainer}>
                                <span className={styles.value}>5,00,000</span>
                                <span>
                                    <span className={styles.image}>
                                        <RightArrow />
                                    </span>
                                    <span className={styles.percentageIncrease}>5.4%</span>
                                </span>
                            </div>
                        </div>
                        <div style={{ width: "65px" }}>
                            <Graph
                                graphData={ScholarshipAmountWiseGraphValues.graphData}
                                graphType={ScholarshipAmountWiseGraphValues.type}
                                graphOptions={ScholarshipAmountWiseGraphValues.options}
                            />
                        </div>
                    </div>
                    <div className={styles.lineGraphContainer}>
                        <div>
                            <p className={styles.heading}>Fixed Income</p>
                            <div className={styles.valueContainer}>
                                <span className={styles.value}>12,00,000</span>
                                <span>
                                    <span className={styles.image}>
                                        <RightArrow />
                                    </span>
                                    <span className={styles.percentageIncrease}>1.1%</span>
                                </span>
                            </div>
                        </div>
                        <div style={{ width: "65px" }}>
                            <Graph
                                graphData={ScholarshipAmountWiseGraphValues.graphData}
                                graphType={ScholarshipAmountWiseGraphValues.type}
                                graphOptions={ScholarshipAmountWiseGraphValues.options}
                            />
                        </div>
                    </div>
                </div>
            } */
