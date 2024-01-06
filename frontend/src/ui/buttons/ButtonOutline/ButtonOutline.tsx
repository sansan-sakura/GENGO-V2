import { Link } from "react-router-dom";

export const ButtonOutline = ({
  name,
  bg,
  path = "#",
  type = "link",
  defaultBg="bg-white",
  borderColor="border-black",
  textColor="text-black"
}: {
  name: string;
  bg: string;
  path?: string;
  type?: string;
  defaultBg?:string;
  borderColor?:string
  textColor?:string
}) => {
  const styleLink = "group relative block h-10 w-[140px] sm:h-14 sm:w-[180px] shadow-lg mx-auto";

  if (type === "a") {
    return (
      <a href={path} className={styleLink}>
       <span
        className={`absolute inset-0 border-2 border-dashed ${borderColor} rounded-md inline ${bg}`}
      ></span>

      <div className={`relative h-full flex justify-center items-center  rounded-md transform border-2 ${borderColor} ${defaultBg}  transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2`}>
        <div className="p-1.5 transition-opacity group-hover:absolute lg:p-2 ">
          <p className={`text-sm sm:text-lg lg:text-[22px] font-medium text-center ${textColor}`}>{name}</p>
        </div>
      </div>
      </a>
    );
  }

  return (
    <Link to={path} className={styleLink}>
   <span
        className={`absolute inset-0 border-2 border-dashed ${borderColor} rounded-md inline ${bg}`}
      ></span>

      <div className={`relative h-full flex justify-center items-center  rounded-md transform border-2 ${borderColor} ${defaultBg}  transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2`}>
        <div className="p-1.5 transition-opacity group-hover:absolute lg:p-2 ">
          <p className={`text-sm sm:text-lg lg:text-[22px] font-medium text-center ${textColor}`}>{name}</p>
        </div>
      </div>
    </Link>
  );
};


