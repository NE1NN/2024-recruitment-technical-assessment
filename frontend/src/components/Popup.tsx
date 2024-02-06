type PopupProps = {
  onClick: () => void;
};

export default function Popup({ onClick }: PopupProps) {
  return (
    <div className="fixed py-3 rounded top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 border border-black bg-white flex justify-center">
      <button
        className="bg-blue-500 rounded-md text-white px-3 py-1"
        onClick={onClick}
      >
        Close
      </button>
    </div>
  );
}
