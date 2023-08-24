import React, { useState, useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import Chart from "chart.js/auto";
import "./styles.css";

// Interface for country data
interface CountryData {
  country: string;
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
  countryInfo: {
    lat: number;
    long: number;
  };
}

const customIcon = divIcon({
  className: 'custom-icon',
  html: '<div>📍</div>',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

// Interface for historical graph data
interface GraphData {
  cases: { [date: string]: number };
}

// ChartsAndMaps component definition
const ChartsAndMaps: React.FC = () => {
  // State for graph and country data, and loading indicator
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Reference to the graph canvas element
  const graphCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const mapContainerProps = useMemo(
    () => ({
      center: { lat: 20, lng: 0 }, 
      zoom: 2,
      style: { width: '100%', height: '426px', margin: '0 auto' },
    }),
    []
  );

  // Fetch data on component mount
  useEffect(() => {
    // Fetch historical graph data
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((response) => response.json())
      .then((data) => {
        setGraphData(data);
        setIsLoading(false);
      });

    // Fetch country data for map markers
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => setCountryData(data));
  }, []);

  // Update chart when graphData changes
  useEffect(() => {
    if (graphCanvasRef.current && graphData) {
      const graphLabels = Object.keys(graphData.cases);
      const graphValues = Object.values(graphData.cases);

      const graphConfig = {
        type: "line" as const,
        data: {
          labels: graphLabels,
          datasets: [
            {
              label: "Cases",
              data: graphValues,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
        },
      };

      new Chart(graphCanvasRef.current!, graphConfig);
    }
  }, [graphData]);

  // Create map markers based on country data
  const mapMarkers = countryData.map((country) => (
    <Marker
    key={country.country}
    position={[country.countryInfo.lat, country.countryInfo.long]}
    icon={customIcon}
  >
    <Popup>
      <div>
        <h3>{country.country}</h3>
        <p>Total Active Cases: {country.active}</p>
        <p>Total Recovered Cases: {country.recovered}</p>
        <p>Total Deaths: {country.deaths}</p>
      </div>
    </Popup>
  </Marker>
  ));

  return (
    <div>
      <div className="chart-container">
        <h2 className="text-2xl font-semibold mb-4 mt-2">Cases Fluctuations</h2>
        {isLoading ? (
          <div className="loading-screen">Loading Line Graph...</div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <canvas ref={graphCanvasRef} width="800" height="400"></canvas>
          </div>
        )}
      </div>
      <div className="map-container">
        <h2 className="text-2xl font-semibold mb-4">Map</h2>
        {isLoading ? (
          <div className="loading-screen">Loading Map...</div>
        ) : (
          <MapContainer {...mapContainerProps}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {mapMarkers}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default ChartsAndMaps;
