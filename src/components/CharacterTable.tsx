import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { CharacterTableHeaders, ServerURL } from "../constants";
import {
  Character,
  CharacterResult,
  ECharacterStatus,
  EErrorStatus,
  TTableColumn,
} from "../type";
import { AppContext } from "./Dashboard";

export const CharacterTable = (props: any) => {
  const store = useContext(AppContext);
  const [characters, setCharacters] = useState<Character[] | undefined>();
  const { search } = useLocation();
  const [checked, setChecked] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const { data }: { data: CharacterResult } = await axios.get(
          `${ServerURL}character${search}`
        );
        setCharacters(data.results);
        setChecked([]);
        store?.setPageInfo(data.info);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          const { response } = error;
          if (response?.status === EErrorStatus.NOTFOUND) {
            const page = searchParams.get("page");
            page &&
              page !== "1" &&
              setSearchParams({
                ...Object.fromEntries([...searchParams]),
                page: "1",
              });
            setCharacters(undefined);
          }
        }
      }
    };
    getCharacter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const checkAll = () => {
    setChecked((checked) => {
      if (checked.length < 20) {
        return characters
          ? characters.map<number>((character) => character.id)
          : [];
      } else {
        return [];
      }
    });
  };
  const handleChange = (event: ChangeEvent) => {
    const {
      target: { id },
    } = event;
    setChecked((checked) => {
      const newChecked = [...checked];
      const index = newChecked.indexOf(parseInt(id));

      index >= 0 ? newChecked.splice(index, 1) : newChecked.push(parseInt(id));
      return newChecked;
    });
  };

  return (
    <div {...props}>
      <table className="w-full border bg-white table-fixed shadow-xl">
        <thead className="border border-t-0">
          <tr>
            <td className="px-6 w-[66px] py-3">
              <input
                id="candidates"
                aria-describedby="candidates-description"
                name="candidates"
                checked={checked.length === 20}
                onChange={checkAll}
                type="checkbox"
                className="h-[18px] w-[18px] rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </td>
            {CharacterTableHeaders.map((thead: TTableColumn, index) => (
              <td
                className={`text-sm leading-tight py-3 ${
                  index === 0 ? "w-1/4" : ""
                }`}
                key={thead.key}
              >
                {thead.label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {characters ? (
            characters.map((character) => {
              return (
                <tr
                  key={`${character.id}-${character.name}`}
                  className={`
                  ${
                    character.status === "Dead" ? "bg-[#F6F8FA]" : "bg-white"
                  } py-4 border
                `}
                >
                  <td className="py-6 pl-6 flex items-start">
                    <input
                      id={character.id.toString()}
                      aria-describedby="candidates-description"
                      name="candidates"
                      checked={checked.includes(character.id)}
                      onChange={handleChange}
                      type="checkbox"
                      className="h-[18px] w-[18px] rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>
                  <td>
                    <p
                      className={`${
                        character.status === ECharacterStatus.DEAD
                          ? "text-[#5F6569]"
                          : "text-[#1A2328]"
                      }`}
                    >
                      {character.name}
                    </p>
                    <p
                      className={`${
                        character.status === ECharacterStatus.DEAD
                          ? "text-[#8C9193]"
                          : "text-[#484F53]"
                      }`}
                    >
                      {character.species}
                    </p>
                  </td>
                  <td className="py-4">
                    <img
                      className="w-12 rounded-2xl shadow-md drop-shadow-md"
                      src={character.image}
                      alt={`${character.name}-${character.id}`}
                    />
                  </td>
                  <td
                    className={`${
                      character.status === ECharacterStatus.DEAD &&
                      character.origin.name === ECharacterStatus.UNKNOWN
                        ? "text-[#8C9193]"
                        : character.status === ECharacterStatus.DEAD ||
                          character.status === ECharacterStatus.UNKNOWN
                        ? "text-[#5F6569]"
                        : "text-[#1A2328]"
                    }`}
                  >
                    {character.origin.name}
                  </td>
                  <td
                    className={`${
                      character.status === ECharacterStatus.DEAD
                        ? "text-[#5F6569]"
                        : "text-[#1A2328]"
                    }`}
                  >
                    {character.gender}
                  </td>
                  <td>
                    <div className="flex items-center">
                      {character.status === ECharacterStatus.ALIVE ? (
                        <CheckCircleIcon className="w-5 mr-2 text-[#03A99F]" />
                      ) : character.status === ECharacterStatus.UNKNOWN ? (
                        <QuestionMarkCircleIcon className="w-5 mr-2 text-[#BAC6D8]" />
                      ) : (
                        <ExclamationCircleIcon className="w-5 mr-2 text-[#FF2626]" />
                      )}
                      <span
                        className={`${
                          character.status === ECharacterStatus.UNKNOWN
                            ? "text-[#5F6569]"
                            : "text-[#1A2328]"
                        }`}
                      >
                        {character.status}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-3">
                There are no characters
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
