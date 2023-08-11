import { useState, useEffect, useRef } from "react";
import {
    Typography,
    Box,
    BottomNavigation,
    BottomNavigationAction,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import ActivityList from "../components/GetActivityList";
import { MainLogoDark } from "../components/Icon";
import heroChar from "../assets/hero_char.png";
import ShowGraph from "../components/ShowGraph";
import BarChartIcon from "@mui/icons-material/BarChart";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SignOut from "../components/SignOut";
import PostTradingRecord from "../components/PostActivity";
import UserProfileComponent from "../components/UserProfile";
import EditProfile from "../components/EditProfile";
import axios from "axios";

import "../App.css";

function Home() {
    const [navigationValue, setNavigationValue] = useState("analysis");
    const userProfileRef = useRef(null);
    const location = useLocation();
    const userId = location.state && location.state.userId;

    const handleNavigationChange = (event, newValue) => {
        setNavigationValue(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://127.0.0.1:8000/get_user/${userId}`
                );
                if (res.status === 200) {
                    console.log("User data fetched successfully");
                    userProfileRef.current = res.data;
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, [userId]);

    return (
        <>
            <section className="min-h-screen">
                <div className="App-header flex items-center">
                    <MainLogoDark className="w-1/2 lg:w-1/3" />
                    <img
                        src={heroChar}
                        alt="hero character"
                        className="xl:w-3/12 w-4/12"
                    />
                </div>
            </section>
            <section className="section-container min-h-screen w-88 flex items-center justify-center">
                <Box p={4}>
                    <Typography component="h1" variant="h1" className="title">
                        Home
                    </Typography>
                    <Typography component="h6" variant="h6" sx={{ mb: 4 }}>
                        Welcome back, {userProfileRef.current?.username}!
                    </Typography>

                    {navigationValue === "analysis" && <ShowGraph />}
                    {navigationValue === "timeline" && (
                        <ActivityList userid={"all"} />
                    )}
                    {navigationValue === "profile" && (
                        <UserProfileComponent userInfoRef={userProfileRef} />
                    )}
                    <BottomNavigation
                        value={navigationValue}
                        onChange={handleNavigationChange}
                        sx={{ mt: 4 }}
                    >
                        <BottomNavigationAction
                            label="Analysis"
                            value="analysis"
                            icon={<BarChartIcon />}
                        />
                        <BottomNavigationAction
                            label="Timeline"
                            value="timeline"
                            icon={<ViewTimelineIcon />}
                        />
                        <BottomNavigationAction
                            label="Profile"
                            value="profile"
                            icon={<AccountCircleIcon />}
                        />
                    </BottomNavigation>
                    <EditProfile userInfoRef={userProfileRef} />
                    <SignOut />
                    <PostTradingRecord
                        userid={userId}
                        username={userProfileRef.current?.username}
                    />
                </Box>
            </section>
        </>
    );
}

export default Home;
