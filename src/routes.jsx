import {
  createBrowserRouter,
  Link,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "./page/Home";
import { AuthPage } from "./page/AuthPage.jsx";
import { useContext } from "react";
import { AuthContext } from "./Provider.jsx";
import { logOut } from "./firebaseUtils.js";

export const NavBar = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/auth">Auth</Link>
          </li>
          {authUser?.email && (
            <li>
              <button onClick={logOut}>Sign Out</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const { authUser } = useContext(AuthContext);
  // if (!authUser?.email) return <div>You are not authorized to view this page</div>;
  if (!authUser?.email) return <Navigate to="/auth"></Navigate>;
  return <div>{children}</div>;
};

export const AppRouter = () => {
const routes = [
  {
    path: "/",
    element: (
      <>
              <NavBar />
        <ProtectedRoute>

          <HomePage />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/auth",
    element: (
      <>
        <NavBar />
        <AuthPage />
      </>
    ),
  },
];
  const router = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export const AppRouterWithOut = () => {
  const routes = [
    {
      path: "/",
      element: (
        <div>
          <NavBar />
          <Outlet />
        </div>
      ),
      children: [
        {
          path: "/",
          element: (
            <>
              {/* <NavBar /> */}
              <HomePage />,
            </>
          ),
        },
        {
          path: "/auth",
          element: (
            <>
              {/* <NavBar /> */}
              <AuthPage />
            </>
          ),
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};




// const routes = [
//   {
//     path: "/",
//     element:<HomePage />
//   },
//   {
//     path: "/auth",
//     public: true,
//     element: 
//         <AuthPage />
//   },
// ].map((route) => {
//   if (route.public)
//     return {
//       ...route,
//       element: (
//         <>
//           <NavBar />
//           {route.element}
//         </>
//       ),
//     };
//   return { ...route,  element: (
//     <>
//       <NavBar />
//       <ProtectedRoute>
//       {route.element}
//       </ProtectedRoute>
 
//     </>
//   ), };
// });