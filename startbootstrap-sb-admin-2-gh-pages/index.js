let plot = (data) => {
    const ctx = document.getElementById('myChart');
    const dataset = {
      labels: data.hourly.time, /* ETIQUETA DE DATOS */
      datasets: [{
        label: 'Temperatura semanal', /* ETIQUETA DEL GRÁFICO */
        data: data.hourly.temperature_2m, /* ARREGLO DE DATOS */
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    const config = {
      type: "bar",
      data: dataset
    };
    const chart = new Chart(ctx, config); /* Modifico el grafico */
  };
  
  let load = (data) => {
    plot(data);
  };
  
  (function () {
    let URL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m";
    let meteo = localStorage.getItem('meteo');
  
    if (meteo == null) {
      fetch(URL)
        .then(response => response.json())
        .then(data => {
          load(data);
  
          /* GUARDAR DATA EN LA MEMORIA */
          const meteoText = JSON.stringify(data);
          localStorage.setItem('meteo', meteoText);
          console.log('Datos de meteo guardados en la memoria del navegador.');
        })
        .catch(console.error);
    } else {
      /* CARGAR DATA DESDE LA MEMORIA */
      const meteoData = JSON.parse(meteo);
      load(meteoData);
    }
  })();
  

