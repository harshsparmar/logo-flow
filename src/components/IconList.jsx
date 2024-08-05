  import React, { useState, useEffect } from "react";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Smile } from "lucide-react";
  import { iconList } from "@/constants/icon";
  import { icons } from "lucide-react";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

  function IconList({ selectedIcon }) {
    const [openDialog, setOpenDialog] = useState(false);
    const storageValue = JSON.parse(localStorage.getItem("value"));
    const [icon, setIcon] = useState(storageValue ? storageValue?.icon : "Smile");
    const [colorIcons, setColorIcons] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredColorIcons, setFilteredColorIcons] = useState([]);

    const Icon = ({ name, color, size }) => {
      const LucidIcon = icons[name];
      if (!LucidIcon) return null;
      return <LucidIcon color={color} size={size} />;
    };

    useEffect(() => {
      fetch("https://api.iconify.design/search?query=color&limit=50")
        .then((response) => response.json())
        .then((data) => {
          setColorIcons(data.icons);
          setFilteredColorIcons(data.icons);
        })
        .catch((error) => console.error("Error fetching color icons:", error));
    }, []);

    useEffect(() => {
      if (searchQuery) {
        fetch(`https://api.iconify.design/search?query=${searchQuery}&limit=50`)
          .then((response) => response.json())
          .then((data) => setFilteredColorIcons(data.icons))
          .catch((error) => console.error("Error searching color icons:", error));
      } else {
        setFilteredColorIcons(colorIcons);
      }
    }, [searchQuery, colorIcons]);

    return (
      <div>
        <div>
          <label>Icon</label>
          <div
            className="p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] flex items-center justify-center my-2"
            onClick={() => setOpenDialog(true)}
          >
            {icon?.includes(":") ? (
              <img src={`https://api.iconify.design/${icon}.svg`} />
            ) : (
              <Icon name={icon} color={"#000"} size={20} />
            )}
          </div>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pick Your Favorite Icon</DialogTitle>
              <DialogDescription>
                <Tabs defaultValue="icon" className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="icon">Icons</TabsTrigger>
                    <TabsTrigger value="color-icon">Search Icons</TabsTrigger>
                  </TabsList>
                  <TabsContent value="icon">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6">
                      {iconList.map((icon, index) => (
                        <div
                          key={index}
                          className="p-3 border flex rounded-sm items-center justify-center cursor-pointer"
                          onClick={() => {
                            selectedIcon(icon);
                            setOpenDialog(false);
                            setIcon(icon);
                          }}
                        >
                          <Icon name={icon} color={"#000"} size={20} />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="color-icon">
                    <div className="p-4">
                      <input
                        type="text"
                        placeholder="Search icons..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 border rounded-md mb-4"
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6">
                      {filteredColorIcons.map((icon, index) => (
                        <div
                          key={index}
                          className="p-3 border flex rounded-sm items-center justify-center cursor-pointer"
                          onClick={() => {
                            selectedIcon(icon);
                            setOpenDialog(false);
                            setIcon(icon);
                          }}
                        >
                          <img
                            src={`https://api.iconify.design/${icon}.svg`}
                            alt={icon}
                            width={20}
                            height={20}
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  export default IconList;
