import { PropsWithChildren, useEffect, useRef, useState } from "react";
import anime from "animejs";

import type { VehicleState } from './supabase'

import Gauge from "./svg/gauge";
import Needle from "./svg/needle";
import NeedleBase from "./svg/needle-base";
import { Card } from "./ui/card"
import ParkingIcon from "./svg/parking-icon";
import SeatbeltIcon from "./svg/seatbelt-icon";

export default function GaugeCard({
  angle,
  speed,
  parking,
  seatbelt
}: PropsWithChildren<VehicleState>) {
  const needleContainerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState<number>(240)

  useEffect(() => {
    if (window) {
      anime({
        targets: needleContainerRef.current,
        rotate: rotation,
	easing: "easeOutCubic"
      })
    }
  })

  useEffect(() => {
    setRotation(angle + 240)
  }, [angle])

  return (
    <Card className="relative flex flex-col w-fit h-fit p-4 gap-3">
      <Gauge />
      {/* eslint-disable no-mixed-spaces-and-tabs */}
      <div
	ref={needleContainerRef}
	className="absolute flex justify-center top-8 left-1/2 -translate-x-1/2 origin-bottom"
      >
	<Needle />
      </div>
      <div className="absolute flex justify-center top-24 left-1/2 -translate-x-1/2">
	<NeedleBase/>
      </div>
      <div className="absolute bottom-14 right-5 flex flex-col py-0.5">
	<span className="text-slate-500">Current Speed</span>
	<span className="text-lg font-semibold text-slate-900">{speed}km/h</span>
      </div>
      <div className="flex justify-between">
	<div className="flex gap-2 py-0.5 text-sm">
	  <span className="text-slate-500">Parking</span>
	  <span className="font-semibold text-slate-900">{
	    parking ? "On" : "Off"
	  }</span>
	</div>
	<div className="flex gap-2 py-0.5 text-sm">
	  <span className="text-slate-500">Seatbelt</span>
	  <span className="font-semibold text-slate-900">{
	    seatbelt ? "On" : "Off"
	  }</span>
	</div>
      </div>
      <div className="absolute flex flex-col gap-2">
	<ParkingIcon className={ parking ? "text-green-500" : "text-slate-200" } />
	<SeatbeltIcon className={ seatbelt ? "text-red-500" : "text-slate-200"}/>
      </div>
    </Card>
  )
}
