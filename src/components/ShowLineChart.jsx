import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";

const COLORS = ["#f7931a", "#627eea", "#c3a634"];

//////////////////////////////

//このコンポーネントはハリボテです。
//逆に言えば、これ以外はバックエンドと繋がってます。

//////////////////////////////

const LineGraph = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    padding={{ left: 30, right: 30 }}
                    tick={{ fill: "#fff" }}
                />
                <YAxis tick={{ fill: "#fff" }} />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="Bitcoin"
                    stroke={COLORS[0]}
                    activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="Ethereum" stroke={COLORS[1]} />
                <Line type="monotone" dataKey="Dogecoin" stroke={COLORS[2]} />
            </LineChart>
        </ResponsiveContainer>
    );
};

const data = [
    {
        name: "0:00",
        Bitcoin: 40000,
        Ethereum: 24000,
        Dogecoin: 24000,
    },
    {
        name: "1:00",
        Bitcoin: 30000,
        Ethereum: 13980,
        Dogecoin: 22100,
    },
    {
        name: "2:00",
        Bitcoin: 20000,
        Ethereum: 98000,
        Dogecoin: 22900,
    },
    {
        name: "3:00",
        Bitcoin: 27800,
        Ethereum: 39080,
        Dogecoin: 20000,
    },
    {
        name: "4:00",
        Bitcoin: 18900,
        Ethereum: 48000,
        Dogecoin: 21810,
    },
    {
        name: "5:00",
        Bitcoin: 23900,
        Ethereum: 38000,
        Dogecoin: 25000,
    },
    {
        name: "6:00",
        Bitcoin: 34900,
        Ethereum: 43000,
        Dogecoin: 21000,
    },
];

const ShowLineGraph = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <Typography variant="h4" style={{ marginTop: "40px" }}>
                Virtual Coin Price Trends
            </Typography>
            <LineGraph data={data} />
        </div>
    );
};

export default ShowLineGraph;
