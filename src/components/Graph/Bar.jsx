import React from "react";
import {
  BarChart,
  Bar,
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
      <div className="bg-white p-3 border rounded-lg shadow">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const LimeBarChart = ({
  data = [],
  colors = [],
  labels = [],
  barsize,
  yAxisDomain,
  yAxisTicks,
  showLegend = true,
  title = "hekki",
  timeFrames,
  labelName = "%",
}) => {
  return (
    <div
      style={{
        flex: "3",
      }}
      className="bg-[#ffffff] relative rounded-[16px]"
    >
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
      {/* Dropdown Selector */}

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
          fontSize: "14px",
          marginTop: "50px",
          padding: "10px",
        }}
        width="100%"
        minHeight={350}
      >
        <BarChart maxBarSize={50} barSize={barsize} data={data}>
          <CartesianGrid strokeDasharray="0 3" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ dy: 10, textAnchor: "middle" }}
            interval={0}
            minTickGap={20}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            ticks={yAxisTicks}
            domain={yAxisDomain}
            width={70}
            tickFormatter={(value) => `${value + " " + labelName}`}
          />
          <Tooltip content={<CustomTooltip />} />
          {labels.map((label, index) => (
            <Bar
              key={index}
              dataKey={label}
              stackId="stack"
              fill={colors[index]}
              radius={
                index === 0
                  ? [0, 0, 4, 4]
                  : index === labels.length - 1
                  ? [4, 4, 0, 0]
                  : [0, 0, 0, 0]
              }
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LimeBarChart;
