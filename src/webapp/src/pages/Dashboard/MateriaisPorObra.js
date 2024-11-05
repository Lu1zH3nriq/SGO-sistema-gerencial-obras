import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Row } from "reactstrap";

const URL_API = process.env.REACT_APP_URL_API;

const MateriaisPorObra = ({ darkMode }) => {
  const [dataObrasMateriais, setDataObrasMateriais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const obrasResponse = await axios.get(`${URL_API}/api/obraMateriais/getObrasComMaisMateriais`);
        setDataObrasMateriais(obrasResponse.data);
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

  const chartData = dataObrasMateriais.map(obra => ({
    name: obra.obra,
    materiaisCount: obra.materiais.quantidade,
    Total: parseFloat(obra.materiais.totalMateriais),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { materiaisCount, Total } = payload[0].payload;
      const obraName = payload[0].payload.name;
      return (
        <div className="custom-tooltip" style={{ backgroundColor: darkMode ? "#333" : "#FFF", border: "1px solid #E0E0E0", padding: "10px", borderRadius: "5px", color: darkMode ? "#FFF" : "#000" }}>
          <p className="label">{`Obra: ${obraName}`}</p>
          <p className="intro">{`Quantidade de Materiais: ${materiaisCount}`}</p>
          <p className="intro">{`Total: R$ ${Total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0 }`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Row>
      <div style={{ textAlign: "center", width: "100%" }}>
        <h6 style={{ color: darkMode ? "#FFFFFF" : "#2E2E33" }}>Obras com mais Materiais</h6>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: darkMode ? "#FFFFFF" : "#2E2E33" }} />
            <YAxis tick={{ fill: darkMode ? "#FFFFFF" : "#2E2E33" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: darkMode ? "#FFFFFF" : "#2E2E33" }} />
            <Bar dataKey="Total" fill="#82ca9d" name="Gastos de Materiais" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Row>
  );
};

export default MateriaisPorObra;
