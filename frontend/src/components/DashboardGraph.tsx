"use client";
import { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

export default function DashboardGraph() {
  const [chartOption, setChartOption] = useState<undefined | EChartsOption>(
    undefined
  );
  const [zeroData, setZeroData] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      try {
        await fetch("/api/logs")
          .then((response) => response.json())
          .then(async (data) => {
            if (data.status !== "success") {
              await fetch("/api/auth/logout", {
                method: "POST",
              });
              document.location.reload();
              return;
            }
            const responseData = data as {
              status: string;
              logs: {
                id: number;
                moodRating: number;
                anxietyLevel: number;
                sleptHours: number;
                qualityOfSleep: number;
                disturbances: number;
                physicalActivityType: string | null;
                physicalActivityDuration: number | null;
                socializedFor: number;
                userId: number;
                createdAt: string;
                updatedAt: string;
              }[];
            };
            if (responseData.logs.length === 0) {
              setZeroData(true);
              return;
            }
            const chartOptionsData: EChartsOption = {
              title: {
                text: "Mental Health Data",
              },
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "cross",
                  label: {
                    backgroundColor: "#6a7985",
                  },
                },
              },
              legend: {
                data: [
                  "Mood Rating",
                  "Anxiety Level",
                  "Slept Hours",
                  "Quality Of Sleep",
                  "Disturbances",
                  "Physical Activity Duration",
                  "Socialized For",
                ],
              },
              toolbox: {
                feature: {
                  saveAsImage: {},
                },
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: responseData.logs.map(
                  (log) => log.createdAt.split("T")[0]
                ),
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  name: "Mood Rating",
                  type: "line",
                  areaStyle: {},
                  data: responseData.logs.map((log) => log.moodRating),
                },
                {
                  name: "Anxiety Level",
                  type: "line",
                  areaStyle: {},
                  data: responseData.logs.map((log) => log.anxietyLevel),
                },
                {
                  name: "Slept Hours",
                  type: "line",
                  areaStyle: {},
                  data: responseData.logs.map((log) => log.sleptHours),
                },
                {
                  name: "Quality Of Sleep",
                  type: "line",
                  areaStyle: {},
                  data: responseData.logs.map((log) => log.qualityOfSleep),
                },
                {
                  name: "Disturbances",
                  type: "line",
                  areaStyle: {},
                  data: responseData.logs.map((log) => log.disturbances),
                },
                {
                  name: "Physical Activity Duration",
                  type: "line",
                  areaStyle: {},
                  data: responseData.logs.map(
                    (log) => log.physicalActivityDuration
                  ),
                },
                {
                  name: "Socialized For",
                  type: "line",
                  areaStyle: {},
                  data: responseData.logs.map((log) => log.socializedFor),
                },
              ],
            };
            setChartOption(chartOptionsData);
          });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="w-full p-8">
      {chartOption !== undefined && !zeroData && (
        <div className="bg-white p-4 rounded-lg">
          <ReactECharts option={chartOption} />
        </div>
      )}
      {zeroData && (
        <div className="w-full h-[80vh] grid place-items-center">
          <h1 className="text-2xl font-semibold">No data to display</h1>
        </div>
      )}
    </div>
  );
}
