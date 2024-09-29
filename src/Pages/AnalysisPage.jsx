// // src/components/AnalysisPage.js


// import React, { useState } from 'react';
// import './AnalysisPage.css'
// import axios from 'axios';
// import { Bar, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// const AnalysisPage = () => {
//   const [boothId, setBoothId] = useState('');
//   const [barData, setBarData] = useState(null);
//   const [lineData, setLineData] = useState(null);
//   const [error, setError] = useState('');

//   const fetchData = async () => {
//     try {
//       // Fetch data for 2023 votes
//       const response2023 = await axios.get(`http://localhost:3000/api/boothvotes2023/${boothId}`);
//       const votes2023 = response2023.data;

//       // Fetch data for 2018 votes
//       const response2018 = await axios.get(`http://localhost:3000/api/boothvotes2018/${boothId}`);
//       const votes2018 = response2018.data;

//       // Fetch data for voter changes
//       const responseChanges = await axios.get(`http://localhost:3000/api/voterchanges/${boothId}`);
//       const voterChanges = responseChanges.data;

//       // Perform calculations for bar chart
//       const totalVotes2023 = votes2023.PartyA_Votes2023 + votes2023.PartyB_Votes2023 + votes2023.Ind_Votes2023;
//       const netVoterChange = voterChanges.NewlyAddedVoters - voterChanges.DeletedVoters;

//       const estimatedPartyA = votes2023.PartyA_Votes2023 + (votes2023.PartyA_Votes2023 / totalVotes2023) * netVoterChange;
//       const estimatedPartyB = votes2023.PartyB_Votes2023 + (votes2023.PartyB_Votes2023 / totalVotes2023) * netVoterChange;
//       const estimatedInd = votes2023.Ind_Votes2023 + (votes2023.Ind_Votes2023 / totalVotes2023) * netVoterChange;

//       // Set data for bar chart
//       setBarData({
//         labels: ['Party A', 'Party B', 'Independent'],
//         datasets: [
//           {
//             label: 'Actual Votes 2023',
//             data: [votes2023.PartyA_Votes2023, votes2023.PartyB_Votes2023, votes2023.Ind_Votes2023],
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1,
//           },
//           {
//             label: 'Estimated Votes with Voter Changes',
//             data: [estimatedPartyA, estimatedPartyB, estimatedInd],
//             backgroundColor: 'rgba(153, 102, 255, 0.2)',
//             borderColor: 'rgba(153, 102, 255, 1)',
//             borderWidth: 1,
//           },
//         ],
//       });

//       // Set data for line chart
//       setLineData({
//         labels: ['2018', '2023'],
//         datasets: [
//           {
//             label: 'Party A Votes',
//             data: [votes2018.PartyA_Votes2018, votes2023.PartyA_Votes2023],
//             fill: false,
//             borderColor: 'rgba(255, 99, 132, 1)',
//             tension: 0.1,
//           },
//           {
//             label: 'Party B Votes',
//             data: [votes2018.PartyB_Votes2018, votes2023.PartyB_Votes2023],
//             fill: false,
//             borderColor: 'rgba(54, 162, 235, 1)',
//             tension: 0.1,
//           },
//           {
//             label: 'Independent Votes',
//             data: [votes2018.Ind_Votes2018, votes2023.Ind_Votes2023],
//             fill: false,
//             borderColor: 'rgba(255, 206, 86, 1)',
//             tension: 0.1,
//           },
//         ],
//       });
//     } catch (err) {
//       setError('Error fetching data');
//       console.error('Error fetching data:', err);
//     }
//   };

//   return (
//     <div className='main'>
//       <h1>Enter Details Here</h1>
//       <div className='buttonn'>
//         <input
//           type="number"
//           value={boothId}
//           onChange={(e) => setBoothId(e.target.value)}
//           placeholder="Enter Booth ID"
//         />
//         <button onClick={fetchData}>Search</button>
//       </div>
//       {error && <p>{error}</p>}
//       {barData && (
//         <div>
//           <h2>Votes Analysis - Bar Chart</h2>
//           <Bar
//             data={barData}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: { position: 'top' },
//                 title: { display: true, text: 'Votes Analysis - Bar Chart' },
//               },
//             }}
//           />
//         </div>
//       )}
//       {lineData && (
//         <div>
//           <h2>Votes Analysis - Line Chart</h2>
//           <Line
//             data={lineData}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: { position: 'top' },
//                 title: { display: true, text: 'Votes Analysis - Line Chart' },
//               },
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnalysisPage;


// import React, { useState, useCallback, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Plot from 'react-plotly.js';

// const AnalysisPage = () => {
//   const { boothId: paramBoothId } = useParams();
//   const [boothId, setBoothId] = useState(paramBoothId || '');
//   const [data, setData] = useState({ combinedVotes: [], combinedVoterChanges: [] });
//   const [error, setError] = useState(null);

