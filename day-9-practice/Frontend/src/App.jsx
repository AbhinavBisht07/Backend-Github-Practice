import { useEffect, useState } from 'react'
import axios from "axios";


function App() {
  const [notes, setNotes] = useState([
    {
      title: "test title A",
      description: "test descrption A"
    },
    {
      title: "test title B",
      description: "test descrption B"
    },
    {
      title: "test title C",
      description: "test descrption C"
    },
    {
      title: "test title D",
      description: "test descrption D"
    },
  ])//state variable

  useEffect(()=>{
    axios.get("http://localhost:3000/api/notes")
    .then((res)=>{
      // console.log(res.data.notes);
      setNotes(res.data.notes);
    })
  },[])

  return (
    <>
      <div className="notes">
        {notes.map(note => {
          return <div className="note">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
          </div>
        })}
      </div>
    </>
  )
}

export default App
