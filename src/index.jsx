import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const divDoIndex = document.getElementById("root");
const root = createRoot(divDoIndex);

//root.render(<App/>);
root.render(<BrowserRouter><App/></BrowserRouter>);
