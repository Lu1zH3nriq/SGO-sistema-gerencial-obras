import React, { useState, useEffect } from "react";
import axios from "axios";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
const URL_API = process.env.REACT_APP_URL_API;

const StatusFuncionarios = ({ darkMode }) => {
  const [dataStatusFuncionarios, setDataStatusFuncionarios] = useState([]);
  const [dataFuncionariosObra, setDataFuncionariosObra] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statusResponse = await axios.get(`${URL_API}/api/funcionarios/funcionariosPorStatus`);
        setDataStatusFuncionarios(statusResponse.data);

        const obrasResponse = await axios.get(`${URL_API}/api/obras/getObrasComFuncionarios`);
        setDataFuncionariosObra(obrasResponse.data);
      } catch (err) {
        setError("Erro ao carregar dados");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Carregando dados...</p>;
  if (error) return <p>{error}</p>;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      return (
        <div className="custom-tooltip" style={{ backgroundColor: darkMode ? "#333" : "#FFF", border: "1px solid #E0E0E0", padding: "10px", borderRadius: "5px", color: darkMode ? "#FFF" : "#000" }}>
          <p className="label">{`${name}: ${value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Row>
      {/* Gráfico de Pizza - Status dos Funcionários */}
      <ResponsiveContainer width="50%" height={300}>
        <div style={{ textAlign: "center" }}>
          <h6 style={{ color: darkMode ? "#FFFFFF" : "#2E2E33" }}>Status dos Funcionários</h6>
        </div>
        <PieChart>
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
          <Legend
            verticalAlign="top"
            align="right"
            payload={dataStatusFuncionarios.map((item, index) => ({
              value: `${item.name}`,
              type: "square",
              color: COLORS[index % COLORS.length],
            }))}
          />
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Gráfico de Barras - Obras com mais Funcionários */}
      <ResponsiveContainer width="50%" height={300}>
        <div style={{ textAlign: "center" }}>
          <h6 style={{ color: darkMode ? "#FFFFFF" : "#2E2E33" }}>Obras com mais funcionários</h6>
        </div>
        <BarChart
          data={dataFuncionariosObra}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="obra" tick={{ fill: darkMode ? "#FFFFFF" : "#2E2E33" }} />
          <YAxis tick={{ fill: darkMode ? "#FFFFFF" : "#2E2E33" }} />
          <Tooltip
            contentStyle={{ backgroundColor: darkMode ? "#333" : "#FFF", border: "1px solid #E0E0E0", color: darkMode ? "#FFF" : "#000" }}
            itemStyle={{ color: darkMode ? "#FFF" : "#000" }}
          />
          <Bar dataKey="operarios" fill="#8884d8" name="Funcionários Alocados" />
        </BarChart>
      </ResponsiveContainer>
    </Row>
  );
};

export default StatusFuncionarios;
