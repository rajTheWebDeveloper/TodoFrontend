import React, { useEffect, useState } from 'react'
import { Audio } from "react-loader-spinner";
import axios from 'axios'

const TodoList = () => {

    let [input,setInput]=useState("")
    let [loading,setLoading]=useState(true)
    let [list, setList] = useState([]);
    let [edit,setEdit]=useState({})
    let [enableEdit,setEnableEdit]=useState(false)

    // useEffect(()=>
    // {
    //   console.error(edit,enableEdit)
    // },[edit,enableEdit])


    let fetchList=async ()=>
    {
        setLoading(true);
       try 
       {
          let fetched=await axios.get('https://todobackendverison.onrender.com/todo/list/fetch')
          console.log(fetched.data.data)
          setList(fetched.data.data)
          setLoading(false);
          return fetched.data
       }
       catch(e)
       {
        console.log(e)
       }
    }


    let deleteTodo=async (_id)=>
    {
      setLoading(true);
      console.log("AUr Kuch Na Janu Bas itna hi Janu",_id)
      try 
      {
        let deleted = await axios.delete(`https://todobackendverison.onrender.com/todo/list/delete/${_id}`);
        fetchList()
        setLoading(false);
        return deleted.data
      }
      catch(e)
      {
        console.log(e)
      }
    }


    let handleEditRequest = async (id) => {
      setLoading(true);
      let {_id,status,task}=edit
      try {
        let edited = await axios.put(
          `https://todobackendverison.onrender.com/todo/list/edit/${_id}`,
          {_id,status,task:input}
        )
        fetchList();
        setLoading(false);
        return edited.data;
      } catch (e) {
        console.log(e);
      }
    }


    console.log("Its a little warm in here", list)
    let handleClick=async ()=>
    {
        if(input==="")
        {
            return
        }
        if(enableEdit)
        {
            let {_id,status,task}=edit;
            handleEditRequest(_id)
            setEnableEdit(false)
        }
        else 
        {
            try 
            {
              console.log("It is warm in here")
               setLoading(true);
               let response=await axios.post('https://todobackendverison.onrender.com/todo/list/add',{task:input,status:false})
               setInput("")
               fetchList()
               setLoading(true);
               return response.data
            }
            catch(e)
            {
              console.log(e)
            }
        }
        setInput("")
    }



    // let handleCheckbox=(id)=>
    // {
    //     let updated=list.map((items)=>
    //     {
    //         if(items.id===id)
    //         {
    //             return {...items,status:!items.status}
    //         }
    //         return items
    //     })
    //     setList(updated)
    // }




    // let handleDelete=(id)=>
    // {
    //     let deleted=list.filter((items)=>
    //     {
    //         return items.id!==id
    //     })
    //     setList(deleted)
    // }


    let handleCheckbox=async (_id,items)=>
    {
        setLoading(true);
       try 
       {
         let updatedCheckbox = await axios.put(`https://todobackendverison.onrender.com/todo/list/update/${_id}`,items)
         fetchList()
          setLoading(false);
         return updatedCheckbox.data
       }
       catch(e)
       {
          console.log(e)
       }
    }


    let handleEdit=(_id)=>
    {
        let foundTask=list.find((items)=>
        {
            return items._id===_id
        })
        setEnableEdit(true);
        setEdit(foundTask)
        setInput(foundTask.task);
    }



    // useEffect(()=>
    // {
    //     localStorage.setItem("TodoTasks", JSON.stringify(list));
    // },[list])


     useEffect(() => {
       fetchList();
     }, []);


  return (
    <main className="w-[95vw] max-w-[550px] bg-white mx-auto mt-12 px-3 md:px-8 py-6 text-center overflow-hidden shadow-md rounded-md">
      <h2 className="text-xl font-normal tracking-wide">Todo Buddy</h2>
      <div
        className="input-button my-6 grid grid-cols-2 h-[35px] overflow-hidden"
        style={{ gridTemplateColumns: "4fr 1fr" }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Task"
          className="outline-none border-[2px] w-[100%] md:auto border-l-slate-200 px-2 text-md rounded-l-md shadow-md focus:border-blue-500"
        />
        <button
          onClick={handleClick}
          className="text-[15px] rounded-r-md overflow-hidden text-white tracking-wider bg-blue-400"
        >
          {enableEdit ? "Edit" : "Submit"}{" "}
          {loading &&
            render(
              <Audio
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
              />
            )}
        </button>
      </div>
      <section className="mt-8">
        {list.map((items) => {
          let { _id, task, status } = items;
          return (
            <article
              key={_id}
              className="flex justify-between items-center mb-3"
            >
              <div className="portside flex">
                <input
                  type="checkbox"
                  className="mr-3"
                  checked={status}
                  onChange={() => handleCheckbox(_id, items)}
                />
                <p
                  className="capitalize"
                  style={{ textDecoration: status ? "line-through" : null }}
                >
                  {task}
                </p>
              </div>
              <div className="starboard flex items-center">
                <button
                  onClick={() => handleEdit(_id)}
                  className="text-sm text-white px-[9px] py-[1px] mx-1 rounded-sm bg-green-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(_id)}
                  className="text-sm text-white px-[9px] py-[1px] mx-1 rounded-sm bg-red-500"
                >
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}


export default TodoList