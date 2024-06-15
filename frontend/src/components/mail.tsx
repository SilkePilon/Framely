"use client";

import * as React from "react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
  PanelLeftOpen,
  Plus,
  User,
  MapPinned,
  Zap,
  Github,
  Crop,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
// @ts-ignore
import { ImperativePanelHandle } from "@/components/ui/resizable";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccountSwitcher } from "@/components/account-switcher";
import { MailDisplay } from "@/components/mail-display";
import { MailList } from "@/components/mail-list";
import { Nav } from "@/components/nav";
import { type Mail } from "@/app/data";
import { useMail } from "@/app/use-mail";
import { useEffect, useState } from "react";
import { createRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import exp from "constants";
interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

let leftPanelRef = createRef<ImperativePanelHandle>();
let rightPanelRef = createRef<ImperativePanelHandle>();

const delayTime = 1; // 1 second delay
const maxValue = 20;
const incrementDelay = 15; // 100ms delay between increments

export function openImage() {
  let number = 0;
  const currentSize = rightPanelRef.current?.getSize();

  if (currentSize >= maxValue) {
    animateToZero();
  } else {
    animateToMaxValue();
  }
}

function animateToZero() {
  let number = rightPanelRef.current?.getSize();

  const interval = setInterval(() => {
    rightPanelRef.current?.resize(number);
    number--;

    if (number < 0) {
      clearInterval(interval);
      animateToMaxValue();
    }
  }, incrementDelay);
}

function animateToMaxValue() {
  let number = 0;

  // Initial delay
  setTimeout(() => {
    const interval = setInterval(() => {
      rightPanelRef.current?.resize(number);
      number++;

      if (number > maxValue) {
        clearInterval(interval);
      }
    }, incrementDelay);
  }, delayTime);
}

// export function openImage() {
//   rightPanelRef.current?.resize(40);
//   rightPanelRef.current?.expand();
// }

export function Mail({
  accounts,
  mails,
  defaultLayout = [10, 10, 10],
  defaultCollapsed = true,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();
  const { setTheme } = useTheme();

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

  useEffect(() => {
    leftPanelRef.current?.collapse();
    rightPanelRef.current?.collapse();
    setIsCollapsed(true);
    document.cookie = `react-resizable-panels:collapsed=true`;
  }, []);

  // setIsCollapsed(true);
  // document.cookie = `react-resizable-panels:collapsed=true`;
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[100vh] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={15}
          onLoad={(panel) => {
            leftPanelRef.current?.collapse();
          }}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=true`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=false`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
          ref={leftPanelRef}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <div style={{ marginTop: "15px", marginBottom: "10px" }}>
              <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
            </div>
          </div>
          <div style={{ marginTop: "4px", marginBottom: "10px" }}>
            <Separator />
          </div>
          {/* <PanelLeftOpen
            onClick={() => {
              leftPanelRef.current?.expand();
            }}
            className="size-5"
            style={{ marginRight: "0.5rem" }}
          /> */}
          <div style={{ marginTop: "10px" }}>
            <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Feed",
                  label: "Explore the master feed!",
                  icon: Crop,
                  variant: "default",
                  href: "/",
                },
                {
                  title: "Create Post",
                  label: "(raw, image, video)",
                  icon: Plus,
                  variant: "ghost",
                },
                {
                  title: "Sent",
                  label: "Chat with friends! (if you have any)",
                  icon: Send,
                  variant: "ghost",
                },
                {
                  title: "Profile",
                  label: "See your work",
                  icon: User,
                  variant: "ghost",
                  href: "/profile",
                },
                {
                  title: "Map",
                  label: "Explore places!",
                  icon: MapPinned,
                  variant: "ghost",
                },
                {
                  title: "API",
                  label: "For developers!",
                  icon: Zap,
                  variant: "ghost",
                },
              ]}
            />
          </div>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Separator />
          </div>
          <div>
            <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Friends",
                  label: "17",
                  icon: Users2,
                  variant: "ghost",
                },
                {
                  title: "Updates",
                  label: "What's new?",
                  icon: AlertCircle,
                  variant: "ghost",
                },
                {
                  title: "GitHub",
                  label: "Contribute!",
                  icon: Github,
                  variant: "ghost",
                  href: "https://github.com/SilkePilon/Framely",
                },
              ]}
            />
            <center className="sticky top-[100vh]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon">
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
            </center>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-lg font-bold">Trending Images</h1>
              <TabsList className="ml-auto" style={{ borderRadius: "0.60rem" }}>
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                  style={{ borderRadius: "0.60rem" }}
                >
                  Trending
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                  style={{ borderRadius: "0.60rem" }}
                >
                  Following
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search for images" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MailList items={mails} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        {show ? (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel
              collapsible={true}
              ref={rightPanelRef}
              // defaultSize={defaultLayout[2]}
            >
              <MailDisplay
                mail={mails.find((item) => item.id === mail.selected) || null}
              />
            </ResizablePanel>
          </>
        ) : null}
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
