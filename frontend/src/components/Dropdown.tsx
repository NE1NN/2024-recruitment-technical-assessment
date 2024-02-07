import { ChevronDownIcon } from '@heroicons/react/24/outline';

type DropdownProps = {
  onClick: () => void;
  openDropdown: boolean;
  dropdownOptions: string[];
  handleSort: (option: string) => void;
  selectedSort: string;
  dropdownRef: React.RefObject<HTMLDivElement>
};

export default function Dropdown({
  onClick,
  openDropdown,
  dropdownOptions,
  selectedSort,
  handleSort,
  dropdownRef
}: DropdownProps) {
  return (
    <div className="w-52 h-10 relative" ref={dropdownRef}>
      <div className="absolute flex flex-col border w-full pt-2 rounded bg-white border-black">
        <button
          className="w-full flex items-center justify-between rounded px-2"
          onClick={onClick}
        >
          <div>{selectedSort === '' ? 'Sort by' : selectedSort}</div>
          <ChevronDownIcon className="w-5 h-5" />
        </button>
        <div className="flex flex-col mt-2">
          {openDropdown &&
            dropdownOptions.map((option, idx) => (
              <button
                key={`${option}${idx}`}
                className="text-left hover:bg-gray-200 h-8 px-2"
                onClick={() => handleSort(option)}
              >
                {option}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
