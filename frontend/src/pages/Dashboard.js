import React, {useEffect,useState, useCallback} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
PieChart,
Pie,
Cell
} from "recharts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



function Dashboard(){


const navigate=useNavigate();



const [expenses,setExpenses]=useState([]);


const [title,setTitle]=useState("");

const [category,setCategory]=useState("");

const [amount,setAmount]=useState("");

const [date,setDate]=useState("");


const [budget,setBudget]=useState(

localStorage.getItem("budget") || 0

);


const [editId,setEditId]=useState(null);




const token=localStorage.getItem("token");



const config={

headers:{

Authorization:`Bearer ${token}`

}

};



const API="http://localhost:5000/api/expenses";






const fetchExpenses=useCallback(async()=>{


try{


const res=await axios.get(

API,

config

);


setExpenses(res.data);



}

catch(err){


console.log(err);


}



}, []);






useEffect(()=>{


fetchExpenses();


},[fetchExpenses]);









const saveExpense=async()=>{


try{


if(!title || !category || !amount || !date){


return;


}




const data={


title:title,


category:category,


amount:Number(amount),


date:date


};





if(editId){


await axios.put(

`${API}/${editId}`,

data,

config

);



}

else{


await axios.post(

`${API}/add`,

data,

config

);



}






setTitle("");

setCategory("");

setAmount("");

setDate("");

setEditId(null);



fetchExpenses();



}



catch(err){


console.log(

err.response?.data || err

);



}



};









const editExpense=(e)=>{


setTitle(e.title);


setCategory(e.category);


setAmount(e.amount);


setDate(

e.date.substring(0,10)

);


setEditId(e._id);



};









const deleteExpense=async(id)=>{


try{


await axios.delete(

`${API}/${id}`,

config

);



fetchExpenses();



}

catch(err){


console.log(err);


}



};









const totalSpent=expenses.reduce(

(sum,e)=>

sum+Number(e.amount),

0

);



const remaining=

Number(budget)-totalSpent;







const saveBudget=(value)=>{


setBudget(value);


localStorage.setItem(

"budget",

value

);


};









let health=100;



let usage=

budget>0

?

(totalSpent/budget)*100

:

0;





if(usage>90)

health-=40;


else if(usage>70)

health-=20;






const status=

usage>90

?

"Over Budget"

:

usage>70

?

"Warning"

:

"Safe";









const chartData=

expenses.reduce((arr,e)=>{


let found=

arr.find(

x=>x.name===e.category

);



if(found)

found.value+=Number(e.amount);


else


arr.push({

name:e.category,

value:Number(e.amount)

});



return arr;



},[]);









const downloadPDF=()=>{


const doc=new jsPDF();



doc.text(

"Expense Report",

20,

20

);



autoTable(doc,{

head:[

["Title","Category","Amount"]

],


body:

expenses.map(e=>[

e.title,

e.category,

e.amount

])


});



doc.save(

"expense-report.pdf"

);



};









return(


<div className="dashboard-ui">






<div className="top-buttons">


<button onClick={()=>navigate("/profile")}>

Profile

</button>




<button onClick={()=>navigate("/login")}>

Logout

</button>



</div>









<h1>

Expense Dashboard

</h1>









<div className="cards">



<div className="card">

Budget

<br/>

₹{budget}

</div>





<div className="card">

Spent

<br/>

₹{totalSpent}

</div>





<div className="card">

Remaining

<br/>

₹{remaining}

</div>





<div className="card">

Health

<br/>

{health}/100

<br/>

{status}

</div>




</div>









<div className="input-box">





<input

placeholder="Title"

value={title}

onChange={e=>setTitle(e.target.value)}

/>





<input

placeholder="Category"

value={category}

onChange={e=>setCategory(e.target.value)}

/>





<input

placeholder="Amount"

value={amount}

onChange={e=>setAmount(e.target.value)}

/>






<input

type="date"

value={date}

onChange={e=>setDate(e.target.value)}

/>






<input

type="number"

placeholder="Budget Limit"

value={budget}

onChange={e=>saveBudget(e.target.value)}

/>







<button onClick={saveExpense}>

Add

</button>




<button onClick={downloadPDF}>

PDF

</button>



</div>









<div className="charts">



<BarChart

width={400}

height={250}

data={chartData}

>


<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>


<Bar

dataKey="value"

fill="#3498db"

/>


</BarChart>








<PieChart

width={400}

height={250}

>


<Pie

data={chartData}

dataKey="value"

>



{

chartData.map((x,i)=>(


<Cell

key={i}

fill={[

"#3498db",

"#e74c3c",

"#2ecc71"

][i%3]}


/>


))


}



</Pie>


</PieChart>



</div>









<div className="expense-list">


{

expenses.map(e=>(


<div

className="expense-card"

key={e._id}

>



<h3>

{e.title}

</h3>




<p>

{e.category}

</p>




<p>

₹{e.amount}

</p>





<button onClick={()=>editExpense(e)}>

Edit

</button>





<button onClick={()=>deleteExpense(e._id)}>

Delete

</button>



</div>


))


}




</div>








</div>


);


}


export default Dashboard;