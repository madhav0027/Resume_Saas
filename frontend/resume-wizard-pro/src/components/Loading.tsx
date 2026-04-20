type LoadingProps = {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
};

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-4",
};

const Loading = ({ size = "md", fullScreen = false }: LoadingProps) => {
  const spinner = (
    <div
      className={`${sizeMap[size]} border-gray-300 border-t-black rounded-full animate-spin`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex  items-center justify-center bg-background/80 backdrop-blur-sm">
        <span className="p-4">
            {spinner }
        </span>
        Loading
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-6">
      {spinner}
    </div>
  );
};

export default Loading;