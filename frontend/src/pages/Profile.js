import {useEffect,useState} from "react";

import axios from "axios";




function Profile(){



const [user,setUser]=useState({});


const [edit,setEdit]=useState(false);


const [name,setName]=useState("");

const [email,setEmail]=useState("");





const token = localStorage.getItem("token");



const config={


headers:{


Authorization:`Bearer ${token}`


}


};







const getProfile=async()=>{


try{


const res = await axios.get(

"http://localhost:5000/api/auth/profile",

config

);





setUser(res.data);


setName(res.data.name);


setEmail(res.data.email);





localStorage.setItem(

"user",

JSON.stringify(res.data)

);




}

catch(err){


console.log(err.response?.data || err);


}



};







useEffect(()=>{


getProfile();



},[]);










const updateProfile=async()=>{


try{


const res = await axios.put(

"http://localhost:5000/api/auth/profile",

{


name,

email


},


config

);





setUser(res.data.user);




localStorage.setItem(

"user",

JSON.stringify(res.data.user)

);





setEdit(false);



}



catch(err){


console.log(err.response?.data || err);



}



};









return(



<div className="profile-page">





<div className="profile-card">






<h1>

Profile

</h1>









{

edit ?


<>


<input


type="text"


value={name}


onChange={(e)=>setName(e.target.value)}


placeholder="Enter name"



/>






<input


type="email"


value={email}


onChange={(e)=>setEmail(e.target.value)}


placeholder="Enter email"



/>







<button onClick={updateProfile}>


Save Profile


</button>




</>



:

<>


<p>

Name : {user.name}

</p>




<p>

Email : {user.email}

</p>





<button

onClick={()=>setEdit(true)}

>


Edit Profile


</button>





</>



}






</div>





</div>



);



}



export default Profile;