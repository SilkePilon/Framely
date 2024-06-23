import { ComponentProps } from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Mail } from "@/app/data";
import { useMail } from "@/app/use-mail";
import Masonry from "react-responsive-masonry";
import ReactPlayer from "react-player";
import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
  ImagePlus,
  Camera,
  Fullscreen,
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarIcon,
  Share2,
  MessageCircleHeart,
  Heart,
} from "lucide-react";
import { SignOut, SessionStatus } from "@/lib/auth-action";
import { auth } from "../auth";
import { SessionProvider } from "next-auth/react";
import { Moon, Sun } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import Spline from "@splinetool/react-spline";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

import { useTheme } from "next-themes";

import Meteors from "@/components/magicui/meteors";
import Particles from "@/components/magicui/particles";
import RetroGrid from "@/components/magicui/retro-grid";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { Confetti } from "@/components/magicui/confetti";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Inter } from "next/font/google";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";

// @ts-ignore
import { ImperativePanelHandle } from "@/components/ui/resizable";
import { openImage } from "./mail";
const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://images.unsplash.com/photo-1713223289172-e45b0ed96eae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://images.unsplash.com/photo-1713189166793-c2d1dd2a9aac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://images.unsplash.com/photo-1711476326491-2302665640e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://images.unsplash.com/photo-1713284428084-9c5d319d4a8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://plus.unsplash.com/premium_photo-1681406994521-82c20814605d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://images.unsplash.com/photo-1500622944204-b135684e99fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJhbHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://images.unsplash.com/photo-1420593248178-d88870618ca0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://plus.unsplash.com/premium_photo-1675127367513-7f4388aa9076?q=80&w=2562&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://images.unsplash.com/photo-1543877087-ebf71fde2be1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://images.unsplash.com/photo-1414872785488-7620d2ae7566?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const firstRow = reviews;
const secondRow = reviews;