//   const fetchData = useCallback(async () => {
//     if (boothId) {
//       try {
//         console.log('Fetching data for Booth ID:', boothId);

//         const [
//           { data: data2023 },
//           { data: data2018 },
//           { data: data2013 },
//           { data: data2008 },
//           { data: data2003 },
//           { data: dataVoterChanges2018 },
//           { data: dataVoterChanges2013 },
//           { data: dataVoterChanges2008 },
//           { data: dataVoterChanges2003 }
//         ] = await Promise.all([
//           axios.get(`http://localhost:3000/api/boothvotes2023/${boothId}`),
//           axios.get(`http://localhost:3000/api/boothvotes2018/${boothId}`),
//           axios.get(`http://localhost:3000/api/boothvotes2013/${boothId}`),
//           axios.get(`http://localhost:3000/api/boothvotes2008/${boothId}`),
//           axios.get(`http://localhost:3000/api/boothvotes2003/${boothId}`),
//           axios.get(`http://localhost:3000/api/voterchanges2018/${boothId}`),
//           axios.get(`http://localhost:3000/api/voterchanges2013/${boothId}`),
//           axios.get(`http://localhost:3000/api/voterchanges2008/${boothId}`),
//           axios.get(`http://localhost:3000/api/voterchanges2003/${boothId}`)
//         ]);

//         // Ensure data is valid
//         if ([data2023, data2018, data2013, data2008, data2003, dataVoterChanges2018, dataVoterChanges2013, dataVoterChanges2008, dataVoterChanges2003].some(d => !d)) {
//           throw new Error('Failed to fetch data');
//         }

//         const combinedVotes = [
//           ...(Array.isArray(data2003) ? data2003 : []).map(vote => ({ ...vote, Year: 2003 })),
//   ...(Array.isArray(data2008) ? data2008 : []).map(vote => ({ ...vote, Year: 2008 })),
//   ...(Array.isArray(data2013) ? data2013 : []).map(vote => ({ ...vote, Year: 2013 })),
//   ...(Array.isArray(data2018) ? data2018 : []).map(vote => ({ ...vote, Year: 2018 })),
//   ...(Array.isArray(data2023) ? data2023 : []).map(vote => ({ ...vote, Year: 2023 })),
//         ];

//         const combinedVoterChanges = [
//           ...(Array.isArray(dataVoterChanges2003) ? dataVoterChanges2003 : []).map(change => ({ ...change, Year: 2003 })),
//           ...(Array.isArray(dataVoterChanges2008) ? dataVoterChanges2008 : []).map(change => ({ ...change, Year: 2008 })),
//           ...(Array.isArray(dataVoterChanges2013) ? dataVoterChanges2013 : []).map(change => ({ ...change, Year: 2013 })),
//           ...(Array.isArray(dataVoterChanges2018) ? dataVoterChanges2018 : []).map(change => ({ ...change, Year: 2018 })),
//         ];

//         setData({ combinedVotes, combinedVoterChanges });
//         setError(null);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Error fetching data. Please check the console for details.');
//       }
//     }
//   }, [boothId]);

//   useEffect(() => {
//     if (boothId) {
//       fetchData();
//     }
//   }, [boothId, fetchData]);

//   const handleInputChange = (e) => {
//     setBoothId(e.target.value);
//   };

//   const handleButtonClick = () => {
//     fetchData();
//   };

//   return (
//     <div>
//       <h1>Analysis for Booth ID: {boothId}</h1>
//       <input
//         type="text"
//         value={boothId}
//         onChange={handleInputChange}
//         placeholder="Enter Booth ID"
//       />
//       <button onClick={handleButtonClick}>Fetch Data</button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {data.combinedVotes.length > 0 && (
//         <>
//           <Plot
//             data={[
//               {
//                 x: data.combinedVotes.map(d => d.Year),
//                 y: data.combinedVotes.map(d => d.PartyA_Votes),
//                 type: 'scatter',
//                 mode: 'lines+markers',
//                 name: 'Party A Votes',
//                 text: data.combinedVotes.map(d => `Year: ${d.Year}<br>Party A Votes: ${d.PartyA_Votes}`),
//                 hoverinfo: 'text'
//               },
//               {
//                 x: data.combinedVotes.map(d => d.Year),
//                 y: data.combinedVotes.map(d => d.PartyB_Votes),
//                 type: 'scatter',
//                 mode: 'lines+markers',
//                 name: 'Party B Votes',
//                 text: data.combinedVotes.map(d => `Year: ${d.Year}<br>Party B Votes: ${d.PartyB_Votes}`),
//                 hoverinfo: 'text'
//               },
//               {
//                 x: data.combinedVotes.map(d => d.Year),
//                 y: data.combinedVotes.map(d => d.Ind_Votes),
//                 type: 'scatter',
//                 mode: 'lines+markers',
//                 name: 'Independent Votes',
//                 text: data.combinedVotes.map(d => `Year: ${d.Year}<br>Independent Votes: ${d.Ind_Votes}`),
//                 hoverinfo: 'text'
//               }
//             ]}
//             layout={{ title: 'Votes by Party Over Different Years', xaxis: { title: 'Year' }, yaxis: { title: 'Votes' } }}
//           />
//           <Plot
//             data={[
//               {
//                 x: data.combinedVoterChanges.map(d => d.Year),
//                 y: data.combinedVoterChanges.map(d => d.NewlyAddedVoters),
//                 type: 'bar',
//                 name: 'Newly Added Voters',
//                 text: data.combinedVoterChanges.map(d => `Year: ${d.Year}<br>Newly Added Voters: ${d.NewlyAddedVoters}`),
//                 hoverinfo: 'text'
//               },
//               {
//                 x: data.combinedVoterChanges.map(d => d.Year),
//                 y: data.combinedVoterChanges.map(d => d.DeletedVoters),
//                 type: 'bar',
//                 name: 'Deleted Voters',
//                 text: data.combinedVoterChanges.map(d => `Year: ${d.Year}<br>Deleted Voters: ${d.DeletedVoters}`),
//                 hoverinfo: 'text'
//               }
//             ]}
//             layout={{ title: 'Voter Changes by Year', xaxis: { title: 'Year' }, yaxis: { title: 'Number of Voters' }, barmode: 'group' }}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default AnalysisPage;

