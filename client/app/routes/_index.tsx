import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { createSupabaseClient } from "libs/supabase";

import Supabase from "../components/supabase";
import Header from "../components/header"
import { Separator } from "../components/ui/separator"
import GaugeCard from "../components/gauge-card"

export const meta: MetaFunction = () => {
  return [
    { title: "Speedmon" },
    { name: "description", content: "Speedometer Monitoring" },
  ];
};

export async function loader() {
  const client = createSupabaseClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_ANON_KEY as string
  )

  const { data, error } = await client
    .schema("testing")
    .from("vehicle_states")
    .select()

  if (error) {
    return Response.error()
  }

  return Response.json(data)
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="w-full h-full flex flex-col">
      <Header/>
      <Separator/>
      <Supabase initialData={data}/>
      <div className="w-full h-full px-40">
	{/* <GaugeCard /> */}
      </div>
    </div>
  );
}
