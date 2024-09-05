"use client";

import { CustomIcon } from "@/components/CustomIcon";
import { Percent } from "lucide-react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { dataTotalSuscribers } from "./TotalSuscribers.data";



const TotalSuscribers = () => {
  return (
    <div className="mb-4 lg:mb-0 shadow-sm bg-background rounded-lg p-5 w-full md:w-96 hover:shadow-lg transition">
      <div className="flex gap-x-2 items-center mb-4">
        <CustomIcon icon={Percent} />
        <p className="text-xl">Total Suscribers</p>
      </div>
      <div className="w-full h-[200px] p-5">
        <ResponsiveContainer
          aspect={1}
          maxHeight={200}
        >
          <PieChart>
            <Pie
              dataKey="value"
              data={dataTotalSuscribers}
              outerRadius={80}
              labelLine={false}
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalSuscribers;