// import React, { useState } from 'react';

// const AnalysisPage = () => {
//     const [boothId, setBoothId] = useState('');
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);

//     const fetchAnalysis = async () => {
//         try {
//             const response = await fetch(`/api/analysis/${boothId}`);
//             if (!response.ok) throw new Error('Error fetching data');
//             const result = await response.json();
//             setData(result);
//             setError(null);
//         } catch (err) {
//             setError(err.message);
//             setData(null);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         fetchAnalysis();
//     };

//     return (
//         <div>
//             <h1>Booth Analysis</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={boothId}
//                     onChange={(e) => setBoothId(e.target.value)}
//                     placeholder="Enter Booth ID"
//                     required
//                 />
//                 <button type="submit">Get Analysis</button>
//             </form>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {data && (
//                 <div>
//                     <h2>Analysis Result:</h2>
//                     <pre>{JSON.stringify(data, null, 2)}</pre>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AnalysisPage;


// import React, { useState, useEffect } from 'react';
// import './AnalysisPage.css';
// import axios from 'axios';
// import { Bar, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// const AnalysisPage = () => {
//   const [boothId, setBoothId] = useState('');
//   const [barData, setBarData] = useState({ labels: [], datasets: [] });
//   const [lineData, setLineData] = useState({ labels: [], datasets: [] });
//   const [error, setError] = useState('');

//   const fetchData = async () => {
//     try {
//       const responses = await Promise.all([
//         axios.get(`http://localhost:3000/api/boothvotes2023/${boothId}`),
//         axios.get(`http://localhost:3000/api/boothvotes2018/${boothId}`),
//         axios.get(`http://localhost:3000/api/boothvotes2013/${boothId}`),
//         axios.get(`http://localhost:3000/api/boothvotes2008/${boothId}`),
//         axios.get(`http://localhost:3000/api/boothvotes2003/${boothId}`),
//       ]);

//       const votes2023 = responses[0].data;
//       const votes2018 = responses[1].data;
//       const votes2013 = responses[2].data;
//       const votes2008 = responses[3].data;
//       const votes2003 = responses[4].data;

//       setBarData({
//         labels: ['2003', '2008', '2013', '2018', '2023'],
//         datasets: [
//           {
//             label: 'Party A Votes',
//             data: [
//               votes2003.PartyA_Votes2003,
//               votes2008.PartyA_Votes2008,
//               votes2013.PartyA_Votes2013,
//               votes2018.PartyA_Votes2018,
//               votes2023.PartyA_Votes2023,
//             ],
//             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 1,
//           },
//           {
//             label: 'Party B Votes',
//             data: [
//               votes2003.PartyB_Votes2003,
//               votes2008.PartyB_Votes2008,
//               votes2013.PartyB_Votes2013,
//               votes2018.PartyB_Votes2018,
//               votes2023.PartyB_Votes2023,
//             ],
//             backgroundColor: 'rgba(54, 162, 235, 0.2)',
//             borderColor: 'rgba(54, 162, 235, 1)',
//             borderWidth: 1,
//           },
//           {
//             label: 'Independent Votes',
//             data: [
//               votes2003.Ind_Votes2003,
//               votes2008.Ind_Votes2008,
//               votes2013.Ind_Votes2013,
//               votes2018.Ind_Votes2018,
//               votes2023.Ind_Votes2023,
//             ],
//             backgroundColor: 'rgba(255, 206, 86, 0.2)',
//             borderColor: 'rgba(255, 206, 86, 1)',
//             borderWidth: 1,
//           },
//         ],
//       });

