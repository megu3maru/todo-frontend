
import React from "react";
import Header from "./components/Header";
import ToDoForm from "./components/ToDoForm";
import ToDoList from "./components/ToDoList";

function App(){
  return(
    <div>
      <Header />
      <ToDoForm />
      <ToDoList />
    </div>
  );
}

export default App;