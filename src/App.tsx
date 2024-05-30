import React from "react";
import "./static/App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import UserList from "./views/user";

Amplify.configure(awsExports);

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<UserList />} />)
);

export default function App() {
  return (
    <div className="w-full h-screen grid place-items-center">
      <Authenticator>
        <RouterProvider router={router} />
      </Authenticator>
    </div>
  );
}
