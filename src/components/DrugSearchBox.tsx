
import { useState } from "react";
import { Search } from "lucide-react";
import { drugs } from "@/utils/mockData";

interface DrugSearchBoxProps {
  onSelectDrug: (drugId: string) => void;
}

const DrugSearchBox = ({ onSelectDrug }: DrugSearchBoxProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const filteredDrugs = query === "" 
    ? [] 
    : drugs.filter(drug => 
        drug.name.toLowerCase().includes(query.toLowerCase()) ||
        drug.activeIngredient.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (drugId: string) => {
    onSelectDrug(drugId);
    const selectedDrug = drugs.find(d => d.id === drugId);
    if (selectedDrug) {
      setQuery(selectedDrug.name);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-healthcare-500 focus:border-healthcare-500 sm:text-sm"
          placeholder="Search for a medication..."
        />
        <button 
          className="ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-healthcare-600 hover:bg-healthcare-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-healthcare-500"
          onClick={() => {
            if (filteredDrugs.length > 0) {
              handleSelect(filteredDrugs[0].id);
            }
          }}
        >
          Search
        </button>
      </div>

      {isOpen && filteredDrugs.length > 0 && (
        <div 
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          onBlur={() => setIsOpen(false)}
        >
          {filteredDrugs.map((drug) => (
            <div
              key={drug.id}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-healthcare-50"
              onClick={() => handleSelect(drug.id)}
            >
              <div className="flex items-baseline">
                <p className="font-medium text-gray-900">{drug.name}</p>
                <p className="ml-2 text-sm text-gray-500">
                  {drug.activeIngredient}
                </p>
              </div>
              <p className="text-xs text-gray-500">{drug.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DrugSearchBox;
