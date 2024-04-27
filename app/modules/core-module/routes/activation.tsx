import { Outlet } from "@remix-run/react";
import { useState } from "react";

import { useUser } from "~/utils";

export default function App() {
  const user = useUser();
  const mainAppState = useState<boolean>(true);

  return (
    <>
      <br />
      <div className="relative mt-16 bg-white">
        <Outlet context={mainAppState} />
      </div>
    </>
  );
}
