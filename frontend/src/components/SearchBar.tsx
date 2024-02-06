import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type SearchBarProps = {
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function SearchBar({ inputValue, onChange }: SearchBarProps) {
  return (
    <div className="w-full flex gap-3 items-center border p-2 pl-2 border-blue-500 rounded">
      <MagnifyingGlassIcon className="w-6 h-6 stroke-blue-500" />
      <input
        type="text"
        className="w-full outline-none text-blue-500 placeholder:text-blue-500"
        placeholder="Search for a course e.g. COMP1511"
        value={inputValue}
        onChange={onChange}
      />
    </div>
  );
}
