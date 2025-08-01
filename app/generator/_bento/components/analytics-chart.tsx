"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

export function AnalyticsChart() {
  const data = [
    { month: "Jan", value: 65, growth: 12, color: "bg-chart-4" },
    { month: "Feb", value: 78, growth: 20, color: "bg-chart-2" },
    { month: "Mar", value: 52, growth: -15, color: "bg-chart-3" },
    { month: "Apr", value: 91, growth: 75, color: "bg-chart-1" },
    { month: "May", value: 84, growth: -8, color: "bg-chart-2" },
    { month: "Jun", value: 95, growth: 13, color: "bg-chart-5" },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));
  const totalGrowth = data[data.length - 1].value - data[0].value;
  const growthPercentage = ((totalGrowth / data[0].value) * 100).toFixed(1);

  return (
    <Card className="h-full w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5" />
          Revenue Analytics
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Last 6 months</span>
          <div
            className={`flex items-center gap-1 ${
              totalGrowth >= 0 ? "text-primary" : "text-destructive"
            }`}
          >
            {totalGrowth >= 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span className="font-medium">{growthPercentage}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative h-32">
            <div className="flex items-end justify-between h-full gap-2">
              {data.map((item) => (
                <div
                  key={item.month}
                  className="flex flex-col items-center flex-1 h-full"
                >
                  <div className="relative w-full h-full flex items-end">
                    <div
                      className={`rounded-t-sm w-full transition-all duration-300 hover:bg-primary/90 ${item.color}`}
                      style={{
                        height: `${(item.value / maxValue) * 100}%`,
                        minHeight: "8px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-1 text-xs text-muted-foreground">
            {data.map((item) => (
              <div key={item.month} className="text-center">
                {item.month}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-6 gap-1 text-xs font-medium">
            {data.map((item) => (
              <div key={item.month} className="text-center">
                ${item.value}k
              </div>
            ))}
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Total Revenue</span>
              <span className="font-semibold">
                ${data.reduce((acc, item) => acc + item.value, 0)}k
              </span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-muted-foreground">Average</span>
              <span className="font-medium">
                $
                {Math.round(
                  data.reduce((acc, item) => acc + item.value, 0) / data.length
                )}
                k
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
