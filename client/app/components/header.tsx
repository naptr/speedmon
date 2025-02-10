import { BellIcon } from "@heroicons/react/24/outline"

import { Button } from '../components/ui/button'

import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from '../components/ui/avatar'

/* eslint-disable */
export default function Header() {
  return (
    <div className="px-16 py-3 w-full h-fit flex justify-between items-center">
      <span className="text-lg font-semibold text-slate-900">V-Analog Monitoring System</span>
      <div className="flex items-center gap-2">
	<Button
	  variant="outline"
	  size="icon"
	  className="size-8 rounded-full"
	>
	  <BellIcon className="size-4 text-slate-900"/>
	</Button>
	<Avatar className="size-8">
	  <AvatarImage src="https://github.com/shadcn.png"/>
	  <AvatarFallback>AV</AvatarFallback>
	</Avatar>
      </div>
    </div>
  )
}
