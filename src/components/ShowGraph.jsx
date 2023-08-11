import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { Typography, Slider, Button } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import Loading from "./Loading";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import { Padding } from "@mui/icons-material";

const Graph = ({ data }) => {
    const COLORS = [
        "#ed8a47",
        "#fbd688",
        "#f44646",
        "#aa598a",
        "#d0a897",
        "#f4d6cb",
        "#9DD9D2",
    ]; // カスタムカラーパレット

    // データの合計値を計算
    const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

    // 1%以下の項目をフィルタリング
    const filteredData = data.filter(
        (entry) => (entry.value / totalValue) * 100 >= 5
    );

    return (
        <div className="flex justify-center items-center">
            <PieChart width={600} height={400}>
                <Pie
                    data={filteredData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={8}
                    fill="#8884d8"
                    animationBegin={200}
                    animationDuration={1000}
                    label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                    } // ラベル表示
                    labelLine={false} // ラベルの線を非表示
                >
                    {filteredData.map((entry, index) => (
                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}`} />
                <Legend />
            </PieChart>
        </div>
    );
};

const ShowGraph = () => {
    const [data, setData] = useState([]);
    const [stateRange, setStateRange] = useState([2, 100]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/get_summary/${stateRange[0]}/${stateRange[1]}/`
            );
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <Typography
                component="h1"
                variant="h4"
                className="section-title"
                style={{ marginTop: "60px" }}
            >
                Virtual Coin Distribution
                <DataSaverOffIcon color="primary" fontSize="large" />
            </Typography>

            <Graph data={data} />
            <Typography
                id="range-slider"
                gutterBottom
                style={{ marginTop: "40px" }}
            >
                State Range
            </Typography>
            <Slider
                value={stateRange}
                onChange={(event, newValues) => setStateRange(newValues)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={1000}
                step={10}
                getAriaLabel={() => "Minimum distance shift"}
            />
            <Typography id="range-slider" gutterBottom>
                ￥{stateRange[0]}万円 ~ ￥{stateRange[1]}万円
            </Typography>
            <Button
                variant="outlined"
                style={{ margin: "20px" }}
                onClick={fetchData}
                disabled={isLoading}
            >
                Get Data
                <CachedIcon />
            </Button>
            {isLoading && <Loading />}
        </div>
    );
};

export default ShowGraph;
