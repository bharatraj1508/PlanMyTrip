import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/custom/Header.tsx";
import CreateTrip from "./create-trip/CreateTrip.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]/index.tsx";
import { UserProvider } from "./service/UserProvider.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/view-trip/:tripId",
    element: <ViewTrip />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <UserProvider>
        <Header />
        <RouterProvider router={router} />
        <Toaster />
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
