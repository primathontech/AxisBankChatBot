import React, { useState } from 'react'

import Graph, { GraphType } from '@components/Graph'
import { createGraphValues } from '@utils/chartJsCommonFunctions';
import RightArrow from "../../public/images/svgs/right-up-arrow.svg";
import DownArrow from "../../public/images/svgs/down-arrow.svg";
import styles from "./styles.module.scss"

const GraphCom = () => {
    const [buttonClick, setButtonClick] = useState(false)
    const ScholarshipAmountWiseGraphValues = createGraphValues(GraphType.Line, {
        data: [482, 765, 134, 589, 257, 701, 318, 923],
        labels: ["abc", "efg", "rgtn", "brje", "db", "dvs", "bfjl", "abc"],
        borderColor: "#a23000",
        pointStyle: false,
        borderWidth: 1,
        cubicInterpolationMode: 'monotone',
    });

    const dougnut = createGraphValues(GraphType.Doughnut, {
        data: [20, 80],
        labels: ["abc", "efg"],
        backgroundColor: ["#B2E7E6", "#978FED"],
    });

    return (
        <div>
            <div className={styles.headingWrapper}>
                <div className={styles.heading}>
                    <p>Estimated Capital</p>
                </div>
                <p className={styles.amount}>₹ 50 Lakhs</p>
            </div>
            <div className={styles.doughnutGraphContainer}>
                <div className={styles.detailsContainer}>
                    <div>
                        <p className={styles.percentage}>80%</p>
                        <p className={styles.heading}>Equity/Mutual Fund</p>
                    </div>
                    <div>
                        <p className={styles.percentage}>20%</p>
                        <p className={styles.heading}>Dept/Fixed Income</p>
                    </div>
                </div>
                <div style={{ height: "96px", width: "96px" }}>
                    <Graph
                        graphData={dougnut.graphData}
                        graphType={dougnut.type}
                        graphOptions={dougnut.options}
                    />
                </div>
            </div>
            <button type='button' className={styles.button} onClick={() => setButtonClick(!buttonClick)}>
                <span>
                    View current capital Status
                </span>
                <DownArrow />
            </button>

            {buttonClick && <div className={styles.allLineGraphs}>
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
            </div>}
        </div>
    )
}

export default GraphCom;