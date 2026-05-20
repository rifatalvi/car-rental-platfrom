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

export default function AddCarListingForm() {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    alert(`Car Data Payload Matrix: \n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 sm:px-6">
      {/* Header Grid Section */}
      <div className="mb-8 space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
          Add New Car Listing
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Provide complete operational validation logs using advanced HeroUI structural fields.
        </p>
      </div>

      {/* Main Core Form Card Wrapper */}
      <Form 
        className="flex flex-col gap-6 bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-200/50"
        onSubmit={onSubmit}
        validationBehavior="native"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          
          {/* 1. Car Name Input Box */}
          <TextField isRequired name="carName" type="text" className="flex flex-col gap-1.5">
            <Label className="text-sm font-bold text-gray-700">Car Name</Label>
            <div className="relative flex items-center">
              <Car size={18} className="absolute left-4 text-gray-400 pointer-events-none" />
              <Input 
                placeholder="e.g., Tesla Model S" 
                className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-transparent transition-all outline-none text-sm font-medium"
              />
            </div>
            <FieldError className="text-xs font-semibold text-red-500 mt-0.5" />
          </TextField>

          {/* 2. Daily Rent Price Input */}
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

          {/* 3. Car Type Dropdown */}
          <div className="flex flex-col gap-1.5">
            <Select isRequired name="carType" placeholder="Select Type" className="w-full">
              <Label className="text-sm font-bold text-gray-700 mb-1 block">Car Classification Type</Label>
              <Select.Trigger className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 flex items-center justify-between bg-transparent transition-all outline-none text-sm font-medium focus-within:border-blue-500">
                <Select.Value className="text-gray-700" />
                <Select.Indicator className="text-gray-400" />
              </Select.Trigger>
              <Select.Popover className="bg-white border border-gray-100 rounded-2xl shadow-xl p-1 mt-1 z-50">
                <ListBox className="flex flex-col gap-0.5">
                  <ListBox.Item id="suv" textValue="SUV" className="px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-gray-100 cursor-pointer flex justify-between items-center font-medium">
                    SUV
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="sedan" textValue="Sedan" className="px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-gray-100 cursor-pointer flex justify-between items-center font-medium">
                    Sedan
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="hatchback" textValue="Hatchback" className="px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-gray-100 cursor-pointer flex justify-between items-center font-medium">
                    Hatchback
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="luxury" textValue="Luxury" className="px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-gray-100 cursor-pointer flex justify-between items-center font-medium">
                    Luxury
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="electric" textValue="Electric" className="px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-gray-100 cursor-pointer flex justify-between items-center font-medium">
                    Electric
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* 4. Seat Capacity Field */}
          <TextField 
            isRequired 
            name="seatCapacity" 
            type="number" 
            className="flex flex-col gap-1.5"
            validate={(value) => Number(value) < 2 || Number(value) > 10 ? "Seats must be between 2 and 10" : null}
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

          {/* 5. Image URL Input Box */}
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

          {/* 6. Pickup Location Field */}
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

          {/* 7. Detailed Description Textarea Field (FIXED SETUP) */}
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

          {/* 8. Availability Switch Configuration Layout */}
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

        {/* Dynamic Buttons Handler Container Layer */}
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