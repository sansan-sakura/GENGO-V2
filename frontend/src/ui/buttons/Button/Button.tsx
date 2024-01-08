import { Link } from "react-router-dom";

export const Button = ({
  text,
  bgColor,
  fontColor,
  borderColor,
  type,
  path,
}: {
  text: string;
  bgColor?: string;
  fontColor?:string
  borderColor?:string
  type: string;
  path: string;
}) => {
  const style = `${bgColor} ${fontColor} ${borderColor?? borderColor} border text-lg lg:text-[22px] font-medium text-center  rounded-lg px-8 sm:px-12 md:px-16 py-1.5 md:py-2 transition  shadow-md mx-auto hover:translate-y-px block`;

  if (type === "link")
    return (
      <Link to={path} className={style}>
        {text}
      </Link>
    );

  return (
    <a href={path} className={style}>
      {text}
    </a>
  );
};
