import "./App.css";
import { Posts } from "../src/cardFolder/Posts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container p-4">
        <Posts />
      </div>
    </DndProvider>
  );
}

export default App;
