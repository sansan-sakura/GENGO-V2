import { Outlet } from "react-router-dom";
import { Particle } from "../animations/Particle";

export const RootLayout = () => {
  return (
    <div className="w-screen min-h-screen bg-red-light h-full flex items-center justify-center">
      <div className="z-[100]">
        <Outlet />
      </div>
      <Particle />
    </div>
  );
};
