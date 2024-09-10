"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FormEvent } from "../FormEvent";
import { ModalAddEventProps } from "./ModalAddEvent.types";

const ModalAddEvent = ({
  companies,
  open,
  setOpen,
  setNewEvent,
  setOnSaveNewEvent,
}: ModalAddEventProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new event</DialogTitle>
          <FormEvent
            companies={companies}
            setNewEvent={setNewEvent}
            setOnSaveNewEvent={setOnSaveNewEvent}
            setOpen={setOpen}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddEvent;
