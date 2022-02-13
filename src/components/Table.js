import React,{useContext,useEffect,useImperativeHandle } from "react";
import styled from "styled-components";
import { useTable, usePagination, useRowSelect } from "react-table";
import { Help, PermDeviceInformation, Star, StarBorder } from "@mui/icons-material";
import { Avatar, Dialog } from "@mui/material";
import { GitHub, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { BiBasketball } from "react-icons/bi";
import { useExportData } from "react-table-plugins";
import Papa from "papaparse";
import JsPDF from "jspdf";
import "jspdf-autotable";
import axios from 'axios';
import {FilterContext} from './FilterContext';
import { useFilters, useGlobalFilter ,useAsyncDebounce} from "react-table/dist/react-table.development";


function getExportFileBlob({ columns, data, fileType, fileName }) {
  if (fileType === "csv") {
    // CSV example
    const headerNames = columns.map((col) => col.exportValue);
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: "text/csv" });
  } 
  //PDF example
 else if (fileType === "pdf") {
    const headerNames = columns.map((column) => column.exportValue);
    const doc = new JsPDF();
    doc.autoTable({
      head: [headerNames],
      body: data,
      margin: { top: 20 },
      styles: {
        minCellHeight: 9,
        halign: "left",
        valign: "center",
        fontSize: 11,
      },
    });
    doc.save(`${fileName}.pdf`);

    return false;
  }

  // Other formats goes here
  return false;
}

