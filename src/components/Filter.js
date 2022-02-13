import React, {useContext,useRef} from 'react'
import TextField from '@mui/material/TextField';
import {FilterContext} from './FilterContext';


function Filter() {
    const {firstName, setFirstName,lastName, setLastName, gpa, setGpa, state, setState,gender, setGender, sat, setSat, gradeY, setGradeY, events, setEvents, act, setAct, trigger, setTrigger,tableInstance} = useContext(FilterContext);
   
    return (
        <div className='grid grid-cols-3 gap-2 p-4 bg-white ' style ={{margin:'20px',width:'95%',padding:'40px',paddingbottom:'50px'}}>
           <div className='flex flex-row'>
               <p style={{marginRight:'10px',marginTop:'10px'}}>First Name</p>
               <TextField onChange={(e)=> setFirstName(e.target.value)} id="standard-basic" variant="standard"  />
           </div>
           <div className='flex flex-row'>
               <p style={{marginRight:'10px',marginTop:'10px'}}>Last Name</p>
               <TextField  onChange={(e)=>setLastName(e.target.value)} id="standard-basic" variant="standard" />
           </div>
           <div className='flex flex-row'>
               <p style={{marginRight:'10px',marginTop:'10px'}}>GPA</p>
               <TextField onChange={(e)=>setGpa(e.target.value)} id="standard-basic" variant="standard" style ={{marginLeft:'40px'}}/>
           </div>
           <div className='flex flex-row'>
               <p style={{marginTop:'10px'}}>State</p>
               <TextField onChange={(e)=>setState(e.target.value)} id="standard-basic" variant="standard" style ={{marginLeft:'50px'}}/>
           </div>
           <div className='flex flex-row'>
               <p style={{marginTop:'10px'}}>Gender</p>
               <TextField onChange={(e)=>setGender(e.target.value)} id="standard-basic" variant="standard"style ={{marginLeft:'30px'}} />
           </div>
           <div className='flex flex-row'>
               <p style={{marginTop:'10px'}}>SAT Score</p>
               <TextField onChange={(e)=>setSat(e.target.value)} id="standard-basic" variant="standard" style ={{marginLeft:'10px'}}/>
           </div>
           <div className='flex flex-row'>
               <p style={{marginTop:'10px'}}>Grade Year</p>
               <TextField onChange={(e)=>setGradeY(e.target.value)} id="standard-basic" variant="standard" style ={{marginLeft:'10px'}}/>
           </div>
           <div className='flex flex-row'>
               <p style={{marginTop:'10px'}}>Events</p>
               <TextField onChange={(e)=>setEvents(e.target.value)} id="standard-basic" variant="standard" style ={{marginLeft:'35px'}}/>
           </div>
           <div className='flex flex-row'>
               <p style={{marginTop:'10px'}}>ACT Score</p>
               <TextField  onChange={(e)=>setAct(e.target.value)} id="standard-basic" variant="standard" style ={{marginLeft:'1s0px'}}/>
           </div>
           <button onClick={(e)=>setTrigger(trigger==false?true:false)} className=" mt-4 w-[100px] h-[50px]  bg-[#6169F6] text-white rounded border-[1px] border-sky-200">
              Submit
            </button>
           
        </div>
    )
}

export default Filter
