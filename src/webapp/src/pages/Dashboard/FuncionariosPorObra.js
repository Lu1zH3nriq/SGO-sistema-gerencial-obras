import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dados de exemplo com muitas obras
const dataFuncionariosObra = Array.from({ length: 20 }, (_, index) => ({
  obra: `Obra ${index + 1}`,
  funcionarios: Math.floor(Math.random() * 10) + 1,
}));

const FuncionariosPorObra = ({ darkMode }) => (
  <div style={{ width: "100%", height: 400, overflowX: "auto" }}>
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={dataFuncionariosObra}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#FFFFFF" : "#E0E0E0"}
          />
          <XAxis
            dataKey="obra"
            tick={{ fill: darkMode ? "#FFFFFF" : "#2E2E33" }}
          />
          <YAxis tick={{ fill: darkMode ? "#FFFFFF" : "#2E2E33" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#676767" : "#FFFFFF",
              border: darkMode ? "1px solid #FFFFFF" : "1px solid #E0E0E0",
              color: darkMode ? "#FFFFFF" : "#2E2E33",
            }}
            itemStyle={{
              color: darkMode ? "#FFFFFF" : "#2E2E33",
            }}
          />
          <Bar dataKey="funcionarios" fill={darkMode ? "#4A90E2" : "#8884d8"} />

          <text
            x={"50%"}
            y={"2%"}
            fill={darkMode ? "#FFFFFF" : "#2E2E33"}
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontSize: "18px" }}
          >
            Relação de Funcionários por Obra
          </text>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default FuncionariosPorObra;
