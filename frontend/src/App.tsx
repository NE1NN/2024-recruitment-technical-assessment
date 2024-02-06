import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Card from './components/Card';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Dropdown from './components/Dropdown';
import Popup from './components/Popup';

function App() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isHeaderClicked, setIsHeaderClicked] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const dropdownOptions = ['Skull emoji', 'Skull', 'Bruh'];

  const courses = [
    {
      course_prefix: 'COMP',
      course_code: 1511,
      course_title: 'Programming Fundamentals',
      average_stars: 4.8,
      total_reviews: 68,
      offered_terms: ['Term 1', 'Term 2', 'Term 3'],
    },
    {
      course_prefix: 'COMP',
      course_code: 1531,
      course_title: 'Software Engineering Fundamentals',
      average_stars: 3.9,
      total_reviews: 47,
      offered_terms: ['Term 1', 'Term 2', 'Term 3'],
    },
    {
      course_prefix: 'COMP',
      course_code: 1521,
      course_title: 'Computer Systems Fundamentals',
      average_stars: 4,
      total_reviews: 40,
      offered_terms: ['Term 1', 'Term 2', 'Term 3'],
    },
    {
      course_prefix: 'COMP',
      course_code: 2521,
      course_title: 'Data Structures and Algorithms',
      average_stars: 4,
      total_reviews: 36,
      offered_terms: ['Summer', 'Term 1', 'Term 2', 'Term 3'],
    },
    {
      course_prefix: 'COMP',
      course_code: 2511,
      course_title: 'Object-Oriented Design & Programming',
      average_stars: 3,
      total_reviews: 33,
      offered_terms: ['Term 1', 'Term 2', 'Term 3'],
    },
    {
      course_prefix: 'COMP',
      course_code: 3311,
      course_title: 'Database Systems',
      average_stars: 4,
      total_reviews: 33,
      offered_terms: ['Term 1', 'Term 3'],
    },
  ];

  return (
    <div className="flex gap-40 h-screen">
      {isSearchClicked && <Popup onClick={() => setIsSearchClicked(false)} />}
      <Sidebar />
      <div className="pt-4 pb-10 pr-32 w-full overflow-y-auto">
        <Header
          isClicked={isHeaderClicked}
          onClick={() => setIsHeaderClicked((prev) => !prev)}
        />
        <div className="mt-8 flex flex-col gap-3">
          <SearchBar
            inputValue={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onClick={() => setIsSearchClicked(true)}
          />
          <Dropdown
            onClick={() => setOpenDropdown((prev) => !prev)}
            openDropdown={openDropdown}
            dropdownOptions={dropdownOptions}
          />
        </div>
        <div className="grid grid-cols-3 gap-10 mt-8">
          {courses.map((course, idx) => (
            <Card
              key={idx}
              coursePrefix={course.course_prefix}
              courseCode={course.course_code}
              courseTitle={course.course_title}
              averageStars={course.average_stars}
              totalReviews={course.total_reviews}
              offeredTerms={course.offered_terms}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
