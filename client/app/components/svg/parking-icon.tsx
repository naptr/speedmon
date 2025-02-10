import { SVGProps } from "react";

export default function ParkingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      fill="none"
      {...props}
    >
      <path
	fill="currentColor"
	d="m12.937 9.063-.459.443-.68-.743.269-3.162.648-.6.522.6-.3 3.462ZM12.51 4.78l-.633.6H8.035L6.96 4.194h5.012l.538.585ZM7.53 8.763l-.807.743-.411-.443.411-4.648 1.075 1.186-.269 3.162Zm-.46 5.312L5.775 15.26l.427-4.854.475-.458.68.743-.285 3.383Zm4.617-4.932.554.584-.664.585H7.45l-.521-.585.632-.584h4.127Z"
      />
      <path stroke="currentColor" d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16Z" />
    </svg>
  );
}
