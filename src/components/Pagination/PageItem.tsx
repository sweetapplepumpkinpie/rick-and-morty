import { useSearchParams } from "react-router-dom";

import { images } from "../../constants";

interface IProps {
  prev?: boolean;
  next?: boolean;
  active?: boolean;
  disabled?: boolean;
  isEmpty?: boolean;
  number?: number;
  current?: number;
}

export const PageItem: React.FC<IProps> = ({
  prev,
  next,
  active,
  number,
  isEmpty,
  disabled,
  current,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePageChange = () => {
    const newPage = prev
      ? (current ?? 1) - 1
      : next
      ? (current ?? 1) + 1
      : number ?? 1;
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      page: newPage.toString(),
    });
  };

  return (
    <button
      className={`w-10 h-10 ${
        isEmpty ? "" : "shadow-md box-shadow-xl border border-slate-400"
      } ${active ? "bg-slate-300" : ""} ${
        disabled ? "bg-slate-200" : ""
      } rounded-md flex items-center justify-center`}
      disabled={isEmpty || disabled}
      onClick={handlePageChange}
    >
      {isEmpty && "..."}
      {prev && <img src={images.left} alt="left-arrow" />}
      {!isEmpty && number}
      {next && <img src={images.right} alt="right-arrow" />}
    </button>
  );
};
