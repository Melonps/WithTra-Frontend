import { useEffect, useState } from "react";
import {
    Container,
    List,
    ListItem,
    Paper,
    Grid,
    Avatar,
    Button,
    Box,
    Typography,
    Divider,
    Chip,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import axios from "axios";
import TimelineIcon from "@mui/icons-material/Timeline";
import CachedIcon from "@mui/icons-material/Cached";

const ActivityItem = ({
    username,
    price,
    isUp,
    tag,
    coin,
    alignment,
    userid,
}) => (
    <ListItem
        component={Paper}
        variant="outlined"
        sx={{ mt: 2, mb: 2, minWidth: 500 }}
    >
        <Grid container alignItems="center">
            <Avatar
                src={`https://cat-avatars.vercel.app/api/cat?name=${userid}`}
                sx={{ border: "3px solid #fff", width: 60, height: 60 }}
            />

            <Box sx={{ ml: 2, mt: 2, flex: 1 }}>
                <Typography variant="h5">
                    {username}
                    <Chip label={alignment} color="primary" sx={{ ml: 1 }} />
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                    {coin}：{price}￥
                    {isUp ? (
                        <TrendingUpIcon color="success" />
                    ) : (
                        <TrendingDownIcon color="error" />
                    )}
                </Typography>
            </Box>
        </Grid>
        <Box
            sx={{
                mt: 1,
                minWidth: 100,
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <Typography variant="subtitle2" color="secondary">
                {tag.map((t, index) => (
                    <span key={index}>#{t} </span>
                ))}
            </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
    </ListItem>
);

const ActivityList = ({ userid }) => {
    const [activityList, setActivityList] = useState([]);
    const API_URL = `http://127.0.0.1:8000/get_activity_list/${userid}`;

    useEffect(() => {
        fetchActivity();
    }, []);

    const fetchActivity = async () => {
        try {
            const response = await axios.get(API_URL);
            if (response.status === 200) {
                const sortedActivityList = response.data.sort(
                    (a, b) => new Date(b.datetime) - new Date(a.datetime)
                );
                setActivityList(sortedActivityList);
                console.log(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch activity:", error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography
                component="h1"
                variant="h4"
                className="section-title"
                style={{ marginTop: "60px", marginBottom: "20px" }}
            >
                Timeline
                <TimelineIcon color="primary" fontSize="large" />
            </Typography>
            <List
                sx={{
                    width: "100%",
                    overflow: "auto",
                    maxHeight: 500,
                    "& ::-webkit-scrollbar": {
                        display: "none",
                    },
                    "& :hover": {
                        "::-webkit-scrollbar": {
                            display: "inline",
                        },
                    },
                }}
            >
                {activityList.map((activity) => (
                    <ActivityItem
                        key={activity.datetime}
                        username={activity.username}
                        price={activity.price}
                        isUp={activity.up}
                        tag={activity.tag}
                        coin={activity.coin}
                        alignment={activity.alignment}
                        userid={activity.userid}
                    />
                ))}
            </List>
            <Button
                variant="outlined"
                style={{ margin: "20px" }}
                onClick={fetchActivity}
            >
                Get New Activity
                <CachedIcon />
            </Button>
        </Container>
    );
};

export default ActivityList;
