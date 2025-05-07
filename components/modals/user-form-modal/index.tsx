"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon, XIcon } from "lucide-react";
import UserForm from "./user-form";

import { cn } from "@/lib/utils";

type Props = {
  data?: any;
  className?: string;
  buttonText?: string;
};
const UserFormModal = ({ data, className, buttonText }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open}>
      <DialogTrigger
        asChild
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpen(true);
        }}
        className={cn("cursor-pointer items-center", className)}
      >
        {data?._id ? (
          <PencilIcon />
        ) : (
          <Button
            className="bodyText-regular max-[600px]:text-xs max-[600px]:p-2"
            variant="fill"
          >
            {buttonText ?? "Add an account"}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        showClose={false}
        className="py-4 px-0 max-h-[90dvh] h-[90dvh] overflow-hidden"
      >
        <DialogTitle className="sr-only">create User modal</DialogTitle>
        <div className="flex flex-col gap-y-2 h-full overflow-hidden bg-system-background">
          <header className="flex flex-col gap-y-4 py-6 bg-white px-8">
            <h1 className="bodyText-Bold text-black">Add an account holder</h1>
            <p className="bodyText-regular text-system-grey-3">
              Fill the details below in order to add an account holder.
            </p>
          </header>
          <UserForm setOpen={setOpen} data={data} id={data?.id} />
        </div>
        <DialogClose
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
          className="cursor-pointer ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        >
          <XIcon stroke="1.5" className="stroke-system-grey-9" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormModal;
