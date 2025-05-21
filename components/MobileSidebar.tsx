// @ts-nocheck

import { Link } from "react-router";
import * as SyncfusionNav from "@syncfusion/ej2-react-navigations";
const SidebarComponent = SyncfusionNav.SidebarComponent;

import NavItems from "./NavItems";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Skip rendering on the server

  let sidebar: SidebarComponent;

  const toggleSidebar = () => {
    sidebar.toggle();
  };

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img
            src="/assets/icons/logo.svg"
            alt="Logo"
            className="size-[30px]"
          />

          <h1>Tourvisto</h1>
        </Link>

        <button onClick={toggleSidebar}>
          <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
        </button>
      </header>

      <SidebarComponent
        width={270}
        ref={(Sidebar) => (sidebar = Sidebar)}
        created={() => sidebar.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="over"
      >
        <NavItems handleClick={toggleSidebar} />
      </SidebarComponent>
    </div>
  );
};
export default MobileSidebar;
