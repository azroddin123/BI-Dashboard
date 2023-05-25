// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
  {
    country: "MTD Actual",
    "Average Rate": 168,
    "Average RateColor": "#375534",
    Revenue: 93,
    RevenueColor: "#375534",
    Occuapncy: 54,
    OccuapncyColor: "#375534",
    kebab: 185,
    kebabColor: "#375534",
    fries: 39,
    friesColor: "#375534",
    donut: 38,
    donutColor: "#375534",
  },
  {
    country: "MTD Budget",
    "Average Rate": 148,
    "Average RateColor": "#375534",
    Revenue: 46,
    RevenueColor: "#375534",
    Occuapncy: 188,
    OccuapncyColor: "#375534",
    kebab: 6,
    kebabColor: "#375534",
    fries: 173,
    friesColor: "#375534",
    donut: 171,
    donutColor: "#375534",
  },
  {
    country: "MTD LY",
    "Average Rate": 189,
    "Average RateColor": "#375534",
    Revenue: 162,
    RevenueColor: "#375534",
    Occuapncy: 30,
    OccuapncyColor: "#375534",
    kebab: 4,
    kebabColor: "#375534",
    fries: 75,
    friesColor: "#375534",
    donut: 5,
    donutColor: "#375534",
  },
];
const colors = {
  "Average Rate": "#A4FF9C",
  Revenue: "#375534",
  Occuapncy: "#46AE3D",
};
const getColor = (bar) => colors[bar.id];
const BarChart = ({data2}) => {
  // console.log({data2})  
  return (
  <ResponsiveBar
    data={data}
    colors={getColor}
    keys={["Average Rate", "Revenue", "Occuapncy"]}
    indexBy="country"
    margin={{ top: 50, right: 30, bottom: 40, left: 60 }}
    padding={0.5}
    groupMode="grouped"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    borderRadius={5}
    innerPadding={2}
    enableLabel={false}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "top-right",
        direction: "row",
        justify: false,
        translateX: 10,
        translateY: -40,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        borderRadius: 5,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    barAriaLabel={function (e) {
      return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
    }}
  />
);}

export default BarChart;
