import SupabaseVehicleState from "./supabase-vehicle-state";

export type VehicleState = {
  id: string
  vehicle_id: number | string
  created_at: string
  speed: number
  angle: number
  parking: number
  seatbelt: boolean
}

export default function Supabase(props: { initialData: object }) {

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-fit h-full py-4 grid grid-cols-5 gap-2.5">
	{/* eslint-disable no-mixed-spaces-and-tabs */}
	{
	  (props.initialData as VehicleState[]).map((vehicleState: VehicleState) => {
	    return (
	      <SupabaseVehicleState
		key={vehicleState.id}
		vehicle={vehicleState}
	      />
	    );
	  })
	}
	{/* eslint-enable */}
      </div>
    </div>
  )
}
