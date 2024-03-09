// @ts-nocheck
import Image from 'next/image'
import React from 'react'
import Typing from "react-typing-animation";
import blueStar from "@public/images/pngs/blueStar.png";
import LargeScale from "@public/images/svgs/large-scale.svg"
import Risk from "@public/images/svgs/risk.svg"
import UpArrow from "@public/images/svgs/right-up-arrow.svg"
import DownArrow from "@public/images/svgs/right-down-arrow.svg"
import { createGraphValues } from '@utils/chartJsCommonFunctions';
import Graph, { GraphType } from '@components/Graph';

import styles from "./styles.module.scss";

type AboutComapnyProps = {
    data: any;
}

const AboutCompany = (props: AboutComapnyProps) => {
    const { data } = props;

    let delayed: boolean;
    const dataofLineChart = data?.growthData?.map((item) => item.value)
    const labels = data?.growthData?.map((item) => item.label)
    const lineChart = createGraphValues(GraphType.LineGrid, {
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

    return (
        <div>
            {data?.imageURL && <div className={styles.container} >
                <div className={styles.uppercontainer}>
                    {data?.imageURL && <div className={styles.imageContainer}>
                        <Image src={blueStar} alt='' width={124} height={25} />
                        <p className={styles.stockType}>{data?.action}</p>
                    </div>}
                    {data?.tags && <div className={styles.riskContainer}>
                        <div className={styles.risk}>
                            <LargeScale width={14} height={14} />
                            <p className={styles.riskText}>{data?.tags[0]}</p>
                        </div>
                        <div className={styles.risk}>
                            <Risk width={18} height={9} />
                            <p className={styles.riskText}>{data?.tags[1]}</p>
                        </div>
                    </div>}
                </div>
                {data?.value && <hr style={{ borderTop: "1px solid #EEEFF1" }} />}
                <div className={styles.downContainer}>
                    {data?.value && <div className={styles.stockValueContainer}>
                        <span className={styles.stockValue}>₹ {data?.value}</span>
                        <span className={styles.returns} style={{ color: data?.returnValue > 0 ? "#16A34A" : "#FF0000" }}>
                            {data?.returnValue > 0 ?
                                <UpArrow style={{ paddingTop: "3px" }} /> :
                                <DownArrow style={{ paddingTop: "3px" }} />}
                            &nbsp;{data?.returnValue} ({data?.returnPercentage})
                        </span>
                    </div>}
                    <div className={styles.stockDetails}>
                        {data?.peRatio && <div>
                            <p className={styles.stockDetailsHeading}>PE Ratio</p>
                            <p className={styles.stockDetailsValue}>₹ {parseInt(data?.peRatio, 10).toLocaleString("en-IN")}</p>
                        </div>}
                        {data?.marketCap && <div>
                            <p className={styles.stockDetailsHeading}>Market Cap</p>
                            <p className={styles.stockDetailsValue}>₹ {data?.marketCap.toLocaleString("en-IN")}</p>
                        </div>}
                        {data?.yearReturns && <div>
                            <p className={styles.stockDetailsHeading}>1 Y Returns</p>
                            <p style={{ color: data?.yearReturns > 0 ? "#16A34A" : "#FF0000", display: "flex" }}
                                className={styles.stockDetailsValue}>
                                <span style={{ width: "14px", height: "14px", paddingTop: "2px" }}>
                                    {data?.yearReturns > 0 ? <UpArrow /> : <DownArrow />}
                                </span>
                                {data?.yearReturns}%
                            </p>
                        </div>}
                    </div>
                </div>
                {data?.growthData && <div className={styles.lineGraph}>
                    <Graph
                        graphData={lineChart.graphData}
                        graphType={lineChart.type}
                        graphOptions={lineChart.options}
                    />
                </div>}
            </div>}
            {data?.description && <div className={styles.description}>
                <Typing wrapper="span" speed={20}>
                    {data?.description}
                </Typing>
            </div>}
        </div>
    )
}

export default AboutCompany
