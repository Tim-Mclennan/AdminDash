import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider, } from "./providers";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./providers/auth";
import { Register } from "./pages/register";
import { ForgotPassword } from "./pages/forgotPassword";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import { CompanyCreatePage, CompanyEditPage, CompanyListPage, DashboardPage as Home, Login, TasksCreatePage, TasksEditPage, TasksListPage } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <AntdApp>
        <DevtoolsProvider>
          <Refine
            dataProvider={dataProvider}
            liveProvider={liveProvider}
            notificationProvider={useNotificationProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            resources={resources}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "KGfvct-CYNs6r-IK2UQq",
              liveMode: "auto",
            }}
          >
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route
                element={
                  <Authenticated
                    key="authenticated-layout"
                    // The fallback prop acts as a 'Catch'.
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route index element={<Home />} />
                <Route
                    path="/tasks"
                    element={
                      <TasksListPage>
                        <Outlet />
                      </TasksListPage>
                    }
                  >
                    <Route path="new" element={<TasksCreatePage />} />
                    <Route path="edit/:id" element={<TasksEditPage />} />
                  </Route>
                <Route path="/companies">
                  <Route index element={<CompanyListPage />} />
                  <Route path="new" element={<CompanyCreatePage />} />
                  <Route path="edit/:id" element={<CompanyEditPage />} />
                </Route>
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          <DevtoolsPanel />
        </DevtoolsProvider>
      </AntdApp>
    </BrowserRouter>
  );
}

export default App;
