import { Outlet } from "@remix-run/react";
import { useState } from "react";

import { useUser } from "~/utils";

export default function app() {
  const user = useUser();
  const mainAppState = useState<boolean>(true);
  return (
    <>
      <div className="relative mt-16 bg-white">
        <Outlet context={mainAppState} />
      </div>
    </>
  );
}
