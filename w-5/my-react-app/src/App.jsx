import { useState } from "react";


function App() {
  const [count, setCount] = useState(0);

  return <CustomBotton count={count} setCount={setCount}></CustomBotton>;
}

//component
function CustomBotton(props) { 
  function onclickHandler() {
    props.setCount(props.count + 1);
  }
  return <button onClick={onclickHandler}>Count {props.count} </button>;
}


export default App;
