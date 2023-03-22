import React from "react";
import SenatorRoute from "./Pages/Senator/SenatorRoute";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./Pages/Admin/Admin";
import AdminRoute from "./Pages/Admin/AdminRoute";
import Senator from "./Pages/Senator/Senator";
import Login from "./Pages/Login";
import LoginStaff from "./Pages/LoginStaff";
import { ExeatProvider } from "./ExeatContext";
import NotFound from "./Pages/NotFound";
import { QueryClient, QueryClientProvider } from "react-query";
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
        cacheTime: 600000,
      },
      mutations: {
        useErrorBoundary: false,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ExeatProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/login-admin" element={<LoginStaff />} />
              <Route path="/" element={<Navigate to="/login" replace />} />

              <Route element={<SenatorRoute />}>
                <Route exact path="/senator/*" element={<Senator />} />
              </Route>

              <Route element={<AdminRoute />}>
                <Route exact path="/admin/*" element={<Admin />} />
              </Route>
              <Route exact path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ExeatProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
