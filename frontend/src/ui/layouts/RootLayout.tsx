import { Link, Outlet } from 'react-router-dom'
import {  SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Aside } from '../layoutParts/Aside/Aside'
import { Particle } from '../animations/Particle'

const delays=["animation-delay-100","animation-delay-200","animation-delay-300","animation-delay-400","animation-delay-500","animation-delay-600","animation-delay-700",]


export const RootLayout=()=> {
  return (
      <div className=" w-screen min-h-screen bg-red-light h-full flex items-center justify-center ">

        <div className="absolute left-20 -top-[600px]">

     {Array.from({length:5},((_,i)=>
     {
return (<h1 className={`h-fit font-display font-bold text-5xl md:text-[100px] text-amber-50 animate-move ${delays[i]}`}>
            GENGO
          </h1>)}))}
      
        </div>
        <main className='z-[100]'>
        <Outlet />
      </main>
    
      <Particle
      /> 
    </div> 
  )
}