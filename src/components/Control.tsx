import { Button, notification, Spin, Tree, Typography } from "antd";
import "./components.css";
import { CaretDownOutlined, DownloadOutlined } from "@ant-design/icons";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const { DirectoryTree } = Tree;

const treeData = [
  {
    id: "1db29cd",
    key: "1db29cd",
    title: "Land",
    isLeaf: false,
    children: [
      {
        id: "153d83a",
        key: "978a1e84-f623-11ed-8f86-0242ac120002",
        title: "LSOA Boundaries",
        isLeaf: true,
        children: [],
        checkable: true,
        isRestricted: false,
        export: true,
        zoom: false,
      },
      {
        id: "19dc5b7",
        key: "ac035a76-f626-11ed-b77c-0242ac120002",
        title: "MSOA Boundaries",
        isLeaf: true,
        children: [],
        checkable: true,
        isRestricted: false,
        export: true,
        zoom: false,
      },
      {
        id: "16e2b0a",
        key: "200fe746-f62b-11ed-85c6-0242ac120002",
        title: "Ward Boundaries",
        isLeaf: true,
        children: [],
        checkable: true,
        isRestricted: false,
        export: true,
        zoom: false,
      },
      {
        id: "1b6a020",
        key: "91557758-1503-11ee-b7b0-0242ac120002",
        title: "Postcodes",
        isLeaf: true,
        children: [],
        checkable: true,
        isRestricted: false,
        export: true,
        zoom: false,
      },
      {
        id: "1b7c46a",
        key: "85e16c6e-f628-11ed-86b3-0242ac12002",
        title: "Local Authority Boundary",
        isLeaf: true,
        children: [],
        checkable: true,
        isRestricted: false,
        export: true,
        zoom: false,
      },
      {
        id: "1116f96",
        key: "2964a924-f5b0-11ed-a71b-0242ac120002",
        title: "Ancient Woodland",
        isLeaf: true,
        children: [],
        checkable: true,
        isRestricted: false,
        export: true,
        zoom: false,
      },
      {
        id: "1a0d4d6",
        key: "bd30cf32-f63e-11ed-b348-0242ac120002",
        title: "Conservation Areas",
        isLeaf: true,
        children: [],
        checkable: true,
        isRestricted: false,
        export: true,
        zoom: false,
      },
      {
        id: "17951ec",
        key: "77353d1a-f670-11ed-a2a8-0242ac120002",
        title: "Flood Risk Zone 2",
        isLeaf: true,
        children: [],
        checkable: true,
        export: true,
        zoom: false,
      },
      {
        id: "1ae76be",
        key: "59ed74da-f651-11ed-812c-0242ac120002",
        title: "Flood Risk Zone 3",
        isLeaf: true,
        children: [],
        checkable: true,
        export: true,
        zoom: false,
      },
      {
        id: "1d12447",
        key: "6afdf8ca-0f2f-11ee-a394-0242ac120002",
        title: "Areas of Outstanding Natural Beauty",
        isLeaf: true,
        children: [],
        checkable: true,
        export: true,
        zoom: false,
      },
      {
        id: "1d8b36e",
        key: "3807f8d0-1744-11ef-9903-0242ac120002",
        title: "Parish Boundaries - England",
        isLeaf: true,
        children: [],
        checkable: true,
        export: true,
        zoom: false,
      },
      {
        id: "14e2945",
        key: "6a169364-d372-11ef-8647-0242ac120002",
        title: "Green Belt - England",
        isLeaf: true,
        children: [],
        checkable: true,
        export: true,
        zoom: false,
      },
      {
        id: "133d25f",
        key: "7fde8408-d382-11ef-81d2-0242ac12002",
        title: "Green Belt - Scotland",
        isLeaf: true,
        children: [],
        checkable: true,
        export: true,
        zoom: false,
      },
    ],
    checkable: true,
  },
];

