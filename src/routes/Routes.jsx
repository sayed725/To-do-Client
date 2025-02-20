import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main';
import Home from '../pages/Home';
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement: <h1>404 Not Found</h1>,
      children: [{
        index: true,
        element: <Home/>,
      }]
    },
    {
        path:'login',
        element:<Login/>
    },
    {
        path:'register',
        element: <Register/>
    }
  ]);

  export default router;