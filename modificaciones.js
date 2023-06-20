
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
            type: 'line',
            data: dataset,
        };
        const chart = new Chart(ctx, config)


     }
  
     let load = (data) => { 
        plot(data)
        }


    (function () {
        let URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.20&longitude=-79.89&hourly=temperature_2m&daily=uv_index_max&current_weather=true&start_date=2023-06-06&end_date=2023-06-28&timezone=Australia%2FSydney';
        fetch( URL )
        .then(response => response.json())
        .then(data => {
          let meteo = localStorage.getItem('meteo');
      if(meteo == null) {
              
          fetch(URL)
          .then(response => response.json())
          .then(data => {
              load(data)
              localStorage.setItem("meteo", JSON.stringify(data))
      
          })
          .catch(console.error);
      
        } else {
      
            /* CARGAR DATA DESDE LA MEMORIA */
            load(JSON.parse(meteo))

      
        }

        })
        .catch(console.error); 
  }
)();
