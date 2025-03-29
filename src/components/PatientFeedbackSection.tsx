
import { adrReports } from "@/utils/mockData";
import { AlertTriangle, MessageSquare, FileText, Globe } from "lucide-react";

interface PatientFeedbackSectionProps {
  drugId?: string;
}

const PatientFeedbackSection = ({ drugId }: PatientFeedbackSectionProps) => {
  // Filter reports by drugId if provided
  const filteredReports = drugId
    ? adrReports.filter(report => report.drugId === drugId)
    : adrReports;

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "severe":
        return "bg-red-100 text-red-800";
      case "moderate":
        return "bg-amber-100 text-amber-800";
      case "mild":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case "clinical":
        return <FileText className="h-4 w-4" />;
      case "social":
        return <Globe className="h-4 w-4" />;
      case "patient":
        return <MessageSquare className="h-4 w-4" />;
      case "literature":
        return <FileText className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Patient & Source Feedback</h3>
      
      {filteredReports.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Select a medication to view reports</p>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto max-h-[350px] pr-2">
          {filteredReports.map((report) => (
            <div 
              key={report.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 card-hover"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  {getSourceIcon(report.sourceType)}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{report.sourceName}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityClass(report.severity)}`}>
                      {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{report.description}</p>
                  {report.symptoms.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {report.symptoms.map((symptom, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
                    <span>{new Date(report.reportDate).toLocaleDateString()}</span>
                    <div className="flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      <span>
                        Confidence: 
                        <span className={report.confidence >= 0.8 ? "text-green-600" : report.confidence >= 0.6 ? "text-amber-600" : "text-red-600"}>
                          {` ${(report.confidence * 100).toFixed(0)}%`}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientFeedbackSection;
