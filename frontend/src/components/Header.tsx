type HeaderProps = {
  isClicked: boolean;
  onClick: () => void;
};

export default function Header({ isClicked, onClick }: HeaderProps) {
  return (
    <>
      <div>DevSoc presents</div>
      <button
        className={`${
          isClicked ? 'text-violet-500' : 'text-blue-500'
        } font-extrabold text-5xl mt-5`}
        onClick={onClick}
      >
        unielectives
      </button>
      <div className="font-extrabold mt-2">
        Your one-stop shop for UNSW course and elective reviews.
      </div>
    </>
  );
}
