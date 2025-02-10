import { SVGProps  } from "react";

export default function NeedleBase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={44}
      height={44}
      fill="none"
      {...props}
    >
      <path
	fill="#0F172A"
	d="M22.206 43.18c11.765 0 21.302-9.538 21.302-21.302C43.508 10.113 33.97.576 22.206.576 10.44.576.904 10.113.904 21.878c0 11.764 9.537 21.302 21.302 21.302Z"
      />
      <path
	fill="red"
	d="M22.206 22.804a.926.926 0 1 0 0-1.852.926.926 0 0 0 0 1.852Z"
      />
    </svg>
  );
}
