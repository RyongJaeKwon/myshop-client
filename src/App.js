import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import BaseLayout from "./layout/BaseLayout";

function App() {
  return (
    <RouterProvider router={root}/>
  );
}

export default App;
