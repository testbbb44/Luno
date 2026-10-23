import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#E9EBF1] text-darkBlue px-3 py-2 rounded shadow-sm border text-sm">
        <p className="font-medium">{`N${payload[0].value.toLocaleString()}.00`}</p>
      </div>
    );
  }
  return null;
};

export default function LineGraph({
  title = "hekki",
  timeFrames,
  colors = [],
  labels = [],
  data = [],
  showLegend = true,
}) {
  return (
    <div className="bg-white  rounded-2xl ">
      <div className=" flex mb-6 justify-between p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {timeFrames && (
          <Select defaultValue={timeFrames[0]}>
            <SelectTrigger className="border-0 max-w-[150px] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeFrames.map((timeFrame) => (
                <SelectItem key={timeFrame} value={timeFrame}>
                  {timeFrame}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      {showLegend && (
        <div className="flex pr-6 items-center justify-end gap-4 pb-4">
          {labels.map((label, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: colors[index] }}
              />
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      )}

      <ResponsiveContainer
        style={{
          fontSize: "12px",
        }}
        width="100%"
        height={300}
      >
        <AreaChart
          width={"100%"}
          data={data}
          style={{
            paddingLeft: "0px",
            // border: "2px solid red",
          }}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid horizontal={false} vertical={false} stroke="#f5f5f5" />
          <XAxis
            style={{
              border: "2px solid red",
            }}
            width={"100%"}
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#666666" }}
            dy={10}
            dx={-10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={false} // Removed the tick labels
            tickFormatter={(value) => `N${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Area
            type="monotone"
            dataKey="Inflow"
            stroke="#1A1A89"
            strokeWidth={2}
            fill="url(#colorInflow)"
            dot={false}
            activeDot={{ r: 4, fill: "#1A1A89" }}
          />
          <Area
            type="monotone"
            dataKey="Outflow"
            stroke="#E2E2E2"
            strokeWidth={2}
            fill="url(#colorOutflow)"
            dot={false}
            activeDot={{ r: 4, fill: "#E2E2E2" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
