
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, PieChart, TrendingUp, AlertTriangle } from "lucide-react";
import DrugSearchBox from "./DrugSearchBox";
import DataVisualization from "./DataVisualization";
import AIExplanation from "./AIExplanation";
import PatientFeedbackSection from "./PatientFeedbackSection";
import { drugs } from "@/utils/mockData";

const ADRDashboard = () => {
  const [selectedDrugId, setSelectedDrugId] = useState<string | undefined>(undefined);
  const [visualizationView, setVisualizationView] = useState<'overview' | 'sources' | 'trends'>('overview');

  const selectedDrug = selectedDrugId ? drugs.find(drug => drug.id === selectedDrugId) : undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Adverse Drug Reaction Detection Dashboard
        </h2>
        <p className="text-gray-600 mb-6">
          Advanced AI-powered analysis for early detection and explanation of potential adverse drug reactions
        </p>
        
        <div className="max-w-xl">
          <DrugSearchBox onSelectDrug={setSelectedDrugId} />
        </div>
      </div>
      
      {selectedDrug && (
        <div className="mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedDrug.name}</h3>
                <p className="text-gray-500">
                  {selectedDrug.activeIngredient} • {selectedDrug.manufacturer}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Badge variant="outline" className="bg-healthcare-50 text-healthcare-700 border-healthcare-200 mr-2">
                  {selectedDrug.category}
                </Badge>
                <span className="text-sm text-gray-500">
                  Approved: {new Date(selectedDrug.approvalDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total ADR Reports
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">654</div>
            <p className="text-xs text-muted-foreground">
              +12.3% from previous month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Data Sources Integrated
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground">
              Clinical, social, and literature sources
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              High confidence potential ADRs
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <Tabs defaultValue="overview" className="w-full" onValueChange={(v) => setVisualizationView(v as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">
              <Activity className="h-4 w-4 mr-2" />
              Severity Overview
            </TabsTrigger>
            <TabsTrigger value="sources">
              <PieChart className="h-4 w-4 mr-2" />
              Data Sources
            </TabsTrigger>
            <TabsTrigger value="trends">
              <TrendingUp className="h-4 w-4 mr-2" />
              Reporting Trends
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <DataVisualization selectedView="overview" drugId={selectedDrugId} />
          </TabsContent>
          <TabsContent value="sources">
            <DataVisualization selectedView="sources" drugId={selectedDrugId} />
          </TabsContent>
          <TabsContent value="trends">
            <DataVisualization selectedView="trends" drugId={selectedDrugId} />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <AIExplanation drugId={selectedDrugId} />
        </div>
        <div>
          <PatientFeedbackSection drugId={selectedDrugId} />
        </div>
      </div>
    </div>
  );
};

export default ADRDashboard;
