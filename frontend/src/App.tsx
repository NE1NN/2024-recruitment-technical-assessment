import { useEffect, useRef, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Card from './components/Card';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Dropdown from './components/Dropdown';
import Popup from './components/Popup';
import { courses, dropdownOptions } from './constants';

type Course = {
  course_prefix: string;
  course_code: number;
  course_title: string;
  average_stars: number;
  total_reviews: number;
  offered_terms: string[];
};

function App() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isHeaderClicked, setIsHeaderClicked] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchedCourses, setSearchedCourses] = useState<Course[]>(courses);
  const [selectedSort, setSelectedSort] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setInputValue(input);

    setSearchedCourses(
      courses.filter((course) =>
        `${course.course_prefix}${course.course_code}.` // Combines course prefix and code into a string
          .toLowerCase()
          .includes(input)
      )
    );
  };

  const handleSort = (option: string) => {
    setSelectedSort(option);
    if (option === 'Reviews') {
      setSearchedCourses(
        courses.sort((a, b) => b.total_reviews - a.total_reviews)
      );
    } else if (option === 'Ratings') {
      setSearchedCourses(
        courses.sort((a, b) => b.average_stars - a.average_stars)
      );
    }
    setOpenDropdown(false);
  };

  // Closes sort dropdown when the mouse clicks outside of it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

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
            onChange={handleSearch}
            onClick={() => setIsSearchClicked(true)}
          />
          <Dropdown
            onClick={() => setOpenDropdown((prev) => !prev)}
            openDropdown={openDropdown}
            dropdownOptions={dropdownOptions}
            handleSort={handleSort}
            selectedSort={selectedSort}
            dropdownRef={dropdownRef}
          />
        </div>
        <div className="grid grid-cols-3 gap-10 mt-8">
          {searchedCourses.map((course, idx) => (
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
