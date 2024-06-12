"use client";
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
import { Moon, Sun } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import Masonry from "react-responsive-masonry";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Spline from "@splinetool/react-spline";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

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

import { Badge } from "@/components/ui/badge";
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
const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://wallpaper.forfun.com/fetch/21/215e3ddf9d2d722a16e435992d354932.jpeg",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Fwallpaper-4k-nature-iphone-ideas--632826185125424258%2F&psig=AOvVaw3SWXJW8mDqoExSfpimGyXj&ust=1718199698695000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLC-vOfW04YDFQAAAAAdAAAAABAI",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_640.jpg",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
];

const firstRow = reviews;
const secondRow = reviews;

export default function Home() {
  const { setTheme } = useTheme();
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

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

  const isMobile = width <= 768;
  let feedRows = isMobile ? 1 : 5;

  const handleClick = () => {
    const scalar = 2;
    const unicorn = Confetti.shapeFromText({ text: "❤️", scalar });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [unicorn],
      scalar,
    };

    const shoot = () => {
      Confetti({
        ...defaults,
        particleCount: 30,
      });

      Confetti({
        ...defaults,
        particleCount: 5,
        flat: true,
      });

      Confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  return (
    <>
      <div className="grid h-screen w-full pl-[56px]">
        <div
          style={{
            position: "absolute",
            // top: 0,
            // left: 0,
            width: "100vw",
            height: "100vh",
            borderRadius: "10rem",
            zIndex: 1,
          }}
        >
          {/* <Spline
            scene="https://prod.spline.design/SXDnR4VmcO9k2y26/scene.splinecode"
            className="absolute inset-0 z-0"
          /> */}
        </div>
        {/* <Meteors number={40} /> */}
        {/* <RetroGrid /> */}

        <aside className="inset-y fixed left-0 z-70 flex h-full flex-col border-r">
          <div className="border-b p-2">
            <Button variant="outline" size="icon" aria-label="Home">
              <Triangle className="size-5 fill-foreground" />
            </Button>
          </div>
          <nav className="grid gap-1 p-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg bg-muted"
                    aria-label="Playground"
                    onClick={() => (window.location.href = "/")}
                  >
                    <Fullscreen className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Feed
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Models"
                  >
                    <Bot className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Models
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="API"
                    onClick={() => (window.location.href = "/api")}
                  >
                    <Code2 className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  API
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Documentation"
                  >
                    <Book className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Documentation
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Settings"
                  >
                    <Settings2 className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Settings
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
          <nav className="mt-auto grid gap-1 p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-auto rounded-lg"
                    aria-label="Help"
                  >
                    <LifeBuoy className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Help
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-auto rounded-lg"
                    aria-label="Account"
                    onClick={() => (window.location.href = "/signin")}
                  >
                    <SquareUser className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Account
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
        <div className="flex flex-col">
          <header className="sticky top-0 z-40 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold flex items-center">
              <span>Image Feed</span>
              <MessageCircleHeart className="size-6 ml-2" />
            </h1>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto gap-1.5 text-sm"
            >
              <ImagePlus className="size-4" />
              Upload
            </Button>
          </header>
          <div className="z-10" style={{ margin: "1rem", overflowX: "hidden" }}>
            <Masonry columnsCount={feedRows} gutter="13px">
              {secondRow.map((review) => (
                <>
                  {/* <Card className="items-center"> */}
                  {/* <Meteors number={2} /> */}
                  {/* <CardHeader>
                        <CardTitle>{review.username}</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                      </CardHeader> */}
                  {/* <CardContent> */}
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <HoverCard>
                        <HoverCardTrigger>
                          <img
                            key={review.username}
                            src={review.img}
                            alt={review.username}
                            style={{
                              borderRadius: "1rem",
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
                              e.currentTarget.style.zIndex = "1";
                            }}
                            onError={(
                              i: React.SyntheticEvent<HTMLImageElement, Event>
                            ) => (i.currentTarget.style.display = "none")}
                          />
                        </HoverCardTrigger>
                        <HoverCardContent
                          style={{
                            borderBottomLeftRadius: "1rem",
                            borderBottomRightRadius: "1rem",
                            textAlign: "center",
                          }}
                        >
                          Click image to view details
                        </HoverCardContent>
                      </HoverCard>
                    </AlertDialogTrigger>
                    <AlertDialogContent style={{ borderRadius: "1rem" }}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          <center>Are you absolutely sure?</center>
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          <center>
                            <div
                              style={{
                                pointerEvents: "none",
                                borderRadius: "1rem",
                              }}
                            >
                              <BorderBeam
                                colorFrom="white"
                                colorTo="white"
                                borderWidth={3}
                              />
                              <img
                                key={review.username}
                                src={review.img}
                                alt={review.username}
                                style={{
                                  borderRadius: "1rem",
                                  transition: "transform 0.3s ease-in-out",
                                  width: "50%",
                                  // height: "50%",
                                }}
                                // className="marginTop-10"

                                onError={(
                                  i: React.SyntheticEvent<
                                    HTMLImageElement,
                                    Event
                                  >
                                ) => (i.currentTarget.style.display = "none")}
                              />
                            </div>

                            <Card style={{ marginTop: 20 }}>
                              <CardHeader className="grid  items-start gap-4 space-y-0">
                                <div className="space-y-1">
                                  <CardTitle>shadcn/ui</CardTitle>
                                  <CardDescription>
                                    Beautifully designed components that you can
                                    copy and paste into your apps. Accessible.
                                    Customizable. Open Source.
                                  </CardDescription>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div
                                  className="flex space-x-4 text-sm text-muted-foreground"
                                  style={{ alignItems: "center" }}
                                >
                                  <div className="flex items-center">
                                    <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                                    TypeScript
                                  </div>
                                  <div className="flex items-center">
                                    <StarIcon className="mr-1 h-3 w-3" />
                                    20k
                                  </div>
                                  <div>Updated April 2023</div>
                                </div>
                              </CardContent>
                            </Card>
                          </center>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <Button
                          variant="secondary"
                          className="px-3 shadow-none"
                          style={{ margin: 7 }}
                          onClick={handleClick}
                        >
                          <Heart
                            className="mr-2 h-4 w-4"
                            style={{ color: "red" }}
                          />
                          Like
                        </Button>

                        <Button
                          variant="default"
                          className="px-3 shadow-none"
                          style={{ margin: 7 }}
                        >
                          <Share2
                            className="size-3.5"
                            style={{ marginRight: 3 }}
                          />
                          Share
                        </Button>

                        <AlertDialogCancel style={{ margin: 7 }}>
                          Close
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* <Image
                  isZoomed
                  // width={240}
                  alt="NextUI Fruit Image with Zoom"
                  src={review.img}
                /> */}
                  {/* </CardContent>
              </Card> */}
                </>
              ))}
            </Masonry>
          </div>
          <Separator />

          {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background"></div> */}
        </div>
      </div>
    </>
  );
}
