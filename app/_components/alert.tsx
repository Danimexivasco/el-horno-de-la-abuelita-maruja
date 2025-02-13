import { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

type AlertProps = {
  triggerElement: React.ReactNode;
  title: string;
  description: string;
  cancelElement: React.ReactNode;
  actionElement: React.ReactNode;
};

export default function Alert({ triggerElement, title, description, cancelElement, actionElement }: AlertProps) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialog.Trigger asChild>
        {triggerElement && triggerElement}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="fixed inset-0 bg-black/20 data-[state=open]:animate-overlayShow z-50"
          onClick={() => setOpen(!open)}
        />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85dvh] w-10/12 lg:w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-cake-100 p-6 shadow-lg focus:outline-none data-[state=open]:animate-contentShow z-50">
          <AlertDialog.Title className="m-0 text-lg text-black font-bold">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-5 mt-4 text-base text-black">
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end gap-6">
            <AlertDialog.Cancel asChild>
              {cancelElement && cancelElement}
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              {actionElement && actionElement}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}