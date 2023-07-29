import styles from './SmallChart.module.scss';
import {ResponsiveBar} from '@nivo/bar'
import {BasicTooltip} from "@nivo/tooltip";

interface SmallChartProps {
    className?: string
    chartData: any[]
}

const theme = {
    "background": "#ffffff",
    "text": {
        "fontSize": 11,
        "fill": "#333333",
        "outlineWidth": 0,
        "outlineColor": "transparent"
    },
    "axis": {
        "domain": {
            "line": {
                "stroke": "#777777",
                "strokeWidth": 1
            }
        },
        "legend": {
            "text": {
                "fontSize": 12,
                "fill": "#333333",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            }
        },
        "ticks": {
            "line": {
                "stroke": "#777777",
                "strokeWidth": 1
            },
            "text": {
                "fontSize": 11,
                "fill": "#333333",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            }
        }
    },
    "grid": {
        "line": {
            "stroke": "#dddddd",
            "strokeWidth": 1
        }
    },
    "legends": {
        "title": {
            "text": {
                "fontSize": 11,
                "fill": "#333333",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            }
        },
        "text": {
            "fontSize": 11,
            "fill": "#333333",
            "outlineWidth": 0,
            "outlineColor": "transparent"
        },
        "ticks": {
            "line": {},
            "text": {
                "fontSize": 10,
                "fill": "#333333",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            }
        }
    },
    "annotations": {
        "text": {
            "fontSize": 13,
            "fill": "#333333",
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "link": {
            "stroke": "#000000",
            "strokeWidth": 1,
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "outline": {
            "stroke": "#000000",
            "strokeWidth": 2,
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "symbol": {
            "fill": "#000000",
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        }
    },
    "tooltip": {
        "container": {
            "background": "#ffffff",
            "fontSize": 12
        },
        "basic": {},
        "chip": {},
        "table": {},
        "tableCell": {},
        "tableCellValue": {}
    }
}


const BarTooltip = (props: any) => {
    const date = new Date(props.data.date).toLocaleDateString("ru-RU")

    return (
        <BasicTooltip
            id={date}
            value={props.value}
            color={props.color}
            enableChip
        />
    );
};

export const SmallChart = (props: SmallChartProps) => {
    const {className, chartData} = props;

    return (
        <div className={styles.SmallChart}>
            <ResponsiveBar
                data={chartData}
                keys={[
                    'total_kills',
                    'total_wounds',
                    'total_deaths',
                    'total_revives',
                    'total_teamkills',
                ]}
                indexBy="date"
                margin={{top: 10, right: 0, bottom: 110, left: 0}}
                padding={0.2}
                valueScale={{type: 'linear'}}
                indexScale={{type: 'band', round: true}}
                colors={{scheme: 'nivo'}}
                axisTop={null}
                axisRight={null}
                theme={{
                    textColor: "#b4b4b4",
                    fontSize: 12,
                    fontFamily: 'JetBrainsMono NF',
                }}
                axisBottom={{
                    tickSize: 1,
                    tickPadding: 3,
                    tickRotation: 90,
                    legend: "date",
                    legendPosition: 'middle',
                    legendOffset: 300,
                    format: function (value) {
                        return new Date(value).toLocaleDateString("ru-RU");
                    }
                }}
                axisLeft={null}
                enableGridY={false}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            10
                        ]
                    ]
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom',
                        itemTextColor: '#b4b4b4',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 120,
                        itemsSpacing: 4,
                        itemWidth: 150,
                        itemHeight: 40,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 24,
                    }
                ]}
                tooltip={BarTooltip}
                motionConfig="gentle"
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
            />
        </div>
    )
}