const Styles = styled.div`
  padding: 1rem;

  table {
   

    tr {
     
      :last-child {
        td {
          
          border-bottom: 0;
        }
      }
      
      
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <StarBorder ref={resolvedRef} {...rest} />
      </>
    );
  }
);


const Table = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build your UI
  
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    exportData,
    setFilter,
    setAllFilters,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds,globalFilter },
  } = useTable(
    {
      columns,
      data,
      getExportFileBlob,
    },
    useGlobalFilter,
    useFilters,
    usePagination,
    useExportData,
    useRowSelect,
     // useFilters!
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
    
  );



 
  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 0)
  
   
    return (
      <span>
       <button onClick={(e)=>{
 setValue(firstName);
 onChange(firstName);
       }}>Search</button>
       
      </span>
    )
  }

  

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  //import contexts values from filterContext
  const {firstName,trigger,lastName,gpa,state,gender,sat,gradeY,events, act} = useContext(FilterContext);
 

  useEffect(()=>{
    // eslint-disable-next-line no-sparse-arrays
    setAllFilters([ {id: 'firstName', value: firstName}
    ,{id: 'gpa', value: gpa}
    ,{id: 'lastName', value: lastName}
    ,{id: 'gpa', value: gpa}
    ,{id: 'sat', value: sat}
    ,{id: 'year', value: gradeY}
    ,{id: 'act', value: act}
   
  
  ]);
    // setFilter("year", year);
    
  },[trigger]);


 
  // Render the UI for your table

  // console.log("selectedRowIds", selected);  
  return (
    <div className="bg-white">
      <div className="w-full h-[70px] rounded flex items-center justify-between">
      <div className="flex items-center ">
          {/* <Help /> */}
          <h1 className="mx-2">Display</h1>
          <select
            style={{ width: "80px", height: "30px" }}
            className="border-[1px] rounded"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} 
              </option>
            ))}
          </select>
          <h1 className="mx-2">Products</h1>
        </div>
        <input
              className="p-2 mx-4 w-[250px] h-[45px] my-2 bg-white rounded border-[1px] border-grey-300"
              placeholder="Search"
              type="text"
            />
      </div>
      <input
        
        placeholder="Firstname"
        onClick={(e) => setFilter("firstName", firstName)}
      />
      <table
        className="w-full"
        style={{ outline: "none" }}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="rounded mx-2 py-4"
                  style={{
                    background:'rgba(97, 105, 246, 0.05)',
                    border: "none",
                    height:"80px",
                    borderWidth: "thin",
                    outline: "none",
                    fontFamily:'Poppins',
                    fontWeight:'bold',
                    fontSize:'12px',
                  }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
            
          ))}
           
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr onClick={()=>{
                setSelected(row.original);
                setOpen(true);
               
              }} className="cursor-pointer" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      style ={{ borderBottom: '1px solid #e0e0d1'}}
                      className="outline-none  border-slate-300"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex bg-white justify-between p-4">
       {" "}
        <span >
          <p className="text-grey-200">
            Showing {pageIndex + 1} of {data.length} Sellers
           
          </p>{" "}
        </span>
        {/* <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '} */}
        <div className="flex mr-2">
          <button
            className="rounded text-gray-500 px-2 mr-2 border-[1px] h-9"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>{" "}
          {pageOptions.map((page, i) => {
            const isActive = pageIndex === i;
            return (
              <button
                key={`pagination-option-${i}`}
                className={`rounded text-white px-4 border-[1px] h-9 ${
                  isActive ? "active" : ""
                } ${isActive?"bg-[#6169F6]":"bg-white"}  ${isActive?"text-white":"text-gray-500"} `}
                style={{ margin: "0px 1px " }}
                onClick={() => {
                  gotoPage(i);
                }}
              >
                {" "}
                {i + 1}{" "}
              </button>
            );
          })}
          <button
            className="rounded text-gray-500 px-2 ml-2 border-[1px] h-9"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          {/* <span className="mt-1">
            <button onClick={() => exportData("pdf", true)} className="bg-indigo-500 px-4 py-1 mx-1 text-white outline-black rounded-md">
              PDF
            </button>
            <button onClick={() => exportData("csv", true)} className="bg-indigo-500 px-4 py-1 mx-1 text-white outline-black rounded-md">
              Excel
            </button>
            <Help />
          </span> */}
        </div>
      </div>
      <Dialog 
      onClose={() => setOpen(false)}
      BackdropProps={{
        style: { backgroundColor: "rgba(0,0,0,0.07)" },
      }}
      sx={{
        "& .MuiDialog-container .MuiPaper-root": {
          boxShadow: "none",
          width:'30%',
          height: "90%",
          borderRadius: "15px",
          paddingTop: "20px",
        },
      }}
      open={open}>
    
        <div className="flex flex-col items-center justify-center">
          <Avatar src ={`${selected?selected.fields?.profileImage?.stringValue||"N/A":"N/A"}`} style ={{width:'120px',height:'120px',marginTop:'50px'}}/>
          <strong className="mt-6" style ={{fontFamily:'Poppins',fontSize:'28px',fontWeight:'500px'}}>{selected?selected.fields?.firstName?.stringValue||"N/A":"N/A"} {selected?selected.fields?.lastName?.stringValue ||"N/A":"N/A"}</strong>
          <p style ={{fontFamily:'Poppins',fontSize:'15px',fontWeight:'500px'}}>{selected?selected.fields?.institution?.stringValue||"N/A":"N/A"}</p>
          <span  style ={{fontFamily:'Poppins',fontSize:'14px',fontWeight:'500px',color:'#6169F6',marginTop:'30px'}}>
            <p>GPA: {selected?selected.fields?.gpa?.stringValue||"N/A":"N/A"}</p>
            <p>SAT: {selected?selected.fields?.sat?.stringValue||"N/A":"N/A"}</p>
            <p>ACT: {selected?selected.fields?.act?.stringValue||"N/A":"N/A"}</p>
          </span>
          <div  style ={{fontFamily:'Poppins',fontSize:'28px',fontWeight:'500px',marginTop:'40px'}}>200:24</div>
        </div>
        <div className="flex justify-evenly items-center mt-8">
          <Twitter className="text-[#444854]"/>
          <BiBasketball className="text-[#444854]"/>
          <Instagram className="text-[#444854]"/>
          <LinkedIn className="text-[#444854]" />
          <GitHub className="text-[#444854]"/>
        </div>
      </Dialog>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
    </div>
  );
};

function ReactTable() {
  const [data2, setData2] = React.useState([]);
  


  let webApiUrl = "https://firestore.googleapis.com/v1/projects/recruitflo-dev/databases/(default)/documents/athlete";
  let tokenStr = "AIzaSyDF6Sb22x0ZjplAfRKllT8OfpkiJ9TJ1uY";

React.useEffect(()=>{
   axios
  .get(webApiUrl)
  .then((res) => {
    setData2(res.data.documents);
  })
   
   .catch((err) => {
   console.log(err);}
);
   },[]);

   
  




  const columns = React.useMemo(
    () => [
      {
        id: "year",
        Header: "Year",
        accessor:  d => d.fields.year?.integerValue||"N/A",
        
      },
      {
        id: "ncaaId",
        Header: "NCAA ID",
        accessor:  d => d.fields.ncaID?.integerValue||"N/A",
      },

      {
        id: "firstName",
        Header: "First Name",
        accessor:  d => d.fields.firstName?.stringValue||"N/A",
      },
      {
        id: "lastName",
        Header: "Last Name",
        accessor: d => d.fields.lastName?.stringValue||"N/A",
      },
      {
        id: "initiatedate",
        Header: "Initiated date",
        accessor: (d)=>{
          
          
          
          
          return(
            d.fields.createdAt?.integerValue || "N/A"
          );
        }
      },
      {
        id: "lastupdated",
        Header: "Last Updated",
        accessor:  (d)=>{

         
          return(
            d.fields.createdAt?.integerValue || "N/A"
          );
        } 
      },
      {
        id:'d',
        Header: "D",
        accessor: d => d.fields.D?.stringValue||"N/A",
      },
      {
        id:'gender',
        Header: "Gender",
        accessor: d => d.fields.gender?.stringValue||"N/A",
      },
      {
        id:'institution',
        Header: "Institution",
        accessor: d => d.fields.institution?.stringValue||"N/A",
      },
      {
        id:'sports',
        Header: "Sport",
        accessor: d => d.fields.sport?.stringValue||"N/A" ,
      },
      {
        id:'gpa',
        Header: "GPA",
        accessor: d => d.fields.gpa?.stringValue||"N/A" ,
      },
      {
        id:'sat',
        Header: "SAT",
        accessor: d => d.fields.sat?.stringValue||"N/A" ,
      },
      {
        id:'act',
        Header: "ACT",
        accessor: d => d.fields.act?.stringValue||"N/A" ,
      },
      {
        id:'sport_conference',
        Header: "Sport conference",
        accessor: "sport_conference",
      },
      {
        id:'student_status',
        Header: "Student status",
        accessor: "student_status",
        Cell: (Props) => {
          
        //  console.log("props",Props);
           return(
            // <div className="rounded" style={{background:`${Props.cell.value.toLowerCase().includes("widthdrawn")?"#FFEBF6":Props.cell.value.toLowerCase().includes("active")?"rgba(245, 171, 59, 0.15)":"rgba(143, 149, 178, 0.1)"}`,padding:'8px 20px',color:`${Props.cell.value.toLowerCase().includes("widthdrawn")?"#FF5D2D":Props.cell.value.toLowerCase().includes("active")?"#F5AB3B":"#737995"}`}}>{Props.cell.value}</div>
           <div>N/A</div>
            )
        }
      },
    ],
    []
  );

  // const data = React.useMemo(
  //   () =>data2,
  //   []
  // );

 
  return (
    <Styles>
      <Table columns={columns} data={data2} />
    </Styles>
  );
}

export default ReactTable;
