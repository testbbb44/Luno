import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Label,
} from "recharts";
import "./roundchart.css";

const DoughnutChart = ({ License, Electricity, loading }) => {
  const data = [
    { name: "License", value: License, fill: "#BDBDDB" },
    // { name: "Charges", value: Charges, fill: "#1CCAB8" },
    { name: "Electricity", value: Electricity, fill: "#0A0A78" },
  ];

  const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);
  return (
    <div className="">
      <div className="doughnut-chart-body w-[100%] ">
        <ResponsiveContainer>
          <div className="flex items-center justify-end gap-4 pb-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#0A0A78]" />
              <span className="text-sm text-muted-foreground">
                Product Design
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#BDBDDB]" />
              <span className="text-sm text-muted-foreground">
                Motion Design
              </span>
            </div>
          </div>
          {loading ? (
            <div className="border h-[100%] flex justify-center items-center">
              Loading...
            </div>
          ) : !License || !Electricity ? (
            <div className="border h-[100%] flex justify-center items-center">
              No Data
            </div>
          ) : (
            <PieChart>
              <Pie
                dataKey="value"
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={"60%"}
                outerRadius={"80%"}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DoughnutChart;
