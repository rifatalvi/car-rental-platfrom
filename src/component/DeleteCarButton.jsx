"use client";

import React, { useState } from "react";
import { 
  AlertDialog, 
  Button,
 
} from "@heroui/react";
import { Trash2, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteCarButton({ carId, carModel }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (onClose) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_MAIN_URL}/my-added-cars/${carId}`, {
        method: "DELETE"
      });

      if (res.ok) {
        toast.success("Asset listing purged completely.");
        router.refresh();
        if (onClose) onClose(); 
      } else {
        toast.error("Failed to delete the car registry.");
      }
    } catch (error) {
      toast.error("Network interface error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
  
      <Button 
        variant="danger" 
        color="danger" 
        size="sm"
        className="font-bold text-xs rounded-xl h-9 px-4 border border-danger-100"
        startContent={<Trash2 size={14} />}
      >
        Delete
      </Button>

      <AlertDialog.Backdrop className="backdrop-blur-sm bg-black/20">
        <AlertDialog.Container>
        
          {({ close }) => (
            <AlertDialog.Dialog className="w-full max-w-[440px] bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 mx-auto my-auto animate-in fade-in zoom-in-95 duration-200">
              <AlertDialog.CloseTrigger className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 rounded-lg p-1 transition-colors" />
              
              <AlertDialog.Header className="flex gap-4 items-start p-0">
                <div className="p-3 bg-red-50 rounded-2xl border border-red-100 text-red-500 shrink-0">
                  <AlertTriangle size={22} className="stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <AlertDialog.Heading className="text-lg font-black text-gray-900 tracking-tight">
                    Remove Fleet Registry?
                  </AlertDialog.Heading>
                  <p className="text-xs text-gray-400 font-medium">Asset ID: {carModel}</p>
                </div>
              </AlertDialog.Header>

              <AlertDialog.Body className="p-0 mt-4">
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  Are you absolutely sure you want to permanently purge <strong className="text-gray-800 font-bold">{carModel}</strong> from the operational database? This pipeline action cannot be undone.
                </p>
              </AlertDialog.Body>

              <AlertDialog.Footer className="p-0 mt-6 pt-4 border-t border-gray-50 flex justify-end gap-2.5 w-full">
                <Button 
                  slot="close" 
                  variant="flat" 
                  color="default"
                  className="font-bold rounded-xl text-xs px-4 text-gray-600 bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleDelete(close)} 
                  color="danger"
                  isLoading={loading}
                  className="bg-red-600 text-white font-bold rounded-xl text-xs px-5 shadow-lg shadow-red-600/20"
                >
                  Delete Asset
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          )}
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}