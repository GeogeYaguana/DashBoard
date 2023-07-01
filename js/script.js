(function () {
  let URL = "";
  fetch(
    "https://api.open-meteo.com/v1/gfs?latitude=-2.14&longitude=-79.97&hourly=temperature_2m&daily=sunrise&timezone=auto"
  )
    .then((response) => response.json())
    .then((data) => {
      let timezone = data["timezone"];
      let timezoneHTML = document.getElementById("timezone");
      timezoneHTML.textContent = timezone;

      let timezone_abbreviation = data["timezone_abbreviation"];
      let timezone_abbreviationHTML = document.getElementById(
        "timezone_abbreviation"
      );
      timezone_abbreviationHTML.textContent = timezone_abbreviation;

      let elevation = data["elevation"];
      let elevationHTML = document.getElementById("elevation");
      elevationHTML.textContent = elevation;

      let longitude = data["longitude"];
      let latitude = data["latitude"]; /* TAMBIEN SE PUEDE ASI: data.latitude */
      let locationHTML = document.getElementById("location");
      locationHTML.textContent = latitude + ", " + longitude;

      let generationtime_ms = data["generationtime_ms"];
      let generationtime_msHTML = document.getElementById("generationtime_ms");
      generationtime_msHTML.textContent =
        "Generated in " + generationtime_ms + " ms";
      /*console.log(data);*/
    })
    .catch(console.error);
})();

let plot = (data) => {
  const ctx = document.getElementById('myChart').getContext('2d');
  const dataset = {
    labels: data.hourly.time, 
      datasets: [{
        label: 'Temperatura semanal', 
        data: data.hourly.temperature_2m, 
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }],
  };
  const config = {
    type: "line",
    data: dataset,
  };
  const chart = new Chart(ctx, config);
};

(function () {
  let URL =
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&daily=uv_index_max&timezone=auto";

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      plot(data); 
    })
    .catch(console.error);
})();

let bar = (data) => {
  const ctx = document.getElementById("myChartUV");
  const dataset = {
    labels:
      data.daily.time ,
    datasets: [
      {
        label: "Temperatura Diaria" ,
        data: data.daily
          .uv_index_max ,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const config = {
    type: "bar",
    data: dataset,
  };
  const chart = new Chart(ctx, config);
};

(function () {
  let URL =
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&daily=uv_index_max&timezone=auto";

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      bar(data); /*invocando el grafico de barra */
    })
    .catch(console.error);
})();

let load = (data) => {
  console.log(data);      
  document.getElementById("timezone").innerHTML=data["timezone"]
  document.getElementById("GMT").innerHTML=data["timezone_abbreviation"]
  document.getElementById("tunit").innerHTML=data["hourly_units"]["temperature_2m"]
  plot(data)
}

(function () {
  let meteo = localStorage.getItem("meteo");
  if (meteo == null) {
    let URL =
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&daily=uv_index_max&timezone=auto";

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        load(data);

        localStorage.setItem("meteo", JSON.stringify(data));
      })
      .catch(console.error);
  } else {
    load(JSON.parse(meteo));
  }
})();

let loadInocar = () => {};
(
  function () {
  let URL_proxy = "https://cors-anywhere.herokuapp.com/";
  let URL = URL_proxy + "https://www.inocar.mil.ec/mareas/consultan.php";

  fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "text/html");
      let contenedorMareas = xml.getElementsByClassName('container-fluid')[0];
      let contenedorHTML = document.getElementById("table-container");
      contenedorHTML.innerHTML = contenedorMareas.innerHTML;
    })
    .catch(console.error);
})();