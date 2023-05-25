// install (please Other Expenses (Non Operating) sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from "@nivo/pie";

// Other Expenses (Non Operating) sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
  {
    id: "Payroll & Related",
    label: "Payroll & Related",
    value: 149,
    color: "hsl(357, 70%, 50%)",
  },
  {
    id: "Cost Of Sale",
    label: "Cost Of Sale",
    value: 586,
    color: "hsl(9, 70%, 50%)",
  },
  {
    id: "Other Exprenses",
    label: "Other Exprenses",
    value: 329,
    color: "hsl(127, 70%, 50%)",
  },
  {
    id: "Other Expenses (Non Operating)",
    label: "Other Expenses (Non Operating)",
    value: 368,
    color: "hsl(53, 70%, 50%)",
  },
  {
    id: "Fixed Expenses (Franchise Fees & Other)",
    label: "Fixed Expenses (Franchise Fees & Other)",
    value: 150,
    color: "hsl(182, 70%, 50%)",
  },
];

const colors = {
  "Payroll & Related": "#A4FF9C",
  "Cost Of Sale": "#D0D31E",
  "Other Exprenses": "#C4E931",
  "Utility": "#375534",
};
const getColor = (bar) => colors[bar.id];

const PieChart = ({ _data = null }) => {

  const PieChartData = [
    {
      id: "Cost Of Sale",
      label: "Cost Of Sale",
      color: "hsl(9, 70%, 50%)",

      value: _data?.cost_of_sale?.actual?.amount,
    },
    {
      id: "Payroll & Related",
      label: "Payroll & Related",
      color: "hsl(357, 70%, 50%)",

      value: _data?.payroll_and_related?.actual?.amount,
    },
    {
      id: "Other Exprenses",
      label: "Other Exprenses",
      color: "hsl(127, 70%, 50%)",

      value: _data?.other_expenses?.actual?.amount,
    },
    {
      id: "Utility",
      label: "Utility",
      value: _data?.utility?.actual?.amount,
      color: "hsl(182, 70%, 50%)",
    },
  ];

  return (
    <ResponsivePie
      colors={getColor}
      data={PieChartData}
      margin={{ top: 20, right: 10, bottom: 80, left: 180 }}
      innerRadius={0.05}
      padAngle={3}
      cornerRadius={5}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", "1.3"]],
      }}
      legends={[
        {
          anchor: "bottom",
          direction: "column",
          justify: false,
          translateX: -199,
          translateY: 61,
          itemWidth: 100,
          itemHeight: 20,
          itemsSpacing: 2,
          symbolSize: 20,
        },
      ]}
      enableArcLinkLabels={false}
    />
  );
};

export default PieChart;
