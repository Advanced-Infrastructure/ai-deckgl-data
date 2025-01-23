import { useMemo, useState } from "react";
import Control from "./Control";
import Deck from "./Deck";
import { TileLayer } from "../layerConfigs/TileLayer";

function Map() {
  const [dataset, setDataset] = useState<any>({});

  const layers = useMemo(() => {
    const res: any = Object.keys(dataset).map((id: string) =>
      TileLayer(id, dataset[id].value, dataset[id].url, dataset[id].config)
    );
    return res;
  }, [dataset]);
  return (
    <div className="App">
      <div>
        <Control dataset={dataset} setDataset={setDataset} layers={layers} />
      </div>
      <div>
        <Deck dataset={dataset} layers={layers} />
      </div>
    </div>
  );
}

export default Map;
