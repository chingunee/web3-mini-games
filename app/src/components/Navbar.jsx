import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { disconnectMetamask } from "../slices/metamaskSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const metamask = useSelector((state) => state.metamask);
  const modal = useSelector((state) => state.modal);

  return (
    <div className="flex flex-col md:flex-row h-[70px] justify-center items-center border-b border-t w-full">
      <div className="flex items-center justify-between px-3 sm:px-8 lg:5 xl:px-1 max-w-5xl w-full">
        <div
          className="md:hidden"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <svg width="2em" height="2em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M4 18q-.425 0-.712-.288Q3 17.425 3 17t.288-.712Q3.575 16 4 16h16q.425 0 .712.288q.288.287.288.712t-.288.712Q20.425 18 20 18Zm0-5q-.425 0-.712-.288Q3 12.425 3 12t.288-.713Q3.575 11 4 11h16q.425 0 .712.287q.288.288.288.713t-.288.712Q20.425 13 20 13Zm0-5q-.425 0-.712-.287Q3 7.425 3 7t.288-.713Q3.575 6 4 6h16q.425 0 .712.287Q21 6.575 21 7t-.288.713Q20.425 8 20 8Z"
            ></path>
          </svg>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button className="flex gap-2 items-center px-5 py-2 border rounded-3xl hover:border-black text-gray-500 font-semibold">
            {metamask && metamask.isConnected ? (
              <div className="flex items-center gap-2 select-none">
                <img
                  src="https://cdn.stamp.fyi/avatar/eth:0x1Fd9afb27FF1194b92C80eDA157C7eAC4C509F33?s=36"
                  alt=""
                  width={"20px"}
                  height={"20px"}
                  className="rounded-full"
                />
                {metamask.selectedAccount.substring(0, 6)}...
                {metamask.selectedAccount.substring(
                  metamask.selectedAccount.length - 4
                )}
              </div>
            ) : (
              "Connect wallet"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
