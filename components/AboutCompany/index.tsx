/* eslint-disable no-nested-ternary */
// @ts-nocheck
import Image from 'next/image'
import React from 'react'
import Typing from "react-typing-animation";
import LargeScale from "@public/images/svgs/large-scale.svg"
import Risk from "@public/images/svgs/risk.svg"
import UpArrow from "@public/images/svgs/right-up-arrow.svg"
import DownArrow from "@public/images/svgs/right-down-arrow.svg"
import { createGraphValues } from '@utils/chartJsCommonFunctions';
import Graph, { GraphType } from '@components/Graph';

import { convertDate } from '@utils/convertDate';
import { COLORS } from 'constants/appColors';
import styles from "./styles.module.scss";

type AboutComapnyProps = {
    data: any;
}

const AboutCompany = (props: AboutComapnyProps) => {
    const { data } = props;
    const totalDuration = 1500;
    const delayBetweenPoints = totalDuration / data?.growthData?.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
        x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN,
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        },
        y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        }
    }
    const dataofLineChart = data?.growthData?.map((item) => item.count)
    const labels = data?.growthData?.map((item) => convertDate(item.label))
    const lineChart = createGraphValues(GraphType.Line, {
        data: dataofLineChart,
        labels,
        borderColor: COLORS.PURPLE,
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: COLORS.PURPLE,
        pointRadius: 0,
        animation,
        backgroundColor: (context: any) => {
            const bgColor = [COLORS.CLASSIC_ROSE,
            COLORS.PINK_LACE,
            COLORS.LAVENDER_BLUSH,
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
                        <Image src={data?.imageURL} alt='' width={124} height={25} />
                        <p className={styles.stockType} style={{
                            backgroundColor:
                                data?.action.toLowerCase() === "buy" ? COLORS.MINT_CREAM :
                                    data?.action.toLowerCase() === "sell" ? COLORS.SNOW : COLORS.LOTION,
                            color:
                                data?.action.toLowerCase() === "buy" ? COLORS.GREEN :
                                    data?.action.toLowerCase() === "sell" ? COLORS.PINK : COLORS.GREY,
                            border:
                                data?.action.toLowerCase() === "buy" ? `0.3px solid ${COLORS.GREEN}` :
                                    data?.action.toLowerCase() === "sell" ? `0.3px solid ${COLORS.LIGHT_PINK}`
                                        : `0.3px solid ${COLORS.LIGHT_WHITE}`
                        }}>{data?.action.slice(0, 1) + data?.action.slice(1).toLowerCase()}</p>
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
                {data?.value && <hr style={{ borderTop: `1px solid ${COLORS.BRIGHT_GREY}` }} />}
                <div className={styles.downContainer}>
                    {data?.value && <div className={styles.stockValueContainer}>
                        <span className={styles.stockValue}>₹ {parseFloat(data?.value, 10).toLocaleString("en-IN")}</span>
                        <span className={styles.returns} style={{
                            color: data?.returnValue > 0 ?
                                COLORS.GREEN : COLORS.RED
                        }}>
                            {data?.returnValue > 0 ?
                                <UpArrow style={{ paddingTop: "3px" }} /> :
                                <DownArrow style={{ paddingTop: "3px" }} />}
                            &nbsp;{data?.returnValue} ({data?.returnPercentage}%)
                        </span>
                    </div>}
                    <div className={styles.stockDetails}>
                        {data?.peRatio && <div>
                            <p className={styles.stockDetailsHeading}>PE Ratio</p>
                            <p className={styles.stockDetailsValue}>{(data?.peRatio)}</p>
                        </div>}
                        {data?.marketCap && <div>
                            <p className={styles.stockDetailsHeading}>Market Cap</p>
                            <p className={styles.stockDetailsValue}>₹ {data?.marketCap.toLocaleString("en-IN")}</p>
                        </div>}
                        {data?.yearReturns && <div>
                            <p className={styles.stockDetailsHeading}>1 Y Returns</p>
                            <p style={{ color: data?.yearReturns > 0 ? COLORS.GREEN : COLORS.RED, display: "flex" }}
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
