import { isEmpty, range } from "lodash";
//@ts-ignore
import { extent, map, histogram, ticks } from "d3-array";

export const getMinMax = (dataset: any, value: any) => {
  if (value === undefined) return [1, 100];
  const { type, rows } = dataset;
  const minMax =
    type !== "FeatureCollections"
      ? extent(map(rows, (obj: any) => Number(obj[value])))
      : extent(map(rows, (obj: any) => Number(obj.properties[value])));
  return minMax;
};

export const findColorRange = (
  dataset: any,
  scale: string,
  value: string,
  colorRange: any
) => {
  const { type, rows } = dataset;
  if (value) {
    if (scale === "quantize") {
      const retuenValue = getMinMax(dataset, value);
      const rangeValue = range(
        retuenValue[0],
        retuenValue[1],
        Math.floor(retuenValue[1] / colorRange.length)
      );
      return rangeValue;
    }
    return type !== "FeatureCollections"
      ? map(rows, (obj: any) => obj[value])
      : map(rows, (obj: any) => obj.properties[value]);
  }
  return [1, 100];
};

export const getHistogram = (
  minmax: any[],
  rows: any[],
  field: string,
  type: string
) => {
  if (type === "FeatureCollections") {
    const result = histogram()
      .thresholds(ticks(minmax[0], minmax[1], 30))
      .domain(minmax)(map(rows, (item: any) => item.properties[field]))
      .map((bin: any, i: number) => ({ x: i, y: bin.length }));
    return result;
  }
  const result = histogram()
    .thresholds(ticks(minmax[0], minmax[1], 30))
    .domain(minmax)(map(rows, (item: any) => item[field]))
    .map((bin: any, i: number) => ({ x: i, y: bin.length }));
  return result;
};

export const getFieldValues = (data: any, field: string) => {
  const { type, rows } = data;
  const values =
    type === "Point" || type === "CsvCollections"
      ? rows.map((item: any) => item[field])
      : rows.map((item: any) => item.properties[field]);
  return Array.from(new Set(values));
};

export const getFilterValueFromDataset = (d: any, filterConfig: any) => {
  if (!isEmpty(filterConfig)) {
    const arr: number[] = [];
    filterConfig.forEach((config: any, i: number) => {
      const {
        data: { values, fieldBasedOn },
      } = config;
      if (values && !isEmpty(values)) {
        if (values.includes("true")) {
          arr[i] = d[fieldBasedOn] === "true" ? 1 : 0;
        } else if (values.includes("false")) {
          arr[i] = d[fieldBasedOn] === "false" ? 1 : 0;
        } else {
          arr[i] = Object.values(d).some((item) => values.includes(item))
            ? 1
            : 0;
        }
      } else {
        arr[i] = d[fieldBasedOn];
      }
    });
    return arr.length === 1
      ? [...arr, 0, 0]
      : arr.length === 2
      ? [...arr, 0]
      : [...arr];
  }
  return [0, 0, 0];
};

export const getFilterRangeFromDataset = (filterConfig: any) => {
  if (!isEmpty(filterConfig)) {
    const arr: number[][] = [];
    filterConfig.forEach((config: any, i: number) => {
      const {
        data: { values, range },
      } = config;
      if (values && !isEmpty(values)) {
        arr[i] = [1, 1];
      } else {
        arr[i] = range;
      }
    });
    return arr.length === 1
      ? [...arr, [-1, 1], [-1, 1]]
      : arr.length === 2
      ? [...arr, [-1, 1]]
      : [...arr];
  }
  return [
    [-1, 1],
    [-1, 1],
    [-1, 1],
  ];
};