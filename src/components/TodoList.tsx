import React, {useEffect,useState} from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs} from "firebase/firestore";
``

interface Todo {
    id?: string;
    text: string;
}

const TodoList: React.FC =()=>{
    const [todos,setTodos] =useState<Todo[]>([]);
    const [input,setInput ] =useState<string>("");


const fetchTodos = async () => {
    const querySnapshot =await getDocs(collection(db,"todos"));
    const items: Todo[] = [];
    querySnapshot.forEach((doc) => {
        items.push({id: doc.id,text :doc.data().text})
    });
    setTodos(items);
};

const addTodo = async () =>{
    if(!input.trim()) return;
    await addDoc(collection(db,"todos"),{text:input});
    setInput("");
    fetchTodos();
};

useEffect (() => {
    fetchTodos();
},[]);

return(
    <div className ="max-w-md mx-auto p-4">
        <h1 className ="text-2xl font-bold mb-4">Todo List</h1>
        <div className ="mb-4">
            <input 
            value ={input}
            onChange ={(e) => setInput(e.target.value)}
            className="border p-2 flex-grow"
            />
            <button 
            onClick ={addTodo}
            className ="bg-blue-500 text-white px-4 ml-2">
                Add
            </button>
        </div>
        <ul className="list-disc pl-5">
            {todos.map((todo) => (
                <li key ={todo.id} className ="p-2 border-b">
                    {todo.text}
                </li>
            ))}
        </ul>
        </div>
);
};


export default TodoList;