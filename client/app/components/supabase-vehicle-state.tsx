import { useEffect, useRef, useState } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";

import { createSupabaseClient } from "libs/supabase";
import type { VehicleState } from "./supabase";

import GaugeCard from "../components/gauge-card"

export default function SupabaseVehicleState(props: { vehicle: VehicleState }) {
  const triggered = useRef(false)
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)
  const [vehicleState, setVehicleState] = useState<VehicleState>(props.vehicle)

  useEffect(() => {
    if (triggered.current) { return }

    const env = window.ENV
    const client = createSupabaseClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
    /* eslint-disable no-mixed-spaces-and-tabs */
    setChannel(
	client
	.channel(props.vehicle.id)
	.on(
	  "postgres_changes",
	  {
	    event: "UPDATE",
	    schema: "testing",
	    table: "vehicle_states"
	  },
	  payload => {
	    if (payload.old.id == props.vehicle.id) {
	      setVehicleState(payload.new as VehicleState)
	    }
	  } 
	)
	.subscribe()
    )

    triggered.current = true
    /* eslint-enable */
  }, [])

  return (
    <GaugeCard
      angle={vehicleState.angle}
      speed={vehicleState.speed}
      parking={vehicleState.parking}
      seatbelt={vehicleState.seatbelt}
    />
  );
}
