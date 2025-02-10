import { SVGProps } from "react";

export default function Needle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={5}
      height={89}
      fill="none"
      {...props}
    >
      <path fill="#600024" d="M0 89 2 0h1l2 89H0Z" />
    </svg>
  );
}