//       setLineData({
//         labels: ['2003', '2008', '2013', '2018', '2023'],
//         datasets: [
//           {
//             label: 'Party A Votes',
//             data: [
//               votes2003.PartyA_Votes2003,
//               votes2008.PartyA_Votes2008,
//               votes2013.PartyA_Votes2013,
//               votes2018.PartyA_Votes2018,
//               votes2023.PartyA_Votes2023,
//             ],
//             fill: false,
//             borderColor: 'rgba(255, 99, 132, 1)',
//             tension: 0.1,
//           },
//           {
//             label: 'Party B Votes',
//             data: [
//               votes2003.PartyB_Votes2003,
//               votes2008.PartyB_Votes2008,
//               votes2013.PartyB_Votes2013,
//               votes2018.PartyB_Votes2018,
//               votes2023.PartyB_Votes2023,
//             ],
//             fill: false,
//             borderColor: 'rgba(54, 162, 235, 1)',
//             tension: 0.1,
//           },
//         ],
//       });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('Failed to fetch data');
//     }
//   };

//   useEffect(() => {
//     if (boothId) {
//       fetchData();
//     }
//   }, [boothId]);

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//         min: 0,
//         max: 1000,
//         ticks: {
//           stepSize: 100,
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={boothId}
//         onChange={(e) => setBoothId(e.target.value)}
//         placeholder="Enter Booth ID"
//       />
//       {error && <p>{error}</p>}
//       {barData.labels.length > 0 && <Bar data={barData} options={options} />}
//       {lineData.labels.length > 0 && <Line data={lineData} options={options} />}
//     </div>
//   );
// };

// export default AnalysisPage;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';

// const App = () => {
//   const [boothId, setBoothId] = useState('');
//   const [chartData, setChartData] = useState(null);

//   const fetchData = async () => {
//     try {
//       const votes2023 = await axios.get(`http://localhost:3000/api/boothvotes2023`);
//       const votes2018 = await axios.get(`http://localhost:3000/api/boothvotes2018`);
//       const votes2013 = await axios.get(`http://localhost:3000/api/boothvotes2013`);
//       const votes2008 = await axios.get(`http://localhost:3000/api/boothvotes2008`);
//       const votes2003 = await axios.get(`http://localhost:3000/api/boothvotes2003`);
//       const voterChanges2018 = await axios.get(`http://localhost:3000/api/voterchanges2018`);
//       const voterChanges2013 = await axios.get(`http://localhost:3000/api/voterchanges2013`);
//       const voterChanges2008 = await axios.get(`http://localhost:3000/api/voterchanges2008`);
//       const voterChanges2003 = await axios.get(`http://localhost:3000/api/voterchanges2003`);

//       const combinedVotes = [
//         ...votes2003.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2003 })),
//         ...votes2008.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2008 })),
//         ...votes2013.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2013 })),
//         ...votes2018.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2018 })),
//         ...votes2023.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2023 }))
//       ];

//       const combinedVoterChanges = [
//         ...voterChanges2003.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2003 })),
//         ...voterChanges2008.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2008 })),
//         ...voterChanges2013.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2013 })),
//         ...voterChanges2018.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2018 }))
//       ];

//       const combinedData = combinedVotes.map(vote => ({
//         ...vote,
//         ...combinedVoterChanges.find(change => change.Year === vote.Year)
//       }));

//       setChartData({
//         labels: combinedData.map(data => data.Year),
//         datasets: [
//           {
//             label: 'Party A Votes',
//             data: combinedData.map(data => data.PartyA_Votes),
//             borderColor: 'rgba(75, 192, 192, 1)',
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             fill: true
//           },
//           {
//             label: 'Party B Votes',
//             data: combinedData.map(data => data.PartyB_Votes),
//             borderColor: 'rgba(153, 102, 255, 1)',
//             backgroundColor: 'rgba(153, 102, 255, 0.2)',
//             fill: true
//           },
//           {
//             label: 'Independent Votes',
//             data: combinedData.map(data => data.Ind_Votes),
//             borderColor: 'rgba(255, 159, 64, 1)',
//             backgroundColor: 'rgba(255, 159, 64, 0.2)',
//             fill: true
//           }
//         ]
//       });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Booth Analysis</h1>
//       <input
//         type="text"
//         value={boothId}
//         onChange={(e) => setBoothId(e.target.value)}
//         placeholder="Enter Booth ID"
//       />
//       <button onClick={fetchData}>Fetch Data</button>
//       {chartData && (
//         <Line
//           data={chartData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: 'top',
//               },
//               title: {
//                 display: true,
//                 text: 'Votes Analysis'
//               }
//             }
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default App;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';

// const App = () => {
//   const [boothId, setBoothId] = useState('');
//   const [chartData, setChartData] = useState(null);

