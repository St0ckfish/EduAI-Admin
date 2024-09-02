const Spinner = () => {
  return (
    <>
      <div className="flex items-center justify-center space-x-2">
        <span className="sr-only">Loading...</span>
        <div className="h-6 w-6 animate-bounce rounded-full bg-[#3E5AF0] [animation-delay:-0.3s]"></div>
        <div className="h-6 w-6 animate-bounce rounded-full bg-[#3E5AF0] [animation-delay:-0.15s]"></div>
        <div className="h-6 w-6 animate-bounce rounded-full bg-[#3E5AF0] [animation-delay:-0.27s]"></div>
        <div className="h-6 w-6 animate-bounce rounded-full bg-[#3E5AF0] [animation-delay:-0.50s]"></div>
        <div className="h-6 w-6 animate-bounce rounded-full bg-[#3E5AF0]"></div>
      </div>
    </>
  );
};

export default Spinner;
