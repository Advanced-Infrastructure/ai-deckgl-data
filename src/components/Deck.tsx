//@ts-ignore
import { CloseOutlined } from "@ant-design/icons";
//@ts-ignore
import DeckGl from "@deck.gl/react";
import { Button, Descriptions, Typography } from "antd";
import { useState } from "react";
import { StaticMap, Popup, _MapContext as MapContext } from "react-map-gl";
//@ts-ignore
import { MVTLayer } from "@deck.gl/geo-layers";

export default function Deck({ dataset, layers }: any) {

  const url = "https://d2toru5i4bimlb.cloudfront.net/ukpn/rab_ukpn_la_bdry/{z}/{x}/{y}"

  const baseLayer = new MVTLayer({
    id: "la-boundary",
    data: url,
    filled: false,
    getLineColor: [60, 178, 208],
    getLineWidth: 10,
    lineWidthScale: 5,
    lineWidthMinPixels: 1,
    lineWidthMaxPixels: 10,
    opacity: 1,
    category: "base", // this is a custom property used to identify the layer for stacking
    priority: 0 // this is a custom property used to identify the layer for stacking
  });

  const viewState =  {
    longitude: -0.19184372319431953,
    latitude: 51.25323955649059,
    zoom: 10.5,
    minZoom: 2,
    maxZoom: 24,
    bearing: 0,
    pitch: 0,
    transitionDuration: 1000,
  }
  
  const [objectInfo, setObjectInfo] = useState<any>(undefined);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <DeckGl
        layers={[baseLayer, layers]}
        initialViewState={viewState}
        controller={true}
        onClick={({ object, coordinate }: any) => {
          if (object) setObjectInfo({ object, coordinate });
          else setObjectInfo(undefined);
        }}
        getCursor={({ isDragging, isHovering }: any) =>
          isDragging ? "grabbing" : isHovering ? "pointer" : "grab"
        }
        ContextProvider={MapContext.Provider}
      >
        <StaticMap
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken="pk.eyJ1Ijoic2FtYWl0bCIsImEiOiJja3E3eWlndGgwMjhvMnVtc2huenR6Z3N0In0.Vdj6e5sGXIBGfOxchYk20w"
        />
        {objectInfo && (
          <Popup
            anchor="top"
            latitude={objectInfo?.coordinate[1]}
            longitude={objectInfo?.coordinate[0]}
            onClose={() => setObjectInfo(undefined)}
            captureScroll={true}
            captureClick={true}
            closeButton={false}
          >
            <Descriptions
             title={
              <Typography.Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  marginRight: 10,
                  textTransform: "capitalize"
                }}
              >
                {Object.values(dataset).map((c: any) => c.name)}
              </Typography.Text>
            }
              column={1}
              layout="horizontal"
              bordered
              style={{ height: 200, overflowY: "scroll" }}
              labelStyle={{
                maxWidth: 120,
                padding: 4,
                height: 24,
                overflow: "scroll",
              }}
              contentStyle={{
                maxWidth: 120,
                padding: 4,
                height: 24,
                overflow: "scroll",
              }}
              extra={
                <Button
                  icon={<CloseOutlined />}
                  size="small"
                  onClick={() => setObjectInfo(undefined)}
                />
              }
            >
              {Object.keys(objectInfo?.object?.properties).map((item, i) => (
                <Descriptions.Item
                  label={
                    <Typography
                      style={{
                        fontSize: 14,
                      }}
                    >
                      {item}
                    </Typography>
                  }
                  key={i}
                >
                  {objectInfo?.object?.properties[item].toString()}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Popup>
        )}
      </DeckGl>
    </div>
  );
}