//   const fetchData = async () => {
//     try {
//       const votes2023 = await axios.get(`http://localhost:3000/api/boothvotes2023`);
//       const votes2018 = await axios.get(`http://localhost:3000/api/boothvotes2018`);
//       const votes2013 = await axios.get(`http://localhost:3000/api/boothvotes2013`);
//       const votes2008 = await axios.get(`http://localhost:3000/api/boothvotes2008`);
//       const votes2003 = await axios.get(`http://localhost:3000/api/boothvotes2003`);
//       const voterChanges2023 = await axios.get(`http://localhost:3000/api/voterchanges2023`);
//       const voterChanges2018 = await axios.get(`http://localhost:3000/api/voterchanges2018`);
//       const voterChanges2013 = await axios.get(`http://localhost:3000/api/voterchanges2013`);
//       const voterChanges2008 = await axios.get(`http://localhost:3000/api/voterchanges2008`);
//       const voterChanges2003 = await axios.get(`http://localhost:3000/api/voterchanges2003`);

//       const combinedVotes = [
//         ...votes2003.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2003 })),
//         ...votes2008.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2008 })),
//         ...votes2013.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2013 })),
//         ...votes2018.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2018 })),
//         ...votes2023.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2023 }))
//       ];

//       const combinedVoterChanges = [
//         ...voterChanges2003.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2003 })),
//         ...voterChanges2008.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2008 })),
//         ...voterChanges2013.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2013 })),
//         ...voterChanges2018.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2018 })),
//         ...voterChanges2023.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2023 }))
//       ];

//       const combinedData = combinedVotes.map(vote => ({
//         ...vote,
//         ...combinedVoterChanges.find(change => change.Year === vote.Year)
//       }));

//       setChartData({
//         labels: combinedData.map(data => data.Year),
//         datasets: [
//           {
//             label: 'Party A Votes',
//             data: combinedData.map(data => data.PartyA_Votes),
//             borderColor: 'rgba(75, 192, 192, 1)',
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             fill: true,
//             hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
//             hoverBorderColor: 'rgba(75, 192, 192, 1)',
//             hoverBorderWidth: 2,
//             hoverRadius: 5,
//             pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
//             pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
//             pointHoverBorderWidth: 2,
//             pointHoverRadius: 5,
//             pointRadius: 3,
//             pointHitRadius: 10,
//             pointStyle: 'circle',
//             pointHoverStyle: 'circle',
//             hoverOffset: 4,
//             hoverInfo: combinedData.map(data => `Year: ${data.Year}\nParty A Votes: ${data.PartyA_Votes}\nNewly Added Voters: ${data.NewlyAddedVoters}\nDeleted Voters: ${data.DeletedVoters}`)
//           },
//           {
//             label: 'Party B Votes',
//             data: combinedData.map(data => data.PartyB_Votes),
//             borderColor: 'rgba(153, 102, 255, 1)',
//             backgroundColor: 'rgba(153, 102, 255, 0.2)',
//             fill: true,
//             hoverBackgroundColor: 'rgba(153, 102, 255, 0.4)',
//             hoverBorderColor: 'rgba(153, 102, 255, 1)',
//             hoverBorderWidth: 2,
//             hoverRadius: 5,
//             pointHoverBackgroundColor: 'rgba(153, 102, 255, 1)',
//             pointHoverBorderColor: 'rgba(153, 102, 255, 1)',
//             pointHoverBorderWidth: 2,
//             pointHoverRadius: 5,
//             pointRadius: 3,
//             pointHitRadius: 10,
//             pointStyle: 'circle',
//             pointHoverStyle: 'circle',
//             hoverOffset: 4,
//             hoverInfo: combinedData.map(data => `Year: ${data.Year}\nParty B Votes: ${data.PartyB_Votes}\nNewly Added Voters: ${data.NewlyAddedVoters}\nDeleted Voters: ${data.DeletedVoters}`)
//           },
//           {
//             label: 'Independent Votes',
//             data: combinedData.map(data => data.Ind_Votes),
//             borderColor: 'rgba(255, 159, 64, 1)',
//             backgroundColor: 'rgba(255, 159, 64, 0.2)',
//             fill: true,
//             hoverBackgroundColor: 'rgba(255, 159, 64, 0.4)',
//             hoverBorderColor: 'rgba(255, 159, 64, 1)',
//             hoverBorderWidth: 2,
//             hoverRadius: 5,
//             pointHoverBackgroundColor: 'rgba(255, 159, 64, 1)',
//             pointHoverBorderColor: 'rgba(255, 159, 64, 1)',
//             pointHoverBorderWidth: 2,
//             pointHoverRadius: 5,
//             pointRadius: 3,
//             pointHitRadius: 10,
//             pointStyle: 'circle',
//             pointHoverStyle: 'circle',
//             hoverOffset: 4,
//             hoverInfo: combinedData.map(data => `Year: ${data.Year}\nIndependent Votes: ${data.Ind_Votes}\nNewly Added Voters: ${data.NewlyAddedVoters}\nDeleted Voters: ${data.DeletedVoters}`)
//           }
//         ]
//       });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Booth Analysis</h1>
//       <input
//         type="text"
//         value={boothId}
//         onChange={(e) => setBoothId(e.target.value)}
//         placeholder="Enter Booth ID"
//       />
//       <button onClick={fetchData}>Fetch Data</button>
//       {chartData && (
//         <Line
//           data={chartData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: 'top',
//               },
//               title: {
//                 display: true,
//                 text: 'Votes Analysis'
//               },
//               tooltip: {
//                 callbacks: {
//                   label: function(context) {
//                     const index = context.dataIndex;
//                     const dataset = context.dataset;
//                     return dataset.hoverInfo[index];
//                   }
//                 }
//               }
//             }
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default App;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Line, Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// const App = () => {
//   const [boothId, setBoothId] = useState('');
//   const [lineChartData, setLineChartData] = useState(null);
//   const [barChartData, setBarChartData] = useState(null);
//   const [analysis, setAnalysis] = useState('');

