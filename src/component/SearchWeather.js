import React, { useState, useEffect } from "react";

export default function SearchWeather() {
  const [search, setSearch] = useState("london");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=f8e22a817a165d0fdb3f1e6563795536`
      );
      if(componentMounted) {
        setData(await response.json());
        console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchWeather();
  }, [search]);

  let emoji = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main == "Clouds") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main == "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main == "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main == "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (data.weather[0].main == "Snow") {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>....Loading</div>;
  }

  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);

let d = new Date();
let date =d.getDate();
let year= d.getFullYear();
let month=d.toLocaleDateString("default",{month:'long'});
let day=d.toLocaleDateString("default",{weekday:'long'});

let time= d.toLocaleString([],{
  hour:'2-digit',
  minute:'2-digit',
  second:'2-digit'
});

const handleSubmit = (event)=>{
  event.preventDefault();
  setSearch(input);
}

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div class="card text-white text-center border-a">
              <img
                src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
                class="card-img"
                alt="..."
              />
              <div class="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div class="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      class="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e)=>setInput(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      class="input-group-text"
                      id="basic-addon2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                  <h2 class="card-title">{data.name}</h2>
                  <p class="card-text lead">{day}, {month} {date}, {year}
                  <br/> {time}</p>
                  <hr />
                  <i className={`fas fa-cloud fa-4x`}></i>
                  <h1 className="fw-bolder mb-5">{temp} &deg;C</h1>
                  <p className="lead fw-border mb-0">{data.weather[0]}</p>
                  <p className="lead">
                    {temp_min}&deg;C | {temp_max}&deg;C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
