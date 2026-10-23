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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MyPieChart = ({
  Successful,
  Pending,
  Overdue,
  loading,
  title = "hekki",
  timeFrames,
}) => {
  const data = [
    { name: "Successful", value: Successful, fill: "#0A0A78" },
    { name: "Pending", value: Pending, fill: "#5A5AF1" },
    { name: "Overdue", value: Overdue, fill: "#BDBDDB" },
  ];

  const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);
  return (
    <div className="">
      <div className="  flex  justify-between p-4">
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
      <div className="doughnut-chart-body  p-4 h-[400px] w-[100%] ">
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
          ) : !Successful || !Pending || !Overdue ? (
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
                // innerRadius={60}
                // outerRadius={80}
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

export default MyPieChart;