//   const fetchData = async () => {
//     try {
//       const votes2023 = await axios.get(`http://localhost:3000/api/boothvotes2023`);
//       const votes2018 = await axios.get(`http://localhost:3000/api/boothvotes2018`);
//       const votes2013 = await axios.get(`http://localhost:3000/api/boothvotes2013`);
//       const votes2008 = await axios.get(`http://localhost:3000/api/boothvotes2008`);
//       const votes2003 = await axios.get(`http://localhost:3000/api/boothvotes2003`);
//       const voterChanges2023 = await axios.get(`http://localhost:3000/api/voterchanges2023`);
//       const voterChanges2018 = await axios.get(`http://localhost:3000/api/voterchanges2018`);
//       const voterChanges2013 = await axios.get(`http://localhost:3000/api/voterchanges2013`);
//       const voterChanges2008 = await axios.get(`http://localhost:3000/api/voterchanges2008`);
//       const voterChanges2003 = await axios.get(`http://localhost:3000/api/voterchanges2003`);

//       const combinedVotes = [
//         ...votes2003.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2003 })),
//         ...votes2008.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2008 })),
//         ...votes2013.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2013 })),
//         ...votes2018.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2018 })),
//         ...votes2023.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2023 }))
//       ];

//       const combinedVoterChanges = [
//         ...voterChanges2003.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2003 })),
//         ...voterChanges2008.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2008 })),
//         ...voterChanges2013.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2013 })),
//         ...voterChanges2018.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2018 })),
//         ...voterChanges2023.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2023 }))
//       ];

//       const combinedData = combinedVotes.map(vote => ({
//         ...vote,
//         ...combinedVoterChanges.find(change => change.Year === vote.Year)
//       }));

//       setLineChartData({
//         labels: combinedData.map(data => data.Year),
//         datasets: [
//           {
//             label: 'Party A Votes',
//             data: combinedData.map(data => data.PartyA_Votes),
//             borderColor: 'rgba(75, 192, 192, 1)',
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             fill: true,
//             hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
//             hoverBorderColor: 'rgba(75, 192, 192, 1)',
//             hoverBorderWidth: 2,
//             hoverRadius: 5,
//             pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
//             pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
//             pointHoverBorderWidth: 2,
//             pointHoverRadius: 5,
//             pointRadius: 3,
//             pointHitRadius: 10,
//             pointStyle: 'circle',
//             pointHoverStyle: 'circle',
//             hoverOffset: 4,
//             hoverInfo: combinedData.map(data => `Year: ${data.Year}\nParty A Votes: ${data.PartyA_Votes}\nNewly Added Voters: ${data.NewlyAddedVoters}\nDeleted Voters: ${data.DeletedVoters}`)
//           },
//           {
//             label: 'Party B Votes',
//             data: combinedData.map(data => data.PartyB_Votes),
//             borderColor: 'rgba(153, 102, 255, 1)',
//             backgroundColor: 'rgba(153, 102, 255, 0.2)',
//             fill: true,
//             hoverBackgroundColor: 'rgba(153, 102, 255, 0.4)',
//             hoverBorderColor: 'rgba(153, 102, 255, 1)',
//             hoverBorderWidth: 2,
//             hoverRadius: 5,
//             pointHoverBackgroundColor: 'rgba(153, 102, 255, 1)',
//             pointHoverBorderColor: 'rgba(153, 102, 255, 1)',
//             pointHoverBorderWidth: 2,
//             pointHoverRadius: 5,
//             pointRadius: 3,
//             pointHitRadius: 10,
//             pointStyle: 'circle',
//             pointHoverStyle: 'circle',
//             hoverInfo: combinedData.map(data => `Year: ${data.Year}\nParty B Votes: ${data.PartyB_Votes}\nNewly Added Voters: ${data.NewlyAddedVoters}\nDeleted Voters: ${data.DeletedVoters}`)
//           },
//           {
//             label: 'Independent Votes',
//             data: combinedData.map(data => data.Ind_Votes),
//             borderColor: 'rgba(255, 159, 64, 1)',
//             backgroundColor: 'rgba(255, 159, 64, 0.2)',
//             fill: true,
//             hoverBackgroundColor: 'rgba(255, 159, 64, 0.4)',
//             hoverBorderColor: 'rgba(255, 159, 64, 1)',
//             hoverBorderWidth: 2,
//             hoverRadius: 5,
//             pointHoverBackgroundColor: 'rgba(255, 159, 64, 1)',
//             pointHoverBorderColor: 'rgba(255, 159, 64, 1)',
//             pointHoverBorderWidth: 2,
//             pointHoverRadius: 5,
//             pointRadius: 3,
//             pointHitRadius: 10,
//             pointStyle: 'circle',
//             pointHoverStyle: 'circle',
//             hoverOffset: 4,
//             hoverInfo: combinedData.map(data => `Year: ${data.Year}\nIndependent Votes: ${data.Ind_Votes}\nNewly Added Voters: ${data.NewlyAddedVoters}\nDeleted Voters: ${data.DeletedVoters}`)
//           }
//         ]
//       });

