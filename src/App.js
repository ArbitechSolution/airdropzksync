import "./App.css";
import "maptalks/dist/maptalks.css";
import { Routes, Route } from "react-router-dom";
import routes from "./pages/index";

function App() {
  return (
    <div className="background_main">
      <Routes>
        {routes.map((data, index) => (
          <Route
            onUpdate={() => window.scrollTo(0, 0)}
            exact={true}
            path={data.path}
            element={data.component}
            key={index}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
