"use client";
import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon , CameraIcon} from "@radix-ui/react-icons";

import { Button } from "../components/ui/button";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
// import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { AlbumArtwork } from "@/components/album-artwork";
import { Menu } from "@/components/menu";
import { PodcastEmptyPlaceholder } from "@/components/podcast-empty-placeholder";
import { Sidebar } from "@/components/sidebar";
import { listenNowAlbums, madeForYouAlbums } from "@/data/albums";
import { playlists } from "@/data/playlists";
import React, { useState } from "react";
// export const metadata: Metadata = {
//   title: "Music App",
//   description: "Example music app using the components.",
// };

export default function MusicPage() {
  const [file, setFile] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile) as string);
    }
  }
  const prefix = "@";

  return (
    <>
      <div className="hidden md:block">
        <Menu />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="trending" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="trending" className="relative">
                          Trending
                        </TabsTrigger>
                        <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                        <TabsTrigger value="live">Live</TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <PlusCircledIcon className="mr-2 h-4 w-4" />
                              Upload
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Upload!</DialogTitle>
                              <DialogDescription>
                                Make changes to your profile here. Click save
                                when you&apos;re done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="username"
                                  className="text-right"
                                >
                                  Username
                                </Label>
                                <Input
                                  id="username"
                                  placeholder="@"
                                  className="col-span-3"
                                  ref={(target) => {
                                    try {
                                      if (target) {
                                        target.value = prefix;
                                      }
                                    } catch (e) {
                                      console.error(e);
                                    }
                                  }}
                                  onChange={(e) => {
                                    const input = e.target.value;
                                    e.target.value =
                                      prefix + input.substring(prefix.length);
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="username"
                                  className="text-right"
                                >
                                  Pincode
                                </Label>
                                <InputOTP className="col-span-3" maxLength={6}>
                                  <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                  </InputOTPGroup>
                                  <InputOTPSeparator />
                                  <InputOTPGroup>
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                  </InputOTPGroup>
                                </InputOTP>
                              </div>
                              <Separator className="my-4" />
                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <center>
                                  <Label htmlFor="picture">Picture</Label>
                                </center>
                                <Input
                                  placeholder="dw"
                                  onChange={handleChange}
                                  id="picture"
                                  type="file"
                                />
                                <img
                                  style={{
                                    borderRadius: "1rem",
                                    overflow: "hidden",
                                  }}
                                  src={file}
                                />
                                <Drawer>
                                  <DrawerTrigger asChild>
                                    <Button>
                                      Camara Settings
                                    </Button>
                                  </DrawerTrigger>
                                  <DrawerContent>
                                    <div className="mx-auto w-full max-w-sm">
                                      <DrawerHeader>
                                        <DrawerTitle>Move Goal</DrawerTitle>
                                        <DrawerDescription>
                                          Set your daily activity goal.
                                        </DrawerDescription>
                                      </DrawerHeader>
                                      <div className="p-4 pb-0">
                                        dwa
                                      </div>
                                      <DrawerFooter>
                                        <Button>Submit</Button>
                                        <DrawerClose asChild>
                                          <Button variant="outline">
                                            Cancel
                                          </Button>
                                        </DrawerClose>
                                      </DrawerFooter>
                                    </div>
                                  </DrawerContent>
                                </Drawer>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">
                                Upload!
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <TabsContent
                      value="trending"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Trending Now
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {listenNowAlbums.map((album) => (
                              <AlbumArtwork
                                key={album.name}
                                album={album}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {listenNowAlbums.map((album) => (
                              <AlbumArtwork
                                key={album.name}
                                album={album}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Made for You
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Your personal playlists. Updated daily.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {madeForYouAlbums.map((album) => (
                              <AlbumArtwork
                                key={album.name}
                                album={album}
                                className="w-[150px]"
                                aspectRatio="square"
                                width={150}
                                height={150}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="podcasts"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            New Episodes
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Your favorite podcasts. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <PodcastEmptyPlaceholder />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