//       setBarChartData({
//         labels: combinedData.map(data => data.Year),
//         datasets: [
//           {
//             label: 'Newly Added Voters',
//             data: combinedData.map(data => data.NewlyAddedVoters),
//             backgroundColor: 'rgba(54, 162, 235, 0.6)',
//             borderColor: 'rgba(54, 162, 235, 1)',
//             borderWidth: 1
//           },
//           {
//             label: 'Deleted Voters',
//             data: combinedData.map(data => data.DeletedVoters),
//             backgroundColor: 'rgba(255, 99, 132, 0.6)',
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 1
//           }
//         ]
//       });

//       // Analysis based on the data
//       const analysisText = `The analysis of the data shows that the impact of newly added and deleted voters on the election results varies across the years. For instance, in years with a significant number of newly added voters, there is a noticeable increase in the votes for certain parties. Conversely, years with a high number of deleted voters show a decrease in the total votes. This indicates that voter registration changes can have a substantial impact on election outcomes.`;

//       setAnalysis(analysisText);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Booth Analysis</h1>
//       <input
//         type="text"
//         value={boothId}
//         onChange={(e) => setBoothId(e.target.value)}
//         placeholder="Enter Booth ID"
//       />
//       <button onClick={fetchData}>Fetch Data</button>
//       {lineChartData && (
//         <Line
//           data={lineChartData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: 'top',
//               },
//               title: {
//                 display: true,
//                 text: 'Votes Analysis'
//               },
//               tooltip: {
//                 callbacks: {
//                   label: function(context) {
//                     const index = context.dataIndex;
//                     const dataset = context.dataset;
//                     return dataset.hoverInfo[index];
//                   }
//                 }
//               }
//             }
//           }}
//         />
//       )}
//       {barChartData && (
//         <Bar
//           data={barChartData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: 'top',
//               },
//               title: {
//                 display: true,
//                 text: 'Voter Changes Analysis'
//               }
//             }
//           }}
//         />
//       )}
//       {analysis && <p>{analysis}</p>}
//     </div>
//   );
//                 };
                
//                 export default App;
        

