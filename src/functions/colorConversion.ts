//@ts-ignore
export function RGBToHex(rgb: any) {
    let [red, green, blue, alpha] = rgb;
    red = red.toString(16);
    green = green.toString(16);
    blue = blue.toString(16);
    alpha = alpha ? Math.round(alpha * 255).toString(16) : null;
    if (red.length === 1) red = "0" + red;
    if (green.length === 1) green = "0" + green;
    if (blue.length === 1) blue = "0" + blue;
    
    return `#${red + green + blue}${alpha ?? ""}`;
  }
  
  export function HextoRGB(hex: string) {
    const hexString = hex.slice(1);
    const rgbString: any = hexString.match(/.{1,2}/g);
    const rgbArray = [
      parseInt(rgbString[0], 16),
      parseInt(rgbString[1], 16),
      parseInt(rgbString[2], 16),
    ];
    if (rgbString[3]) {
      const alpha = parseFloat((parseInt(rgbString[3], 16) / 255).toFixed(2));
      rgbArray.push(alpha);
    }
    return rgbArray;
  }
  
  export const fieldTypeColor = (value: string): string => {
    if (value === "integer") return "cyan";
    else if (value === "real") return "green";
    else if (value === "string") return "lime";
    else if (value === "timestamp") return "yellow";
    else if (value === "geojson") return "purple";
    else return "volcano";
  };