import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Row } from "reactstrap";

const dataStatusFuncionarios = [
  { name: "Disponíveis", value: 20 },
  { name: "Alocados", value: 50 },
  { name: "Ausentes", value: 10 },
];
const dataFuncionariosObra = [
  { obra: "Obra A", operarios: 10, engenheiros: 2, administrativos: 3 },
  { obra: "Obra B", operarios: 15, engenheiros: 5, administrativos: 4 },
  { obra: "Obra C", operarios: 5, engenheiros: 1, administrativos: 2 },
  { obra: "Obra D", operarios: 8, engenheiros: 3, administrativos: 2 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const StatusFuncionarios = () => (
  <Row>
    <ResponsiveContainer width="50%" height={300}>
      <div style={{ textAlign: "center" }}>
        <h6>Status dos Funcionários</h6>
      </div>
      <PieChart>
        {/* Gráfico de pizza */}
        <Pie
          data={dataStatusFuncionarios}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {dataStatusFuncionarios.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        {/* Adiciona a legenda */}
        <Legend
          verticalAlign="top"
          align="right"
          payload={dataStatusFuncionarios.map((item, index) => ({
            value: `${item.name}`,
            type: "square",
            color: COLORS[index],
          }))}
        />

        {/* Tooltip para mostrar detalhes ao passar o mouse */}
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    <ResponsiveContainer width="50%" height={300}>
      <div style={{ textAlign: "center" }}>
        <h6>Obras com mais funcionarios</h6>
      </div>
      <BarChart
        data={dataFuncionariosObra}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="obra" />
        <YAxis />
        <Tooltip />
        <Legend /> {/* Exibe a legenda */}
        {/* Barras empilhadas */}
        <Bar dataKey="operarios" stackId="a" fill="#8884d8" name="Operários" />
        <Bar
          dataKey="engenheiros"
          stackId="a"
          fill="#82ca9d"
          name="Engenheiros"
        />
        <Bar
          dataKey="administrativos"
          stackId="a"
          fill="#ffc658"
          name="Administrativos"
        />
      </BarChart>
    </ResponsiveContainer>
  </Row>
);

export default StatusFuncionarios;
