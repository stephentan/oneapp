import { Outlet, useNavigate } from "@remix-run/react";

import PageContainer from "~/components/pageContainer/PageContainer";

export default function () {
  const navigate = useNavigate();
  return (
    <>
      <PageContainer>
        <div className="flex gap-x-5 px-2">
          <button
            className="rounded-2xl border px-2 py-1"
            onClick={() => {
              navigate("/admin/settings/themes");
            }}
          >
            Themes
          </button>
          {/* <button
            onClick={() => {
              navigate("/app/bankaccounts");
            }}
            className="rounded-2xl border px-2 py-1"
          >
            Bank Accounts
          </button>
          <button
            onClick={() => {
              navigate("/app/pickuplocations");
            }}
            className="rounded-2xl border px-2 py-1"
          >
            Pick up Locations
          </button> */}
        </div>
        <Outlet />
      </PageContainer>
    </>
  );
}
