import EChartsReactCore from "echarts-for-react/lib/core";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
// Import charts, all with Chart suffix
import { LineChart } from "echarts/charts";
// import components, all suffixed with Component
import {
    GridSimpleComponent,
    GridComponent,
    PolarComponent,
    RadarComponent,
    GeoComponent,
    SingleAxisComponent,
    ParallelComponent,
    CalendarComponent,
    GraphicComponent,
    ToolboxComponent,
    TooltipComponent,
    AxisPointerComponent,
    BrushComponent,
    TitleComponent,
    TimelineComponent,
    MarkPointComponent,
    MarkLineComponent,
    MarkAreaComponent,
    LegendComponent,
    LegendScrollComponent,
    LegendPlainComponent,
    DataZoomComponent,
    DataZoomInsideComponent,
    DataZoomSliderComponent,
    VisualMapComponent,
    VisualMapContinuousComponent,
    VisualMapPiecewiseComponent,
    AriaComponent,
    TransformComponent,
    DatasetComponent,
} from "echarts/components";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
    CanvasRenderer,
    // SVGRenderer,
} from "echarts/renderers";

export default function UsageChart({ data }) {
    const option = {
        title: {
            text: "Usage Matrix",
            left: "1%",
        },
        legend: {},
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        grid: {
            left: "5%",
            right: "5%",
        },
        xAxis: {
            type: "time",
            boundaryGap: false,
            axisLabel: {
                formatter: function (value) {
                    var date = new Date(value);
                    // Format time as HH:mm
                    return (
                        date.getHours() +
                        ":" +
                        (date.getMinutes() < 10 ? "0" : "") +
                        date.getMinutes()
                    );
                },
            },
            // data: labels,
        },
        yAxis: {
            min: 0,
            max: 100,
        },
        series: [
            {
                name: `CPU Average ( ${data
                    .filter((item) => item.status === "active")
                    .map((item) => item.cpu_percent)} % )`,
                type: "line",
                showSymbol: false,
                data: data.map((item) => [item.created_at, item.cpu_percent]),
            },
            {
                name: `Memory Average ( ${data
                    .filter((item) => item.status === "active")
                    .map((item) => item.memory_percent)} % )`,
                type: "line",
                showSymbol: false,
                data: data.map((item) => [
                    item.created_at,
                    item.memory_percent,
                ]),
            },
        ],
    };

    echarts.use([
        LineChart,
        GridSimpleComponent,
        GridComponent,
        PolarComponent,
        RadarComponent,
        GeoComponent,
        SingleAxisComponent,
        ParallelComponent,
        CalendarComponent,
        GraphicComponent,
        ToolboxComponent,
        TooltipComponent,
        AxisPointerComponent,
        BrushComponent,
        TitleComponent,
        TimelineComponent,
        MarkPointComponent,
        MarkLineComponent,
        MarkAreaComponent,
        LegendComponent,
        LegendScrollComponent,
        LegendPlainComponent,
        DataZoomComponent,
        DataZoomInsideComponent,
        DataZoomSliderComponent,
        VisualMapComponent,
        VisualMapContinuousComponent,
        VisualMapPiecewiseComponent,
        AriaComponent,
        TransformComponent,
        DatasetComponent,
        CanvasRenderer,
    ]);

    return (
        <EChartsReactCore
            echarts={echarts}
            option={option}
            notMerge={true}
            lazyUpdate={true}
            style={{ height: "100%" }}
        />
    );
}
