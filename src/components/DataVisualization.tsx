
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { adrStatsByDrug, adrSourceDistribution, timeSeriesData } from '@/utils/mockData';

interface DataVisualizationProps {
  drugId?: string;
  selectedView: 'overview' | 'sources' | 'trends';
}

const DataVisualization = ({ drugId, selectedView }: DataVisualizationProps) => {
  // Colors for the charts
  const COLORS = ['#EF4444', '#FB923C', '#FCD34D'];
  const SOURCE_COLORS = ['#0891B2', '#0E7490', '#155E75', '#0C4A6E'];
  const LINE_COLORS = ['#0891B2', '#6366F1', '#8B5CF6'];

  // Filter data by drugId if provided
  const filteredStats = drugId 
    ? adrStatsByDrug.filter(stat => stat.drugName.toLowerCase().includes(drugId))
    : adrStatsByDrug;

  const renderOverviewChart = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={filteredStats}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="drugName" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [`${value} Reports`, name.charAt(0).toUpperCase() + name.slice(1)]}
            labelFormatter={(label) => `Drug: ${label}`}
          />
          <Legend />
          <Bar dataKey="severe" name="Severe" fill={COLORS[0]} />
          <Bar dataKey="moderate" name="Moderate" fill={COLORS[1]} />
          <Bar dataKey="mild" name="Mild" fill={COLORS[2]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderSourcesChart = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={adrSourceDistribution}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="count"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {adrSourceDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={SOURCE_COLORS[index % SOURCE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} Reports`, 'Count']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  const renderTrendsChart = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={timeSeriesData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="clinicalReports" name="Clinical Reports" stroke={LINE_COLORS[0]} />
          <Line type="monotone" dataKey="socialMedia" name="Social Media" stroke={LINE_COLORS[1]} />
          <Line type="monotone" dataKey="patientFeedback" name="Patient Feedback" stroke={LINE_COLORS[2]} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {selectedView === 'overview' && 'ADR Severity Distribution'}
        {selectedView === 'sources' && 'ADR Report Sources'}
        {selectedView === 'trends' && 'ADR Reporting Trends'}
      </h3>
      
      {selectedView === 'overview' && renderOverviewChart()}
      {selectedView === 'sources' && renderSourcesChart()}
      {selectedView === 'trends' && renderTrendsChart()}
    </div>
  );
};

export default DataVisualization;