import React, { useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const App = () => {
  const [boothId, setBoothId] = useState('');
  const [lineChartData, setLineChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [inputData, setInputData] = useState({});
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/predict', [inputData]);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  const fetchData = async () => {
    try {
      const votes2023 = await axios.get(`http://localhost:3000/api/boothvotes2023`);
      const votes2018 = await axios.get(`http://localhost:3000/api/boothvotes2018`);
      const votes2013 = await axios.get(`http://localhost:3000/api/boothvotes2013`);
      const votes2008 = await axios.get(`http://localhost:3000/api/boothvotes2008`);
      const votes2003 = await axios.get(`http://localhost:3000/api/boothvotes2003`);
      const voterChanges2023 = await axios.get(`http://localhost:3000/api/voterchanges2023`);
      const voterChanges2018 = await axios.get(`http://localhost:3000/api/voterchanges2018`);
      const voterChanges2013 = await axios.get(`http://localhost:3000/api/voterchanges2013`);
      const voterChanges2008 = await axios.get(`http://localhost:3000/api/voterchanges2008`);
      const voterChanges2003 = await axios.get(`http://localhost:3000/api/voterchanges2003`);

      const combinedVotes = [
        ...votes2003.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2003 })),
        ...votes2008.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2008 })),
        ...votes2013.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2013 })),
        ...votes2018.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2018 })),
        ...votes2023.data.filter(vote => vote.BoothID === parseInt(boothId)).map(vote => ({ ...vote, Year: 2023 }))
      ];

      const combinedVoterChanges = [
        ...voterChanges2003.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2003 })),
        ...voterChanges2008.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2008 })),
        ...voterChanges2013.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2013 })),
        ...voterChanges2018.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2018 })),
        ...voterChanges2023.data.filter(change => change.BoothID === parseInt(boothId)).map(change => ({ ...change, Year: 2023 }))
      ];

      const combinedData = combinedVotes.map(vote => ({
        ...vote,
        ...combinedVoterChanges.find(change => change.Year === vote.Year)
      }));

      setLineChartData({
        labels: combinedData.map(data => data.Year),
        datasets: [
          {
            label: 'Party A Votes',
            data: combinedData.map(data => data.PartyA_Votes),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
            hoverBorderColor: 'rgba(75, 192, 192, 1)',
            hoverBorderWidth: 2,
            hoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
            pointHoverBorderWidth: 2,
            pointHoverRadius: 5,
            pointRadius: 3,
            pointHitRadius: 10,
            pointStyle: 'circle',
            pointHoverStyle: 'circle',
            hoverOffset: 4,
            hoverInfo: combinedData.map(data => `Year: ${data.Year}\nParty A Votes: ${data.PartyA_Votes}\nNewly Added Voters: ${data.NewlyAddedVoters}\nDeleted Voters: ${data.DeletedVoters}`)
          },
          {
            label: 'Party B Votes',
            data: combinedData.map(data => data.PartyB_Votes),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
            hoverBorderColor: 'rgba(255, 99, 132, 1)',
            hoverBorderWidth: 2,
            hoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
            pointHoverBorderWidth: 2,
            pointHoverRadius: 5,
            pointRadius: 3,
            pointHitRadius: 10,
            pointStyle: 'circle',
            pointHoverStyle: 'circle',
            hoverOffset: 4,
            hoverInfo: combinedData.map(data => `Year: ${data.Year}\nParty B Votes: ${data.PartyB_Votes}\nNewly Added Voters: ${data.NewlyAddedVoters}\nDeleted Voters: ${data.DeletedVoters}`)
          }
        ]
      });

      setBarChartData({
        labels: combinedData.map(data => data.Year),
        datasets: [
          {
            label: 'Newly Added Voters',
            data: combinedData.map(data => data.NewlyAddedVoters),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
            hoverBorderColor: 'rgba(54, 162, 235, 1)',
            hoverBorderWidth: 2,
            hoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
            pointHoverBorderWidth: 2,
            pointHoverRadius: 5,
            pointRadius: 3,
            pointHitRadius: 10,
            pointStyle: 'circle',
            pointHoverStyle: 'circle',
            hoverOffset: 4,
            hoverInfo: combinedData.map(data => `Year: ${data.Year}\nNewly Added Voters: ${data.NewlyAddedVoters}\nDeleted Voters: ${data.DeletedVoters}`)
          },
          {
            label: 'Deleted Voters',
            data: combinedData.map(data => data.DeletedVoters),
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255, 206, 86, 0.4)',
            hoverBorderColor: 'rgba(255, 206, 86, 1)',
            hoverBorderWidth: 2,
            hoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255, 206, 86, 1)',
            pointHoverBorderColor: 'rgba(255, 206, 86, 1)',
            pointHoverBorderWidth: 2,
            pointHoverRadius: 5,
            pointRadius: 3,
            pointHitRadius: 10,
            pointStyle: 'circle',
            pointHoverStyle: 'circle',
            hoverOffset: 4,
            hoverInfo: combinedData.map(data => `Year: ${data.Year}\nNewly Added Voters: ${data.NewlyAddedVoters}\nDeleted Voters: ${data.DeletedVoters}`)
          }
        ]
      });

      // Example analysis logic
      const analysisText = combinedData.map(data => 
        `Year: ${data.Year}, Party A Votes: ${data.PartyA_Votes}, Party B Votes: ${data.PartyB_Votes}, Newly Added Voters: ${data.NewlyAddedVoters}, Deleted Voters: ${data.DeletedVoters}`
      ).join('\n');

      setAnalysis(analysisText);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Election Data Analysis</h1>
      <div>
        <label>Booth ID:</label>
        <input type="text" value={boothId} onChange={(e) => setBoothId(e.target.value)} />
        <button onClick={fetchData}>Fetch Data</button>
      </div>
      {lineChartData && (
        <div>
          <h2>Votes Over the Years</h2>
          <Line data={lineChartData} />
        </div>
      )}
      {barChartData && (
        <div>
          <h2>Voter Changes Over the Years</h2>
          <Bar data={barChartData} />
        </div>
      )}
      {analysis && (
        <div>
          <h2>Analysis</h2>
          <pre>{analysis}</pre>
        </div>
      )}
      <div>
        <h2>Predict Election Results</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Feature 1:</label>
            <input type="text" name="feature1" onChange={handleChange} />
          </div>
          <div>
            <label>Feature 2:</label>
            <input type="text" name="feature2" onChange={handleChange} />
          </div>
          {/* Add more input fields as needed */}
          <button type="submit">Predict</button>
        </form>
        {prediction && (
          <div>
            <h2>Prediction Result:</h2>
            <p>{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
