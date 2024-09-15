import store from "./store";
import router from "./pages";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
