import React, { ReactNode } from 'react';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Sheet: React.FC<SheetProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-[150] bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } flex justify-end`}
      onClick={onClose}
    >
      <div
        className={`bg-white h-full w-[370px] max-w-full transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-lg"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
    //   const [isSheetOpen, setIsSheetOpen] = useState(false);

    //   const handleOpen = () => setIsSheetOpen(true);
    //   const handleClose = () => setIsSheetOpen(false);
        //     <div className="p-8">
        //     <button
        //       className="bg-blue-500 text-white px-4 py-2 rounded"
        //       onClick={handleOpen}
        //     >
        //       Open Sheet
        //     </button>
        //     <Sheet isOpen={isSheetOpen} onClose={handleClose}>
        //       <h2 className="text-2xl font-semibold mb-4">Sheet Content</h2>
        //       <p>This is some content inside the sheet.</p>
        //     </Sheet>
        //   </div>
  );
};

export default Sheet;
