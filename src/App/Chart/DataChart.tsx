import React from "react";
import {useTheme} from "@mui/material/styles";
import {CartesianGrid, Legend, Line, LineChart, ReferenceLine, Tooltip, XAxis, YAxis,} from "recharts";
import {alpha, Box, Card, Typography} from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";

const getLineColor = (index: number, theme: any) => {
  /* switch (index) {
     case 0:
       return indigo['500'];
     case 1:
       return cyan['500'];
     case 2:
       return teal['500'];
     case 3:
       return deepPurple['500'];
     case 4:
       return deepOrange['500']
     case 5:
       return amber['500']
     case 6:
       return yellow['500'];
     default:
       return theme.palette.primary.main;
   }*/
  return theme.palette.primary.main;
}
const getLineDash = (index: number) => {
  switch (index % 3) {
    case 0:
      return "";
    case 1:
      return "";
    case 2:
      return "";
    default:
      return "";
  }
}

const DataChart = (
  props: {
    data: any,
    max?: number,
    keys: string[],
  }
) => {
  const theme = useTheme();

  return (
    <Card variant="outlined">
      <Box pr={4} m={2} height={350}>
        <AutoSizer>
          {({width, height}) =>
            <LineChart width={width} height={height} data={props.data} margin={{top: 8, bottom: 8}}>
              <XAxis dataKey="time" padding={{left: 30, right: 30,}}/>
              <YAxis/>
              <Tooltip/>
              <Legend verticalAlign="top" height={42}/>
              <ReferenceLine
                y={props.max}
                label={<Typography color="text.secondary">Max</Typography>}
                stroke={theme.palette.text.secondary}
                strokeLinecap="round"
                strokeDasharray="2 5"
              />
              <CartesianGrid
                stroke={alpha(theme.palette.text.disabled, 0.1)}
                strokeDasharray="2 5"
              />
              {props.keys.map((el, index) => (
                <Line
                  dataKey={props.keys[index]}
                  type="natural"
                  strokeLinecap="round"
                  dot={<></>}
                  stroke={getLineColor(index, theme)}
                  strokeDasharray={getLineDash(index)}
                  strokeWidth={3}
                />
              ))}
            </LineChart>}
        </AutoSizer>
      </Box>
    </Card>
  );
}

export default DataChart;


