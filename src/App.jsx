import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./views/Home";
import SignUpPage from "./views/SignUpPage";
import SignInPage from "./views/SignInPage";

// Appコンポーネント
const App = () => {
    // ユーザーの設定に応じたダークモードの優先設定を取得
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    // useMemoフックを使用してテーマを作成
    const theme = useMemo(
        () =>
            createTheme({
                // パレットのモードをダークモードまたはライトモードに設定
                palette: {
                    mode: prefersDarkMode ? "dark" : "dark",
                    text: {
                        primary: "#fcfffb",
                        secondary: "#d6d9e4",
                    },
                    background: {
                        default: "#242424",
                        paper: "#2a2a2a",
                    },
                    primary: {
                        main: "#df929b",
                        extraDark: "#c06d76",
                        dark: "#c76672",
                        light: "#ec939d",
                        extraLight: "#EBF4FB",
                        alpha08: "#0077C714",
                    },
                    noticeRed: {
                        main: "#c06d76",
                        dark: "#c8a251",
                        light: "#f7d282",
                    },
                },
                typography: {
                    fontFamily:
                        "Inter, 'Noto Sans JP', sans-serif, 'Segoe UI Emoji'",
                    fontWeightLight: 300,
                    fontWeightRegular: 400,
                    fontWeightMedium: 500,
                    fontWeightBold: 700,
                },
            }),
        [prefersDarkMode]
    );

    return (
        <div className="App flex min-h-screen text-center flex-col items-center justify-center">
            {/* アプリケーション全体のテーマを設定するためにThemeProviderを使用 */}
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="">
                    {/* ルーティングを設定するためにBrowserRouterを使用 */}
                    <BrowserRouter>
                        <Routes>
                            {/* ルートパスに対するルート要素としてSignInPageコンポーネントを設定 */}
                            <Route path={`/`} element={<SignInPage />} />
                            {/* /signupパスに対するルート要素としてSignUpPageコンポーネントを設定 */}
                            <Route path={`/signup`} element={<SignUpPage />} />
                            {/* /homeパスに対するルート要素としてHomeコンポーネントを設定 */}
                            <Route path={`/home`} element={<Home />} />
                        </Routes>
                    </BrowserRouter>
                    <div className="progress-bar"></div>
                </div>
            </ThemeProvider>
        </div>
    );
};

// Appコンポーネントをエクスポート
export default App;
