import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useSearchParams } from "react-router-dom";

import SearchIcon from "../assets/search.svg";

interface IProps {
  className: string;
}
type Species = {
  id: number;
  name: string;
};
const species: Species[] = [
  { id: 0, name: "Species" },
  { id: 1, name: "Human" },
  { id: 2, name: "Robot" },
  { id: 3, name: "unknown" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Filter: React.FC<IProps> = ({ ...props }) => {
  const [selected, setSelected] = useState(species[0]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [focused, setFocused] = useState(false);
  const [name, setName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setName(searchParams.get("name") ?? "");
    setSelected(() => {
      const selectedSpecies = species.filter(
        (item) => item.name === searchParams.get("species")
      )[0];
      return selectedSpecies ?? species[0];
    });
    // eslint-disable-next-line no-use-before-define
  }, [searchParams]);

  const handleNameSearch = (event: FormEvent) => {
    event.preventDefault();
    const params = Object.fromEntries([...searchParams]);
    setShowTooltip(false);
    delete params.name;
    name ? setSearchParams({ ...params, name }) : setSearchParams(params);
  };
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: name },
    } = event;
    setShowTooltip(name.length > 15);
    setName(name);
  };
  const handleSpeciesChange = (value: Species) => {
    const params = Object.fromEntries([...searchParams]);
    if (value.id > 0) {
      setSearchParams({ ...params, species: value.name });
    } else {
      delete params.species;
      setSearchParams({ ...params });
    }
    setSelected(value);
  };
  const hideTooltip = () => {
    focused && setFocused(false);
    setShowTooltip(false);
  };
  const handleOnFocus = () => {
    setFocused(true);
  };

  return (
    <div {...props}>
      <div className="flex">
        <div className="relative rounded-md shadow-sm w-36 mr-12">
          <form onSubmit={handleNameSearch}>
            <input
              type="text"
              name="account-number"
              id="account-number"
              value={name}
              onFocus={handleOnFocus}
              onBlur={hideTooltip}
              onChange={handleNameChange}
              className="block w-full rounded-md border border-gray-300 pl-4 pr-10 py-[11px] focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 focus:outline-none sm:text-sm"
              placeholder="search"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <img src={SearchIcon} alt="search-icon" />
            </div>
            {showTooltip && (
              <div className="absolute max-w-screen bg-black rounded-lg text-white px-4 py-1 left-10 -top-6 z-10">
                {name}
              </div>
            )}
          </form>
        </div>
        <div className="relative rounded-md shadow-sm w-36">
          <Listbox value={selected} onChange={handleSpeciesChange}>
            {({ open }) => (
              <>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-[11px] px-4 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {species.map((species) => (
                        <Listbox.Option
                          key={species.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-indigo-600"
                                : "text-gray-900",
                              " relative cursor-default select-none py-2 pl-3 pr-9"
                            )
                          }
                          value={species}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {species.name}
                              </span>

                              {selected && species.id > 0 ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
      </div>
    </div>
  );
};
