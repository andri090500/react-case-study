import "./App.css";
import Select from "react-select";
import { useEffect, useState } from "react";

function App() {
  const [datas, setDatas] = useState([]);
  const [selected, setSelected] = useState("");
  const [isShow, setIsShow] = useState(false);

  const getData = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/berry");
      const json = await res.json();
      // 1. const result = json.results;
      // 2. const result = json.results.map((data) => {
      //   return data;
      // });
      /*3. */ const result = json.results.map((data) => {
        return {
          label: data.name,
          value: data.name,
        };
      });
      setDatas(result.sort((a, b) => a.label.localeCompare(b.label)));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = () => {
    setIsShow((curr) => !curr);
  };

  const handleChange = (e) => {
    setSelected(e);
    // setIsShow(false);
  };

  return (
    <div className="App">
      <button onClick={() => handleSubmit()} disabled={!selected}>
        {isShow ? "hide values" : "show values"}
      </button>
      <br />
      <h2>{isShow ? selected : ""}</h2>
      <br />
      <Select options={datas} onChange={(e) => handleChange(e.value)} />
    </div>
  );
}

export default App;
