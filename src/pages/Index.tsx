
import NavigationBar from "@/components/NavigationBar";
import ADRDashboard from "@/components/ADRDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavigationBar />
      <main className="flex-1">
        <ADRDashboard />
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                &copy; 2023 SafeMedicInsight. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-healthcare-600">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-healthcare-600">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-healthcare-600">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
