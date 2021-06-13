import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Dankmemes = () => {
  const [chartData, setChartData] = useState({});
  const [employeeSalary, setEmployeeSalary] = useState([]);
  const [employeeAge, setEmployeeAge] = useState([]);
  const [levelData, setLevelData] = useState({})

  const toggle = () => {
    axios.get('http://localhost:8080/stop').then(console.log('stop'))


  }
  const chart = () => {
    let empSal = [];
    let empAge = [];
    let levelData = []

    axios
      .get("http://localhost:8080/analyse")
      .then(res => {
        console.log(res.data)
        // for (const dataObj of res.data.data) {
        //   // empSal.push(parseInt(dataObj.employee_salary));
        //   // empAge.push(parseInt(dataObj.employee_age));
        //   console.log(dataObj)
        // }
        // levelData={...res.data}
        //  setLevelData({...res.data})
        empAge = Object.keys(res.data)
        levelData = Object.values(res.data)
        setChartData({
          labels: empAge,
          datasets: [
            {
              label: "level of tweets",
              data: levelData,
              backgroundColor: ['rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'],
              borderWidth: 4
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(levelData);
  };

  useEffect(() => {
    chart()
    setInterval(() => chart(), 5000)
  }, []);
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand mb-0 h1" to='/'>TwitIT</Link>
        {/* <Link to='/' style={{color:'white',textDecoration:'none'}}>Home</Link> */}
        <button className='btn btn-danger' onClick={toggle}><i class="fa fa-power-off" aria-hidden="true"></i></button>

      </nav>
      <div>
        <div className="container bg-image" style={{ margin: '0px', padding: '0px', maxWidth: '100%', height: '1920px' }}>
          <div className="row">
            <div className="col-md-2 card bg-light col-sm-8" style={{ marginTop: '2rem', marginBottom: '1rem' }}></div>

            <div className="col-md-5 card bg-light col-sm-5" style={{ marginTop: '2rem', marginBottom: '1rem' }}>


              <Pie
                data={chartData}
                options={{
                  responsive: true,
                  title: { text: "THICCNESS SCALE", display: true },

                }}
              />
              <Bar data={chartData} />
              <Line data={chartData} />


            </div>
            <div className="col-md-2 card bg-light col-sm-8" style={{ marginTop: '2rem', marginBottom: '1rem' }}></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dankmemes;
