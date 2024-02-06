import { ChevronDownIcon } from '@heroicons/react/24/outline';

type DropdownProps = {
  onClick: () => void;
  openDropdown: boolean;
  dropdownOptions: string[];
};

export default function Dropdown({
  onClick,
  openDropdown,
  dropdownOptions,
}: DropdownProps) {
  return (
    <div className="w-52 h-10 relative">
      <div className="absolute flex flex-col border w-full pt-2 rounded bg-white border-black">
        <button
          className="w-full flex items-center justify-between rounded px-2"
          onClick={onClick}
        >
          <div>Sort by</div>
          <ChevronDownIcon className="w-5 h-5" />
        </button>
        <div className='flex flex-col mt-2'>
          {openDropdown &&
            dropdownOptions.map((option, idx) => (
              <button
                key={`${option}${idx}`}
                className="text-left hover:bg-gray-200 h-8 px-2"
              >
                {option}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
