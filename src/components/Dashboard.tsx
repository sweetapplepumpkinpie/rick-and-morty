import { useState } from "react";
import { createContext } from "react";

import { SearchInfo } from "../type";
import { CharacterTable } from "./CharacterTable";
import { Filter } from "./Filter";
import { Pagination } from "./Pagination";

type GlobalContent = {
  pageInfo: SearchInfo | undefined;
  setPageInfo: (pageInfo: SearchInfo) => void;
};

export const AppContext = createContext<GlobalContent | null>(null);

export const Dashboard = () => {
  const [pageInfo, setPageInfo] = useState<SearchInfo>();

  return (
    <AppContext.Provider value={{ pageInfo, setPageInfo }}>
      <div className="bg-[#F5F8FD] min-h-screen">
        <div className="py-14 container mx-auto xl:px-20">
          <h1 className="text-2xl font-bold">Characters</h1>
          <Filter className="mt-6" />
          <CharacterTable className="mt-6" />
          <Pagination className="mt-11" />
        </div>
      </div>
    </AppContext.Provider>
  );
};
