import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Row } from "reactstrap";

const StatusEquipamentos = ({ darkMode, data }) => {
  const [dataStatusEquipamento, setDataStatusEquipamento] = useState([]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  useEffect(() => {
    if (data && data.length) {
      const dataFormatted = [
        { name: "Disponíveis", value: 0 },
        { name: "Em Uso", value: 0 },
        { name: "Manutenção", value: 0 },
      ];

      // Contar a quantidade de equipamentos por status
      data.forEach((equipamento) => {
        const status = equipamento.status.trim().toLowerCase(); // Remove espaços em branco e converte para minúsculas

        // Verifique a correspondência
        if (status === "disponível") {
          dataFormatted[0].value += 1;
        } else if (status === "em uso") {
          dataFormatted[1].value += 1;
        } else if (status === "manutenção") {
          dataFormatted[2].value += 1;
        } else {
          console.warn("Status desconhecido:", status); // Log para status desconhecido
        }
      });

      setDataStatusEquipamento(dataFormatted);
    }
  }, [data]);

  // Total de equipamentos
  const totalEquipamentos = dataStatusEquipamento.reduce(
    (acc, curr) => acc + curr.value,
    0
  );

  return (
    <Row style={{ padding: "0rem 0rem 1rem 0rem" }}>
      <ResponsiveContainer width="100%" height={300}>
        {dataStatusEquipamento.length > 0 ? (
          <PieChart style={{ paddingTop: "1rem" }}>
            <Pie
              data={dataStatusEquipamento}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {dataStatusEquipamento.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              verticalAlign="top"
              align="right"
              payload={dataStatusEquipamento.map((item, index) => ({
                value: `${item.name}`,
                type: "square",
                color: COLORS[index],
              }))}
            />
            <Tooltip />
          </PieChart>
        ) : (
          <div style={{ textAlign: "center", marginTop: "5rem" }}>
            <h5>Sem dados para exibir</h5>
          </div>
        )}
        <div style={{ textAlign: "start", marginTop: "1rem" }}>
          <h6>Total de Equipamentos: {totalEquipamentos}</h6>
        </div>
      </ResponsiveContainer>
    </Row>
  );
};

export default StatusEquipamentos;
