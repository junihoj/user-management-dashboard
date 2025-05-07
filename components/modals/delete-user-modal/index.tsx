import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import WarningIcon from "@public/icons/warning.svg";
import { Button } from "@/components/ui/button";
import { CircleAlert, Trash2 } from "lucide-react";
import { apiService } from "@/lib/api-service";
import { useQueryClient } from "@tanstack/react-query";
import { Alert } from "@/lib/helpers/alert";

type Props = {
  id: string;
  name: string;
};
const DeleteUserModal = ({ id, name }: Props) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      await apiService({
        url: `/accounts/${id}`,
        method: "delete",
      });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      Alert.success(`Account ${name} deleted successfully.`);

      setOpen(false);
    } catch (err) {
      Alert.error(
        `An error occurred while trying to delete account ${name}. Please try again!`
      );
    }
  };
  return (
    <Dialog open={open}>
      {/* <Button
        variant="destructive"
        className="cursor-pointer w-fit max-[600px]:p-1 max-[600px]:text-xs"
        onClick={() => setOpen(true)}
      >
        delete
      </Button> */}
      <Trash2 className="cursor-pointer" onClick={() => setOpen(true)} />
      <DialogContent className="flex flex-col gap-y-8 p-6" showClose={false}>
        <DialogTitle className="sr-only">Delete account Modal</DialogTitle>

        <div className="flex flex-col gap-y-4 items-center">
          <CircleAlert className="w-8 h-8 stroke-error" />
          <div className="flex flex-col gap-y-1 items-center">
            <h2 className="text-center font-bold text-[1.125rem] text-[#181D27]">
              Delete
            </h2>
            <p className="text-center text-[#535862] font-medium text-sm tracking-normal">
              Are you sure you want to delete this account <b>{name}</b>? <br />
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex justify-between w-full gap-x-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setOpen(false)}
          >
            No
          </Button>
          <Button
            className="font-normal bg-error border-none rounded-lg flex-1 hover:bg-error/90"
            onClick={handleDeleteAccount}
          >
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
