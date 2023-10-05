// Elementos del DOM
//? obtener input
const monedaInput = document.querySelector("input");
//? obtener select
const monedaSelect = document.querySelector("select");
//? obtener boton
const btn = document.querySelector("button");
//? obtener span para el resultado
const span = document.querySelector("span");

// Variables
//? url de api
const urlAPI = "https://mindicador.cl/api/";

//? variable para grafico

// Eventos
//? Evento para el boton
btn.addEventListener("click", () => {
  //Traer el valor de la moneda input
  const { value: valorMonedaInput } = monedaInput; //Otra forma de traer el valor
  //Traer el valor de la moneda select
  const valorMonedaSelect = monedaSelect.value;
  //Utilizar la función de búsqueda
  searchData(valorMonedaSelect);
});

// Funciones
async function searchData(monedaSeleccionada) {
  try {
    const res = await fetch(urlAPI + monedaSeleccionada);
    const data = await res.json();
    const { serie } = data;

    //console.log(serie.slice(0, 10).reverse());
    //Crear la data para el gráfico
    const datos = crearData(serie.slice(0, 10).reverse());
    //Destruir gráfica ---------
    var myChart;

    if (myChart) {
      myChart.destroy();
    }
    myChart = new Chart(chartDOM, config);
    //Renderizar el gráfico
    renderGrafica(datos);
    //Obtener el valor de la moneda y retornarla
    //Agregar
  } catch (error) {
    console.log("Falló en cargar");
  }
}

//? Busqueda

//? render grafico
function renderGrafica(data) {
  const config = {
    type: "line",
    data: data,
  };

  console.log(data);
  const ctx = document.getElementById("myChart");

  new Chart(ctx, config);
}

//? crear data
function crearData(serie) {
  //Iterar serie para obtener un formato para la fecha
  const labels = serie.map(({ fecha }) => formateoFecha(fecha));
  //Iterar serie para obtener valor
  const valorSerieMap = serie.map(({ valor }) => valor);
  //Crear data para el gráfico
  const datasets = [
    {
      label: "Histórico",
      borderColor: "rgb(75, 192, 192)",
      data: valorSerieMap,
    },
  ];
  //Retornar la data
  return { labels, datasets };
}

//? formatear fecha
function formateoFecha(fecha) {
  date = new Date(fecha);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${day} - ${month} - ${year}`;
}
