import unielectives from '../assets/unilectives.svg';
import {
  BookOpenIcon,
  ShieldCheckIcon,
  BarsArrowDownIcon,
  UserCircleIcon,
  MoonIcon,
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline';

type ItemProps = {
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'>
  >;
};

export default function Sidebar() {
  const icons = [
    BookOpenIcon,
    ShieldCheckIcon,
    BarsArrowDownIcon,
    UserCircleIcon,
    MoonIcon,
    ArrowRightEndOnRectangleIcon,
  ];

  const Item = ({ Icon }: ItemProps) => {
    return (
      <button className="hover:bg-gray-200 rounded-md px-3 py-3">
        <Icon className="w-6 h-6" />
      </button>
    );
  };

  return (
    <div className="h-screen bg-gray-50 px-3 pt-4 pb-10 flex flex-col justify-between">
      <div className="flex flex-col items-center gap-2">
        <img src={unielectives} alt="unielectives logo" className="w-8 h-8" />
        <div className="h-0.5 w-12 bg-gray-200 mt-3"></div>
        {icons.slice(0, 2).map((icon, idx) => (
          <Item Icon={icon} key={idx} />
        ))}
      </div>
      <div className="flex flex-col items-center gap-2">
        {icons.slice(2).map((icon, idx) => (
          <Item Icon={icon} key={idx} />
        ))}
      </div>
    </div>
  );
}
