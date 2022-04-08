import React from "react";
import {useTheme} from "@mui/material/styles";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {alpha, Box, Card} from "@mui/material";

const Chart = (
  props: {
    data: any,
    max?: number,
  }
) => {
  const theme = useTheme();
  return (
    <Card variant="outlined">
      <Box m={2} pr={4}>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={props.data} margin={{top: 32, bottom: 8}}>
            <XAxis dataKey="time" padding={{left: 30, right: 30,}}/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <ReferenceLine y={props.max} label="Max" stroke={theme.palette.text.secondary} strokeLinecap="round"
                           strokeDasharray="2 5"/>
            <CartesianGrid stroke={alpha(theme.palette.text.disabled, 0.1)} strokeDasharray="2 5"/>
            <Line dataKey="valore1" type="natural" stroke={theme.palette.secondary.main} strokeWidth={3}/>
            <Line dataKey="valore2" type="natural" stroke={theme.palette.primary.light} strokeWidth={3}/>
            <Line dataKey="valore3" type="natural" stroke={theme.palette.primary.dark} strokeWidth={3}/>
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}

export default Chart;

