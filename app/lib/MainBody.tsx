import { Outlet } from "@remix-run/react";

import LoggedUserContent from "../components/loggedUserContent/LoggedUserContent";

interface Props {
  sideBarState: any;
}

const MainBody: React.FC<Props> = ({ sideBarState }) => {
  const [isSideBarOpen, setIsSideBarOpen] = sideBarState;
  return (
    <div className={" w-full" + (isSideBarOpen ? " ml-64 " : " ml-0 ")}>
      <div className="mx-auto ">
        <div className="flex h-16 items-center   border-b border-gray-400 px-4 py-2 md:justify-start">
          {!isSideBarOpen ? (
            <svg
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 cursor-pointer self-start opacity-50"
              viewBox="0 0 50 20"
              aria-hidden="true"
              focusable="false"
              onClick={() => {
                setIsSideBarOpen(true);
              }}
            >
              <path d="M1,16h30c0.6,0,1,0.4,1,1l0,0c0,0.6-0.4,1-1,1H1c-0.6,0-1-0.4-1-1l0,0C0,16.4,0.4,16,1,16z M1,4h30c0.6,0,1,0.4,1,1l0,0c0,0.6-0.4,1-1,1H1C0.4,6,0,5.6,0,5l0,0C0,4.4,0.4,4,1,4z M1,28h30c0.6,0,1,0.4,1,1l0,0c0,0.6-0.4,1-1,1H1c-0.6,0-1-0.4-1-1l0,0C0,28.4,0.4,28,1,28z"></path>
            </svg>
          ) : null}
          <div className=" items-center justify-between  md:inline-flex md:flex-1 lg:w-0">
            <div className="mt-4 text-xl">
              <div className="ml-1">Inventory Items</div>
              <div className="flex justify-between gap-5">
                <div className="mt-2 mb-2.5 border-b-2 border-gray-500 px-2 text-sm">
                  Details
                </div>
                <div className="mt-2 mb-2 text-sm">Inventory Count</div>
              </div>
            </div>

            <LoggedUserContent />
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default MainBody;
