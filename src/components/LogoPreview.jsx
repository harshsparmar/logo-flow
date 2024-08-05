import React, { useState, useEffect, useContext } from "react";
import { UpdateStorageContext } from "@/context/UpdateStorageContext";
import { icons } from "lucide-react";
import html2canvas from "html2canvas";

function LogoPreview({ downloadIcon }) {
  const [storageValue, setStorageValue] = useState();
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("value"));
    setStorageValue(storageData);
  }, [updateStorage]);

  useEffect(() => {
    if (downloadIcon) {
      downloadPngLogo();
    }
  }, [downloadIcon]);

  const downloadPngLogo = () => {
    const downloadLogoDiv = document.getElementById("downloadLogoDiv");
    html2canvas(downloadLogoDiv, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      const pngImage = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngImage;
      downloadLink.download = "logoflow.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  };

  const Icon = ({ name, color, size, rotate }) => {
    const LucidIcon = icons[name];
    if (!LucidIcon) return null;
    return (
      <LucidIcon
        color={color}
        size={size}
        style={{ transform: `rotate(${rotate}deg)` }}
      />
    );
  };
  // console.log(storageValue);

  return (
    <div className="flex items-center justify-center h-screen ">
      <div
        className="h-[500px] w-[500px] bg-gray-200 outline-dotted outline-gray-300"
        style={{ padding: storageValue?.bgPadding }}
      >
        <div
          id="downloadLogoDiv"
          className="h-full w-full justify-center items-center flex"
          style={{
            borderRadius: storageValue?.bgRounded,
            background: storageValue?.bgColor,
          }}
        >
          {storageValue?.icon?.includes(":") ? (
            <img
              src={`https://api.iconify.design/${storageValue?.icon}.svg`}
              alt={storageValue?.icon}
              style={{
                width: storageValue?.iconSize,
                height: storageValue?.iconSize,
                transform: `rotate(${storageValue?.iconRotate}deg)`,
                display: "block",
              }}
            />
          ) : (
            <Icon
              name={storageValue?.icon}
              color={storageValue?.iconColor}
              size={storageValue?.iconSize}
              rotate={storageValue?.iconRotate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LogoPreview;
