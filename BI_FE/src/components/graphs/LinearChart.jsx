// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { linearGradientDef } from '@nivo/core'
import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
    {
      "id": "japan",
      "color": "green",
      "data": [
        {
          "x": "plane",
          "y": 135
        },
        {
          "x": "helicopter",
          "y": 270
        },
        {
          "x": "boat",
          "y": 102
        },
        
        {
          "x": "subway",
          "y": 36
        },
        {
          "x": "bus",
          "y": 132
        },
        {
            "x": "train",
            "y": 25
          },
       
      ]
    },
 
  ]
const MyResponsiveLine = ({  /* see data tab */ }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 100, right: 118, bottom: 80, left: 150 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        lineWidth={1}
        enablePoints={false}
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.4}
        crosshairType="top-left"
        useMesh={true}
        legends={[]}
        defs={[
        
            {
                id: 'gradientC',
                type: 'linearGradient',
                colors: [
                    { offset: 0, color: '#A3FF9C' },
                    { offset: 50, color: '#46AE3D' },
                    { offset: 100, color: '#375534' },
                ],
            },
        ]}

        fill={[
             { match: '*', id: 'gradientC' },
        ]}
        colors = 'transparent'
    />
)

export default MyResponsiveLine