import { useState } from "react";
import {
    TextField,
    Button,
    Modal,
    Box,
    Grid,
    Typography,
    Slider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import TagInput from "./TagInput";
import UpdateIcon from "@mui/icons-material/Update";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const EditProfile = ({ userInfoRef }) => {
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [receivedTags, setReceivedTags] = useState([]);
    const [updatedUserName, setUpdatedUserName] = useState("");
    const [updatedState, setUpdatedState] = useState("");
    const [updatedTarget, setUpdatedTarget] = useState("");
    const [updatedBio, setUpdatedBio] = useState("");

    const handleOpen = () => {
        setOpen(true);
        setUpdatedUserName(userInfoRef.current.username); // Set initial username
        setUpdatedState(userInfoRef.current.state / 10000); // Set initial state
        setUpdatedTarget(userInfoRef.current.target / 10000); // Set initial target
        setUpdatedBio(userInfoRef.current.bio); // Set initial bio
        setReceivedTags(userInfoRef.current.tag); // Set initial tags
    };

    const handleClose = () => {
        setOpen(false);
        setError("");
    };

    const handleTagsChange = (newTags) => {
        setReceivedTags(newTags);
    };

    const formatCurrency = (value) => {
        return `￥${value}万`; // 金額を表示するフォーマットを追加
    };

    const PostData = async () => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/update_user`,
                {
                    userid: userInfoRef.current.userid,
                    username: userInfoRef.current.username,
                    state: userInfoRef.current.state,
                    target: userInfoRef.current.target,
                    tag: receivedTags,
                    bio: userInfoRef.current.bio,
                }
            );
            if (response.status === 200) {
                console.log("Trading record created successfully");
            }
        } catch (error) {
            console.error("Error creating trading record:", error);
            setError("Error creating trading record. Please try again.");
        }
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();

        // Update userInfoRef with new values
        userInfoRef.current = {
            ...userInfoRef.current,
            username: updatedUserName,
            state: updatedState * 10000,
            target: updatedTarget * 10000,
            bio: updatedBio,
            tag: receivedTags,
        };
        PostData();
        // Close the modal
        handleClose();
    };

    return (
        <div>
            <div className="fixed right-20 bottom-64">
                <Button
                    variant="outlined"
                    onClick={handleOpen}
                    style={{
                        borderRadius: "50%",
                        padding: "20px",
                        border: "2px solid",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <EditIcon />
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
                    <form onSubmit={handleUpdateProfile}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    Edit Profile
                                    <AccountBoxIcon
                                        color="primary"
                                        sx={{ marginLeft: "5px" }}
                                    />
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="UserName"
                                    name="username"
                                    fullWidth
                                    required
                                    value={updatedUserName}
                                    onChange={(e) =>
                                        setUpdatedUserName(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography id="range-slider" gutterBottom>
                                    現状金額：￥{updatedState}万
                                </Typography>
                                <Slider
                                    aria-label="State"
                                    defaultValue={0}
                                    value={updatedState}
                                    valueLabelDisplay="auto"
                                    step={2}
                                    min={0}
                                    max={1000}
                                    onChange={(e) =>
                                        setUpdatedState(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography id="range-slider" gutterBottom>
                                    目標金額：￥{updatedTarget}万
                                </Typography>
                                <Slider
                                    aria-label="Target"
                                    defaultValue={0}
                                    value={updatedTarget}
                                    valueLabelDisplay="auto"
                                    step={2}
                                    min={0}
                                    max={1000}
                                    onChange={(e) =>
                                        setUpdatedTarget(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Bio"
                                    name="bio"
                                    fullWidth
                                    required
                                    value={updatedBio}
                                    onChange={(e) =>
                                        setUpdatedBio(e.target.value)
                                    }
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
                                    Update Profile
                                    <UpdateIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default EditProfile;

const options = [
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
