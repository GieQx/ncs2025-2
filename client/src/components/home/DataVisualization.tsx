import { useState } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for visualizations
const globalStatData = [
  { name: 'North America', value: 35 },
  { name: 'Europe', value: 30 },
  { name: 'Asia', value: 25 },
  { name: 'Africa', value: 5 },
  { name: 'South America', value: 3 },
  { name: 'Oceania', value: 2 },
];

const economicData = [
  { name: '2020', gdp: 45, inflation: 2.1, unemployment: 6.5 },
  { name: '2021', gdp: 48, inflation: 4.5, unemployment: 5.8 },
  { name: '2022', gdp: 52, inflation: 7.2, unemployment: 4.2 },
  { name: '2023', gdp: 55, inflation: 3.8, unemployment: 3.9 },
  { name: '2024', gdp: 58, inflation: 2.5, unemployment: 3.7 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const DataVisualization = () => {
  const [selectedVariable, setSelectedVariable] = useState('education');
  const [timeValue, setTimeValue] = useState(50);
  const [selectedRegion, setSelectedRegion] = useState('global');

  return (
    <section id="visualizations" className="py-20 px-4 bg-gradient-to-r from-primary to-accent text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23F1F1F1'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat"
      }}></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Interactive Data Insights</h2>
          <p className="text-lg text-white/80">
            Explore compelling statistical visualizations and insights that showcase the power of data analysis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Visualization 1 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors duration-300">
            <h3 className="font-bold text-xl mb-4">Global Statistical Trends</h3>
            <div className="aspect-square bg-white/5 rounded-lg mb-4 p-4 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={globalStatData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius="70%"
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {globalStatData.map((entry, index) => (
                      <cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-white/80 mb-4">
              Interactive visualization of key statistical indicators across different regions and time periods.
            </p>
            <button className="bg-white text-primary rounded-full py-2 px-4 text-sm font-medium hover:bg-primary/10 hover:text-white transition-colors duration-300">
              Explore Data
            </button>
          </div>
          
          {/* Visualization 2 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors duration-300">
            <h3 className="font-bold text-xl mb-4">Economic Indicators Dashboard</h3>
            <div className="aspect-square bg-white/5 rounded-lg mb-4 p-4 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={economicData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                  <YAxis stroke="rgba(255,255,255,0.7)" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
                  <Legend />
                  <Bar dataKey="gdp" fill="#82ca9d" name="GDP Growth %" />
                  <Bar dataKey="inflation" fill="#8884d8" name="Inflation %" />
                  <Bar dataKey="unemployment" fill="#ffc658" name="Unemployment %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-white/80 mb-4">
              Real-time visualization of economic metrics and their statistical significance in policy decisions.
            </p>
            <button className="bg-white text-primary rounded-full py-2 px-4 text-sm font-medium hover:bg-primary/10 hover:text-white transition-colors duration-300">
              View Dashboard
            </button>
          </div>
          
          {/* Visualization 3 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors duration-300">
            <h3 className="font-bold text-xl mb-4">Statistical Methodology Explorer</h3>
            <div className="aspect-square bg-white/5 rounded-lg mb-4 p-4 flex items-center justify-center">
              <i className="fas fa-microscope text-5xl text-white/50"></i>
            </div>
            <p className="text-white/80 mb-4">
              Interactive tool demonstrating various statistical methodologies and their applications in real-world scenarios.
            </p>
            <button className="bg-white text-primary rounded-full py-2 px-4 text-sm font-medium hover:bg-primary/10 hover:text-white transition-colors duration-300">
              Try Explorer
            </button>
          </div>
        </div>
        
        {/* Featured Visualization */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8">
              <h3 className="font-bold text-2xl mb-4">Featured: Population Statistics Simulation</h3>
              <p className="text-white/80 mb-6">
                This interactive simulation allows users to explore how different variables affect population statistics and demographic trends over time.
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-2">Time Period</label>
                  <input 
                    type="range" 
                    className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer" 
                    min="1" 
                    max="100" 
                    value={timeValue}
                    onChange={(e) => setTimeValue(parseInt(e.target.value))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Variable Selection</label>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      className={`rounded-full px-3 py-1 text-xs transition-colors ${selectedVariable === 'age' ? 'bg-accent' : 'bg-white/20 hover:bg-white/30'}`}
                      onClick={() => setSelectedVariable('age')}
                    >
                      Age
                    </button>
                    <button 
                      className={`rounded-full px-3 py-1 text-xs transition-colors ${selectedVariable === 'education' ? 'bg-accent' : 'bg-white/20 hover:bg-white/30'}`}
                      onClick={() => setSelectedVariable('education')}
                    >
                      Education
                    </button>
                    <button 
                      className={`rounded-full px-3 py-1 text-xs transition-colors ${selectedVariable === 'income' ? 'bg-accent' : 'bg-white/20 hover:bg-white/30'}`}
                      onClick={() => setSelectedVariable('income')}
                    >
                      Income
                    </button>
                    <button 
                      className={`rounded-full px-3 py-1 text-xs transition-colors ${selectedVariable === 'health' ? 'bg-accent' : 'bg-white/20 hover:bg-white/30'}`}
                      onClick={() => setSelectedVariable('health')}
                    >
                      Health
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Region</label>
                  <select 
                    className="w-full bg-white/20 border border-white/10 rounded-lg px-3 py-2 text-white"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                  >
                    <option value="global">Global (All Regions)</option>
                    <option value="north-america">North America</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="africa">Africa</option>
                    <option value="south-america">South America</option>
                    <option value="oceania">Oceania</option>
                  </select>
                </div>
              </div>
              
              <button className="bg-white text-primary rounded-full py-2 px-6 text-sm font-medium hover:bg-primary/10 hover:text-white transition-colors duration-300">
                Run Simulation
              </button>
            </div>
            
            <div className="bg-white/5 p-8 flex items-center justify-center">
              <div className="w-full aspect-square bg-white/5 rounded-lg p-6 flex items-center justify-center">
                <i className="fas fa-chart-pie text-6xl text-white/30"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;
