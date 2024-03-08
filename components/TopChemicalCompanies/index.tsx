import React from 'react';
import Icon from "@public/images/pngs/icon.png";
import Image from 'next/image';
import UpArrow from "@public/images/svgs/right-up-arrow.svg";
import DownArrow from "@public/images/svgs/right-down-arrow.svg";

const TopChemicalCompanies = () => (
    <div style={{ marginRight: "-16px", marginLeft: "-16px", marginTop: "16px" }}>
        <div style={{ borderTop: "1px solid #D2D5DA", padding: "16px" }}>
            <div style={{
                borderBottom: "1px solid #D2D5DA", padding: "0px 16px 16px",
                marginRight: "-16px", marginLeft: "-16px"
            }}>
                <div style={{
                    display: "flex", alignContent: "center", columnGap: "30px",
                    justifyContent: "space-between", flexWrap: "wrap", rowGap: "8px"
                }}>
                    <div style={{ display: "flex", alignContent: "center", gap: "4px" }}>
                        <Image src={Icon} alt="" width={16} height={16} style={{ marginTop: "4px" }} />
                        <p style={{ fontFamily: "Lato", fontWeight: 500, fontSize: "15px", color: "#303437" }}>Reliance Industries</p>
                    </div>
                    <p style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "14px", color: "#47494C", alignSelf: "end" }}>1045.20</p>
                </div>
                <div style={{
                    display: "flex", alignContent: "center", columnGap: "30px",
                    justifyContent: "space-between", flexWrap: "wrap", rowGap: "8px"
                }}>
                    <div style={{ display: "flex", alignContent: "center", gap: "4px" }}>
                        <div style={{ fontFamily: "Lato", fontWeight: 500, fontSize: "12px", color: "#9C9C9C" }}>
                            Reliance
                            <span style={{
                                color: "#97144D", fontFamily: "Lato", fontWeight: 500,
                                fontSize: "8px", marginLeft: "8px", background: "#FFEBF6",
                                borderRadius: "3px",
                                padding: "4px 8px"
                            }}>Stock</span>
                        </div>
                    </div>
                    <p style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "10px", color: "#47494C", alignSelf: "end" }}>
                        <UpArrow style={{ paddingTop: "3px" }} />&nbsp;
                        +0.25 (0.031%)
                    </p>
                </div>
            </div>
            <div style={{
                borderBottom: "1px solid #D2D5DA",
                padding: "16px 16px 16px", marginRight: "-16px", marginLeft: "-16px"
            }}>
                <div style={{
                    display: "flex", alignContent: "center", columnGap: "30px",
                    justifyContent: "space-between", flexWrap: "wrap", rowGap: "8px"
                }}>
                    <div style={{ display: "flex", alignContent: "center", gap: "4px" }}>
                        <Image src={Icon} alt="" width={16} height={16} style={{ marginTop: "4px" }} />
                        <p style={{ fontFamily: "Lato", fontWeight: 500, fontSize: "15px", color: "#303437" }}>Reliance Industries</p>
                    </div>
                    <p style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "14px", color: "#47494C", alignSelf: "end" }}>1045.20</p>
                </div>
                <div style={{
                    display: "flex", alignContent: "center", columnGap: "30px",
                    justifyContent: "space-between", flexWrap: "wrap", rowGap: "8px"
                }}>
                    <div style={{ display: "flex", alignContent: "center", gap: "4px" }}>
                        <div style={{ fontFamily: "Lato", fontWeight: 500, fontSize: "12px", color: "#9C9C9C" }}>
                            Reliance
                            <span style={{
                                color: "#97144D", fontFamily: "Lato", fontWeight: 500,
                                fontSize: "8px", marginLeft: "8px", background: "#FFEBF6",
                                borderRadius: "3px",
                                padding: "4px 8px"
                            }}>Stock</span>
                        </div>
                    </div>
                    <p style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "10px", color: "#47494C", alignSelf: "end" }}>
                        <DownArrow style={{ paddingTop: "3px" }} />&nbsp;
                        -0.25 (0.031%)
                    </p>
                </div>
            </div>
            <div style={{ padding: "16px 0px 0px" }}>
                <div style={{
                    display: "flex", alignContent: "center", columnGap: "30px",
                    justifyContent: "space-between", flexWrap: "wrap", rowGap: "8px"
                }}>
                    <div style={{ display: "flex", alignContent: "center", gap: "4px" }}>
                        <Image src={Icon} alt="" width={16} height={16} style={{ marginTop: "4px" }} />
                        <p style={{ fontFamily: "Lato", fontWeight: 500, fontSize: "15px", color: "#303437" }}>Reliance Industries</p>
                    </div>
                    <p style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "14px", color: "#47494C", alignSelf: "end" }}>1045.20</p>
                </div>
                <div style={{
                    display: "flex", alignContent: "center", columnGap: "30px",
                    justifyContent: "space-between", flexWrap: "wrap", rowGap: "8px"
                }}>
                    <div style={{ display: "flex", alignContent: "center", gap: "4px" }}>
                        <div style={{ fontFamily: "Lato", fontWeight: 500, fontSize: "12px", color: "#9C9C9C" }}>
                            Reliance
                            <span style={{
                                color: "#97144D", fontFamily: "Lato", fontWeight: 500,
                                fontSize: "8px", marginLeft: "8px", background: "#FFEBF6",
                                borderRadius: "3px",
                                padding: "4px 8px"
                            }}>Stock</span>
                        </div>
                    </div>
                    <p style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "10px", color: "#47494C", alignSelf: "end" }}>
                        <UpArrow style={{ paddingTop: "3px" }} />&nbsp;
                        +0.25(0.031%)
                    </p>
                </div>
            </div>
        </div>
    </div>
)


export default TopChemicalCompanies