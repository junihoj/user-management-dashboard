import NotificationBellIcon from "@public/assets/icons/notification-bell.svg";
import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";

const NotificationPoverItem = () => {
  return (
    <div className="flex p-3 gap-x-2">
      <Menu />
      <div>
        <p className="text-sm text-primary-black">
          A client just cancelled a booking
        </p>
        <p className="text-system-secondary text-xs">12 hours ago</p>
      </div>
    </div>
  );
};

const NotificationPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <NotificationBellIcon />
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        {/* heading */}
        <div className="px-3 py-4 flex justify-between border-b border-black/10 items-center">
          <p className="text-black/100 font-semibold text-sm">Notifications</p>
          <Link
            href="/notification"
            className="text-golden-solid font-semibold text-sm cursor-pointer"
          >
            View all
          </Link>
        </div>
        <div>
          {Array(5)
            .fill(0)
            .map((item, idx) => (
              <NotificationPoverItem key={idx} />
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
