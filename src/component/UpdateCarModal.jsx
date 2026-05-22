"use client";

import React, { useState, useMemo } from "react";
import { Button, Dropdown, Header, Input, Label, Modal, Surface } from "@heroui/react";
import toast from "react-hot-toast";
import { FiEdit3, FiDollarSign, FiType, FiMapPin, FiImage, FiChevronDown } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function UpdateCarModal({ car }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
 
  const initialStatus =
    car?.isAvailable === false ||
    String(car?.isAvailable).toLowerCase() === "false" ||
    car?.availabilityStatus === "Unavailable"
      ? "unavailable"
      : "available";

  const [selected, setSelected] = useState(new Set([initialStatus]));
  const { _id } = car || {};

  const selectedValue = useMemo(() => {
    const value = Array.from(selected)[0];
    return value === "available" ? "Available" : "Unavailable";
  }, [selected]);

  const handleUpdateCar = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
      
           
    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());

    updatedData.isAvailable = Array.from(selected)[0] === "available";
    updatedData.availabilityStatus = updatedData.isAvailable ? "Available" : "Unavailable";

    let isSuccess = false;

    try {
       const { data: jwtData } = await authClient.token();
            
            const token = jwtData?.token;
            console.log(token);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_MAIN_URL}/updated-cars/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
            authorization: `Bearer ${token}` || ""
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (data?.modifiedCount || data?.acknowledged) {
        toast.success("Vehicle updated successfully!");
        setIsOpen(false);
        isSuccess = true;
      } else {
        toast.error("No changes were made.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsUpdating(false);
    }

    if (isSuccess) {
      router.refresh();
    }
  };

  return (
    <>
      <Button
        onPress={() => setIsOpen(true)}
        variant="flat"
        color="warning"
        className="font-bold text-xs rounded-xl h-10 px-5 border-1 border-warning/30"
        startContent={<FiEdit3 size={14} />}
      >
        Update
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-xl bg-white rounded-3xl p-2 shadow-2xl border border-gray-100/80">
              <Modal.CloseTrigger />

              <Modal.Header className="flex flex-col gap-1 p-6 pb-2">
                <div className="flex items-center gap-2">
                  <Modal.Icon className="bg-amber-50 text-amber-600 rounded-lg p-2">
                    <FiEdit3 className="size-5" />
                  </Modal.Icon>
                  <Modal.Heading className="text-xl font-black text-gray-900 tracking-tight">
                    Update Vehicle Listing
                  </Modal.Heading>
                </div>
                <p className="mt-1.5 text-xs text-gray-400 font-medium leading-relaxed">
                  Modify your car features, pricing, and availability details below. Changes reflect
                  instantly on the marketplace network.
                </p>
              </Modal.Header>

              <form onSubmit={handleUpdateCar}>
                <Modal.Body className="px-6 py-2 space-y-4">
                  <Surface variant="default" className="border-none p-0 bg-transparent shadow-none">
                    <div className="flex flex-col gap-4">
                      {/* Price + Vehicle Type row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="w-full flex flex-col gap-1.5">
                          <Label className="text-xs font-bold text-gray-700">Price (Per Day)</Label>
                          <div className="relative flex items-center">
                            <FiDollarSign
                              size={16}
                              className="absolute left-3 text-gray-400 pointer-events-none z-10"
                            />
                            <Input
                              name="dailyPrice"
                              defaultValue={car.dailyPrice || car.dailyRentPrice || ""}
                              placeholder="e.g., 2500"
                              className="pl-9 w-full h-11 rounded-xl"
                            />
                          </div>
                        </div>

                        <div className="w-full flex flex-col gap-1.5">
                          <Label className="text-xs font-bold text-gray-700">Vehicle Type</Label>
                          <div className="relative flex items-center">
                            <FiType
                              size={16}
                              className="absolute left-3 text-gray-400 pointer-events-none z-10"
                            />
                            <Input
                              name="carType"
                              defaultValue={car.carType || ""}
                              placeholder="e.g., Sedan, SUV, Micro"
                              className="pl-9 w-full h-11 rounded-xl"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Location + Availability row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="w-full flex flex-col gap-1.5">
                          <Label className="text-xs font-bold text-gray-700">Location</Label>
                          <div className="relative flex items-center">
                            <FiMapPin
                              size={16}
                              className="absolute left-3 text-gray-400 pointer-events-none z-10"
                            />
                            <Input
                              name="pickupLocation"
                              defaultValue={car.pickupLocation || ""}
                              placeholder="e.g., Dhaka, Bangladesh"
                              className="pl-9 w-full h-11 rounded-xl"
                            />
                          </div>
                        </div>

                        <div className="w-full flex flex-col gap-1.5">
                          <Label className="text-xs font-bold text-gray-700">
                            Availability Status
                          </Label>
                          <Dropdown>
                            <Button
                              aria-label="Select Status"
                              variant="secondary"
                              className="w-full h-11 rounded-xl border border-gray-200/80 bg-gray-50/50 text-left justify-between px-4 text-sm font-medium text-gray-700 hover:bg-gray-100/70 transition-all"
                              endContent={<FiChevronDown className="text-gray-400" size={16} />}
                            >
                              {selectedValue}
                            </Button>
                            <Dropdown.Popover className="min-w-[240px] rounded-2xl shadow-xl border border-gray-100">
                              <Dropdown.Menu
                                aria-label="Availability Status Actions"
                                selectedKeys={selected}
                                selectionMode="single"
                                onSelectionChange={setSelected}
                                className="p-1"
                              >
                                <Dropdown.Section>
                                  <Header className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                    Select Status
                                  </Header>
                                  <Dropdown.Item
                                    id="available"
                                    textValue="Available"
                                    className="rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 font-medium"
                                  >
                                    <Label>Available</Label>
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    id="unavailable"
                                    textValue="Unavailable"
                                    className="rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 font-medium"
                                  >
                                    <Label>Unavailable</Label>
                                  </Dropdown.Item>
                                </Dropdown.Section>
                              </Dropdown.Menu>
                            </Dropdown.Popover>
                          </Dropdown>
                        </div>
                      </div>

                      {/* Image URL */}
                      <div className="w-full flex flex-col gap-1.5">
                        <Label className="text-xs font-bold text-gray-700">Car Image URL</Label>
                        <div className="relative flex items-center">
                          <FiImage
                            size={16}
                            className="absolute left-3 text-gray-400 pointer-events-none z-10"
                          />
                          <Input
                            name="imageUrl"
                            defaultValue={car.imageUrl || ""}
                            placeholder="https://example.com/image.jpg"
                            className="pl-9 w-full h-11 rounded-xl"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="w-full flex flex-col gap-1.5">
                        <Label className="text-xs font-bold text-gray-700">Description</Label>
                        <div className="relative flex w-full">
                          <BiMessageSquareDetail
                            size={16}
                            className="absolute left-3 top-3.5 text-gray-400 pointer-events-none z-10"
                          />
                          <textarea
                            name="description"
                            required
                            defaultValue={car.description || ""}
                            placeholder="Provide structural and operational notes of the car..."
                            rows={4}
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none text-sm font-medium resize-none focus:border-amber-500 min-h-[100px]"
                          />
                        </div>
                      </div>
                    </div>
                  </Surface>
                </Modal.Body>

                <Modal.Footer className="p-6 pt-4 border-t border-gray-50 flex justify-end gap-2 w-full">
                  <Button
                    variant="flat"
                    color="danger"
                    className="font-bold rounded-xl text-xs px-4 h-10"
                    onPress={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="warning"
                    disabled={isUpdating}
                    className="bg-amber-500 text-white font-bold rounded-xl text-xs px-5 h-10 shadow-md shadow-amber-500/10 hover:bg-amber-600 transition-colors"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </Button>
                </Modal.Footer>
              </form>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}