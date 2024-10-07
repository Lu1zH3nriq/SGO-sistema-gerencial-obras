import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ObrasChart = ({ data, darkMode }) => {
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    const mesesDoAno = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const mesesAbreviados = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    const formattedData = mesesDoAno.map((mes, index) => {
      const obrasNoMes = data.filter((obra) => {
        const dataInicio = new Date(obra.dataInicio);
        const dataFinal = obra.dataFinal
          ? new Date(obra.dataFinal)
          : new Date();

        return (
          dataInicio.getMonth() === index ||
          (obra.status === "em andamento" &&
            dataInicio.getMonth() <= index &&
            dataFinal.getMonth() >= index)
        );
      });

      const concluidas = obrasNoMes.filter(
        (obra) => obra.status.toLowerCase() === "concluida"
      ).length;
      const emAndamento = obrasNoMes.filter(
        (obra) => obra.status.toLowerCase() === "em andamento"
      ).length;
      const atrasadas = obrasNoMes.filter(
        (obra) => obra.status.toLowerCase() === "atrasada"
      ).length;

      return {
        month: mesesAbreviados[index],
        fullMonth: mes,
        concluidas,
        emAndamento,
        atrasadas,
        total: concluidas + emAndamento + atrasadas,
      };
    });

    setDataChart(formattedData);
  }, [data]);

  const maxTotal = Math.max(...dataChart.map((item) => item.total), 0);
  const yTicks = [];
  for (let i = 0; i <= maxTotal; i += 2) {
    yTicks.push(i);
  }

  const textColor = darkMode ? "#FFFFFF" : "#343A40";

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={dataChart}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tick={{ fill: textColor }}
          label={{
            value: "Meses",
            position: "insideBottomRight",
            offset: -20,
            fill: textColor,
          }}
        />
        <YAxis
          tick={{ fill: textColor }}
          label={{
            value: "Quant. Obras",
            angle: -90,
            position: "insideLeft",
            fill: textColor,
          }}
          domain={[0, "dataMax"]}
          ticks={yTicks}
        />
        <Tooltip
          formatter={(value, name) => `${value} obras`}
          content={({ payload, label }) => {
            if (payload && payload.length) {
              const { atrasadas, emAndamento, concluidas, fullMonth } =
                payload[0].payload;

              const statusStyles = {
                concluidas: { backgroundColor: "#28a745", color: "#FFFFFF" }, 
                emAndamento: { backgroundColor: "#007bff", color: "#FFFFFF" }, 
                atrasadas: { backgroundColor: "#dc3545", color: "#FFFFFF" }, 
              };

              return (
                <div
                  style={{
                    backgroundColor: darkMode ? "#676767" : "#FFFFFF",
                    padding: "0.5rem",
                    borderRadius: "5px",
                  }}
                >
                  <p>
                    <strong>{fullMonth}</strong>
                  </p>
                  <p>
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor:
                          statusStyles.concluidas.backgroundColor,
                        marginRight: "15px",
                      }}
                    />
                    Concluídas: {concluidas}
                  </p>
                  <p>
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor:
                          statusStyles.emAndamento.backgroundColor,
                        marginRight: "15px",
                      }}
                    />
                    Em Andamento: {emAndamento}
                  </p>
                  <p>
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: statusStyles.atrasadas.backgroundColor,
                        marginRight: "15px",
                      }}
                    />
                    Atrasadas: {atrasadas}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />

        <Legend />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#8884d8"
          name="Total de Obras"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ObrasChart;
