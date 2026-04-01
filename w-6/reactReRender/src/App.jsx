import { useState, memo } from "react";
import Wrapper from "./componets/wrapper";

// approch-1
// function App() {
//   const [title, setTitle] = useState("my name is Ani");

//   function changeTitle(){
//     setTitle("my name is "+ Math.random())
//   }

//   return (
//     <>
//     <button onClick={changeTitle} >Click to change the title</button>
//     <br />
//     <Header title={title}/>
//     <br />
//     <Header title = "my name is muskan" />
//     </>
//   )
// }

// function Header({title}){
//   return(
//   <>
//   {title}
//   </>
//   )
// }

// Approch-2 => lets update title in Header Component itself
// function App() {
//   return (
//     <div>
//       <HeaderWithButton />
//       <Header title="my name is mj" />
//     </div>
//   );
// }

// function HeaderWithButton() {
//   const [title, setTitle] = useState("my name is Ani");
//   function changeTitle() {
//     setTitle("my name is " + Math.random());
//   }

//   return (
//     <div>
//       <button onClick={changeTitle}>click to change title</button>
//       <br />
//       <Header title={title}></Header>
//     </div>
//   );
// }

// function Header({ title }) {
//   return <>{title}</>;
// }

// approach-3 => use Memo(memorisation)
function App() {
  const [title, setTitle] = useState("my name is Ani");

  function changeTitle() {
    setTitle("my name is " + Math.random());
  }

  return (
    <>
      <button onClick={changeTitle}>Click to change the title</button>
      <br />
      <Header title={title} />
      <br />
      <Header title="my name is muskan" />
      <Wrapper></Wrapper>
    </>
  );
}

const Header = memo(function Header({ title }) {
  return <>{title}</>
});

export default App;
