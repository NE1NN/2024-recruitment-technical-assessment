import unielectives from '../assets/unilectives.svg';
import {
  BookOpenIcon,
  ShieldCheckIcon,
  BarsArrowDownIcon,
  UserCircleIcon,
  MoonIcon,
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  return (
    <div className="h-screen bg-gray-200 px-4 pt-4 pb-10 flex flex-col justify-between">
      <div className="flex flex-col items-center gap-5">
        <img src={unielectives} alt="unielectives logo" className="w-8 h-8" />
        <div className="h-0.5 w-12 bg-black"></div>
        <BookOpenIcon className="w-6 h-6" />
        <ShieldCheckIcon className="w-6 h-6" />
      </div>
      <div className="flex flex-col items-center gap-7">
        <BarsArrowDownIcon className="w-6 h-6" />
        <UserCircleIcon className="w-6 h-6" />
        <MoonIcon className="w-6 h-6" />
        <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
      </div>
    </div>
  );
}
