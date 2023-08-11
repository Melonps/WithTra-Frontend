import { useState, useRef } from "react";
import {
    TextField,
    Button,
    Modal,
    Box,
    Grid,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Slider,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";
import axios from "axios";
import TagInput from "./TagInput";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SellIcon from "@mui/icons-material/Sell";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AddTaskIcon from "@mui/icons-material/AddTask";

const PostTradingRecord = ({ userid, username }) => {
    const [selectedCoin, setSelectedCoin] = useState("Bitcoin (BTC)");
    const [price, setPrice] = useState("2");
    const comment = useRef("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [receivedTags, setReceivedTags] = useState([]);
    const [alignment, setAlignment] = useState("buy"); // 初期値を設定

    const coin_options = [
        "Bitcoin (BTC)",
        "Ethereum (ETH)",
        "Binance Coin (BNB)",
        "Cardano (ADA)",
        "Solana (SOL)",
        "XRP (XRP)",
        "Polkadot (DOT)",
        "Dogecoin (DOGE)",
        "Litecoin (LTC)",
        "Chainlink (LINK)",
        "Stellar (XLM)",
        "Bitcoin Cash (BCH)",
        "Tether (USDT)",
        "USD Coin (USDC)",
        "VeChain (VET)",
        "Uniswap (UNI)",
        "Aave (AAVE)",
        "Polygon (MATIC)",
        "Cosmos (ATOM)",
        "Tezos (XTZ)",
    ];

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const formatCurrency = (value) => {
        return `￥${value}×1000円`; // 金額を表示するフォーマットを追加
    };

    const handleClose = () => {
        setOpen(false);
        setError(""); // モーダルを閉じるときにエラーメッセージをクリア
    };

    const handleTagsChange = (newTags) => {
        setReceivedTags(newTags);
    };

    const handleOptionChange = (event) => {
        setSelectedCoin(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://127.0.0.1:8000/post_trading_record/";
        try {
            const response = await axios.post(url, {
                userid: userid,
                username: username,
                coin: selectedCoin,
                price: price * 1000,
                comment: comment.current.value,
                tag: receivedTags,
                alignment: alignment,
            });

            if (response.status === 200) {
                console.log("Trading record created successfully");
                handleClose();
            }
        } catch (error) {
            console.error("Error creating trading record:", error);
            setError("Error creating trading record. Please try again.");
        }
    };

    return (
        <div>
            <div className="fixed right-20 bottom-44">
                <Button
                    variant="contained"
                    onClick={handleOpen}
                    style={{
                        borderRadius: "50%",
                        padding: "20px",
                        border: "2px solid",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <PostAddIcon />
                </Button>
            </div>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 4,
                        maxWidth: 400,
                        width: "100%",
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    Trading Record
                                    <AddShoppingCartIcon
                                        color="primary"
                                        sx={{ marginLeft: "5px" }}
                                    />
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ToggleButtonGroup
                                    value={alignment}
                                    exclusive
                                    color="primary"
                                    onChange={handleAlignment}
                                    aria-label="Buy or Sell"
                                >
                                    <ToggleButton value="buy" aria-label="Buy">
                                        Buy
                                        <ShoppingBasketIcon
                                            sx={{ marginLeft: "5px" }}
                                        />{" "}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="sell"
                                        aria-label="Sell"
                                    >
                                        Sell
                                        <SellIcon sx={{ marginLeft: "5px" }} />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Select an Option</InputLabel>
                                <Select
                                    value={selectedCoin}
                                    onChange={handleOptionChange}
                                    label="Select an Option"
                                >
                                    {coin_options.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography id="range-slider" gutterBottom>
                                    金額：￥{price}×1000円
                                </Typography>
                                <Slider
                                    aria-label="Target"
                                    defaultValue={10000}
                                    value={price}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    min={0}
                                    max={100}
                                    valueLabelFormat={formatCurrency}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Comment"
                                    inputRef={comment}
                                    fullWidth
                                    required
                                    type="string"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TagInput
                                    onTagsChange={handleTagsChange}
                                    options={options}
                                />
                            </Grid>

                            {error && (
                                <Grid item xs={12}>
                                    <Typography color="error">
                                        {error}
                                    </Typography>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                >
                                    Add Record
                                    <AddTaskIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default PostTradingRecord;

const options = [
    "BTC",
    "ETH",
    "BNB",
    "ADA",
    "SOL",
    "XRP",
    "DOT",
    "DOGE",
    "LTC",
    "LINK",
    "XLM",
    "BCH",
    "USDT",
    "USDC",
    "VET",
    "UNI",
    "AAVE",
    "MATIC",
    "ATOM",
    "XTZ",
    "Short Term",
    "Mid Term",
    "Long Term",
    "Profit",
    "Loss",
    "Add",
    "Withdraw",
    "First Trade",
    "Last Trade",
    "New Coin",
    "New Exchange",
    "New Wallet",
    "New Strategy",
    "New Indicator",
    "New Bot",
    "New Algorithm",
    "New Project",
    "New Token",
    "New NFT",
    "New DeFi",
    "New DEX",
    "New DAO",
    "New Yield Farming",
    "Hedge",
    "Leverage",
    "Margin",
    "Futures",
    "Options",
    "ETF",
    "Stock",
    "Forex",
    "Commodity",
    "Derivatives",
    "Staking",
    "Lending",
    "Borrowing",
    "Insurance",
    "Yield Farming",
    "DEX",
    "DAO",
    "NFT",
    "DeFi",
    "Wallet",
    "Exchange",
    "Project",
    "Token",
    "Bot",
    "Algorithm",
    "Indicator",
    "Strategy",
    "Coin",
    "Other",
    "Bullish",
    "Bearish",
    "Bull Market",
    "Bear Market",
    "Bull Run",
    "Bear Run",
    "Bull Trap",
    "Bear Trap",
    "Bullish Divergence",
    "Bearish Divergence",
    "risk",
    "reward",
    "risk/reward",
    "risk management",
    "reward management",
    "risk/reward management",
];
