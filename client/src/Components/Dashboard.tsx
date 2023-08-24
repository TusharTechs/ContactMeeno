import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaVirus,
  FaHeartbeat,
  FaProcedures,
  FaSkull,
  FaLungsVirus,
  FaUserCheck,
  FaUserTimes,
  FaNotesMedical,
  FaBullseye,
  FaGlobe,
} from "react-icons/fa";
import ChartsAndMaps from "./ChartsAndMaps";
import "./styles.css";

// Interface defining the structure of COVID-19 data
interface CovidData {
  testsPerOneMillion: number;
  cases: number;
  casesPerOneMillion: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  tests: number;
  population: number;
  affectedCountries: number;
}

// DashboardPage component definition
const DashboardPage: React.FC = () => {
  // State to store COVID-19 data
  const [data, setData] = useState<CovidData | null>(null);

  // Fetch COVID-19 data from an API on component mount
  useEffect(() => {
    axios
      .get<CovidData>("https://disease.sh/v3/covid-19/all")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Render loading message if data is not yet available
  if (!data) {
    return <p>Loading...</p>;
  }

  // JSX rendering
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">COVID-19 Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 ml-8">
        {/* Display total cases */}
        <div className="bg-white p-12 rounded-lg shadow-md flex flex-col items-center  card-container">
          <FaVirus className="text-6xl text-red-500 mb-4" />
          <p className="font-semibold text-xl">Total Cases</p>
          <p className="text-2xl">{data.cases}</p>
        </div>
        {/* Display total deaths */}
        <div className="bg-white p-12 rounded-lg shadow-md flex flex-col items-center  card-container">
          <FaSkull className="text-6xl text-gray-500 mb-4" />
          <p className="font-semibold text-xl">Total Deaths</p>
          <p className="text-2xl">{data.deaths}</p>
        </div>
        {/* Display total recovered */}
        <div className="bg-white p-12 rounded-lg shadow-md flex flex-col items-center  card-container">
          <FaHeartbeat className="text-6xl text-green-500 mb-4" />
          <p className="font-semibold text-xl">Total Recovered</p>
          <p className="text-2xl">{data.recovered}</p>
        </div>
        {/* Display active cases */}
        <div className="bg-white p-12 rounded-lg shadow-md flex flex-col items-center  card-container">
          <FaProcedures className="text-6xl text-yellow-500 mb-4" />
          <p className="font-semibold text-xl">Active Cases</p>
          <p className="text-2xl">{data.active}</p>
        </div>
        {/* Display critical cases */}
        <div className="bg-white p-12 rounded-lg shadow-md flex flex-col items-center  card-container">
          <FaLungsVirus className="text-6xl text-indigo-500 mb-4" />
          <p className="font-semibold text-xl">Critical Cases</p>
          <p className="text-2xl">{data.critical}</p>
        </div>
        {/* Display tests conducted */}
        <div className="bg-white p-12 rounded-lg shadow-md flex flex-col items-center  card-container">
          <FaUserCheck className="text-6xl text-blue-500 mb-4" />
          <p className="font-semibold text-xl">Tests Conducted</p>
          <p className="text-2xl">{data.tests}</p>
        </div>
        {/* Display affected countries */}
        <div className="bg-white p-12 rounded-lg shadow-md flex flex-col items-center  card-container">
          <FaUserTimes className="text-6xl text-purple-500 mb-4" />
          <p className="font-semibold text-xl">Affected Countries</p>
          <p className="text-2xl">{data.affectedCountries}</p>
        </div>
        {/* Display tests per million */}
        <div className="bg-white p-12 rounded-lg shadow-md flex flex-col items-center  card-container">
          <FaNotesMedical className="text-6xl text-teal-500 mb-4" />
          <p className="font-semibold text-xl">Tests per Million</p>
          <p className="text-2xl">{data.testsPerOneMillion}</p>
        </div>
        {/* Display cases per million */}
        <div className="bg-white p-12 rounded-lg shadow-md flex flex-col items-center  card-container">
          <FaBullseye className="text-6xl text-orange-500 mb-4" />
          <p className="font-semibold text-xl">Cases per Million</p>
          <p className="text-2xl">{data.casesPerOneMillion}</p>
        </div>
        {/* Display global population */}
        <div className="bg-white p-12 rounded-lg shadow-md flex flex-col items-center  card-container">
          <FaGlobe className="text-6xl text-pink-500 mb-4" />
          <p className="font-semibold text-xl">Global Population</p>
          <p className="text-2xl">{data.population}</p>
        </div>
      </div>
      {/* Display Charts and Maps section */}
      <div className="charts-maps-section mt-8">
        <ChartsAndMaps />
      </div>
    </div>
  );
};

export default DashboardPage;
