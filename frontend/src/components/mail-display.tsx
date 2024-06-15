import { addDays } from "date-fns/addDays";
import { addHours } from "date-fns/addHours";
import { format } from "date-fns/format";
import { nextSaturday } from "date-fns/nextSaturday";
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
  SquareX,
  X,
  Share2,
} from "lucide-react";

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mail } from "@/app/data";
import { useEffect, useState } from "react";
import { animateToZeroOnce } from "./mail";
import { Badge } from "@/components/ui/badge";
interface MailDisplayProps {
  mail: Mail | null;
}

export function MailDisplay({ mail }: MailDisplayProps) {
  const today = new Date();
  const [width, setWidth] = useState<number>(0);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }
  }, []);

  const isMobile = width <= 700;
  let show = isMobile ? false : true;

  return show ? (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={animateToZeroOnce}
                variant="secondary"
                // size="icon"
                disabled={!mail}
              >
                <X className="size-5" />
                <span style={{ marginLeft: "3px" }} className="">
                  Close
                </span>
                {/* <p>Close</p> */}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Dont want to see this anymore</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                // onClick={animateToZeroOnce}
                variant="default"
                // size="icon"
                disabled={!mail}
              >
                <Share2 className="size-4" />
                <span style={{ marginLeft: "5px" }} className="">
                  Share
                </span>
                {/* <p>Close</p> */}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Someone else should see this!</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <Separator />
      {mail ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-2 text-sm">
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "0.46rem",
                }}
                className="aspect-square"
                src="https://avatars.githubusercontent.com/u/64040187?v=4"
              ></img>
              <div className="grid gap-1">
                <div style={{ marginLeft: "6px" }} className="font-semibold">
                  {mail.name}
                </div>
                <Badge style={{ borderRadius: "0.50rem" }} variant="secondary">
                  Developer
                </Badge>
              </div>
            </div>
            <div style={{ marginLeft: "60px" }}>
              {mail.date && (
                <div className="ml-auto text-xs text-muted-foreground">
                  {format(new Date(mail.date), "PPpp")}
                </div>
              )}
            </div>
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {mail.text}
          </div>
          <Separator className="mt-auto" />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Reply ${mail.name}...`}
                />
                <div className="flex items-center">
                  <Label
                    htmlFor="mute"
                    className="flex items-center gap-2 text-xs font-normal"
                  >
                    <Switch id="mute" aria-label="Mute thread" /> Mute this
                    thread
                  </Label>
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    className="ml-auto"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  ) : (
    <div className="p-8 text-center text-muted-foreground">
      Please open framely on a larger screen
    </div>
  );
}
