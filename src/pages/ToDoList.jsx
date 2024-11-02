import { useEffect, useState } from 'react';
import { TbTargetArrow } from "react-icons/tb";
import { GiStarsStack } from "react-icons/gi";
import { ImCheckboxChecked } from "react-icons/im";
import { MdOutlineDeleteOutline } from "react-icons/md";

import './ToDoList.css'
function ToDoList() {

    let [data, setData] = useState({});
    let [language, setLanguage] = useState([]);
    let [list, setList] = useState([]);

    useEffect(() => {
        let getData = JSON.parse(localStorage.getItem('todolist'));
        setList(getData ? getData : []);
    }, [setList])

    let handleChange = (e) => {
        let { name, value } = e.target;
        let lang = [...language];
        if (name == 'language') {
            if (e.target.checked) {
                lang.push(value);
            }
            else {
                let index = lang.findIndex((v, i) => v == value);
                lang.splice(index, 1);
            }
            console.log(lang);

            setLanguage(lang);
            value = lang;
        }
        setData({ ...data, [name]: value })
    }

    let deleteData = (i) => {
        list.splice(i, 1);
        setList([...list]);
        localStorage.setItem("todolist", JSON.stringify([...list]));
        console.log(list);
    }

    let submitData = (e) => {
        e.preventDefault();
        if (!data) {
            console.error("Invalid data: Missing required properties");
            return;
        }

        const newList = [...list, data];
        setList(newList);
        localStorage.setItem('todolist', JSON.stringify(newList));
        setData({});
        setLanguage([]);
    };
    return (
        <>
            <div className="container">
                <form method="post" onSubmit={submitData} style={{ marginBottom: "35px" }}>
                    {/* Enter your task */}
                    <div className="row">
                        <div className='task'>
                            <input type="text" placeholder="Enter your task" name='taskDescription' onChange={handleChange} value={data.taskDescription ? data.taskDescription : ""} />
                        </div>
                    </div>
                    {/* task type */}
                    <div className="row">
                        <div className="check">
                            <label>
                                <input type="checkbox" name='language' value='html' onChange={handleChange} /><span>HTML</span>
                            </label>
                        </div>

                        <div className="check">
                            <label>
                                <input type="checkbox" name='language' value='css' onChange={handleChange} /><span>CSS</span>
                            </label>
                        </div>

                        <div className="check">
                            <label>
                                <input type="checkbox" name='language' value='javascript' onChange={handleChange} /><span>Javascript</span>
                            </label>
                        </div>

                        <div className="check">
                            <label>
                                <input type="checkbox" name='language' value='react' onChange={handleChange} /><span>React</span>
                            </label>
                        </div>

                        <div className='btn-wrap'>
                            <select onChange={handleChange} name="taskType">
                                <option value="todo">To Do</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                            <button type="submit" className='addTask'>+ Add Task</button>
                        </div>
                    </div>
                </form>
            </div>


            <section>
                <div className="container">
                    {/* 1 */}
                    <div className="row">
                        <div className="taskStatus">
                            <div className='taskType-wrap'>
                                <TbTargetArrow style={{ color: "red" }} />
                                <p>TO DO</p>
                            </div>

                            <div className='task-Details'>
                                {
                                    list.filter((v, i) => {
                                        if (v.taskType == 'todo') {
                                            return v;
                                        }
                                    }).map((v, i) => {
                                        return (
                                            <>
                                                <div className="box">
                                                    <p>{v.taskDescription}</p>
                                                    <div className="btn">
                                                        <span>{v.language.join(' , ')}</span>
                                                    </div>
                                                    <MdOutlineDeleteOutline onClick={() => deleteData(i)} />
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    {/* 2 */}
                    <div className="row">
                        <div className="taskStatus">
                            <div className='taskType-wrap'>
                                <GiStarsStack style={{ color: "yellow" }} />
                                <p>DOING</p>
                            </div>
                            <div className="task-Details">
                                {list.filter((v, i) => {
                                    if (v.taskType == 'doing') {
                                        return v;
                                    }
                                }).map((v, i) => {
                                    return (
                                        <>
                                            <div className="box">
                                                <h3>{v.taskDescription}</h3>
                                                <div className="btn">
                                                    <span>{v.language.join(' , ')}</span>
                                                </div>
                                                <MdOutlineDeleteOutline onClick={() => deleteData(i)} />
                                            </div>
                                        </>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                    {/* 3 */}
                    <div className="row">
                        <div className="taskStatus">
                            <div className='taskType-wrap'>
                                <ImCheckboxChecked style={{ color: "green" }} />
                                <p>DONE</p>
                            </div>
                            <div className="task-Details">
                                {list.filter((v, i) => {
                                    if (v.taskType == 'done') {
                                        return v;
                                    }
                                }).map((v, i) => {
                                    return (
                                        <>
                                            <div className="box">
                                                <p>{v.taskDescription}</p>
                                                <div className="btn">
                                                    <span>{v.language.join(' , ')}</span>
                                                </div>
                                                <MdOutlineDeleteOutline onClick={() => deleteData(i)} />
                                            </div>
                                        </>
                                    )
                                })
                                }
                            </div>


                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ToDoList;



