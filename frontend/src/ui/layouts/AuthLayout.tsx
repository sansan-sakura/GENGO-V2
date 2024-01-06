import { Outlet } from "react-router-dom";
const delays=["animation-delay-100","animation-delay-200","animation-delay-300","animation-delay-400","animation-delay-500","animation-delay-600","animation-delay-700"]

export default function AuthLayout() {
  return (
    <div>
    <div className="absolute left-5 sm:left-10 md:left-20 -top-[600px]">
    {Array.from({length:5},((_,i)=>
     (<h1  key={Math.random()*(10*i)} className={`h-fit font-display font-bold text-7xl md:text-[100px] text-amber-50 animate-move ${delays[i]}`}>
        GENGO
      </h1>)))}
  
    </div>
    <main >
    <Outlet />
  </main></div>
  )
}
