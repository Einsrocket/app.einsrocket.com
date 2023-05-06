import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./privateRoute";
import { Register } from "../pages/Register";
import { Homepage } from "../pages/Homepage";
import { Dashboard } from "../pages/Dashboard";
import { Discover } from "../pages/Discover";
import { DiscoverTailsPage } from "../pages/DiscoverTailsPage";
import { DiscoverLessonPage } from "../pages/DiscoverLessonPage";
import { Profile } from "../pages/Profile";
import { Onboarding } from "../pages/Onboarding";
import { Redirect } from "./Redirect";
import { Pagenotfound } from "../pages/PageNotFound";
import { Logoutpage } from "../pages/Logout";
import { Search } from "../pages/Search";
import { Chatpage } from "../pages/Chatpage";

export function Router() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Pagenotfound />} />
                    <Route
                        path="/"
                        element={
                            <Redirect>
                                <Homepage />
                            </Redirect>
                        }
                    />

                    <Route path="/signup" element={<Register />} />

                    <Route
                        path="/chat"
                        element={
                            <PrivateRoute>
                                <Chatpage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/discover"
                        element={
                            <PrivateRoute>
                                <Discover />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/discover/trails/:id"
                        element={
                            <PrivateRoute>
                                <DiscoverTailsPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/discover/lesson/:id"
                        element={
                            <PrivateRoute>
                                <DiscoverLessonPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/me/:slug"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/onboarding"
                        element={
                            <PrivateRoute>
                                <Onboarding />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/logout"
                        element={
                            <PrivateRoute>
                                <Logoutpage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/search"
                        element={
                            <PrivateRoute>
                                <Search />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
