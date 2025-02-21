import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main';
import Home from '../pages/Home';
import Login from '../pages/Authentication/Login';
import PrivateRoute from './PrivateRoutes';



const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement: <h1>404 Not Found</h1>,
      children: [{
        index: true,
        element: <PrivateRoute><Home/></PrivateRoute>,
      }]
    },
    {
        path:'login',
        element:<Login/>
    },
   
  ]);

  export default router;