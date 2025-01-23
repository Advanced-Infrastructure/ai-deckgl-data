//@ts-ignore
import { MVTLayer } from "@deck.gl/geo-layers";
//@ts-ignore
import { DataFilterExtension, MaskExtension } from "@deck.gl/extensions";
import {
  scaleLinear,
  scaleLog,
  scaleOrdinal,
  scaleQuantile,
  scaleQuantize,
  scaleSqrt,
} from "d3-scale";
import { compact, isBoolean, isEmpty, isString, memoize } from "lodash";
import { HextoRGB } from "../functions/colorConversion";
import { getFilterRangeFromDataset, getFilterValueFromDataset } from "../functions/layerProperties";
import { COLOR_RANGE } from "../constants/colorRange";

export const TileLayer = (
  datasetId: string,
  dataset: Record<string, any>,
  url: string,
  config: Record<string, any>
) => {
  const {
    colorRange,
    radiusBasedOn,
    colorScale,
    colorBasedOn,
    customColor,
    customStrokeColor,
    fillColor,
    lineColor,
    opacity,
    extruded,
    filterConfig,
    lineWidthScale,
    strokeColorScale,
    strokeColorBasedOn,
    strokeColorRange,
    strokeWidthBasedOn,
    strokeWidthScale,
    heightBasedOn,
    heightScale,
    conditionEnabled,
    condition,
    fillConditionEnabled,
    fillCondition,
    strokeConditionEnabled,
    strokeCondition,
    nullConfig,
  } = config;

  const fill_condition_enabled =
    typeof fillConditionEnabled === "boolean"
      ? fillConditionEnabled
      : conditionEnabled;
  const fill_condition = fillCondition ?? condition;

  const customRgb =
    customColor && customColor.map((item: any) => HextoRGB(item));
  const customStrokeRgb =
    customStrokeColor && customStrokeColor.map((item: any) => HextoRGB(item));

  const generatePointRadius = memoize((basedOn) => {
    if (basedOn) {
      const meta = dataset.fields.find(
        (item: any) => item.name === basedOn
      )?.meta;
      return scaleLinear().domain(meta.minMax).range([0, 100]);
    } else return isEmpty;
  })(radiusBasedOn);

  const generateFillColor = memoize(
    //Memo function
    (basedOn, range, scale, cndEnabled, cnd) => {
      if (basedOn && scale) {
        const meta = dataset.fields.find(
          (item: any) => item.name === basedOn
          //@ts-ignore
        )?.meta;
        const [minimum, maximum] = dataset?.fields.find(
          (item: any) => item?.name === basedOn
        )?.meta.minMax;

        const clrScale: any =
          scale === "quantize"
            ? scaleQuantize()
                .domain([minimum, maximum])
                .range(
                  range
                    ? // @ts-ignore
                      COLOR_RANGE[range]
                    : customRgb
                    ? customRgb
                    : COLOR_RANGE["default"]
                )
            : scale === "quantile"
            ? scaleQuantile()
                .domain(meta.domain)
                .range(
                  range
                    ? // @ts-ignore
                      COLOR_RANGE[range]
                    : customRgb
                    ? customRgb
                    : COLOR_RANGE["default"]
                )
            : scaleOrdinal()
                .domain(
                  cndEnabled && cnd?.fieldNames.includes(basedOn)
                    ? cnd.values
                    : meta.domain
                )
                .range(
                  range
                    ? // @ts-ignore
                      COLOR_RANGE[range]
                    : customRgb
                    ? customRgb
                    : COLOR_RANGE["default"]
                );
        const scaleObj: Record<string, any> = {
          quantile: clrScale.quantiles,
          quantize: clrScale.quantize,
          ordinal: clrScale.ordinal,
        };
        return (scaleObj[scale] = function (val: number) {
          if ([-123456, "-123456"].includes(val)) return [0, 0, 0];
          else if (nullConfig && val === nullConfig.value)
            return nullConfig.color;
          else return clrScale(val);
        });
      } else return isEmpty;
    },
    //Memo Resolver
    (basedOn, range, scale, cndEnabled, cnd) => {
      JSON.stringify([basedOn, range, scale, cndEnabled, cnd]);
    }
  )(
    colorBasedOn,
    colorRange,
    colorScale,
    fill_condition_enabled,
    fill_condition
  );

  const generateLineColor = memoize(
    // Memo function
    (basedOn, range, scale, cndEnabled, cnd) => {
      if (basedOn && scale) {
        const meta = dataset.fields.find(
          (item: any) => item.name === basedOn
        )?.meta;
        if (scale === "quantize") {
          return scaleQuantize()
            .domain(meta?.range)
            .range(
              range
                ? // @ts-ignore
                  COLOR_RANGE[range]
                : customStrokeRgb
                ? customStrokeRgb
                : COLOR_RANGE["default"]
            );
        } else if (scale === "quantile") {
          return scaleQuantile()
            .domain(meta?.domain)
            .range(
              range
                ? // @ts-ignore
                  COLOR_RANGE[range]
                : customStrokeRgb
                ? customStrokeRgb
                : COLOR_RANGE["default"]
            );
        } else {
          const cndDomain: any =
            cndEnabled && cnd?.fieldNames.includes(basedOn)
              ? cnd.values
              : meta?.domain;
          return scaleOrdinal()
            .domain(cndDomain)
            .range(
              range
                ? // @ts-ignore
                  COLOR_RANGE[range]
                : customStrokeRgb
                ? customStrokeRgb
                : COLOR_RANGE["default"]
            );
        }
      } else return isEmpty;
    },
    //Memo Resolver
    (basedOn, range, scale) => JSON.stringify([basedOn, range, scale])
  )(
    strokeColorBasedOn,
    strokeColorRange,
    strokeColorScale,
    strokeConditionEnabled,
    strokeCondition
  );

  const generateLineWidth: any = memoize(
    // Memo function
    (basedOn, scale) => {
      if (basedOn && scale) {
        const meta = dataset.fields.find(
          (item: any) => item.name === basedOn
        )?.meta;
        const strokeValueScale =
          scale === "linear"
            ? scaleLinear().domain(meta.minMax).range([0, 100])
            : scale === "log"
            ? scaleLog().domain(meta.minMax).range([0, 100])
            : scaleSqrt().domain(meta.minMax).range([0, 100]);
        return strokeValueScale;
      } else return isEmpty;
    },
    // Memo resolver
    (basedOn, scale) => JSON.stringify([basedOn, scale])
  )(strokeWidthBasedOn, strokeWidthScale);

  const generateElevation: any = memoize(
    (basedOn, scale) => {
      if (basedOn && scale) {
        const meta = dataset.fields.find(
          (item: any) => item.name === basedOn
        )?.meta;
        const heightValueScale =
          scale === "linear"
            ? scaleLinear().domain(meta.minMax).range([0, 10])
            : scale === "log"
            ? scaleLog().domain(meta.minMax).range([0, 10])
            : scaleSqrt().domain(meta.minMax).range([0, 10]);
        return heightValueScale;
      } else return isEmpty;
    },
    (basedOn, scale) => JSON.stringify([basedOn, scale])
  )(heightBasedOn, heightScale);

  const getPointRadius = (d: any) => {
    if (radiusBasedOn) {
      const val = d.properties[radiusBasedOn];

      const radiusValue = isString(val) ? val.length : val;

      return generatePointRadius(radiusValue);
    } else return 10;
  };

  const getFillColor = (d: Record<string, any>) => {
    if (colorBasedOn) {
      let val = d.properties[colorBasedOn];
      if (
        isBoolean(val) &&
        fill_condition_enabled &&
        fill_condition.values.some((item: any) =>
          ["True", "true", "False", "false"].includes(item)
        )
      ) {
        val = JSON.stringify(val);
      }
      if ([-123456, "-123456"].includes(val)) return [0, 0, 0];
      return generateFillColor(val);
    } else return fillColor;
  };

  const getLineColor = (d: any) => {
    if (strokeColorBasedOn) {
      const val = d.properties[strokeColorBasedOn];
      return generateLineColor(val);
    } else return lineColor;
  };

  const getLineWidth = (d: any) => {
    if (strokeWidthBasedOn) {
      const val = d.properties[strokeWidthBasedOn];
      const strokeValue = isString(val) ? val.length : val;

      return generateLineWidth(strokeValue) / 10;
    } else return lineWidthScale;
  };

  const getElevation = (d: any) => {
    if (!extruded) return 0;
    if (heightBasedOn) {
      const val = d.properties[heightBasedOn];
      const heightValue = isString(val) ? val.length : val;

      return generateElevation(heightValue) * 100;
    } else return 100;
  };

  const getFilterValue = (d: any) => {
    const result = getFilterValueFromDataset(d.properties, filterConfig);
    return result;
  };

  const getFilterRange = () => {
    const result = getFilterRangeFromDataset(filterConfig);
    return result;
  };

  return new MVTLayer({
    id: datasetId,
    data: url,
    pickable: true,
    autoHighlight: true,
    highlightColor: [255, 0, 0],
    opacity,
    pointType: "circle",
    pointRadiusUnits: "meters",
    pointRadiusMinPixels: 1,
    pointRadiusMaxPixels: 100,
    lineWidthMaxPixels: 100,
    lineWidthMinPixels: 1,
    maskId: "geo-filter",
    ...config,
    //@ts-ignore
    getPointRadius,
    getFillColor,
    getLineColor,
    getLineWidth,
    getElevation,
    getFilterValue,
    filterRange: getFilterRange(),
    extensions: [
      new MaskExtension(),
      new DataFilterExtension({
        filterSize: 4,
      }),
    ],
    updateTriggers: {
      getFillColor: compact([
        colorBasedOn,
        fillColor,
        colorScale,
        colorRange,
        fill_condition_enabled,
        JSON.stringify(customRgb),
        nullConfig,
      ]),
      getPointRadius: compact([radiusBasedOn]),
      getLineWidth: compact([strokeWidthBasedOn, strokeWidthScale]),
      getLineColor: compact([
        strokeColorBasedOn,
        strokeColorScale,
        strokeColorRange,
        strokeConditionEnabled,
        JSON.stringify(customStrokeRgb),
        lineColor,
      ]),
      getElevation: compact([heightBasedOn, heightScale]),
      getFilterValue: compact([filterConfig]),
    },
    onTileError: () => {
      return null;
    },
    onClick: ({ x, y, coordinate, object }: any) => {
      const objwithoutlayername = { ...object.properties };
      delete objwithoutlayername["layerName"];
    },
  });
};
