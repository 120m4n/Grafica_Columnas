var options = {
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["Feb", "Mar", "Apr", "May", "Jun"],
  },
  yaxis: {
    title: {
      text: "Solicitudes",
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " solicitudes";
      },
    },
  },
};

const GetData = (collection) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("https://worker360.electrosoftware.net:3000/supervision/last_five_" + collection, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
      console.log(createNewSeriesArray(result));
      let data = createNewSeriesArray(result);
      $('#sparklinedash_0').sparkline(data['cancelados'], config)
      $('#sparklinedash_1').sparkline(data['recibidos'], config)
      $('#sparklinedash_2').sparkline(data['reparados'], config)
      $('#sparklinedash_3').sparkline(data['asignados'], config)
      // options.series = createSeriesArray(result);

      // var chart = new ApexCharts(document.querySelector("#chart"), options);
      // chart.render();
    })
    .catch((error) => console.log("error", error));
};

//GetData("tipo_dano");
//GetData('tipo_fuente');
//GetData('cuadrillas');

const createNewSeriesArray = (arrayData) => {
  let series = {};
  const innerData = arrayData.map((element) => element.data);
  //return innerData
  console.log(getNames(innerData[0]))
  getNames(innerData[0]).forEach((name) => {
      series[name]=getValue(name, innerData)
  });

  //console.log(series);
  return series;
};

const createSeriesArray = (arrayData) => {
  let series = [];
  const innerData = arrayData.map((element) => element.data);
  //return innerData
  console.log(getNames(innerData[0]))
  //   console.log(innerData);
  //console.log('recibidos', getValue('recibidos', innerData))
  getNames(innerData[0]).forEach((name) => {
    if (!["reparados"].includes(name)) {
      series.push({
        name: name,
        data: getValue(name, innerData),
      });
    }
  });

  //console.log(series);
  return series;
};

const getNames = (object) => {
  return Object.keys(object);
};

const getValue = (key, arrayData) => {
  let data = [];
  arrayData.forEach((item) => data.push(item[key]));
  return data;
};
