"use client";

import { Check, Car, DollarSign, Users, MapPin, ImagePlus, FileText } from "lucide-react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Switch,
  TextArea,
  TextField,
  Select,
  ListBox
} from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function AddCarListingForm() {

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    try {

      const sessionRes = await authClient.getSession();
      const userData = sessionRes?.data || sessionRes;
      const id = userData?.user?.id;


      if (!id) {
        toast.error("User session not found! Please re-login.");
        return;
      }


      const isAssetAvailable = formData.get("isAvailable") === "true" || formData.get("isAvailable") === "on";

      const { data: jwtData } = await authClient.token();


      const token = jwtData?.token;

      const data = {
        carModel: rawData.carModel,
        dailyPrice: Number(rawData.dailyPrice),
        carType: rawData.carType,
        seatCapacity: Number(rawData.seatCapacity),
        imageUrl: rawData.imageUrl,
        userId: id,
        pickupLocation: rawData.pickupLocation,
        description: rawData.description,
        isAvailable: isAssetAvailable,
        bookingCount: 0,
        createdAt: new Date().toISOString()
      };


      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_MAIN_URL}/car`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}` || ""
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const newCar = await res.json();
        toast.success("Car listed successfully!");
        e.target.reset();
        if (newCar.acknowledged) {
          redirect("/explore-cars")
        }
        return newCar;
      } else {
        toast.error("Failed to add car listing.");
      }
    } catch (error) {
      console.error("Submission Error: ", error);
      toast.error("Server connection error.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 sm:px-6">
      <div className="mb-8 space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
          Add New Car Listing
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Provide complete operational validation logs using advanced HeroUI structural fields.
        </p>
      </div>

      <Form
        className="flex flex-col gap-6 bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-200/50"
        onSubmit={onSubmit}
        validationBehavior="native"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">


          <TextField isRequired name="carModel" type="text" className="flex flex-col gap-1.5">
            <Label className="text-sm font-bold text-gray-700">Car Model</Label>
            <div className="relative flex items-center">
              <Car size={18} className="absolute left-4 text-gray-400 pointer-events-none" />
              <Input
                placeholder="e.g., Tesla Model S"
                className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-transparent transition-all outline-none text-sm font-medium"
              />
            </div>
            <FieldError className="text-xs font-semibold text-red-500 mt-0.5" />
          </TextField>


          <TextField
            isRequired
            name="dailyPrice"
            type="number"
            className="flex flex-col gap-1.5"
            validate={(value) => Number(value) <= 0 ? "Daily price must be greater than 0" : null}
          >
            <Label className="text-sm font-bold text-gray-700">Daily Rent Price ($)</Label>
            <div className="relative flex items-center">
              <DollarSign size={18} className="absolute left-4 text-gray-400 pointer-events-none" />
              <Input
                placeholder="e.g., 99"
                className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-transparent transition-all outline-none text-sm font-medium"
              />
            </div>
            <FieldError className="text-xs font-semibold text-red-500 mt-0.5" />
          </TextField>


          <Select name="carType" isRequired placeholder="Select Type" className="w-full">
            <Label className="text-sm font-bold text-gray-700 mb-1 block">Car Classification Type</Label>
            <Select.Trigger className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 flex items-center justify-between bg-transparent transition-all outline-none text-sm font-medium focus-within:border-blue-500 hover:border-gray-300">
              <Select.Value className="text-gray-700 text-sm font-medium" />
              <Select.Indicator className="text-gray-400" />
            </Select.Trigger>
            <Select.Popover className="bg-white border border-gray-100 rounded-2xl shadow-xl p-1 mt-1 z-50">
              <ListBox className="flex flex-col gap-0.5">
                <ListBox.Item id="SUV" textValue="SUV" className="px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-gray-100 cursor-pointer flex justify-between items-center font-medium">
                  SUV
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="Sedan" textValue="Sedan" className="px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-gray-100 cursor-pointer flex justify-between items-center font-medium">
                  Sedan
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="Hatchback" textValue="Hatchback" className="px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-gray-100 cursor-pointer flex justify-between items-center font-medium">
                  Hatchback
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="Luxury" textValue="Luxury" className="px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-gray-100 cursor-pointer flex justify-between items-center font-medium">
                  Luxury
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="Electric" textValue="Electric" className="px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-gray-100 cursor-pointer flex justify-between items-center font-medium">
                  Electric
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>


          <TextField
            isRequired
            name="seatCapacity"
            type="number"
            className="flex flex-col gap-1.5"
            validate={(value) => Number(value) < 2 || Number(value) > 99 ? "Seats must be between 2 and 10" : null}
          >
            <Label className="text-sm font-bold text-gray-700">Seat Capacity</Label>
            <div className="relative flex items-center">
              <Users size={18} className="absolute left-4 text-gray-400 pointer-events-none" />
              <Input
                placeholder="e.g., 5"
                className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-transparent transition-all outline-none text-sm font-medium"
              />
            </div>
            <FieldError className="text-xs font-semibold text-red-500 mt-0.5" />
          </TextField>


          <TextField isRequired name="imageUrl" type="url" className="flex flex-col gap-1.5 md:col-span-2">
            <Label className="text-sm font-bold text-gray-700">Image URL</Label>
            <div className="relative flex items-center">
              <ImagePlus size={18} className="absolute left-4 text-gray-400 pointer-events-none" />
              <Input
                placeholder="Paste ImgBB / PostImage direct target link"
                className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-transparent transition-all outline-none text-sm font-medium"
              />
            </div>
            <FieldError className="text-xs font-semibold text-red-500 mt-0.5" />
          </TextField>


          <TextField isRequired name="pickupLocation" type="text" className="flex flex-col gap-1.5 md:col-span-2">
            <Label className="text-sm font-bold text-gray-700">Pickup Location Address</Label>
            <div className="relative flex items-center">
              <MapPin size={18} className="absolute left-4 text-gray-400 pointer-events-none" />
              <Input
                placeholder="e.g., Dhanmondi, Dhaka"
                className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-transparent transition-all outline-none text-sm font-medium"
              />
            </div>
            <FieldError className="text-xs font-semibold text-red-500 mt-0.5" />
          </TextField>


          <TextField isRequired name="description" className="flex flex-col gap-1.5 md:col-span-2">
            <Label className="text-sm font-bold text-gray-700">Detailed Description</Label>
            <div className="relative flex">
              <FileText size={18} className="absolute left-4 top-3.5 text-gray-400 pointer-events-none" />
              <TextArea
                placeholder="Describe features, engine condition, fuel system parameter rules..."
                rows={4}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 bg-transparent transition-all outline-none text-sm font-medium resize-none"
              />
            </div>
            <FieldError className="text-xs font-semibold text-red-500 mt-0.5" />
          </TextField>


          <div className="md:col-span-2 flex items-center justify-between bg-gray-50 border border-gray-100 p-4 rounded-2xl mt-2">
            <div className="space-y-0.5">
              <span className="text-sm font-bold text-gray-800 block">Immediate Availability Status</span>
              <Description className="text-xs text-gray-400 font-normal">
                Toggle if this fleet asset is ready for instantaneous hire booking.
              </Description>
            </div>
            <Switch
              defaultSelected
              name="isAvailable"
              value="true"
              color="success"
              size="lg"
            />
          </div>

        </div>

        <div className="pt-4 flex gap-3 justify-end w-full border-t border-gray-50">
          <Button
            type="reset"
            variant="flat"
            className="font-bold rounded-xl px-6 h-12 text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
          >
            Reset
          </Button>
          <Button
            type="submit"
            color="primary"
            className="bg-blue-600 hover:bg-blue-700 font-bold text-white shadow-lg shadow-blue-600/20 px-8 h-12 rounded-xl text-sm tracking-wide transition flex items-center gap-1.5"
          >
            <Check size={16} strokeWidth={2.5} />
            <span>Submit Listing</span>
          </Button>
        </div>

      </Form>
    </div>
  );
}