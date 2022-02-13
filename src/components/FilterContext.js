import React,{createContext, useState,useRef} from 'react'

export const FilterContext = createContext();
export const FilterContextProvider = (props)=> {



    const [firstName, setFirstName] = useState('2020');
    // const [firstName2, setFirstName2] = useState('20');
    const [lastName, setLastName] = useState('');
    const [gpa, setGpa] = useState('');
    const [state, setState] = useState('');
    const [gender, setGender] = useState('')
    const [sat, setSat] = useState('')
    const [gradeY, setGradeY] = useState('')
    const [events, setEvents] = useState('')
    const [act, setAct] = useState('')
    const [trigger, setTrigger] = useState(false)
    const tableInstance = useRef(0);


    return (
        <FilterContext.Provider value={{firstName, setFirstName,lastName, setLastName, gpa, setGpa, state, setState,gender, setGender, sat, setSat, gradeY, setGradeY, events, setEvents, act, setAct,trigger, setTrigger,tableInstance}}>
            {props.children}
        </FilterContext.Provider>
    )
}