import React, { Suspense } from "react";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionProvider } from "./SessionProvider";
import AccessProvider from "./AccessProvider";
import HomeProvider from "./HomeProvider";
import PageLoader from "../components/PageLoader";

// Lazy loaded pages
const Home = React.lazy(() => import("../pages/Home"));
const Landing = React.lazy(() => import("../pages/Landing"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Employlist = React.lazy(() => import("../pages/Employlist"));
const Calculate = React.lazy(() => import("../pages/Calculate"));
const Paysliplist = React.lazy(() => import("../pages/Paysliplist"));
const AddEmployment = React.lazy(() => import("../pages/AddEmployment"));
const Calendar = React.lazy(() => import("../pages/Calendar"));

const Approutes = () => {
  return (
    <>
      <BrowserRouter>
        <SessionProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <AccessProvider>
                    <Suspense fallback={<PageLoader />}>
                      <Landing />
                    </Suspense>
                  </AccessProvider>
                }
              />

              <Route
                element={
                  <HomeProvider>
                    <Suspense fallback={<PageLoader />}>
                      <Home />
                    </Suspense>
                  </HomeProvider>
                }
              >
                <Route
                  path="/dashboard"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <Dashboard />
                    </Suspense>
                  }
                />
                <Route
                  path="/employlist"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <Employlist />
                    </Suspense>
                  }
                />
                <Route
                  path="/calculate"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <Calculate />
                    </Suspense>
                  }
                />
                <Route
                  path="/paysliplist"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <Paysliplist />
                    </Suspense>
                  }
                />
                <Route
                  path="/addemployment"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <AddEmployment />
                    </Suspense>
                  }
                />
                <Route
                  path="/calendar"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <Calendar />
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
          </Suspense>
        </SessionProvider>
      </BrowserRouter>
    </>
  );
};

export default Approutes;
