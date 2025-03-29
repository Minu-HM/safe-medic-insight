
import { useState } from "react";
import { cn } from "@/lib/utils";
import { aiInsights } from "@/utils/mockData";
import { AlertCircle, CheckCircle, Info, ChevronRight, ChevronDown } from "lucide-react";

interface AIExplanationProps {
  drugId?: string;
}

const AIExplanation = ({ drugId }: AIExplanationProps) => {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  // Filter insights by drugId if provided
  const filteredInsights = drugId
    ? aiInsights.filter(insight => insight.drugId === drugId)
    : aiInsights;

  const toggleInsight = (id: string) => {
    if (expandedInsight === id) {
      setExpandedInsight(null);
    } else {
      setExpandedInsight(id);
    }
  };

  const getConfidenceClass = (score: number) => {
    if (score >= 0.85) return "text-green-600";
    if (score >= 0.7) return "text-amber-500";
    return "text-red-500";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "established":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "emerging":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "potential":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">AI-Generated Insights</h3>
      
      {filteredInsights.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Select a medication to view AI insights</p>
        </div>
      ) : (
        <div className="space-y-4 insights-container">
          {filteredInsights.map((insight) => (
            <div 
              key={insight.id} 
              className="border border-gray-200 rounded-md overflow-hidden"
            >
              <div 
                className="flex items-start p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleInsight(insight.id)}
              >
                <div className="mr-3 mt-0.5">{getTypeIcon(insight.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                    <div className="flex items-center">
                      <span className={cn("text-sm font-medium mr-2", getConfidenceClass(insight.confidenceScore))}>
                        {(insight.confidenceScore * 100).toFixed(0)}%
                      </span>
                      {expandedInsight === insight.id ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {insight.description}
                  </p>
                </div>
              </div>
              
              {expandedInsight === insight.id && (
                <div className="px-4 pb-4">
                  <div className="mt-3">
                    <h5 className="text-xs font-medium text-gray-700 uppercase mb-2">Causal Factors</h5>
                    <div className="space-y-2">
                      {insight.causalFactors.map((factor, index) => (
                        <div key={index} className="flex items-center">
                          <div 
                            className="h-2 bg-healthcare-500 rounded"
                            style={{ width: `${factor.weight * 100}%` }}
                          ></div>
                          <span className="ml-2 text-sm text-gray-600">{factor.factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h5 className="text-xs font-medium text-gray-700 uppercase mb-2">Supporting Evidence</h5>
                    <ul className="space-y-2">
                      {insight.supportingEvidence.map((evidence, index) => (
                        <li key={index} className="text-sm">
                          <span className="font-medium text-gray-700">{evidence.source}:</span>{" "}
                          <span className="text-gray-600">{evidence.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4 text-right">
                    <button className="text-sm text-healthcare-600 hover:text-healthcare-800">
                      View Full Analysis
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIExplanation;
