import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const DeleteChart = () => {
  const [chartData, setChartData] = useState({});
  const [options, setOptions] = useState({});
  const chart = () => {
    let values = [];

    axios
      .get("http://localhost:5000/timesPosts/getget")
      .then((res) => {
        values = res.data.timeDeleteOne;
        setChartData({
          labels: [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
          ],
          datasets: [
            {
              label: "Level of DELETE Request",
              data: values,
              backgroundColor: [["rgba(75, 192, 192, 0.6)"]],
              borderWidth: 4,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const opt = () => {
    setOptions({
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Czas [ms]",
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "L.p żądania",
            },
          },
        ],
      },
    });
  };
  useEffect(() => {
    chart();
    opt();
  }, []);
  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DeleteChart;
