import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

function App() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const dropdownOptions = ['Skull emoji', 'Skull', 'Bruh'];

  const courses = {
    course_prefix: 'COMP',
    course_code: 3311,
    course_title: 'Database Systems',
    average_stars: 4,
    total_reviews: 33,
    offered_terms: ['Term 1', 'Term 3'],
  };

  return (
    <div className="flex gap-40">
      <Sidebar />
      <div className="pt-4 pr-32 w-full">
        <div>DevSoc presents</div>
        <div className="text-blue-500 font-extrabold text-5xl mt-5">
          unielectives
        </div>
        <div className="font-extrabold mt-2">
          Your one-stop shop for UNSW course and elective reviews.
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <div className="w-full flex gap-3 items-center border py-1 pl-2 border-blue-500 rounded">
            <MagnifyingGlassIcon className="w-6 h-6 stroke-blue-500" />
            <input
              type="text"
              className="w-full outline-none text-blue-500 placeholder:text-blue-500"
              placeholder="Search for a course e.g. COMP1511"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3 border border-black w-52 rounded px-3 py-1">
            <button
              className="w-full flex items-center justify-between rounded relative"
              onClick={() => setOpenDropdown((prev) => !prev)}
            >
              <div>Sort by</div>
              <ChevronDownIcon className="w-5 h-5" />
            </button>
            {openDropdown &&
              dropdownOptions.map((option, idx) => (
                <div key={`${option}${idx}`}>{option}</div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
