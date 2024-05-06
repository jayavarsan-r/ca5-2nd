import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [bg, setbg] = useState("white");
  const [tv, settv] = useState(null);
  const [cookie, setcookie, removecookie] = useCookies(["counter"]);
  const [formdata,setformdata]=useState({
    id:' ',
    name:' ',
    gender:' '
  })
  const [userdata , setuserdata] = useState([])
  const [filterdata,setfilterdata] = useState(' ')

  const startt = () => {
    settv(
      setInterval(() => {
        setCount((c) => c + 1);
        setcookie("count", count);
      }, 1000)
    );
  };

  const pauset = () => {
    clearInterval(tv);
  };

  const removet = () => {
    removecookie("count");
    clearInterval(tv);
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlesubmit = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:3000/createuser', formdata)
    .then((response) => {
      console.log('Data successfully added:', response.data);
      setformdata({
        id:' ',
        name:' ',
        gender:' '
      });
    })
    .catch((error) => {
      console.error('Error adding data:', error);
    });


  }


  useEffect(()=>{
    axios.get(`http://localhost:3000/getuser`)
    .then(res => setuserdata(res.data))
    .catch(err => console.log(err))
  },[count])


  useEffect(() => {
    if (count % 2 === 0) {
      setbg("red");
    } else if (count % 3 === 0) {
      setbg("blue");
    } else {
      setbg("white");
    }
  }, [count]);

  // const filteredlist  = userdata.filter(e => e.gender == 'male')

// console.log(filteredlist)
  return (
    <>
      <div>
        <div style={{ background: bg }}>
          <h1 style={{ color: "black" }}>{count} </h1>
        </div>
        <button onClick={startt}>start</button>
        <button onClick={pauset}>Pause</button>
        <button onClick={removet}>stop </button>
      </div>

      <div>
        <form>
          <label>
            ID:
            <input type="text" value={formdata.id} onChange={handlechange} name="id" />
          </label>
          <label>
            Name:
            <input type="text" value={formdata.name} onChange={handlechange} name="name" />
          </label>
          <label>
            Gender:
            <input type="text" value={formdata.gender} onChange={handlechange} name="gender" />
          </label>
          <button onClick={handlesubmit} type="submit">ADD this</button>
        </form>
      </div>
      <div>
        <h1>entered data</h1>
        <div>
          <span>fiter data using genders</span><button onClick={()=>{setfilterdata('male'); console.log(filterdata)}}>Male</button><button onClick={()=>{setfilterdata('female'); console.log(filterdata)}}>Female</button>
        </div>
        {
          userdata.map((e,index) => ( e.id == count ? (
            <div key={index}>
              <span>{e.id}</span>
              <span>{e.name}</span>
              <span>{e.gender}</span>
            </div>) : null
          ))
       
        }
        
      </div>
    </>
  );
}

export default App;
