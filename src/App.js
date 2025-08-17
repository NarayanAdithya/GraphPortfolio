import './App.css';
import ExpandableGraph from "./components/ExpandableGraph";
import NameComponent from "./components/NameComponent";
import adithyaData from './datasets/adithya_data.json'
function App() {
    return (
        <div className="App">
            <NameComponent />
            <ExpandableGraph graphData={adithyaData}/>
        </div>
    );
}

export default App;