interface MailListProps {
  items: Mail[];
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export function MailList({ items }: MailListProps) {
  const [mail, setMail] = useMail();

  const [width, setWidth] = useState<number>(0);

  const [playing, setPlaying] = useState<boolean>(false);

  const size = useWindowSize();

  const isMobile = size.width <= 768;
  let feedRows = isMobile ? 1 : 3;
  let feedRowsVideo = isMobile ? 1 : 2;

  const [playingVideos, setPlayingVideos] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <>
      <ScrollArea className="h-screen" style={{ height: "82vh" }}>
        <div className="z-10" style={{ marginRight: 20, marginLeft: 20 }}>
          <Masonry columnsCount={feedRows} gutter="20px">
            {secondRow.map((review) => (
              <>
                {/* <AlertDialog>
                <AlertDialogTrigger> */}
                <HoverCard>
                  <HoverCardTrigger>
                    <img
                      key={review.username}
                      src={review.img}
                      alt={review.username}
                      style={{
                        borderRadius: "0.60rem",
                        transition: "transform 0.3s ease-in-out",
                        width: "100%",
                        height: "100%",
                      }}
                      className="marginTop-10"
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                        e.currentTarget.style.zIndex = "999";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        // e.currentTarget.style.zIndex = "1";
                      }}
                      onError={(
                        i: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => (i.currentTarget.style.display = "none")}
                      onClick={() => {
                        // setMail(review);
                        openImage();
                      }}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent
                    style={{
                      //   borderBottomLeftRadius: "1rem",
                      //   borderBottomRightRadius: "1rem",
                      borderRadius: "0.90rem",
                      textAlign: "center",
                      alignContent: "center",
                      width: "20vw",
                    }}
                  >
                    <p>Image Title</p>
                    <Badge
                      style={{ borderRadius: "0.40rem", margin: "2px" }}
                      variant="secondary"
                    >
                      Camara
                    </Badge>
                    <Badge
                      style={{ borderRadius: "0.40rem", margin: "2px" }}
                      variant="secondary"
                    >
                      ISO
                    </Badge>
                    <Badge
                      style={{ borderRadius: "0.40rem", margin: "2px" }}
                      variant="secondary"
                    >
                      Secondary
                    </Badge>
                    <Badge
                      style={{ borderRadius: "0.40rem", margin: "2px" }}
                      variant="secondary"
                    >
                      Model
                    </Badge>
                  </HoverCardContent>
                </HoverCard>
              </>
            ))}
          </Masonry>
          <div style={{ marginTop: 40, marginBottom: 40 }}>
            <Separator />
          </div>
          <Masonry columnsCount={feedRowsVideo} gutter="20px">
            {secondRow.map((review, index) => (
              <>
                {/* <AlertDialog>
                <AlertDialogTrigger> */}
                <HoverCard key={index}>
                  <HoverCardTrigger>
                    <div
                      style={{
                        borderRadius: "0.60rem",
                        overflow: "hidden",
                        transition: "transform 0.3s ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        setPlayingVideos((prev) => ({
                          ...prev,
                          [index]: true,
                        }));
                        e.currentTarget.style.transform = "scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        setPlayingVideos((prev) => ({
                          ...prev,
                          [index]: false,
                        }));
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                      onClick={() => {
                        // setMail(review);
                        // e.setState({ pip: true }
                        openImage();
                      }}
                    >
                      <ReactPlayer
                        url="https://cdn.pixabay.com/video/2017/10/30/12687-241236784_tiny.mp4"
                        width="100%"
                        height="100%"
                        playing={playingVideos[index] || false}
                        // pip={playingVideos[index] || false}
                        loop={true}
                      />
                    </div>

                    {/* <img
                      key={review.username}
                      src={review.img}
                      alt={review.username}
                      style={{
                        borderRadius: "0.60rem",
                        transition: "transform 0.3s ease-in-out",
                        width: "100%",
                        height: "100%",
                      }}
                      className="marginTop-10"
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                        e.currentTarget.style.zIndex = "999";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        // e.currentTarget.style.zIndex = "1";
                      }}
                      onError={(
                        i: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => (i.currentTarget.style.display = "none")}
                      onClick={() => {
                        // setMail(review);
                        openImage();
                      }}
                    /> */}
                  </HoverCardTrigger>
                  <HoverCardContent
                    style={{
                      //   borderBottomLeftRadius: "1rem",
                      //   borderBottomRightRadius: "1rem",
                      borderRadius: "0.90rem",
                      textAlign: "center",
                      alignContent: "center",
                      width: "20vw",
                    }}
                  >
                    <p>Image Title</p>
                    <Badge
                      style={{ borderRadius: "0.40rem", margin: "2px" }}
                      variant="secondary"
                    >
                      Camara
                    </Badge>
                    <Badge
                      style={{ borderRadius: "0.40rem", margin: "2px" }}
                      variant="secondary"
                    >
                      ISO
                    </Badge>
                    <Badge
                      style={{ borderRadius: "0.40rem", margin: "2px" }}
                      variant="secondary"
                    >
                      Secondary
                    </Badge>
                    <Badge
                      style={{ borderRadius: "0.40rem", margin: "2px" }}
                      variant="secondary"
                    >
                      Model
                    </Badge>
                  </HoverCardContent>
                </HoverCard>
              </>
            ))}
          </Masonry>
        </div>
      </ScrollArea>
    </>
    // <ScrollArea className="h-screen">
    //   <div className="flex flex-col gap-2 p-4 pt-0">
    //     {items.map((item) => (
    //       <button
    //         key={item.id}
    //         className={cn(
    //           "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
    //           mail.selected === item.id && "bg-muted"
    //         )}
    //         onClick={() =>
    //           setMail({
    //             ...mail,
    //             selected: item.id,
    //           })
    //         }
    //       >
    //         <div className="flex w-full flex-col gap-1">
    //           <div className="flex items-center">
    //             <div className="flex items-center gap-2">
    //               <div className="font-semibold">{item.name}</div>
    //               {!item.read && (
    //                 <span className="flex h-2 w-2 rounded-full bg-blue-600" />
    //               )}
    //             </div>
    //             <div
    //               className={cn(
    //                 "ml-auto text-xs",
    //                 mail.selected === item.id
    //                   ? "text-foreground"
    //                   : "text-muted-foreground"
    //               )}
    //             >
    //               {formatDistanceToNow(new Date(item.date), {
    //                 addSuffix: true,
    //               })}
    //             </div>
    //           </div>
    //           <div className="text-xs font-medium">{item.subject}</div>
    //         </div>
    //         <div className="line-clamp-2 text-xs text-muted-foreground">
    //           {item.text.substring(0, 300)}
    //         </div>
    //         {item.labels.length ? (
    //           <div className="flex items-center gap-2">
    //             {item.labels.map((label) => (
    //               <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
    //                 {label}
    //               </Badge>
    //             ))}
    //           </div>
    //         ) : null}
    //       </button>
    //     ))}
    //   </div>
    // </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