export default function Control({ dataset, setDataset, layers }: any) {
  const [downloading, setDownloading] = useState<any>({});
  const history = useHistory();

  const data = [
    {
      tile_url:
        "https://d2toru5i4bimlb.cloudfront.net/ukpn/rab_ukpn_lsoa_bdry/{z}/{x}/{y}",
      config: {
        filled: false,
        opacity: 0.8,
        stroked: true,
        visible: true,
        datatype: "CsvCollections",
        extruded: false,
        fillColor: [237, 146, 42],
        lineColor: [0, 0, 0],
        wireframe: false,
        colorRange: "default",
        colorScale: "quantile",
        heightScale: "linear",
        labelBasedOn: "LSOA21NM",
        labelEnabled: true,
        fillCondition: null,
        elevationScale: 1,
        lineWidthScale: 0.5,
        strokeCondition: null,
        pointRadiusScale: 10,
        strokeColorRange: "default",
        strokeColorScale: "quantile",
        strokeWidthScale: "linear",
        fillConditionEnabled: false,
        strokeConditionEnabled: false,
      },
      id: "978a1e84-f623-11ed-8f86-0242ac120002",
      loading: false,
    },
    {
      tile_url:
        "https://d2toru5i4bimlb.cloudfront.net/ukpn/rab_ukpn_msoa_bdry/{z}/{x}/{y}",
      config: {
        filled: false,
        opacity: 0.3,
        stroked: true,
        visible: true,
        datatype: "CsvCollections",
        extruded: false,
        fillColor: [237, 146, 42],
        lineColor: [0, 0, 0],
        wireframe: false,
        colorRange: "default",
        colorScale: "quantile",
        heightScale: "linear",
        fillCondition: null,
        elevationScale: 1,
        lineWidthScale: 0.5,
        strokeCondition: null,
        pointRadiusScale: 10,
        strokeColorRange: "default",
        strokeColorScale: "quantile",
        strokeWidthScale: "linear",
        fillConditionEnabled: false,
        strokeConditionEnabled: false,
      },
      id: "ac035a76-f626-11ed-b77c-0242ac120002",
      loading: false,
    },
    {
      tile_url:
        "https://d2toru5i4bimlb.cloudfront.net/ukpn/rab_ward_boundaries/{z}/{x}/{y}",
      config: {
        filled: false,
        opacity: 0.8,
        stroked: true,
        visible: true,
        datatype: "CsvCollections",
        extruded: false,
        fillColor: [237, 146, 42],
        lineColor: [0, 0, 0],
        wireframe: false,
        colorRange: "default",
        colorScale: "quantile",
        heightScale: "linear",
        fillCondition: null,
        elevationScale: 1,
        lineWidthScale: 0.4,
        strokeCondition: null,
        pointRadiusScale: 10,
        strokeColorRange: "default",
        strokeColorScale: "quantile",
        strokeWidthScale: "linear",
        fillConditionEnabled: false,
        strokeConditionEnabled: false,
      },
      id: "200fe746-f62b-11ed-85c6-0242ac120002",
      loading: false,
    },
    {
      tile_url:
        "https://d2toru5i4bimlb.cloudfront.net/ukpn/rab_ukpn_code_polygons/{z}/{x}/{y}",
      config: {
        filled: false,
        opacity: 0.8,
        stroked: true,
        visible: true,
        datatype: "CsvCollections",
        extruded: false,
        fillColor: [237, 146, 42],
        lineColor: [0, 0, 0],
        wireframe: false,
        colorRange: "default",
        colorScale: "quantile",
        heightScale: "linear",
        fillCondition: null,
        elevationScale: 1,
        lineWidthScale: 1,
        strokeCondition: null,
        pointRadiusScale: 10,
        strokeColorRange: "default",
        strokeColorScale: "quantile",
        strokeWidthScale: "linear",
        fillConditionEnabled: false,
        strokeConditionEnabled: false,
      },
      id: "91557758-1503-11ee-b7b0-0242ac120002",
      loading: false,
    },
    {
      tile_url:
        "https://d2toru5i4bimlb.cloudfront.net/ukpn/rab_ukpn_la_bdry/{z}/{x}/{y}",
      config: {
        filled: false,
        opacity: 0.8,
        stroked: true,
        visible: true,
        datatype: "CsvCollections",
        extruded: false,
        fillColor: [237, 146, 42],
        lineColor: [0, 0, 0],
        wireframe: false,
        colorRange: "default",
        colorScale: "quantile",
        heightScale: "linear",
        fillCondition: null,
        elevationScale: 1,
        lineWidthScale: 1,
        strokeCondition: null,
        pointRadiusScale: 10,
        strokeColorRange: "default",
        strokeColorScale: "quantile",
        strokeWidthScale: "linear",
        fillConditionEnabled: false,
        strokeConditionEnabled: false,
      },
      id: "85e16c6e-f628-11ed-86b3-0242ac120002",
      loading: false,
    },
    {
      tile_url:
        "https://d2toru5i4bimlb.cloudfront.net/ukpn/rab_ancient_woodland_england/{z}/{x}/{y}",
      config: {
        filled: true,
        opacity: 0.3,
        stroked: true,
        visible: true,
        datatype: "CsvCollections",
        extruded: false,
        fillColor: [44, 90, 46],
        lineColor: [0, 0, 0],
        wireframe: false,
        colorRange: "blackWhite",
        colorScale: "quantile",
        customColor: null,
        heightScale: "linear",
        colorBasedOn: null,
        fillCondition: null,
        elevationScale: 1,
        lineWidthScale: 1,
        strokeCondition: null,
        pointRadiusScale: 10,
        strokeColorRange: "default",
        strokeColorScale: "quantile",
        strokeWidthScale: "linear",
        fillConditionEnabled: false,
        strokeConditionEnabled: false,
      },
      id: "2964a924-f5b0-11ed-a71b-0242ac120002",
      loading: false,
    },
    {
      tile_url:
        "https://d2toru5i4bimlb.cloudfront.net/ukpn/rab_conservation_areas/{z}/{x}/{y}",
      config: {
        filled: true,
        opacity: 0.8,
        stroked: true,
        visible: true,
        datatype: "CsvCollections",
        extruded: false,
        fillColor: [237, 146, 42],
        lineColor: [0, 0, 0],
        wireframe: false,
        colorRange: "default",
        colorScale: "quantile",
        heightScale: "linear",
        fillCondition: null,
        elevationScale: 1,
        lineWidthScale: 1,
        strokeCondition: null,
        pointRadiusScale: 10,
        strokeColorRange: "default",
        strokeColorScale: "quantile",
        strokeWidthScale: "linear",
        fillConditionEnabled: false,
        strokeConditionEnabled: false,
      },
      id: "bd30cf32-f63e-11ed-b348-0242ac120002",
      loading: false,
    },
    {
      tile_url:
        "https://d2toru5i4bimlb.cloudfront.net/ukpn/rab_floor_zone2/{z}/{x}/{y}",
      config: {
        filled: true,
        opacity: 0.3,
        stroked: false,
        visible: true,
        datatype: "CsvCollections",
        extruded: false,
        fillColor: [82, 151, 218],
        lineColor: [0, 0, 0],
        wireframe: false,
        colorRange: "default",
        colorScale: "quantile",
        heightScale: "linear",
        fillCondition: null,
        elevationScale: 1,
        lineWidthScale: 1,
        strokeCondition: null,
        pointRadiusScale: 10,
        strokeColorRange: "default",
        strokeColorScale: "quantile",
        strokeWidthScale: "linear",
        fillConditionEnabled: false,
        strokeConditionEnabled: false,
      },
      id: "77353d1a-f670-11ed-a2a8-0242ac120002",
      loading: false,
    },
    {
      tile_url:
        "https://d2toru5i4bimlb.cloudfront.net/ukpn/rab_floor_zone3/{z}/{x}/{y}",
      config: {
        filled: true,
        opacity: 0.3,
        stroked: false,
        visible: true,
        datatype: "CsvCollections",
        extruded: false,
        fillColor: [125, 177, 227],
        lineColor: [0, 0, 0],
        wireframe: false,
        colorRange: "default",
        colorScale: "quantile",
        heightScale: "linear",
        fillCondition: null,
        elevationScale: 1,
        lineWidthScale: 0.5,
        strokeCondition: null,
        pointRadiusScale: 10,
        strokeColorRange: "default",
        strokeColorScale: "quantile",
        strokeWidthScale: "linear",
        fillConditionEnabled: false,
        strokeConditionEnabled: false,
      },
      id: "59ed74da-f651-11ed-812c-0242ac120002",
      loading: false,
    },
    {
      tile_url:
        "https://d2toru5i4bimlb.cloudfront.net/ukpn/rab_outstand_natural_beauty/{z}/{x}/{y}",
      config: {
        filled: true,
        opacity: 0.8,
        stroked: true,
        visible: true,
        datatype: "CsvCollections",
        extruded: false,
        fillColor: [237, 146, 42],
        lineColor: [0, 0, 0],
        wireframe: false,
        colorRange: "default",
        colorScale: "quantile",
        heightScale: "linear",
        fillCondition: null,
        elevationScale: 1,
        lineWidthScale: 1,
        strokeCondition: null,
        pointRadiusScale: 10,
        strokeColorRange: "default",
        strokeColorScale: "quantile",
        strokeWidthScale: "linear",
        fillConditionEnabled: false,
        strokeConditionEnabled: false,
      },
      id: "6afdf8ca-0f2f-11ee-a394-0242ac120002",
      loading: false,
    },
    {
      tile_url:
        "https://d2toru5i4bimlb.cloudfront.net/ukpn/rab_parish_boundries/{z}/{x}/{y}",
      config: {
        filled: false,
        opacity: 0.8,
        stroked: true,
        visible: true,
        datatype: "CsvCollections",
        extruded: false,
        fillColor: [237, 146, 42],
        lineColor: [0, 0, 0],
        wireframe: false,
        colorRange: "default",
        colorScale: "quantile",
        heightScale: "linear",
        fillCondition: null,
        elevationScale: 1,
        lineWidthScale: 0.5,
        strokeCondition: null,
        pointRadiusScale: 10,
        strokeColorRange: "default",
        strokeColorScale: "quantile",
        strokeWidthScale: "linear",
        fillConditionEnabled: false,
        strokeConditionEnabled: false,
      },
      id: "3807f8d0-1744-11ef-9903-0242ac120002",
      loading: false,
    },
    {
      tile_url:
        "https://d2toru5i4bimlb.cloudfront.net/ukpn/rab_greenbelt_england/{z}/{x}/{y}",
      config: {
        filled: true,
        opacity: 0.3,
        stroked: true,
        visible: true,
        datatype: "CsvCollections",
        extruded: false,
        fillColor: [237, 146, 42],
        lineColor: [0, 0, 0],
        wireframe: false,
        colorRange: "default",
        colorScale: "quantile",
        heightScale: "linear",
        fillCondition: null,
        elevationScale: 1,
        lineWidthScale: 1,
        strokeCondition: null,
        pointRadiusScale: 10,
        strokeColorRange: "default",
        strokeColorScale: "quantile",
        strokeWidthScale: "linear",
        fillConditionEnabled: false,
        strokeConditionEnabled: false,
      },
      id: "6a169364-d372-11ef-8647-0242ac120002",
      loading: false,
    },
    {
      tile_url:
        "https://d2toru5i4bimlb.cloudfront.net/ukpn/rab_greenbelt_scotland/{z}/{x}/{y}",
      config: {
        filled: true,
        opacity: 0.3,
        stroked: true,
        visible: true,
        datatype: "CsvCollections",
        extruded: false,
        fillColor: [237, 146, 42],
        lineColor: [0, 0, 0],
        wireframe: false,
        colorRange: "default",
        colorScale: "quantile",
        heightScale: "linear",
        fillCondition: null,
        elevationScale: 1,
        lineWidthScale: 1,
        strokeCondition: null,
        pointRadiusScale: 10,
        strokeColorRange: "default",
        strokeColorScale: "quantile",
        strokeWidthScale: "linear",
        fillConditionEnabled: false,
        strokeConditionEnabled: false,
      },
      id: "7fde8408-d382-11ef-81d2-0242ac120002",
      loading: false,
    },
  ];

  const handleFinish = async (values: any) => {
    const datasetId = values?.key;
    const updated_data = data.find((c) => c.id === datasetId);
    setDownloading((prev: any) => ({
      ...prev,
      [datasetId]: { ...updated_data, loading: true },
    }));
    setTimeout(() => {
      if (updated_data === undefined) {
        notification.error({
          placement: "top",
          message: "download failed",
        });
      } else {
        setDataset({
          [datasetId]: {
            id: datasetId,
            url: updated_data?.tile_url,
            config: updated_data?.config,
          },
        });
      }
      setDownloading((prev: any) => ({
        ...prev,
        [datasetId]: { ...updated_data, loading: false },
      }));
    }, 1000);
  };

  return (
    <div style={{ margin: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography.Title level={3}>Categories:</Typography.Title>
        <Button
          type="primary"
          onClick={() => {
            window.sessionStorage.removeItem("currentUser")
            history.push("/")
          }}
        >
          Logout
        </Button>
      </div>
      <DirectoryTree
        defaultExpandAll
        treeData={treeData}
        className="tree-data"
        showLine={{ showLeafIcon: false }}
        showIcon={true}
        switcherIcon={<CaretDownOutlined />}
        titleRender={(info) => {
          const layerExist = layers.filter((c: any) => c.id === info.key);
          return (
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <div>
                <span style={{ color: "black", marginLeft: 5 }}>
                  {info.title}
                </span>
              </div>
              <div>
                {info.isLeaf &&
                  (downloading[info.key]?.loading ? (
                    <Spin size="small" />
                  ) : (
                    <>
                      {isEmpty(layerExist) ? (
                        <DownloadOutlined
                          style={{
                            fontSize: 13,
                            color: "var(--default-grey)",
                            marginTop: 4,
                            marginRight: 5,
                          }}
                          onClick={() => handleFinish(info)}
                        />
                      ) : null}
                    </>
                  ))}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
