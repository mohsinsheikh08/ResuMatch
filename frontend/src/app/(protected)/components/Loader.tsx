interface LoaderProps {
  size?: number;
}

const Loader = ({ size = 40 }: LoaderProps) => {
  return (
    <div  className="flex  flex-col justify-center items-center gap-3">
      <div
      className="animate-spin rounded-full border-4 border-transparent"
      style={{
        width: size,
        height: size,
        borderTopColor: "#FF7F00",
        borderRightColor: "#FF7F00",
      }}
    />
    </div>
  );
};

export default Loader;